import type { GitlabProfileResponse } from '@/types';
import { BaseApiClient } from '../base';

class Profile extends BaseApiClient {
  constructor() {
    super('api.gitlab.user.me'); // api.gitlab.user.me in repository-api.yaml
  }

  async getProfile(): Promise<GitlabProfileResponse> {
    this.request.setUrl(this.apiUrl);
    const response = await this.request.send<GitlabProfileResponse>();
    return response;
  }
}

export { Profile };
