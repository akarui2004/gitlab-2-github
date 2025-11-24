import { BaseApiClient } from '../../base';

class Issue extends BaseApiClient {
  private projectId: number;

  constructor(projectId: number) {
    super();
    this.projectId = projectId;
  }
}

export { Issue };
