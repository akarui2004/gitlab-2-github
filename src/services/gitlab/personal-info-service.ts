import { config } from "@/helpers";
import type { GitlabUserInfoResponse } from "@/types";
import { Request } from "@/utils";
import { BaseService } from "./base-service";

class PersonalInfoService extends BaseService {
  private apiUrl: string;

  constructor() {
    super();
    this.apiUrl = config<string>('api.gitlab.user.me');
  }

  async execute(): Promise<GitlabUserInfoResponse> {
    const request = new Request(this.apiUrl);
    request.setAuthToken(this.authToken);

    const response = await request.send<GitlabUserInfoResponse>();
    return response;
  }
}

export { PersonalInfoService };
