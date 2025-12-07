import { BaseApiClient } from '../../base';

class Issue extends BaseApiClient {
  private projectId: number;

  constructor(projectId: number) {
    super();
    this.projectId = projectId;
  }

  public async getIssues() {
    this.apiRequest.setUrl(this.baseIssueApiPath());
    const response = await this.apiRequest.send<any[]>();
    return response;
  }

  private baseIssueApiPath(): string {
    return this.buildApiUrl('api.gitlab.project.issue.list', {
      projectId: this.projectId,
    });
  }

  private issuesApiPath(issueId: number) {
    return this.buildApiUrl('api.gitlab.project.issue.detail', {
      projectId: this.projectId,
      issueId,
    });
  }
}

export { Issue };
