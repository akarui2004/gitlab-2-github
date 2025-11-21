import { config, interpolate } from '@/helpers';
import type { ApiPathReplacements, ApiUrlConfigPath } from '@/types';
import { Request } from '@/utils';

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
    if (typeof authToken !== 'string') {
      throw new Error(`${this.authTokenEnvKey} env not set!!!`);
    }
    return authToken;
  }

  private validateApiUrl(
    apiUrlConfigPath: ApiUrlConfigPath,
    apiPathReplacements: ApiPathReplacements = {}
  ): string {
    if (typeof apiUrlConfigPath !== 'string') {
      throw new Error('API config key is required!!!');
    }

    const apiUrl = config<string>(apiUrlConfigPath);
    if (!apiUrl || typeof apiUrl !== 'string') {
      throw new Error(
        `API URL not found or invalid for config key: ${apiUrlConfigPath}!!!`
      );
    }

    const hasPathReplacement = Object.keys(apiPathReplacements).length > 0;
    return hasPathReplacement
      ? interpolate(apiUrl, apiPathReplacements)
      : apiUrl;
  }

  private buildRequest(): Request {
    const request = new Request();
    request.setAuthToken(this.authToken);
    return request;
  }
}

export { BaseApiClient };
