import { config, interpolate } from "@/helpers";
import { BaseService } from "./base-service";
import type { GitlabProjectResponse } from "@/types";
import { Request } from "@/utils";

class IndividualProjectService extends BaseService {
  private apiUrl: string;

  constructor(userId: number) {
    super();

    if (typeof userId !== 'number') {
      throw new Error('User ID must be a number');
    }

    const apiUrlConf = config<string>('api.gitlab.project.individual');
    this.apiUrl = interpolate(apiUrlConf, { user_id: userId });
  }

  async execute(): Promise<GitlabProjectResponse[]> {
    const request = new Request(this.apiUrl);
    request.setAuthToken(this.authToken);

    const response = await request.send<GitlabProjectResponse[]>();
    return response;
  }
}

export { IndividualProjectService }
