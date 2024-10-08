import os, sys, io, re, unittest, json, enum, textwrap, collections as cs

import yaml

try: import pyaml
except ImportError:
	sys.path.insert(1, os.path.join(__file__, *['..']*3))
	import pyaml

try: import unidecode
except ImportError: unidecode = None


large_yaml = br'''
### Default (baseline) configuration parameters.
### DO NOT ever change this config, use -c commandline option instead!

# Note that this file is YAML, so YAML types can be used here, see http://yaml.org/type/
# For instance, large number can be specified as "10_000_000" or "!!float 10e6".

source:
  # Path or glob pattern (to match path) to backup, required
  path: # example: /srv/backups/weekly.*

  queue:
    # Path to intermediate backup queue-file (list of paths to upload), required
    path: # example: /srv/backups/queue.txt
    # Don't rebuild queue-file if it's newer than source.path
    check_mtime: true

  entry_cache:
    # Path to persistent db (sqlite) of remote directory nodes, required
    path: # example: /srv/backups/dentries.sqlite

  # How to pick a path among those matched by "path" glob
  pick_policy: alphasort_last # only one supported


destination:
  # URL of Tahoe-LAFS node webapi
  url: http://localhost:3456/uri

  result: # what to do with a cap (URI) of a resulting tree (with full backup)
    print_to_stdout: true
    # Append the entry to the specified file (creating it, if doesn't exists)
    # Example entry: "2012-10-10T23:12:43.904543 /srv/backups/weekly.2012-10-10 URI:DIR2-CHK:..."
    append_to_file: # example: /srv/backups/lafs_caps
    # Append the entry to specified tahoe-lafs directory (i.e. put it into that dir)
    append_to_lafs_dir: # example: URI:DIR2:...

  encoding:
    xz:
      enabled: true
      options: # see lzma.LZMAOptions, empty = module defaults
      min_size: 5120 # don't compress files smaller than 5 KiB (unless overidden in "path_filter")
      path_filter:
        # List of include/exclude regexp path-rules, similar to "filter" section below.
        # Same as with "filter", rules can be tuples with '+' or '-' (implied for strings) as first element.
        #  '+' will indicate that file is compressible, if it's size >= "min_size" option.
        #  Unlike "filter", first element of rule-tuple can also be a number,
        #   overriding "min_size" parameter for matched (by that rule) paths.
        # If none of the patterns match path, file is handled as if it was matched by '+' rule.

        - '\.(gz|bz2|t[gb]z2?|xz|lzma|7z|zip|rar)$'
        - '\.(rpm|deb|iso)$'
        - '\.(jpe?g|gif|png|mov|avi|ogg|mkv|webm|mp[34g]|flv|flac|ape|pdf|djvu)$'
        - '\.(sqlite3?|fossil|fsl)$'
        - '\.git/objects/[0-9a-f]+/[0-9a-f]+$'
        # - [500, '\.(txt|csv|log|md|rst|cat|(ba|z|k|c|fi)?sh|env)$']
        # - [500, '\.(cgi|py|p[lm]|php|c|h|[ce]l|lisp|hs|patch|diff|xml|xsl|css|x?html[45]?|js)$']
        # - [500, '\.(co?nf|cfg?|li?st|ini|ya?ml|jso?n|vg|tab)(\.(sample|default|\w+-new))?$']
        # - [500, '\.(unit|service|taget|mount|desktop|rules|rc|menu)$']
        # - [2000, '^/etc/']


http:
  request_pool_options:
    maxPersistentPerHost: 10
    cachedConnectionTimeout: 600
    retryAutomatically: true
  ca_certs_files: /etc/ssl/certs/ca-certificates.crt # can be a list
  debug_requests: false # insecure! logs will contain tahoe caps


filter:
  # Either tuples like "[action ('+' or '-'), regexp]" or just exclude-patterns (python
  #  regexps) to match relative (to source.path, starting with "/") paths to backup.
  # Patterns are matched against each path in order they're listed here.
  # Leaf directories are matched with the trailing slash
  #  (as with rsync) to be distinguishable from files with the same name.
  # If path doesn't match any regexp on the list, it will be included.
  #
  # Examples:
  #  - ['+', '/\.git/config$']   # backup git repository config files
  #  - '/\.git/'   # *don't* backup any repository objects
  #  - ['-', '/\.git/']   # exactly same thing as above (redundant)
  #  - '/(?i)\.?svn(/.*|ignore)$' # exclude (case-insensitive) svn (or .svn) paths and ignore-lists

  - '/(CVS|RCS|SCCS|_darcs|\{arch\})/$'
  - '/\.(git|hg|bzr|svn|cvs)(/|ignore|attributes|tags)?$'
  - '/=(RELEASE-ID|meta-update|update)$'


operation:
  queue_only: false # only generate upload queue file, don't upload anything
  reuse_queue: false # don't generate upload queue file, use existing one as-is
  disable_deduplication: false # make no effort to de-duplicate data (should still work on tahoe-level for files)

  # Rate limiting might be useful to avoid excessive cpu/net usage on nodes,
  #  and especially when uploading to rate-limited api's (like free cloud storages).
  # Only used when uploading objects to the grid, not when building queue file.
  # Format of each value is "interval[:burst]", where "interval" can be specified as rate (e.g. "1/3e5").
  # Simple token bucket algorithm is used. Empty values mean "no limit".
  # Examples:
  #   "objects: 1/10:50" - 10 objects per second, up to 50 at once (if rate was lower before).
  #   "objects: 0.1:50" - same as above.
  #   "objects: 10:20" - 1 object in 10 seconds, up to 20 at once.
  #   "objects: 5" - make interval between object uploads equal 5 seconds.
  #   "bytes: 1/3e6:50e6" - 3 MB/s max, up to 50 MB/s if connection was underutilized before.
  rate_limit:
    bytes: # limit on rate of *file* bytes upload, example: 1/3e5:20e6
    objects: # limit on rate of uploaded objects, example: 10:50


logging: # see http://docs.python.org/library/logging.config.html
  # "custom" level means WARNING/DEBUG/NOISE, depending on CLI options
  warnings: true # capture python warnings
  sql_queries: false # log executed sqlite queries (very noisy, caps will be there)

  version: 1
  formatters:
    basic:
      format: '%(asctime)s :: %(name)s :: %(levelname)s: %(message)s'
      datefmt: '%Y-%m-%d %H:%M:%S'
  handlers:
    console:
      class: logging.StreamHandler
      stream: ext://sys.stderr
      formatter: basic
      level: custom
    debug_logfile:
      class: logging.handlers.RotatingFileHandler
      filename: /srv/backups/debug.log
      formatter: basic
      encoding: utf-8
      maxBytes: 5242880 # 5 MiB
      backupCount: 2
      level: NOISE
  loggers:
    twisted:
      handlers: [console]
      level: 0
  root:
    level: custom
    handlers: [console]
'''

