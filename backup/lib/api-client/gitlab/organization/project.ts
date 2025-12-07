import type { GitlabProjectResponse } from '@/types';
import { BaseApiClient } from '../../base';

class Project extends BaseApiClient {
  constructor() {
    super();
  }

  async getProjects(): Promise<GitlabProjectResponse[]> {
    this.apiRequest.setUrl(this.orgProjectApi());
    const result = await this.apiRequest.send<GitlabProjectResponse[]>();
    return result;
  }

  private orgProjectApi(): string {
    return this.buildApiUrl('api.gitlab.organization.project.list');
  }
}

export { Project };
