import type {MainEvents} from '@auto-script-web-app/common';
import {BrowserWindowsIdentifier, isDev} from '@auto-script-web-app/common';
import type {BrowserWindowConstructorOptions} from 'electron';
import {app, BrowserWindow, nativeImage, protocol, Tray} from 'electron';
import {dev} from 'electron-is';
import EventEmitter from 'events';

import type {App} from './App';
import {join} from "node:path";
import {logger} from "@/core/Logger/customLogger";

protocol.registerSchemesAsPrivileged([
  {scheme: 'app', privileges: {secure: true, standard: true}},
]);

export interface BrowserWindowOpts extends BrowserWindowConstructorOptions {
  /**
   * URL
   */
  identifier: BrowserWindowsIdentifier;
  title?: string;
  width?: number;
  height?: number;
  devTools?: boolean;
}

export default class Browser extends EventEmitter {
  /**
   * 外部的 app
   * @private
   */
  private app: App;
  /**
   * 内部的 electron 窗口
   * @private
   */
  private _browserWindow?: BrowserWindow;

  /**
   * 托盘
   */
  private _tray?: Tray;

  /**
   * 标识符
   */
  identifier: string;

  /**
   * 生成时的选项
   */
  options: BrowserWindowOpts;

  /**
   * 对外暴露的获取窗口的方法
   */
  get browserWindow() {
    return this.retrieveOrInitialize();
  }

  /**
   * 构建 BrowserWindows 对象的方法
   * @param options
   * @param application
   */
  constructor(options: BrowserWindowOpts, application: App) {
    super();
    this.app = application;
    this.identifier = options.identifier;
    this.options = options;

    // 初始化
    this.retrieveOrInitialize();

    // 当关闭时将窗口实例销毁
    this.browserWindow.on('closed', () => {
      this.destroy();
    });
  }

  loadTray = () => {
    const icon = nativeImage.createFromPath(join(__dirname, './icon.png'));
    const tray = new Tray(icon);
    this._tray = tray;
  }

  /**
   * 加载菜单
   */
  loadMenu = () => {
    // Hide menu
    const {Menu} = require('electron');
    Menu.setApplicationMenu(null);

    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Show',
        click: function () {

        },
      },
      {
        label: 'Hide',
        click: function () {

        },
      },
      {
        label: 'Exit',
        click: function () {
          app.quit();
          process.exit(0);
        },
      },
    ]);
    this._tray?.setContextMenu(contextMenu);
    this._tray?.setToolTip('Alas');
    this._tray?.on('right-click', () => {
      this._tray?.popUpContextMenu(contextMenu);
    });

  }


  /**
   * 加载地址路径
   * @param name 在 renderer 中的路径名称
   */
  loadUrl = (name: BrowserWindowsIdentifier) => {
    if (isDev) {
      this.browserWindow.loadURL(`http://localhost:7777/${name}.html`).catch(e=>{
        /**
         * TODO: 有时候会出现加载不出来的情况，暂时先这样处理 由于electron启动的比renderer快，所以会出现这种情况
         */
        logger.errorWithScope('main',`loadUrl:${e}`)
        setTimeout(()=>{
          this.loadUrl(name)
        },1000)

      })
    } else {
      this.browserWindow.loadURL(`app://./${name}.html`);
    }
  };

  /**
   * 加载 Dev 工具
   */
  loadDevTools = () => {
    // 生产环境直接结束
    if (!(dev() || process.env.DEBUG === '1')) return;

    app.whenReady().then(() => {
      const {
        default: installExtension,
        // React Dev tools 暂时没法修复 (Electron 版本 >= 9.0)
        // https://github.com/electron/electron/issues/23662
        // REACT_DEVELOPER_TOOLS,
        REDUX_DEVTOOLS,
        // eslint-disable-next-line global-require
      } = require('electron-devtools-installer');

      const extensions = [
        // REACT_DEVELOPER_TOOLS,
        REDUX_DEVTOOLS,
      ];

      try {
        installExtension(extensions).then((name: string) => {
          this.app.logger.trace(`Added Extension:  ${name}`);
        });
      } catch (e) {
        this.app.logger.error('An error occurred: ', e);
      }
    });
  };

  show() {
    this.browserWindow.show();
  }

  hide() {
    this.browserWindow.hide();
  }

  /**
   * 销毁实例
   */
  destroy() {
    this._browserWindow = undefined;
  }

  /**
   * 初始化
   */
  retrieveOrInitialize() {
    // 当有这个窗口 且这个窗口没有被注销时
    if (this._browserWindow && !this._browserWindow.isDestroyed()) {
      return this._browserWindow;
    }

    const {identifier, title, width, height, devTools, ...res} = this.options;

    this._browserWindow = new BrowserWindow({
      ...res,
      width,
      height,
      title,
      // 隐藏默认的框架栏 包括页面名称以及关闭按钮等
      frame: false,
      webPreferences: {
        nodeIntegration: true,

        // 上下文隔离环境
        // https://www.electronjs.org/docs/tutorial/context-isolation
        contextIsolation: true,
        // devTools: isDev,
        preload: join(app.getAppPath(), '../preload/dist/index.js'),
      },
    });

    this._browserWindow.setMinimumSize(576, 396);

    this.loadTray();
    this.loadMenu();
    this.loadUrl(identifier);
    this.loadDevTools();



    // 显示 devtools 就打开
    if (devTools) {
      this._browserWindow.webContents.openDevTools();
    }
    return this._browserWindow;
  }

  /**
   * 向 webview 派发事件
   * @param eventName
   * @param data
   */
  dispatchEvent<T extends keyof MainEvents>(
    eventName: T,
    data?: MainEvents[T],
  ) {
    let tempName = Math.random().toString(36).slice(-8);

    tempName = `a_${tempName}`;

    this.browserWindow.webContents.executeJavaScript(`
        const ${tempName} = new Event('electron:${eventName}');
        ${tempName}.data = ${JSON.stringify(data)};
        window.dispatchEvent(${tempName});
     `);
  }
}
