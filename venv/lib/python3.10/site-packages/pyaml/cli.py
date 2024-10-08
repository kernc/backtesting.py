import os, sys, re, stat, errno, json, tempfile, contextlib
import yaml, pyaml


@contextlib.contextmanager
def safe_replacement(path, *open_args, mode=None, xattrs=None, **open_kws):
	'Context to atomically create/replace file-path in-place unless errors are raised'
	path, xattrs = str(path), None
	if mode is None:
		try: mode = stat.S_IMODE(os.lstat(path).st_mode)
		except FileNotFoundError: pass
	if xattrs is None and getattr(os, 'getxattr', None): # MacOS
		try: xattrs = dict((k, os.getxattr(path, k)) for k in os.listxattr(path))
		except FileNotFoundError: pass
		except OSError as err:
			if err.errno != errno.ENOTSUP: raise
	open_kws.update( delete=False,
		dir=os.path.dirname(path), prefix=os.path.basename(path) + '.' )
	if not open_args: open_kws.setdefault('mode', 'w')
	with tempfile.NamedTemporaryFile(*open_args, **open_kws) as tmp:
		try:
			if mode is not None: os.fchmod(tmp.fileno(), mode)
			if xattrs:
				for k, v in xattrs.items(): os.setxattr(path, k, v)
			yield tmp
			if not tmp.closed: tmp.flush()
			try: os.fdatasync(tmp)
			except AttributeError: pass # MacOS
			os.rename(tmp.name, path)
		finally:
			try: os.unlink(tmp.name)
			except FileNotFoundError: pass

def file_line_iter(src, sep='\0\n', bs=128 * 2**10):
	'Generator for src-file chunks, split by any of the separator chars'
	buff0 = buff = ''
	while True:
		eof = len(buff := src.read(bs)) < bs
		while buff:
			for n in sorted(buff.find(c) for c in sep):
				if n >= 0: break
			else: buff0 += buff; break
			chunk, buff = buff[:n], buff[n+1:]
			buff0, chunk = '', buff0 + chunk
			yield chunk
		if eof: break
	if buff0: yield buff0


def main(argv=None, stdin=sys.stdin, stdout=sys.stdout, stderr=sys.stderr):
	import argparse, textwrap
	dd = lambda text: re.sub( r' \t+', ' ',
		textwrap.dedent(text).strip('\n') + '\n' ).replace('\t', '  ')
	parser = argparse.ArgumentParser(
		formatter_class=argparse.RawTextHelpFormatter,
		description='Process and dump prettified YAML to stdout.')
	parser.add_argument('path', nargs='?', metavar='path',
		help='Path to YAML to read (default: use stdin).')
	parser.add_argument('-r', '--replace', action='store_true',
		help='Replace specified path with prettified version in-place.')
	parser.add_argument('-w', '--width', type=int, metavar='chars', help=dd('''
		Max line width hint to pass to pyyaml for the dump.
		Only used to format scalars and collections (e.g. lists).'''))
	parser.add_argument('-v', '--vspacing', metavar='N[/M][g]', help=dd('''
		Custom thresholds for when to add vertical spacing (empty lines),
			to visually separate items in overly long YAML lists/mappings.
		"long" means both >split-lines in line-length and has >split-count items.
		Value has N[/M][g] format, with default being something like 40/2.
			N = min number of same-indent lines in a section to split.
			M = min count of values in a list/mapping to split.
			"g" can be added to clump single-line values at the top of such lists/maps.
			"s" to split all-onliner blocks of values.
		Values examples: 20g, 5/1g, 60/4, gs, 10.'''))
	parser.add_argument('-l', '--lines', action='store_true', help=dd('''
		Read input as a list of \\0 (ascii null char) or newline-separated
			json/yaml "lines", common with loggers or other incremental data dumps.
		Each input entry will be exported as a separate YAML document (after "---").
		Empty or whitespace-only input entries are skipped without errors.'''))
	parser.add_argument('-q', '--quiet', action='store_true',
		help='Disable sanity-check on the output and suppress stderr warnings.')
	opts = parser.parse_args(sys.argv[1:] if argv is None else argv)

	if opts.replace and not opts.path:
		parser.error('-r/--replace option can only be used with a file path, not stdin')

	src = open(opts.path) if opts.path else stdin
	try:
		data = list( yaml.safe_load_all(src) if not opts.lines else
			(yaml.safe_load(chunk) for chunk in file_line_iter(src) if chunk.strip()) )
	finally: src.close()

	pyaml_kwargs = dict()
	if opts.width: pyaml_kwargs['width'] = opts.width
	if vspacing := opts.vspacing:
		if not (m := re.search(r'^(\d+(?:/\d+)?)?([gs]+)?$', vspacing)):
			parser.error(f'Unrecognized -v/--vspacing spec: {vspacing!r}')
		vspacing, (vsplit, flags) = dict(), m.groups()
		if flags:
			if 's' in flags: vspacing['oneline_split'] = True
			if 'g' in flags: pyaml_kwargs['sort_dicts'] = pyaml.PYAMLSort.oneline_group
		if vsplit:
			lines, _, count = vsplit.strip().strip('/').partition('/')
			if lines: vspacing['split_lines'] = int(lines.strip())
			if count: vspacing['split_count'] = int(count.strip())
		if vspacing: pyaml_kwargs['vspacing'] = vspacing

	if len(data) > 1: ys = pyaml.dump_all(data, **pyaml_kwargs)
	else: ys = pyaml.dump(data[0], **pyaml_kwargs) # avoids leading "---"

	if not opts.quiet:
		try:
			data_chk = list(yaml.safe_load_all(ys))
			try: data_hash = json.dumps(data, sort_keys=True)
			except: pass # too complex for checking with json
			else:
				if json.dumps(data_chk, sort_keys=True) != data_hash:
					raise AssertionError('Data from before/after pyaml does not match')
		except Exception as err:
			p_err = lambda *a,**kw: print(*a, **kw, file=stderr, flush=True)
			p_err( 'WARNING: Failed to parse produced YAML'
				' output back to data, it is likely too complicated for pyaml' )
			err = f'[{err.__class__.__name__}] {err}'
			p_err('  raised error: ' + ' // '.join(map(str.strip, err.split('\n'))))

	if opts.replace:
		with safe_replacement(opts.path) as tmp: tmp.write(ys)
	else: stdout.write(ys)
