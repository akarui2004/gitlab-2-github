import type { RequestOptions } from '@/types';
import { RequestMethod } from '@/enums';

abstract class BaseRequest {
  protected readonly DEFAULT_TIMEOUT: number = 10000;
  protected readonly DEFAULT_HEADERS: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  protected readonly NO_BODY_METHODS: string[] = [RequestMethod.GET, RequestMethod.DELETE];

  protected authToken: string = '';

  public setAuthToken(token: string): void {
    this.authToken = token;
  }

  abstract send(): Promise<any>;
}

class Request extends BaseRequest {
  public url: string = '';
  protected method: string = 'GET';
  protected opts: RequestOptions = {};

  constructor(url: string, method: string = 'GET', opts: RequestOptions = {}) {
    super();
    this.url = url;
    this.method = method;
    this.opts = opts;
  }

  public async send(): Promise<any> {
    try {
      const requestInit = this.buildRequestOptions();
      const response = await fetch(this.url, requestInit);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return response.json();
    } catch (error: any) {
      console.error('Error sending request: ', error?.message)
    }
  }

  private buildRequestOptions(): RequestInit {
    return {
      method: this.method,
      body: this.buildRequestBody(),
      headers: this.buildHeaders(),
      signal: this.buildAbortSignal(),
    }
  }

  private buildHeaders(): Record<string, string> {
    let baseHeaders: Record<string, string> = {
      ...this.DEFAULT_HEADERS,
      ...this.opts.headers,
    }

    if (this.authToken) {
      baseHeaders['Authorization'] = `Bearer ${this.authToken}`;
    }

    return baseHeaders;
  }

  private buildRequestBody(): string | undefined {
    if (['GET', 'DELETE'].includes(this.method.toUpperCase()) || !this.opts.body) {
      return undefined;
    }

    return JSON.stringify(this.opts.body);
  }

  private buildAbortSignal(): AbortSignal {
    return AbortSignal.timeout(this.opts.timeout || this.DEFAULT_TIMEOUT);
  }
}

export { Request };