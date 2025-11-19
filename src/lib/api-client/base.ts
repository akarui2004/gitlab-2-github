import { config } from "@/helpers";
import { Request } from "@/utils";

class BaseApiClient {
  private readonly DEFAULT_AUTH_TOKEN_ENV_KEY: string = 'GITLAB_PAT';

  protected authToken: string;
  protected apiUrl: string;
  private authTokenEnvKey: string;
  protected request: Request;

  constructor(apiConfigKey: string, authTokenEnvKey?: string) {
    this.authTokenEnvKey = authTokenEnvKey ?? this.DEFAULT_AUTH_TOKEN_ENV_KEY;
    this.authToken = this.validateAuthToken();
    this.apiUrl = this.validateApiUrl(apiConfigKey);
    this.request = this.buildRequest();
  }

  private validateAuthToken(): string {
    const authToken = Bun.env[this.authTokenEnvKey];
    if (!authToken || typeof authToken !== 'string') {
      throw new Error(`${this.authTokenEnvKey} env not set!!!`);
    }
    return authToken;
  }

  private validateApiUrl(apiConfigKey: string | null | undefined): string {
    if (!apiConfigKey || typeof apiConfigKey !== 'string') {
      throw new Error('API config key is required!!!');
    }

    const apiUrl = config<string>(apiConfigKey);
    if (!apiUrl || typeof apiUrl !== 'string') {
      throw new Error(`API URL not found or invalid for config key: ${apiConfigKey}!!!`);
    }

    return apiUrl;
  }

  private buildRequest(): Request {
    const request = new Request();
    request.setAuthToken(this.authToken);
    return request;
  }
}

export { BaseApiClient };
