import type { Logger as _Logger } from 'log4js';

declare namespace Main {

  type Logger = _Logger;

  /**
   * 日志范围
   */
  type LogScope = 'database' | 'app' | 'renderer' | 'main' | 'error';
  type LogLevel = 'info' | 'error' | 'trace' | 'warn' | 'debug';

  type GetLogger = (scope?: LogScope) => Logger;

  type LogWithScope = (newScope: Main.LogScope, ...args: any[]) => void;
}
