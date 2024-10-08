import os, sys, pyaml.cli

if __name__ == '__main__':
	try: sys.exit(pyaml.cli.main())
	except BrokenPipeError: # stdout pipe closed
		os.dup2(os.open(os.devnull, os.O_WRONLY), sys.stdout.fileno())
		sys.exit(1)
