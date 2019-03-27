import reach from 'is-reachable';
import {
  Config,
  defaultConfig,
  MAX_RETRY,
  MAX_PING_INTERVAL,
  DEFAULT_PING_INTERVAL,
  CallbackFn,
} from './config';

const SERVER_TIMEOUT = 15 * 1000;
const RETRY_PING_TIME = 2.5 * 1000;

const getConfig = (config: Config) => Object.assign(defaultConfig, config);

const delay = (timeout: number, cb: CallbackFn) => {
  setTimeout(() => {
    cb();
  }, timeout);
};

const ping = (url: string, config: Config) => {
  const { maxRetry, onFailure, onSuccess } = getConfig(config);
  let retry = maxRetry;
  reach(url, { timeout: SERVER_TIMEOUT }).then((reachable: boolean) => {
    if (!reachable) {
      if (retry > 0) {
        delay(RETRY_PING_TIME, () => {
          ping(url, { maxRetry: retry -= 1 });
        });
      } else onFailure();
    } else onSuccess();
  });
};

const pingmydyno = (url: string, config: Config) => {
  const configObj = { ...getConfig(config) };

  if (configObj.maxRetry > MAX_RETRY) configObj.maxRetry = MAX_RETRY;
  if (configObj.pingInterval > MAX_PING_INTERVAL) {
    configObj.pingInterval = DEFAULT_PING_INTERVAL;
  }

  setInterval(() => ping(url, configObj), configObj.pingInterval);
};

export default pingmydyno;
