import type { ApiRequestOptions, ApiQueryParam } from '@/types';
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

      // Initialize url with request parameters
      const apiUrl = this.buildQueryParams(new URL(this.url));

      // Initialize request options
      const requestInit = this.buildRequestOptions();

      // Send request
      const response = await fetch(apiUrl, requestInit);

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

  public setQueryParams(queryParams: ApiQueryParam): void {
    if (!queryParams || typeof queryParams !== 'object') {
      return; // if not object, do nothing
    }

    const filteredParams = this.filterQueryParams(queryParams);

    if (Object.keys(filteredParams).length === 0) {
      return; // if no params, do nothing
    }

    // override the existing query params with the new ones
    this.opts = { ...this.opts, queryParams: filteredParams };
  }

  private filterQueryParams(queryParams: ApiQueryParam): ApiQueryParam {
    return Object.entries(queryParams).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {} as ApiQueryParam);
  }

  public setBody(body: Record<string, any>): void {
    if (!body || typeof body !== 'object') {
      throw new Error('Invalid body');
    }

    // Override the existing body with the new one
    this.opts = { ...this.opts, body };
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

  private buildQueryParams(apiUrl: URL): URL {
    if (!this.opts.queryParams) return apiUrl;

    for (const [key, value] of Object.entries(this.opts.queryParams)) {
      if (value === null || value === undefined) continue;
      apiUrl.searchParams.append(key, value.toString());
    }

    return apiUrl;
  }
}

export { ApiRequest };
