export const SCRIPT_CONFIG_YAML = 'deploy.yaml';
export const SCRIPT_CONFIG_TEMPLATE_YAML = 'deploy.template.yaml';
export const SCRIPT_CONFIG_TEST_TEMPLATE_YAML = 'deploy.test.template.yaml';
export const SCRIPT_INSTR_FILE = 'installer.py';

export const SCRIPT_FILE = 'script.py';
export const SCRIPT_RELAUNCH_ARGV = '--relaunch';

export const RepositoryMap = {
  china: 'cn',
  global: 'global',
};

export const GitExecutableMap = {
  windows: './toolkit/Git/mingw64/bin/git.exe',
  macos: '/usr/bin/git',
  linux: '/usr/bin/git',
};

export const AdbExecutableMap = {
  windows: './toolkit/Lib/site-packages/adbutils/binaries/adb.exe',
  macos: '/usr/bin/adb',
  linux: '/usr/bin/adb',
};

export const PythonExecutableMap = {
  windows: './toolkit/python.exe',
  macos: '/usr/bin/python',
  linux: '/usr/bin/python',
};