class test_const(enum.IntEnum):
	dispatch = 2455
	heartbeat = 123

data = dict(
	path='/some/path',
	query_dump=cs.OrderedDict([
		('key1', 'тест1'),
		('key2', 'тест2'),
		('key3', 'тест3'),
		('последний', None) ]),
	ids=cs.OrderedDict(),
	a=[1,None,'asd', 'не-ascii'], b=3.5, c=None, d=test_const.dispatch,
	asd=cs.OrderedDict([('b', 1), ('a', 2)]) )
data['query_dump_clone'] = data['query_dump']
data['ids']['id в уникоде'] = [4, 5, 6]
data['ids']['id2 в уникоде'] = data['ids']['id в уникоде']
data["'asd'\n!\0\1"] = cs.OrderedDict([('b', 1), ('a', 2)])

data_str_multiline = dict(cert=(
	'-----BEGIN CERTIFICATE-----\n'
	'MIIDUjCCAjoCCQD0/aLLkLY/QDANBgkqhkiG9w0BAQUFADBqMRAwDgYDVQQKFAdm\n'
	'Z19jb3JlMRYwFAYDVQQHEw1ZZWthdGVyaW5idXJnMR0wGwYDVQQIExRTdmVyZGxv\n'
	'dnNrYXlhIG9ibGFzdDELMAkGA1UEBhMCUlUxEjAQBgNVBAMTCWxvY2FsaG9zdDAg\n'
	'Fw0xMzA0MjQwODUxMTRaGA8yMDUzMDQxNDA4NTExNFowajEQMA4GA1UEChQHZmdf\n'
	'Y29yZTEWMBQGA1UEBxMNWWVrYXRlcmluYnVyZzEdMBsGA1UECBMUU3ZlcmRsb3Zz\n'
	'a2F5YSBvYmxhc3QxCzAJBgNVBAYTAlJVMRIwEAYDVQQDEwlsb2NhbGhvc3QwggEi\n'
	'MA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCnZr3jbhfb5bUhORhmXOXOml8N\n'
	'fAli/ak6Yv+LRBtmOjke2gFybPZFuXYr0lYGQ4KgarN904vEg7WUbSlwwJuszJxQ\n'
	'Lz3xSDqQDqF74m1XeBYywZQIywKIbA/rfop3qiMeDWo3WavYp2kaxW28Xd/ZcsTd\n'
	'bN/eRo+Ft1bor1VPiQbkQKaOOi6K8M9a/2TK1ei2MceNbw6YrlCZe09l61RajCiz\n'
	'y5eZc96/1j436wynmqJn46hzc1gC3APjrkuYrvUNKORp8y//ye+6TX1mVbYW+M5n\n'
	'CZsIjjm9URUXf4wsacNlCHln1nwBxUe6D4e2Hxh2Oc0cocrAipxuNAa8Afn5AgMB\n'
	'AAEwDQYJKoZIhvcNAQEFBQADggEBADUHf1UXsiKCOYam9u3c0GRjg4V0TKkIeZWc\n'
	'uN59JWnpa/6RBJbykiZh8AMwdTonu02g95+13g44kjlUnK3WG5vGeUTrGv+6cnAf\n'
	'4B4XwnWTHADQxbdRLja/YXqTkZrXkd7W3Ipxdi0bDCOSi/BXSmiblyWdbNU4cHF/\n'
	'Ex4dTWeGFiTWY2upX8sa+1PuZjk/Ry+RPMLzuamvzP20mVXmKtEIfQTzz4b8+Pom\n'
	'T1gqPkNEbe2j1DciRNUOH1iuY+cL/b7JqZvvdQK34w3t9Cz7GtMWKo+g+ZRdh3+q\n'
	'2sn5m3EkrUb1hSKQbMWTbnaG4C/F3i4KVkH+8AZmR9OvOmZ+7Lo=\n'
	'-----END CERTIFICATE-----' ))

