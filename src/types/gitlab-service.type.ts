export interface GitlabUserInfoIdentities {
  provider: string;
  extern_uid: string;
  saml_provider_id: number | null | undefined;
}

export interface GitlabUserInfoResponse {
  id: number;
  username: string;
  public_email: string;
  name: string;
  state: string;
  locked: boolean;
  avatar_url: string;
  web_url: string;
  created_at: string;
  bio: string;
  location: string;
  website_url: string;
  github: string;
  job_title: string;
  can_create_group: boolean;
  can_create_project: boolean;
  two_factor_enabled: boolean;
  preferred_language: string;
  identities: GitlabUserInfoIdentities[];
  organization: string;
  email: string;
  commit_email: string;
}
