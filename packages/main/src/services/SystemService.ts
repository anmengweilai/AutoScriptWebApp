import { isMacOS } from '@auto-script-web-app/common';
import { systemPreferences } from 'electron';
import { event, ServiceModule } from './index';

export default class SystemService extends ServiceModule {
  /**
   * 检查可用性
   */
  @event('/system/check-accessibility')
  checkAccessibilityForMacOS() {
    if (!isMacOS) return;
    return systemPreferences.isTrustedAccessibilityClient(true);
  }

  @event('/system/open-dev-tools')
  openDevTools(){
    const {browserWindow} =   this.app.browserManager.browsers.get('home') || {}
     if (browserWindow?.webContents.isDevToolsOpened()) {
        browserWindow?.webContents.closeDevTools();
      } else {
        browserWindow?.webContents.openDevTools();
      }

    return true;
  }

}
