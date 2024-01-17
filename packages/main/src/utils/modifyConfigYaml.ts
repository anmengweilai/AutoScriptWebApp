import {join, normalize} from 'path';
import {modifyYaml} from './modifyYaml';
import {SCRIPT_CONFIG_YAML} from '@web-app/common';

export function modifyConfigYaml(path: string, keyObj: {[k in string]: never}) {
  const configYamlPath = join(normalize(path) + `./config/${SCRIPT_CONFIG_YAML}`);
  return modifyYaml(configYamlPath, keyObj);
}
