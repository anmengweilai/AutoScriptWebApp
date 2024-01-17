import { platform,is } from '@electron-toolkit/utils';

/**
 * 判断是否是 mac 平台
 */
export const isMacOS = platform.isMacOS;

/**
 * 判断是否是 windows
 */
export const isWindows = platform.isWindows;


export const isDev = is.dev

export const isTest = process.env.NODE_ENV === 'test';
