import { config, interpolate } from '@/helpers';
import type { ApiPathReplacements, ApiUrlConfigPath } from '@/types';
import { ApiRequest } from '@/utils';

class BaseApiClient {
  private readonly DEFAULT_AUTH_TOKEN_ENV_KEY: string = 'GITLAB_PAT';

  protected authToken: string;
  private authTokenEnvKey: string;
  protected apiRequest: ApiRequest;

  constructor(authTokenEnvKey?: string) {
    this.authTokenEnvKey = authTokenEnvKey ?? this.DEFAULT_AUTH_TOKEN_ENV_KEY;
    this.authToken = this.validateAuthToken();
    this.apiRequest = this.buildRequest();
  }

  /**
   * Builds the API URL that is used to make requests.
   * Throws an error if the API config key is not set.
   * Throws an error if the API URL is not found or invalid.
   *
   * @param apiUrlConfigPath API config key
   * @param apiPathReplacements path replacements
   * @returns string API URL
   */
  protected buildApiUrl(
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

  /**
   * Validates the authentication token.
   * Throws an error if the authentication token is not set.
   *
   * @returns string auth token
   */
  private validateAuthToken(): string {
    const authToken = Bun.env[this.authTokenEnvKey];
    if (typeof authToken !== 'string') {
      throw new Error(`${this.authTokenEnvKey} env not set!!!`);
    }
    return authToken;
  }

  /**
   * Builds the request object with authentication token.
   * Throws an error if the request object is not set.
   *
   * @returns ApiRequest object
   */
  private buildRequest(): ApiRequest {
    const request = new ApiRequest();
    request.setAuthToken(this.authToken);
    return request;
  }
}

export { BaseApiClient };
