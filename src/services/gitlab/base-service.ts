class BaseService {
  protected authToken: string;

  constructor() {
    const authToken = Bun.env.GITLAB_PAT;
    if (!authToken || typeof authToken !== 'string') {
      throw new Error('GITLAB_PAT env not set!!!');
    }
    this.authToken = authToken;
  }
}

export { BaseService };
