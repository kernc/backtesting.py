"""
Backport of os.path.samefile for Python prior to 3.2
on Windows from jaraco.windows 3.8.

DON'T EDIT THIS FILE!

Instead, file tickets and PR's with `jaraco.windows
<https://github.com/jaraco/jaraco.windows>`_ and request
a port to setuptools_scm.
"""

import os
import nt
import posixpath
import ctypes.wintypes
import sys
import __builtin__ as builtins


##
# From jaraco.windows.error

def format_system_message(errno):
	"""
	Call FormatMessage with a system error number to retrieve
	the descriptive error message.
	"""
	# first some flags used by FormatMessageW
	ALLOCATE_BUFFER = 0x100
	FROM_SYSTEM = 0x1000

	# Let FormatMessageW allocate the buffer (we'll free it below)
	# Also, let it know we want a system error message.
	flags = ALLOCATE_BUFFER | FROM_SYSTEM
	source = None
	message_id = errno
	language_id = 0
	result_buffer = ctypes.wintypes.LPWSTR()
	buffer_size = 0
	arguments = None
	bytes = ctypes.windll.kernel32.FormatMessageW(
		flags,
		source,
		message_id,
		language_id,
		ctypes.byref(result_buffer),
		buffer_size,
		arguments,
	)
	# note the following will cause an infinite loop if GetLastError
	#  repeatedly returns an error that cannot be formatted, although
	#  this should not happen.
	handle_nonzero_success(bytes)
	message = result_buffer.value
	ctypes.windll.kernel32.LocalFree(result_buffer)
	return message


class WindowsError(builtins.WindowsError):
	"""
	More info about errors at
	http://msdn.microsoft.com/en-us/library/ms681381(VS.85).aspx
	"""

	def __init__(self, value=None):
		if value is None:
			value = ctypes.windll.kernel32.GetLastError()
		strerror = format_system_message(value)
		if sys.version_info > (3, 3):
			args = 0, strerror, None, value
		else:
			args = value, strerror
		super(WindowsError, self).__init__(*args)

	@property
	def message(self):
		return self.strerror

	@property
	def code(self):
		return self.winerror

	def __str__(self):
		return self.message

	def __repr__(self):
		return '{self.__class__.__name__}({self.winerror})'.format(**vars())


def handle_nonzero_success(result):
	if result == 0:
		raise WindowsError()


##
# From jaraco.windows.api.filesystem

FILE_FLAG_OPEN_REPARSE_POINT = 0x00200000
FILE_FLAG_BACKUP_SEMANTICS = 0x2000000
OPEN_EXISTING = 3
FILE_ATTRIBUTE_NORMAL = 0x80
FILE_READ_ATTRIBUTES = 0x80
INVALID_HANDLE_VALUE = ctypes.wintypes.HANDLE(-1).value


class BY_HANDLE_FILE_INFORMATION(ctypes.Structure):
	_fields_ = [
		('file_attributes', ctypes.wintypes.DWORD),
		('creation_time', ctypes.wintypes.FILETIME),
		('last_access_time', ctypes.wintypes.FILETIME),
		('last_write_time', ctypes.wintypes.FILETIME),
		('volume_serial_number', ctypes.wintypes.DWORD),
		('file_size_high', ctypes.wintypes.DWORD),
		('file_size_low', ctypes.wintypes.DWORD),
		('number_of_links', ctypes.wintypes.DWORD),
		('file_index_high', ctypes.wintypes.DWORD),
		('file_index_low', ctypes.wintypes.DWORD),
	]

	@property
	def file_size(self):
		return (self.file_size_high << 32) + self.file_size_low

	@property
	def file_index(self):
		return (self.file_index_high << 32) + self.file_index_low


class SECURITY_ATTRIBUTES(ctypes.Structure):
	_fields_ = (
		('length', ctypes.wintypes.DWORD),
		('p_security_descriptor', ctypes.wintypes.LPVOID),
		('inherit_handle', ctypes.wintypes.BOOLEAN),
	)


LPSECURITY_ATTRIBUTES = ctypes.POINTER(SECURITY_ATTRIBUTES)


CreateFile = ctypes.windll.kernel32.CreateFileW
CreateFile.argtypes = (
	ctypes.wintypes.LPWSTR,
	ctypes.wintypes.DWORD,
	ctypes.wintypes.DWORD,
	LPSECURITY_ATTRIBUTES,
	ctypes.wintypes.DWORD,
	ctypes.wintypes.DWORD,
	ctypes.wintypes.HANDLE,
)
CreateFile.restype = ctypes.wintypes.HANDLE

GetFileInformationByHandle = ctypes.windll.kernel32.GetFileInformationByHandle
GetFileInformationByHandle.restype = ctypes.wintypes.BOOL
GetFileInformationByHandle.argtypes = (
	ctypes.wintypes.HANDLE,
	ctypes.POINTER(BY_HANDLE_FILE_INFORMATION),
)


##
# From jaraco.windows.filesystem

def compat_stat(path):
	"""
	Generate stat as found on Python 3.2 and later.
	"""
	stat = os.stat(path)
	info = get_file_info(path)
	# rewrite st_ino, st_dev, and st_nlink based on file info
	return nt.stat_result(
		(stat.st_mode,) +
		(info.file_index, info.volume_serial_number, info.number_of_links) +
		stat[4:]
	)


def samefile(f1, f2):
	"""
	Backport of samefile from Python 3.2 with support for Windows.
	"""
	return posixpath.samestat(compat_stat(f1), compat_stat(f2))


def get_file_info(path):
	# open the file the same way CPython does in posixmodule.c
	desired_access = FILE_READ_ATTRIBUTES
	share_mode = 0
	security_attributes = None
	creation_disposition = OPEN_EXISTING
	flags_and_attributes = (
		FILE_ATTRIBUTE_NORMAL |
		FILE_FLAG_BACKUP_SEMANTICS |
		FILE_FLAG_OPEN_REPARSE_POINT
	)
	template_file = None

	handle = CreateFile(
		path,
		desired_access,
		share_mode,
		security_attributes,
		creation_disposition,
		flags_and_attributes,
		template_file,
	)

	if handle == INVALID_HANDLE_VALUE:
		raise WindowsError()

	info = BY_HANDLE_FILE_INFORMATION()
	res = GetFileInformationByHandle(handle, info)
	handle_nonzero_success(res)

	return info
