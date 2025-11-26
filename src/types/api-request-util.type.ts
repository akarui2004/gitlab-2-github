interface ApiRequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  body?: any;
  queryParams?: ApiQueryParam;
}

export interface ApiQueryParam {
  [key: string]: string | number | boolean | undefined;
}

export type { ApiRequestOptions };
