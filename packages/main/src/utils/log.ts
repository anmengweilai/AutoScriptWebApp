/**
 * 创建日志代理方法
 * @param logLevel 日志级别
 * @param mainLogger 日志对象
 * @returns function 返回一个代理方法
 */
export const createLogProxy =
  (logLevel: string, mainLogger: any) =>
  (
    // eslint-disable-next-line @typescript-eslint/ban-types
    fn: Function,
  ) =>
  (...args: any) => {
    fn(...args);
    mainLogger[logLevel](...args);
  };
