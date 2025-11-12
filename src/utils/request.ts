import type { RequestOptions } from '@/types';
import { RequestMethod } from '@/enums';
import { RequestError } from "@/errors";

class Request {
  private readonly DEFAULT_TIMEOUT: number = 10000;
  private readonly DEFAULT_HEADERS: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  private readonly NO_BODY_METHODS: RequestMethod[] = [
    RequestMethod.GET,
    RequestMethod.DELETE,
  ];

  private authToken: string = '';
  public url: string = '';
  protected method: RequestMethod = RequestMethod.GET;
  protected opts: RequestOptions = {};

  constructor(url: string, method: RequestMethod = RequestMethod.GET, opts: RequestOptions = {}) {
    this.url = url;
    this.method = method;
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
          errorBody,
        );
      }

      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        return response.json() as Promise<T>;
      }
      return response.text() as T;
    } catch (error: any) {
      throw new Error(`Error sending request: ${error?.message || 'Unknown error'}`);
    }
  }

  public setAuthToken(token: string): void {
    if (!token || typeof token !== 'string') throw new Error('Invalid auth token');

    this.authToken = token;
  }

  private validateUrl() {
    if (!this.url || typeof this.url !== 'string') throw new Error('Invalid URL')
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
    if (
      this.NO_BODY_METHODS.includes(this.method) ||
      !this.opts.body
    ) {
      return undefined;
    }

    return JSON.stringify(this.opts.body);
  }

  private buildAbortSignal(): AbortSignal {
    return AbortSignal.timeout(this.opts.timeout || this.DEFAULT_TIMEOUT);
  }
}

export { Request };