data_str_long = dict(cert=(
	'MIIDUjCCAjoCCQD0/aLLkLY/QDANBgkqhkiG9w0BAQUFADBqMRAwDgYDVQQKFAdm'
	'Z19jb3JlMRYwFAYDVQQHEw1ZZWthdGVyaW5idXJnMR0wGwYDVQQIExRTdmVyZGxv'
	'dnNrYXlhIG9ibGFzdDELMAkGA1UEBhMCUlUxEjAQBgNVBAMTCWxvY2FsaG9zdDAg'
	'Fw0xMzA0MjQwODUxMTRaGA8yMDUzMDQxNDA4NTExNFowajEQMA4GA1UEChQHZmdf'
	'Y29yZTEWMBQGA1UEBxMNWWVrYXRlcmluYnVyZzEdMBsGA1UECBMUU3ZlcmRsb3Zz'
	'a2F5YSBvYmxhc3QxCzAJBgNVBAYTAlJVMRIwEAYDVQQDEwlsb2NhbGhvc3QwggEi'
	'MA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCnZr3jbhfb5bUhORhmXOXOml8N'
	'fAli/ak6Yv+LRBtmOjke2gFybPZFuXYr0lYGQ4KgarN904vEg7WUbSlwwJuszJxQ'
	'Lz3xSDqQDqF74m1XeBYywZQIywKIbA/rfop3qiMeDWo3WavYp2kaxW28Xd/ZcsTd'
	'bN/eRo+Ft1bor1VPiQbkQKaOOi6K8M9a/2TK1ei2MceNbw6YrlCZe09l61RajCiz'
	'y5eZc96/1j436wynmqJn46hzc1gC3APjrkuYrvUNKORp8y//ye+6TX1mVbYW+M5n'
	'CZsIjjm9URUXf4wsacNlCHln1nwBxUe6D4e2Hxh2Oc0cocrAipxuNAa8Afn5AgMB'
	'AAEwDQYJKoZIhvcNAQEFBQADggEBADUHf1UXsiKCOYam9u3c0GRjg4V0TKkIeZWc'
	'uN59JWnpa/6RBJbykiZh8AMwdTonu02g95+13g44kjlUnK3WG5vGeUTrGv+6cnAf'
	'4B4XwnWTHADQxbdRLja/YXqTkZrXkd7W3Ipxdi0bDCOSi/BXSmiblyWdbNU4cHF/'
	'Ex4dTWeGFiTWY2upX8sa+1PuZjk/Ry+RPMLzuamvzP20mVXmKtEIfQTzz4b8+Pom'
	'T1gqPkNEbe2j1DciRNUOH1iuY+cL/b7JqZvvdQK34w3t9Cz7GtMWKo+g+ZRdh3+q'
	'2sn5m3EkrUb1hSKQbMWTbnaG4C/F3i4KVkH+8AZmR9OvOmZ+7Lo=' ))


