import type { GitlabProjectResponse } from '@/types';
import { BaseApiClient } from '../base';

class OrganizationProject extends BaseApiClient {
  constructor() {
    super('api.gitlab.project.organization'); // api.gitlab.project.organization in repository-api.yaml
  }

  async getOrganizationProjects(): Promise<GitlabProjectResponse[]> {
    this.request.setUrl(this.apiUrl);
    const response = await this.request.send<GitlabProjectResponse[]>();
    return response;
  }
}

export { OrganizationProject };