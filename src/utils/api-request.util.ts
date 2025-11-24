import type { ApiRequestOptions } from '@/types';
import { RequestMethod } from '@/enums';
import { RequestError } from '@/errors';

class ApiRequest {
  private readonly DEFAULT_TIMEOUT: number = 10000;
  private readonly DEFAULT_HEADERS: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': Bun.env.GITHUB_API_VERSION || '',
  };
  private readonly NO_BODY_METHODS: RequestMethod[] = [
    RequestMethod.GET,
    RequestMethod.DELETE,
  ];

  private authToken: string = '';
  public url: string = '';
  protected method: RequestMethod = RequestMethod.GET;
  protected opts: ApiRequestOptions = {};

  constructor(opts: ApiRequestOptions = {}) {
    this.opts = opts;
  }

  public async send<T = any>(): Promise<T> {
    try {
      this.validateUrl();

      const requestInit = this.buildRequestOptions();
      const response = await fetch(this.url, requestInit);

      if (!response.ok) {
        const errorBody = await response.text().catch(() => 'Unknown error');
        throw new RequestError(
          `Request failed with status ${response.status}`,
          response.status,
          errorBody
        );
      }

      let result;
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        result = await response.json();
        return result as T;
      }

      result = await response.text();
      return result as T;
    } catch (error: any) {
      throw new Error(
        `Error sending request: ${error?.message || 'Unknown error'}`
      );
    }
  }

  public useMethod(method: RequestMethod): void {
    this.method = method;
  }

  public setUrl(url: string): void {
    if (!url || typeof url !== 'string') throw new Error('URL is required!!!');
    this.url = url;
  }

  public setAuthToken(token: string): void {
    if (!token || typeof token !== 'string') {
      throw new Error('Invalid auth token');
    }

    this.authToken = token;
  }

  private validateUrl() {
    if (!this.url || typeof this.url !== 'string') {
      throw new Error('Invalid URL');
    }
  }

  private buildRequestOptions(): RequestInit {
    return {
      method: this.method,
      body: this.buildRequestBody(),
      headers: this.buildHeaders(),
      signal: this.buildAbortSignal(),
    };
  }

  private buildHeaders(): Record<string, string> {
    const baseHeaders: Record<string, string> = {
      ...this.DEFAULT_HEADERS,
      ...this.opts.headers,
    };

    if (this.authToken) {
      baseHeaders['Authorization'] = `Bearer ${this.authToken}`;
    }

    return baseHeaders;
  }

  private buildRequestBody(): string | undefined {
    if (this.NO_BODY_METHODS.includes(this.method) || !this.opts.body) {
      return undefined;
    }

    return JSON.stringify(this.opts.body);
  }

  private buildAbortSignal(): AbortSignal {
    return AbortSignal.timeout(this.opts.timeout || this.DEFAULT_TIMEOUT);
  }
}

export { ApiRequest };
