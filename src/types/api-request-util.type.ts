interface ApiRequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  body?: any;
  params?: Record<string, string>;
}

export type { ApiRequestOptions };
