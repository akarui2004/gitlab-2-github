export interface BaseRequestOpts {
  headers?: Record<string, string>;
  timeout?: number;
}

abstract class BaseRequest {
  DEFAULT_TIMEOUT = 10000; // 10 seconds for timeout

  public url: string = '';
  public method: string = 'GET';
  protected opts: BaseRequestOpts = {};

  constructor(url: string, method: string = 'GET', opts: BaseRequestOpts = {}) {
    this.url = url;
    this.method = method;
    this.opts = opts;
  }

  abstract send(): Promise<any>;
}

export default BaseRequest;