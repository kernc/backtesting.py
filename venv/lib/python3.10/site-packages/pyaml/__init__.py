import os, sys, io, re, string, warnings, enum, pathlib, collections as cs

import yaml


PYAMLSort = enum.Enum('PYAMLSort', 'none keys oneline_group')

class PYAMLDumper(yaml.dumper.SafeDumper):

	class str_ext(str): __slots__ = 'ext',
	pyaml_anchor_decode = None # imported from unidecode module when needed
	pyaml_sort_dicts = None

	def __init__( self, *args, sort_dicts=None,
			force_embed=True, string_val_style=None, anchor_len_max=40, **kws ):
		self.pyaml_force_embed = force_embed
		self.pyaml_string_val_style = string_val_style
		self.pyaml_anchor_len_max = anchor_len_max
		if isinstance(sort_dicts, PYAMLSort):
			if sort_dicts is sort_dicts.none: kws['sort_keys'] = False
			elif sort_dicts is sort_dicts.keys: kws['sort_keys'] = True
			else: self.pyaml_sort_dicts, kws['sort_keys'] = sort_dicts, False
		elif sort_dicts is not None: kws['sort_keys'] = sort_dicts # for compatibility
		return super().__init__(*args, **kws)

	@staticmethod
	def pyaml_transliterate(s):
		if unidecode_missing := not all(ord(c) < 128 for c in s):
			if (unidecode := PYAMLDumper.pyaml_anchor_decode) is None:
				try: from unidecode import unidecode
				except ImportError: unidecode = False
				PYAMLDumper.pyaml_anchor_decode = unidecode
			if unidecode: unidecode_missing, s = None, unidecode(s)
		return re.sub(r'[^-_a-z0-9]+', '_', s.lower()), unidecode_missing

	def anchor_node(self, node, hints=list()):
		if node in self.anchors:
			if self.anchors[node] is None and not self.pyaml_force_embed:
				if hints:
					nid, uc = self.pyaml_transliterate('_-_'.join(h.value for h in hints))
					if len(nid) > (n := self.pyaml_anchor_len_max - 9) + 9:
						nid = f'{nid[:n//2]}-_-{nid[-n//2:]}_{self.generate_anchor(node)}'
					elif uc is True: nid = f'{nid}_{self.generate_anchor(node)}'
				else: nid = self.generate_anchor(node)
				self.anchors[node] = nid
		else:
			self.anchors[node] = None
			if isinstance(node, yaml.nodes.SequenceNode):
				for item in node.value: self.anchor_node(item)
			elif isinstance(node, yaml.nodes.MappingNode):
				for key, value in node.value:
					self.anchor_node(key)
					self.anchor_node(value, hints=hints+[key])

	def serialize_node(self, node, parent, index):
		if self.pyaml_force_embed: self.anchors[node] = self.serialized_nodes.clear()
		return super().serialize_node(node, parent, index)

	def expect_block_sequence(self):
		self.increase_indent(flow=False, indentless=False)
		self.state = self.expect_first_block_sequence_item

	def expect_block_sequence_item(self, first=False):
		if not first and isinstance(self.event, yaml.events.SequenceEndEvent):
			self.indent = self.indents.pop()
			self.state = self.states.pop()
		else:
			self.write_indent()
			self.write_indicator('-', True, indention=True)
			self.states.append(self.expect_block_sequence_item)
			self.expect_node(sequence=True)

	def check_simple_key(self):
		res = super().check_simple_key()
		if self.analysis: self.analysis.allow_flow_plain = False
		return res

	def choose_scalar_style(self, _re1=re.compile(r':(\s|$)')):
		if self.states[-1] == self.expect_block_mapping_simple_value:
			# Mapping keys - disable overriding string style, strip comments
			if self.pyaml_string_val_style: self.event.style = 'plain'
			if isinstance(self.analysis.scalar, self.str_ext):
				self.analysis.scalar = str(self.event.value)
		# Do default thing for complicated stuff
		if self.event.style != 'plain': return super().choose_scalar_style()
		# Make sure style isn't overidden for strings like list/mapping items
		if (s := self.event.value).startswith('- ') or _re1.search(s): return "'"
		# Returned style=None picks write_plain in Emitter.process_scalar

	def write_indicator(self, indicator, *args, **kws):
		if indicator == '...': return # presumably it's useful somewhere, but don't care
		super().write_indicator(indicator, *args, **kws)

	def represent_str(self, data):
		if not (style := self.pyaml_string_val_style):
			if '\n' in data[:-1]:
				style = 'literal'
				for line in data.splitlines():
					if len(line) > self.best_width: break
				else: style = '|'
		return yaml.representer.ScalarNode('tag:yaml.org,2002:str', data, style=style)

	def represent_mapping_sort_oneline(self, kv):
		key, value = kv
		if not value or isinstance(value, (int, float)): v = 1
		elif isinstance(value, str) and '\n' not in value: v = 1
		else: v = 2
		if isinstance(key, (int, float)): k = 1
		elif isinstance(key, str): k = 2
		elif key is None: k = 4
		else: k, key = 3, f'{type(key)}\0{key}' # best-effort sort for all other types
		return v, k, key

	def represent_mapping(self, tag, mapping, *args, **kws):
		if self.pyaml_sort_dicts is PYAMLSort.oneline_group:
			try:
				mapping = dict(sorted( mapping.items(),
					key=self.represent_mapping_sort_oneline ))
			except TypeError: pass # for subtype comparison fails
		return super().represent_mapping(tag, mapping, *args, **kws)

	def represent_undefined(self, data):
		if isinstance(data, tuple) and hasattr(data, '_make') and hasattr(data, '_asdict'):
			return self.represent_dict(data._asdict()) # assuming namedtuple
		if isinstance(data, cs.abc.Mapping): return self.represent_dict(data) # dict-like
		if type(data).__class__.__module__ == 'enum':
			node = self.represent_data(data.value)
			node.value = self.str_ext(node.value)
			node.value.ext = f'# {data.__class__.__name__}.{data.name}'
			return node
		if hasattr(type(data), '__dataclass_fields__'):
			try: import dataclasses as dcs
			except ImportError: pass # can still be something else
			else: return self.represent_dict(dcs.asdict(data))
		try: # this is for numpy arrays, and the likes
			if not callable(getattr(data, 'tolist', None)): raise AttributeError
		except: pass # can raise other errors with custom types
		else: return self.represent_data(data.tolist())
		return super().represent_undefined(data) # will raise RepresenterError

	def write_ext(self, func, text, *args, **kws):
		# Emitter write-funcs extension to append comments to values
		getattr(super(), f'write_{func}')(text, *args, **kws)
		if ext := getattr(text, 'ext', None): super().write_plain(ext)
	write_folded = lambda s,v,*a,**kw: s.write_ext('folded', v, *a, **kw)
	write_literal = lambda s,v,*a,**kw: s.write_ext('literal', v, *a, **kw)
	write_plain = lambda s,v,*a,**kw: s.write_ext('plain', v, *a, **kw)


