import { interpolate } from '@/helpers';
import type { GitlabProjectResponse } from '@/types';
import { BaseApiClient } from '../base';

class User extends BaseApiClient {
  constructor() {
    super();
  }

  async getProjects(userId: number): Promise<GitlabProjectResponse[]> {
    this.apiRequest.setUrl(this.projectApi(userId));
    const result = await this.apiRequest.send<GitlabProjectResponse[]>();
    return result;
  }

  private projectApi(userId: number) {
    const apiUrl = this.buildApiUrl('api.gitlab.user.project.list');
    return interpolate(apiUrl, { userId });
  }
}

export { User };
