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

}
