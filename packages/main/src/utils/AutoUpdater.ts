import { autoUpdater } from 'electron-updater';

/**
 * 还未实现考虑参考？
 * TODO：https://juejin.cn/post/7054811432714108936
 */
export class AppUpdater {
  constructor() {
    autoUpdater.checkForUpdatesAndNotify();
  }
}
