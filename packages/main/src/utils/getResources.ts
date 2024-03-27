import {app} from 'electron';
import {join} from 'path';
import {isDev} from "@web-app/common";

export function getResources(file: string ='icon.png') {
  return isDev
    ? join(app.getAppPath(), `./resources/${file}`)
    : join(app.getAppPath(), `./${file}`);
}
