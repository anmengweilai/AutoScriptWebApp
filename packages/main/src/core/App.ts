import type {TServiceModule} from '@/services';
import {createLogProxy, createProtocol, getScriptConfig} from '@/utils';
import {app, ipcMain} from 'electron';
import {isDev, isWindows, ScriptConfig} from "@web-app/common";
import {EventEmitter} from 'events';

import BrowserManager from './BrowserManager';
import Logger from './Logger';
import {ServiceStorage} from './ServiceStorage';

import * as browserItems from '../browserItems';
import {PyShell} from "@/utils/pyshell";

const importAll = (r: any) => Object.values(r).map((v: any) => v.default);

export type ServiceMap = Map<string, any>;

export class App extends EventEmitter {
  browserManager: BrowserManager;

  /**
   * app 包含的服务能力
   */
  services: any = new WeakMap();

  /**
   * 日志服务
   */
  logger: Logger;

  /**
   * 承接 webview fetch 的事件表
   */
  serviceEventMap: ServiceMap = new Map();

  /**
   * app 启动的统一配置信息
   */
  config: Record<any, any> & Partial<ScriptConfig> = {};

  scriptManager: Map<string, PyShell> = new Map();


  constructor() {
    super();

    // 载入 services
    const services: TServiceModule[] = importAll(
      import.meta.glob('../services/*Service.ts',{eager:true}),
    );

    services.forEach((service) => this.addService(service));

    // 批量注册 service 中 event 事件 供 webview 消费
    this.serviceEventMap.forEach((serviceInfo, key) => {
      // 获取相应方法
      const {service, methodName} = serviceInfo;

      ipcMain.handle(key, async (e, ...data) => {
        // 输出日志
        this.logger.module('Fetch', key);
        if (data) this.logger.data(...data);

        try {
          return await service[methodName](...data);
        } catch (error) {
          this.logger.error(error);

          // @ts-ignore
          return {error: error.message};
        }
      });
    });

    // 启动窗口管理器
    this.browserManager = new BrowserManager(this);

    // 日志系统
    this.logger = new Logger();
  }

  onActivate = () => {
    this.browserManager.browsers.get('index')!.show();
  };

  beforeQuit = () => {
  };

  /**
   * 启动 app
   */
  bootstrap = async () => {
    // protocol.registerSchemesAsPrivileged([
    //   { scheme: 'app', privileges: { secure: true, standard: true } },
    // ]);
    await this.beforeInit();

    // 控制单例
    const isSingle = app.requestSingleInstanceLock();
    if (!isSingle) {
      app.exit(0);
    }

    app.whenReady().then(() => {
      // 注册 app 协议
      createProtocol('app');

      this.logger.logSystemInfo();

      // 载入 browsers
      this.initBrowsers();

      this.logger.info('app 初始化完毕!');
      this.logger.divider('🎉');
    });

    app.on('window-all-closed', () => {
      if (isWindows) {
        app.quit();
      }
    });

    app.on('activate', this.onActivate);
    //
    app.on('before-quit', () => {
      this.beforeQuit();
      app.exit();
    });


  };

  /**
   * 添加窗口

   */
  initBrowsers() {
    Object.values(browserItems).forEach((item) => {
      this.browserManager.retrieveOrInitialize(item);
    });
  }

  /**
   * 初始化 脚本服务
   * @param service
   */
  initScriptService = (service: PyShell) => {
    this.scriptManager.set(service.scriptPath, service);
  };

  /**
   * 添加 service
   * @param ServiceClass
   */
  addService(ServiceClass: TServiceModule) {
    const service = new ServiceClass(this);
    this.services.set(ServiceClass, service);

    ServiceStorage.services.get(ServiceClass)?.forEach((event) => {
      // 将 event 装饰器中的对象全部存到 ServiceEventMap 中
      this.serviceEventMap.set(event.name, {
        service,
        methodName: event.methodName,
      });
    });
  }

  /**
   * 初始化之前的操作
   */
  async beforeInit() {
    // 替换报错 logger
    if (!isDev) {
      console.error = createLogProxy(
        'error',
        Logger.getLogger('error'),
      )(console.error);
    }

    // 初始化数据库部分
    // await loadContainerAsync();
    await this.loadAppConfig();
  }

  async loadAppConfig() {
    const {logger} = this;
    /**
     * 1. 读取配置文件
     */
    logger.info('开始加载基础的配置信息');

    /**
     * 2. 将配置信息存储到 config 中
     */

    this.config =await getScriptConfig();


    logger.info('基础的配置信息加载完毕');


  }

  destroy = () => {
    this.beforeQuit();
    app.quit();
  };

}
