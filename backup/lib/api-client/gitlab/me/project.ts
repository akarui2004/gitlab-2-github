import type { GitlabProjectResponse, ProjectQueryParams } from '@/types';
import { BaseApiClient } from '../../base';

class Project extends BaseApiClient {
  constructor() {
    super();
  }

  async getProjects(
    userId: number,
    params: ProjectQueryParams = {}
  ): Promise<GitlabProjectResponse[]> {
    this.apiRequest.setUrl(this.projectApi(userId));
    this.apiRequest.setQueryParams(params); // set query params when params existing
    const result = await this.apiRequest.send<GitlabProjectResponse[]>();
    return result;
  }

  private projectApi(userId: number) {
    return this.buildApiUrl('api.gitlab.user.project.list', { userId });
  }
}

export { Project };