# Unsafe was a separate class in <23.x versions, left here for compatibility
UnsafePYAMLDumper = PYAMLDumper

add_representer = PYAMLDumper.add_representer

add_representer( bool,
	lambda s,o: s.represent_scalar('tag:yaml.org,2002:bool', ['no', 'yes'][o]) )
add_representer( type(None),
	lambda s,o: s.represent_scalar('tag:yaml.org,2002:null', '') )
add_representer(str, PYAMLDumper.represent_str)

add_representer(cs.defaultdict, PYAMLDumper.represent_dict)
add_representer(cs.OrderedDict, PYAMLDumper.represent_dict)
add_representer(set, PYAMLDumper.represent_list)
add_representer(type(pathlib.Path('')), lambda cls,o: cls.represent_data(str(o)))
add_representer(None, PYAMLDumper.represent_undefined)


def dump_add_vspacing( yaml_str,
		split_lines=40, split_count=2, oneline_group=False, oneline_split=False ):
	'''Add some newlines to separate overly long YAML lists/mappings.
		"long" means both >split_lines in length and has >split_count items.
		oneline_group - don't split consecutive oneliner list/map items.
		oneline_split - split long list/map consisting only of oneliner values.'''
	def _add_vspacing(lines):
		a = a_seq = ind_re = ind_re_sub = has_sub = None
		blocks, item_lines = list(), list()
		for n, line in enumerate(lines):
			if ind_re is None and (m := re.match(r'( *)([^# ].?)', line)):
				ind_re = re.compile(m[1] + r'\S')
				lines.append(f'{m[1]}.') # for last add_vspacing
			if ind_re_sub:
				if ind_re_sub.match(line): has_sub = True; continue
				if n - a > split_lines and (block := lines[a:n]):
					if a_seq: block.insert(0, lines[a-1].replace('- ', '  ', 1))
					blocks.append((a, n, _add_vspacing(block)[a_seq:]))
				ind_re_sub = None
			if ind_re.match(line): item_lines.append(n)
			if m := re.match(r'( *)(- )?\S.*:(\s|$)', line):
				a, a_seq, ind_re_sub = n+1, bool(m[2]), re.compile(m[1] + ' ')
		if ( split_items := len(lines) > split_lines and
				len(item_lines) > split_count and (oneline_split or has_sub) ):
			for n in item_lines:
				try:
					if ( oneline_group and ind_re
						and ind_re.match(lines[n-1].lstrip('\n'))
						and ind_re.match(lines[n+1].lstrip('\n')) ): continue
				except IndexError: continue
				lines[n] = f'\n{lines[n]}'
		for a, b, block in reversed(blocks): lines[a:b] = block
		if ind_re: lines.pop()
		if split_items: lines.append('')
		return lines
	yaml_str = '\n'.join(_add_vspacing(yaml_str.splitlines()))
	return re.sub(r'\n\n+', '\n\n', yaml_str.strip() + '\n')


