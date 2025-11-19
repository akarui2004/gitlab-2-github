export interface GitlabUserIdentities {
  provider: string;
  extern_uid: string;
  saml_provider_id: number | null | undefined;
}

export interface GitlabProfileResponse {
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
  identities: GitlabUserIdentities[];
  organization: string;
  email: string;
  commit_email: string;
}

export interface GitlabProjectNamespace {
  id: number;
  name: string;
  path: string;
  kind: string;
  full_path: string;
}

export interface GitlabProjectStatistics {
  commit_count: number;
  storage_size: number;
  repository_size: number;
  wiki_size: number;
  lfs_objects_size: number;
  job_artifacts_size: number;
  pipeline_artifacts_size: number;
  packages_size: number;
  snippets_size: number;
  uploads_size: number;
  container_registry_size: number;
}

export interface GitlabProjectLinks {
  self: string;
  issues: string;
  merge_requests: string;
  repo_branches: string;
  labels: string;
  events: string;
  members: string;
  cluster_agents: string;
}

export interface GitlabProjectOwner {
  id: number;
  name: string;
  created_at: string;
}

export interface GitlabSharedWithGroups {
  group_id: number;
  group_name: string;
  group_full_path: string;
  group_access_level: number;
}

export interface GitlabProjectResponse {
  id: number;
  description: string;
  description_html: string;
  default_branch: string;
  visibility: string;
  ssh_url_to_repo: string;
  http_url_to_repo: string;
  web_url: string;
  readme_url: string;
  tag_list: string[];
  topics: string[];
  owner: GitlabProjectOwner;
  name: string;
  name_with_namespace: string;
  path: string;
  path_with_namespace: string;
  issues_enabled: boolean;
  open_issues_count: number;
  merge_requests_enabled: boolean;
  jobs_enabled: boolean;
  wiki_enabled: boolean;
  snippets_enabled: boolean;
  can_create_merge_request_in: boolean;
  resolve_outdated_diff_discussions: boolean;
  container_registry_enabled?: boolean;
  container_registry_access_level: string;
  security_and_compliance_access_level: string;
  created_at: string;
  updated_at: string;
  last_activity_at: string;
  creator_id: number;
  import_url: string | null;
  import_type: string | null;
  import_status: string;
  import_error: string | null;
  namespace: GitlabProjectNamespace;
  archived: boolean;
  avatar_url: string;
  shared_runners_enabled: boolean;
  group_runners_enabled: boolean;
  forks_count: number;
  star_count: number;
  runners_token: string;
  ci_default_git_depth: number;
  ci_forward_deployment_enabled: boolean;
  ci_forward_deployment_rollback_allowed: boolean;
  ci_allow_fork_pipelines_to_run_in_parent_project: boolean;
  ci_id_token_sub_claim_components: string[];
  ci_separated_caches: boolean;
  ci_restrict_pipeline_cancellation_role: string;
  ci_pipeline_variables_minimum_override_role: string;
  ci_push_repository_for_job_token_allowed: boolean;
  public_jobs: boolean;
  shared_with_groups: GitlabSharedWithGroups[];
  only_allow_merge_if_pipeline_succeeds: boolean;
  allow_merge_on_skipped_pipeline: boolean;
  allow_pipeline_trigger_approve_deployment: boolean;
  restrict_user_defined_variables: boolean;
  only_allow_merge_if_all_discussions_are_resolved: boolean;
  remove_source_branch_after_merge: boolean;
  request_access_enabled: boolean;
  merge_method: string;
  squash_option: string;
  autoclose_referenced_issues: boolean;
  enforce_auth_checks_on_uploads: boolean;
  suggestion_commit_message: string | null;
  merge_commit_template: string | null;
  squash_commit_template: string | null;
  secret_push_protection_enabled: boolean;
  issue_branch_template: string;
  marked_for_deletion_at: string | null;
  marked_for_deletion_on: string | null;
  statistics: GitlabProjectStatistics;
  container_registry_image_prefix: string;
  _links: GitlabProjectLinks;
}
