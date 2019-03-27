export interface CallbackFn {
  (): any;
}

export interface Config {
  pingInterval?: number;
  maxRetry?: number;
  onSuccess?: CallbackFn;
  onFailure?: CallbackFn;
}

export const DEFAULT_PING_INTERVAL = 60 * 20 * 1000; // 20mins
export const MAX_PING_INTERVAL = 60 * 30 * 1000;
export const MAX_RETRY = 2;

export const defaultConfig: Config = {
  pingInterval: DEFAULT_PING_INTERVAL,
  maxRetry: MAX_RETRY,
  onSuccess: () => null,
  onFailure: () => null,
};