def dump( data, dst=None, safe=None, force_embed=True, vspacing=True,
		string_val_style=None, sort_dicts=None, multiple_docs=False, width=100, **pyyaml_kws ):
	'''Serialize data as pretty-YAML to specified dst file-like object,
		or return as str with dst=str (default) or encoded to bytes with dst=bytes.'''
	if safe is not None:
		cat = DeprecationWarning if not safe else UserWarning
		warnings.warn( 'pyaml module "safe" arg/keyword is ignored as implicit'
			' safe=maybe-true?, as of pyaml >= 23.x', category=cat, stacklevel=2 )
	if sort_dicts is not None and not isinstance(sort_dicts, PYAMLSort):
		warnings.warn( 'Using pyaml module sort_dicts as boolean is deprecated as of'
				' pyaml >= 23.x - translated to sort_keys PyYAML keyword, use that instead',
			DeprecationWarning, stacklevel=2 )
	if stream := pyyaml_kws.pop('stream', None):
		if dst is not None and stream is not dst:
			raise TypeError( 'Using different pyaml dst='
				' and pyyaml stream= options at the same time is not supported' )
		dst = stream
	elif dst is None: dst = str # old default

	buff = io.StringIO()
	Dumper = lambda *a,**kw: PYAMLDumper( *a, **kw,
		force_embed=force_embed, string_val_style=string_val_style, sort_dicts=sort_dicts )
	if not multiple_docs: data = [data]
	else: pyyaml_kws.setdefault('explicit_start', True)
	yaml.dump_all( data, buff, Dumper=Dumper, width=width,
		default_flow_style=False, allow_unicode=True, **pyyaml_kws )
	buff = buff.getvalue()

	if vspacing not in [None, False]:
		if vspacing is True: vspacing = dict()
		elif not isinstance(vspacing, dict):
			warnings.warn(
				'Unsupported pyaml "vspacing" parameter type:'
					f' [{vspacing.__class__.__name__}] {vspacing}\n'
				'As of pyaml >= 23.x it should be either True or keywords-dict'
				' for pyaml_add_vspacing, and any other values are ignored,'
				' enabling default vspacing behavior.', DeprecationWarning, stacklevel=2 )
			vspacing = dict()
		if sort_dicts is PYAMLSort.oneline_group: vspacing.setdefault('oneline_group', True)
		buff = dump_add_vspacing(buff, **vspacing)

	if dst is bytes: return buff.encode()
	elif dst is str: return buff
	else:
		try: dst.write(b'') # tests if dst is str- or bytestream
		except: dst.write(buff)
		else: dst.write(buff.encode())


# Simplier pyaml.dump() aliases

def dump_all(data, *dump_args, **dump_kws):
	return dump(data, *dump_args, multiple_docs=True, **dump_kws)

def dumps(data, **dump_kws):
	return dump(data, **dump_kws)

def pprint(*data, **dump_kws):
	dst = dump_kws.pop('file', dump_kws.pop('dst', sys.stdout))
	if len(data) == 1: data, = data
	dump(data, dst=dst, **dump_kws)

_p = lambda *a,_p=print,**kw: _p(*a, **kw, flush=True) # to use here for debug
p = print = pprint
