import {SCRIPT_INSTR_FILE, DefConfig} from '@web-app/common';
import {validateConfigFile} from '@/utils/validate';
import path, {join} from 'path';
import {logger} from '@/core/Logger/customLogger';

import yaml from 'yaml';
import fs from 'fs';
import {getScriptRootPath} from '@/utils/getScriptRootPath';
import {is} from '@electron-toolkit/utils';



let configInfo = (() => {
  const alasPath = getScriptRootPath();
  try {
    validateConfigFile(join(alasPath, '/config'));
  } catch (e) {
    logger.error(String(e as any));
  }
  const file = fs.readFileSync(path.join(alasPath, './config/deploy.yaml'), 'utf8');
  const config = yaml.parse(file) as DefConfig;
  const PythonExecutable = config.Deploy.Python.PythonExecutable;
  const WebuiPort = config.Deploy.Webui.WebuiPort.toString();
  const Theme = config.Deploy.Webui.Theme;

  const ThemeObj: {[k in string]: 'light' | 'dark'} = {
    default: 'light',
    light: 'light',
    dark: 'dark',
    system: 'light',
  };

  const pythonPath = path.isAbsolute(PythonExecutable)
    ? PythonExecutable
    : path.join(alasPath, PythonExecutable);
  const installerPath = SCRIPT_INSTR_FILE;
  const installerArgs = is.dev ? ['--print-test'] : [];
  const webuiUrl = `http://127.0.0.1:${WebuiPort}`;
  const webuiPath = 'gui.py';
  const webuiArgs = ['--port', WebuiPort, '--electron'];
  const dpiScaling =
    Boolean(config.Deploy.Webui.DpiScaling) || config.Deploy.Webui.DpiScaling === undefined;

  const webuiTheme = ThemeObj[Theme] || 'light';

  const noSandbox = config.Deploy.Webui.NoSandbox;

  return {
    alasPath,
    installerPath,
    pythonPath,
    installerArgs,
    webuiUrl,
    webuiPath,
    webuiArgs,
    dpiScaling,
    webuiTheme,
    noSandbox,
  };
})();

export default configInfo;
