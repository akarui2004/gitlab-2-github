import BaseRequest, { type BaseRequestOpts } from './base_request';

class GetHttp extends BaseRequest {
  constructor(url: string, opts: BaseRequestOpts = {}) {
    super(url, 'GET', opts);
  }

  async send(): Promise<any> {
    let timeouts = this.opts.timeout ?? this.DEFAULT_TIMEOUT;

    try {
      const response = await fetch(this.url, {
        headers: this.opts.headers,
        signal: AbortSignal.timeout(timeouts)
      });
      return await response.json();
    } catch (error: any) {
      throw new Error(`GET request failed: ${error?.message}`)
    }
  }
}

export default GetHttp;