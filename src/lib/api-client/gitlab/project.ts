import { interpolate } from "@/helpers";
import { BaseApiClient } from "../base";
import type { GitlabProjectResponse } from "@/types";

class Project extends BaseApiClient {
  constructor(userId: number) {
    super('api.gitlab.project.individual'); // api.gitlab.project.individual in repository-api.yaml
    this.apiUrl = interpolate(this.apiUrl, { user_id: userId }); // replace user_id placeholder with userId
  }

  async getProjects(): Promise<GitlabProjectResponse[]> {
    this.request.setUrl(this.apiUrl);
    const response = await this.request.send<GitlabProjectResponse[]>();
    return response;
  }
}

export { Project };
