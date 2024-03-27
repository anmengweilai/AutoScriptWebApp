import {app} from 'electron';
import path, {join} from 'path';
import fs from 'fs';
import {isDev, SCRIPT_CONFIG_TEMPLATE_YAML} from '@web-app/common';
import * as yaml from 'yaml';

interface Options {
  deep?: number;
  offset?: number;
}

/**
 * 考虑优化:第一次启动时在启动的根目录下创建一个 .webapprc 文件缓存启动路径 方便于下次启动读取 快速启动
 * 需要考虑 判断是否存只安装一个webapp,存在冲突可能性
 * 获取脚本的根路径
 * @param rootFile
 * @param options
 */
export function getScriptRootPath(
  rootFile: string = `/config/${SCRIPT_CONFIG_TEMPLATE_YAML}`,
  options?: Options,
) {


  const {deep, offset = 0} = {
    ...options,
  };
  const appPath = app.getAppPath();
  const sep = path.sep;

  /**
   * 校验是否是开发环境 并且当前更目录存在配置的.webapprc文件 有的话读取并且以其配置为主
   */
  const rcPath = join(appPath, '../../.webapprc')
  const isHasRc = fs.existsSync(rcPath)
  if (isDev && isHasRc){
      const str = fs.readFileSync(rcPath, 'utf8');
      const configObj = yaml.parse(str) as {
        scriptAppPath: string;
      };
    return configObj.scriptAppPath;
  }


  const pathArr = appPath.split(sep);

  let index = deep || pathArr.length - offset;
  let currentPath = '';
  while (index-- > 0) {
    pathArr.pop();
    currentPath = pathArr.join(sep);
    if (fs.existsSync(join(currentPath, rootFile))) {
      break;
    }
  }

  return currentPath;
}
