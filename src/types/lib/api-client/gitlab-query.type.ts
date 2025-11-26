export interface ProjectQueryParams {
  [key: string]: string | boolean | undefined;
  archived?: boolean; // Filter projects by archived status: true for archived projects, false for non-archived projects.
  search?: string; // Search for projects by name, description, or path.
  simple?: boolean; // Return simple fields instead of full project details.
  owned?: boolean; // Filter projects by ownership: true for owned projects, false for non-owned projects.
  visibility?: string; // Filter projects by visibility level: public, internal, or private.
  active?: boolean; // Filter projects by active status: true for active projects, false for inactive projects.
}
