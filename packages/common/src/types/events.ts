/**
 * main -> renderer 的广播事件
 */
export interface MainEvents {
  initDatabase: 'loading' | 'failed' | 'success';
}

/**
 * renderer -> main 的请求事件
 */
export interface RendererEvents {
  /**
   * SystemService
   * 检查可用性
   */
  '/system/check-accessibility': boolean;

  /**
   * SystemService
   * 打开开发者工具
   */
  '/system/open-dev-tools': boolean;

  /**
   * SystemService
   * 启动脚本服务
   */
  '/system/start-script-server': boolean;

  /**
   * SystemService
   * 关闭脚本服务
   */
  '/system/stop-script-server': boolean;

  /**
   * SystemService
   * 修改脚本服务的配置
   */
  '/system/change-script-server-config': boolean;

}
