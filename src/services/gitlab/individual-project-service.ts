import { config, interpolate } from "@/helpers";
import { BaseService } from "./base-service";
import type { GitlabProjectResponse } from "@/types";
import { Request } from "@/utils";

class IndividualProjectService extends BaseService {
  private apiUrl: string;
  private userId: number;

  constructor(userId: number) {
    super();

    const apiUrlConf = config<string>('api.gitlab.project.individual');
    this.apiUrl = interpolate(apiUrlConf, { user_id: userId });

    this.userId = userId;
  }

  async execute(): Promise<GitlabProjectResponse[]> {
    const request = new Request(this.apiUrl);
    request.setAuthToken(this.authToken);

    const response = await request.send<GitlabProjectResponse[]>();
    return response;
  }
}

export { IndividualProjectService }
