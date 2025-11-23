import type { GitlabProfileResponse } from '@/types';
import { BaseApiClient } from '../base';

class Profile extends BaseApiClient {
  constructor() {
    super();
  }

  async getProfile(): Promise<GitlabProfileResponse> {
    this.apiRequest.setUrl(this.userProfileApi());
    const result = await this.apiRequest.send<GitlabProfileResponse>();
    return result;
  }

  private userProfileApi(): string {
    return this.buildApiUrl('api.gitlab.user.profile'); // api.gitlab.user.me in repository-api.yaml
  }
}

export { Profile };
