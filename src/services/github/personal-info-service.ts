import { config } from "@/helpers";

class PersonalInfoService {
  private apiUrl: string = config<string>('api.github.user.me');

  __construct() {}

  async execute() {
    // Get the user's personal info
    console.log(this.apiUrl);
  }
}

export { PersonalInfoService };