class DumpTests(unittest.TestCase):

	def yaml_var(self, ys, raw=False):
		ys = textwrap.dedent(ys).replace('\t', '  ')
		return ys if raw else yaml.safe_load(ys)

	def flatten(self, data, path=tuple()):
		dst = list()
		if isinstance(data, (tuple, list)):
			for v in data: dst.extend(self.flatten(v, path + ('!!list',)))
		elif isinstance(data, dict):
			for k,v in data.items(): dst.extend(self.flatten(v, path + (k,)))
		else: dst.append((path, data))
		return tuple(sorted(dst, key=lambda v: json.dumps(v, sort_keys=True)))

	def pos_list(self, ys, sep='\n'):
		pos, pos_list = 0, list()
		while True:
			pos = ys.find(sep, pos+1)
			if pos < 0: break
			pos_list.append(pos)
		return pos_list

	def empty_line_list(self, ys):
		return list(n for n, line in enumerate(ys.splitlines()) if not line)


	def test_dst(self):
		buff = io.BytesIO()
		self.assertIs(pyaml.dump(data, buff), None)
		self.assertIsInstance(pyaml.dump(data, str), str)
		self.assertIsInstance(pyaml.dump(data, bytes), bytes)

	def test_simple(self):
		a = self.flatten(data)
		b = pyaml.dump(data)
		self.assertEqual(a, self.flatten(yaml.safe_load(b)))

	def test_vspacing(self):
		data = yaml.safe_load(large_yaml)
		a = self.flatten(data)
		b = pyaml.dump(data, vspacing=dict(split_lines=10, split_count=2))
		self.assertEqual(a, self.flatten(yaml.safe_load(b)))
		self.assertEqual( self.pos_list(b, '\n'),
			[12, 13, 25, 33, 52, 73, 88, 107, 157, 184, 264, 299, 344, 345, 355, 375, 399,
			424, 425, 458, 459, 467, 505, 561, 600, 601, 607, 660, 681, 705, 738, 767, 795,
			796, 805, 806, 820, 831, 866, 936, 937, 949, 950, 963, 998, 1021, 1041, 1072,
			1073, 1092, 1113, 1163, 1185, 1224, 1247, 1266, 1290, 1291, 1302, 1315, 1331,
			1349, 1364, 1365, 1373, 1387, 1403, 1421, 1422, 1440, 1441, 1454, 1455, 1471,
			1472, 1483, 1511, 1528, 1542, 1553, 1566, 1584, 1585, 1593, 1608, 1618, 1626,
			1656, 1665, 1686, 1696] )
		b = pyaml.dump(data, vspacing=False)
		self.assertNotIn('\n\n', b)

	def test_ids(self):
		b = pyaml.dump(data, force_embed=False)
		self.assertNotIn('&id00', b)
		self.assertIn('query_dump_clone: *query_dump_clone', b)
		self.assertIn('id в уникоде: &ids_-_id2_', b)
		if not unidecode: self.assertIn('id в уникоде: &ids_-_id2__id00', b)

	def test_ids_unidecode(self):
		if not unidecode:
			self.skipTest('No unidecode module to test ids from non-ascii keys')
		b = pyaml.dump(data, force_embed=False)
		self.assertNotIn('&id00', b)
		self.assertNotIn('_id00', b)
		self.assertIn('id в уникоде: &ids_-_id2_v_unikode', b)

	def test_force_embed(self):
		for check, fe in (self.assertNotIn, True), (self.assertIn, False):
			dump = pyaml.dump(data, force_embed=fe)
			for c in '*&': check(c, dump)

	def test_encoding(self):
		b = pyaml.dump(data, force_embed=True)
		b_lines = list(map(str.strip, b.splitlines()))
		chk = ['query_dump:', 'key1: тест1', 'key2: тест2', 'key3: тест3', 'последний:']
		pos = b_lines.index('query_dump:')
		self.assertEqual(b_lines[pos:pos + len(chk)], chk)

	def test_str_long(self):
		b = pyaml.dump(data_str_long)
		self.assertNotIn('"', b)
		self.assertNotIn("'", b)
		self.assertEqual(len(b.splitlines()), 1)

	def test_str_multiline(self):
		b = pyaml.dump(data_str_multiline)
		b_lines = b.splitlines()
		self.assertGreater(len(b_lines), len(data_str_multiline['cert'].splitlines()))
		for line in b_lines: self.assertLess(len(line), 100)

	def test_dumps(self):
		b = pyaml.dumps(data_str_multiline)
		self.assertIsInstance(b, str)

	def test_print(self):
		self.assertIs(pyaml.print, pyaml.pprint)
		self.assertIs(pyaml.print, pyaml.p)
		buff = io.BytesIO()
		b = pyaml.dump(data_str_multiline, dst=bytes)
		pyaml.print(data_str_multiline, file=buff)
		self.assertEqual(b, buff.getvalue())

	def test_print_args(self):
		buff = io.BytesIO()
		args = 1, 2, 3
		b = pyaml.dump(args, dst=bytes)
		pyaml.print(*args, file=buff)
		self.assertEqual(b, buff.getvalue())

	def test_str_styles(self):
		a = pyaml.dump(data_str_multiline)
		b = pyaml.dump(data_str_multiline, string_val_style='|')
		self.assertEqual(a, b)
		b = pyaml.dump(data_str_multiline, string_val_style='plain')
		self.assertNotEqual(a, b)
		c = pyaml.dump(data_str_multiline, string_val_style='literal')
		self.assertNotEqual(c, a)
		self.assertNotEqual(c, b)
		self.assertTrue(pyaml.dump('waka waka', string_val_style='|').startswith('|-\n'))

		a = pyaml.dump(data_int := dict(a=123))
		self.assertEqual(a, 'a: 123\n')
		self.assertEqual(pyaml.dump(data_int, string_val_style='|'), a)
		self.assertEqual(pyaml.dump(data_int, string_val_style='literal'), a)

		a = pyaml.dump(data_str := dict(a='123'))
		b = pyaml.dump(data_str, string_val_style='|')
		self.assertEqual(a, "a: '123'\n")
		self.assertEqual(self.flatten(data_str), self.flatten(yaml.safe_load(a)))
		self.assertNotEqual(a, b)
		self.assertEqual(self.flatten(data_str), self.flatten(yaml.safe_load(b)))

	def test_colons_in_strings(self):
		val1 = {'foo': ['bar:', 'baz', 'bar:bazzo', 'a: b'], 'foo:': 'yak:'}
		val1_str = pyaml.dump(val1)
		val2 = yaml.safe_load(val1_str)
		val2_str = pyaml.dump(val2)
		val3 = yaml.safe_load(val2_str)
		self.assertEqual(val1, val2)
		self.assertEqual(val1_str, val2_str)
		self.assertEqual(val2, val3)

	def test_unqouted_spaces(self):
		val1 = {'key': 'word1 word2 word3', 'key key': 'asd', 'k3': 'word: stuff'}
		val1_str = pyaml.dump(val1)
		val2 = yaml.safe_load(val1_str)
		self.assertEqual(val1, val2)
		self.assertIn('key: word1 word2 word3', val1_str)

	def test_empty_strings(self):
		val1 = {'key': ['', 'stuff', '', 'more'], '': 'value', 'k3': ''}
		val1_str = pyaml.dump(val1)
		val2 = yaml.safe_load(val1_str)
		val2_str = pyaml.dump(val2)
		val3 = yaml.safe_load(val2_str)
		self.assertEqual(val1, val2)
		self.assertEqual(val1_str, val2_str)
		self.assertEqual(val2, val3)

	def test_single_dash_strings(self):
		strip_seq_dash = lambda line: line.lstrip().lstrip('-').lstrip()
		val1 = {'key': ['-', '-stuff', '- -', '- more-', 'more-', '--']}
		val1_str = pyaml.dump(val1)
		val2 = yaml.safe_load(val1_str)
		val2_str = pyaml.dump(val2)
		val3 = yaml.safe_load(val2_str)
		self.assertEqual(val1, val2)
		self.assertEqual(val1_str, val2_str)
		self.assertEqual(val2, val3)
		val1_str_lines = val1_str.splitlines()
		self.assertEqual(strip_seq_dash(val1_str_lines[2]), '-stuff')
		self.assertEqual(strip_seq_dash(val1_str_lines[5]), 'more-')
		self.assertEqual(strip_seq_dash(val1_str_lines[6]), '--')
		val1 = {'key': '-'}
		val1_str = pyaml.dump(val1)
		val2 = yaml.safe_load(val1_str)
		val2_str = pyaml.dump(val2)
		val3 = yaml.safe_load(val2_str)

	def test_namedtuple(self):
		TestTuple = cs.namedtuple('TestTuple', 'y x z')
		val = TestTuple(1, 2, 3)
		val_str = pyaml.dump(val, sort_keys=False)
		self.assertEqual(val_str, 'y: 1\nx: 2\nz: 3\n') # namedtuple order was preserved

	def test_ordereddict(self):
		d = cs.OrderedDict((i, '') for i in reversed(range(10)))
		lines = pyaml.dump(d, sort_keys=False).splitlines()
		self.assertEqual(lines, list(reversed(sorted(lines))))

	def test_enum(self):
		c = test_const.heartbeat
		d1 = {'a': c, 'b': c.value, c: 'testx'}
		self.assertEqual(d1['a'], d1['b'])
		s = pyaml.dump(d1)
		d2 = yaml.safe_load(s)
		self.assertEqual(d1['a'], d2['a'])
		self.assertEqual(d1['a'], c)
		self.assertEqual(d1[c], 'testx')
		self.assertIn('a: 123 # test_const.heartbeat', s)

	def test_pyyaml_params(self):
		d = {'foo': 'lorem ipsum ' * 30} # 300+ chars
		for w in 40, 80, 200:
			lines = pyaml.dump(d, width=w, indent=10).splitlines()
			for n, line in enumerate(lines, 1):
				self.assertLess(len(line), w*1.2)
				if n != len(lines): self.assertGreater(len(line), w*0.8)

	def test_multiple_docs(self):
		docs = [yaml.safe_load(large_yaml), dict(a=1, b=2, c=3)]
		docs_str = pyaml.dump_all(docs, vspacing=True)
		self.assertTrue(docs_str.startswith('---'))
		self.assertIn('---\n\na: 1\n\nb: 2\n\nc: 3\n', docs_str)

		docs_str2 = pyaml.dump(docs, vspacing=True, multiple_docs=True)
		self.assertEqual(docs_str, docs_str2)
		docs_str2 = pyaml.dump(docs, vspacing=True)
		self.assertNotEqual(docs_str, docs_str2)
		docs_str2 = pyaml.dump_all(docs, explicit_start=False)
		self.assertFalse(docs_str2.startswith('---'))
		self.assertNotEqual(docs_str, docs_str2)
		docs_str = pyaml.dump(docs, multiple_docs=True, explicit_start=False)
		self.assertEqual(docs_str, docs_str2)

	def test_ruamel_yaml(self):
		try: from ruamel.yaml import YAML
		except ImportError: self.skipTest('No ruamel.yaml module to test it')
		data = YAML(typ='safe').load(large_yaml)
		yaml_str = pyaml.dump(data)

	def test_dump_stream_kws(self):
		data = [1, 2, 3]
		buff1, buff2 = io.StringIO(), io.StringIO()
		pyaml.dump(data, dst=buff1)
		pyaml.dump(data, stream=buff2)
		self.assertEqual(buff1.getvalue(), buff2.getvalue())

		buff1.seek(0); buff1.truncate()
		pyaml.dump(data, dst=buff1, stream=buff1)
		self.assertEqual(buff1.getvalue(), buff2.getvalue())
		ys = pyaml.dump(data, dst=str, stream=str)
		self.assertEqual(ys, buff2.getvalue())

		buff1.seek(0); buff1.truncate(); buff2.seek(0); buff2.truncate()
		with self.assertRaises(TypeError):
			pyaml.dump(data, dst=buff1, stream=buff2)
		with self.assertRaises(TypeError):
			pyaml.dump(data, dst=str, stream=buff2)
		self.assertEqual(buff1.getvalue(), '')
		self.assertEqual(buff2.getvalue(), '')

	def test_vspacing_limits(self):
		itm = self.yaml_var('''
			builtIn: 1
			datasource:
				type: grafana
				uid: -- Grafana --
			enable: yes
			hide: yes
			iconColor: rgba(0, 211, 255, 1)
			name: Annotations & Alerts
			type: dashboard''')
		ys = pyaml.dump(dict(mylist=[itm]*10))
		self.assertEqual(
			self.empty_line_list(ys),
			[1, 11, 21, 31, 41, 51, 61, 71, 81, 91] )

		ys = self.yaml_var('''
			panels:
				- datasource:
						type: datasource
						uid: grafana
					fieldConfig:''', raw=True)
		for n in range(60): ys += '\n' + '  '*3 + f'field{n}: value-{n}'
		ys = pyaml.dump(yaml.safe_load(ys), vspacing=dict(oneline_split=True))
		self.assertEqual(self.empty_line_list(ys), list(range(4, 126, 2)))
		ys = pyaml.dump(yaml.safe_load(ys))
		self.assertEqual(self.empty_line_list(ys), [4])

	def test_split_block_types(self):
		data = self.yaml_var('''
			test: # list items should be split
				- key1: 1
					key2: A
				- key1: 1
					key2: A
				- key1: 1
					key2: A
			test2: # list items should be split
				- key1:
						key11: A
						key12: B
				- key2:
						key21: A
				- val
			test3: # only top-level keys should be split
				key1:
					key11:
					key12:
				key2:
					- key21: A
					- key22: B
					- key23: C
				key3:
					- key31:
					- key32:
					- key33:
			''')
		ys = pyaml.dump(data, vspacing=dict(split_lines=0))
		self.assertEqual(self.empty_line_list(ys), [1, 4, 7, 10, 12, 16, 19, 21, 23, 27, 32])

	def test_anchor_cutoff(self):
		data = self.yaml_var('''
			similique-natus-inventore-deserunt-amet-explicabo-cum-accusamus-temporibus:
				quam-nulla-dolorem-dolore-velit-quis-deserunt-est-ullam-exercitationem:
					culpa-quia-incidunt-accusantium-ad-dicta-nobis-rerum-veritatis: &test
						test: 1
			similique-commodi-aperiam-libero-error-eos-quidem-eius:
				ipsam-labore-enim,-vero-voluptatem-eaque-dolores-blanditiis-recusandae:
					quas-atque-maxime-itaque-ullam-sequi-suscipit-quis-vitae-veritatis: *test''')
		ys = pyaml.dump(data, force_embed=False)
		for c in '&', r'\*':
			self.assertTrue(m := re.search(fr'(?<= ){c}\S+', ys))
			self.assertLess(len(m[0]), 50)
			self.assertIn('similique', m[0])
			self.assertIn('veritatis', m[0])

		data = dict(test1=dict(test2=(v := dict(a=1, b=2, c=3))), test3=dict(test4=v))
		ys = pyaml.dump(data, force_embed=False)
		for c in '&', r'\*':
			self.assertTrue(m := re.search(fr'(?<= ){c}\S+', ys))
			self.assertLess(len(m[0]), 30)
			self.assertEqual(len(re.findall(r'test\d', m[0])), 2)

	def test_group_oneline_values(self):
		data = self.yaml_var('''
			similique-natus: 1
			similique-commodi:
				aperiam-libero: 2
			'vel praesentium quo':
				exercitationem debitis: porro beatae id
				rerum commodi ipsum: nesciunt veritatis
				amet quaerat:
					assumenda: odio tenetur saepe
			"111": digit-string
			deserunt-est-2: asdasd
			deserunt-est-1: |
				line1
				line2
			culpa-quia: 1234
			deserunt-est-3: asdasd
			10: test1
			200: test
			30: test2''')
		# Sort and oneline-group
		ys1 = pyaml.dump( data,
			sort_dicts=pyaml.PYAMLSort.oneline_group,
			vspacing=dict(split_lines=0, split_count=0) )
		self.assertEqual(self.empty_line_list(ys1), [8, 12, 15, 19])
		# No oneline-group by default
		ys2 = pyaml.dump(data, vspacing=dict(split_lines=0, split_count=0))
		self.assertNotEqual(ys1, ys2)
		self.assertEqual( self.empty_line_list(ys2),
			[1, 4, 6, 9, 11, 13, 15, 17, 21, 23, 25, 27, 29] )
		# No-sort oneline-group overrides oneline-split for conseq oneliners
		ys3 = pyaml.dump(data, sort_keys=False, vspacing=dict(
			split_lines=0, split_count=0, oneline_group=True, oneline_split=True ))
		self.assertNotEqual(ys1, ys3)
		self.assertNotEqual(ys2, ys3)
		self.assertEqual(self.empty_line_list(ys3), [1, 4, 8, 11, 14, 18])


if __name__ == '__main__':
	unittest.main()
	# print('-'*80)
	# pyaml.dump(yaml.safe_load(large_yaml), sys.stdout)
	# print('-'*80)
	# pyaml.dump(data, sys.stdout)
