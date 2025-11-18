import { config } from "@/helpers";
import type { GitlabUserInfoResponse } from "@/types";
import { Request } from "@/utils";

class PersonalInfoService {
  private apiUrl: string;
  private authToken: string;

  constructor() {
    this.apiUrl = config<string>('api.gitlab.user.me');

    const authToken = Bun.env.GITLAB_PAT;
    if (!authToken || typeof authToken !== 'string') {
      throw new Error('GITLAB_PAT env not set!!!');
    }
    this.authToken = authToken;
  }

  async execute(): Promise<GitlabUserInfoResponse> {
    const request = new Request(this.apiUrl);
    request.setAuthToken(this.authToken);

    const response = await request.send<GitlabUserInfoResponse>();
    return response;
  }
}

export { PersonalInfoService };
