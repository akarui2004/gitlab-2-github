# REST API Structure Documentation

## Overview

This document explains the design rationale behind the REST API endpoint configuration in `repository-api.yaml`. The structure is organized to support seamless migration between GitLab and GitHub platforms while accommodating their different API architectures.

## Configuration Structure

```yaml
api:
  github:
    projects:
      organization: https://api.github.com/orgs/{organization}/projectsV2
      individual: https://api.github.com/users/{username}/projects
  gitlab:
    projects:
      organization: https://gitlab.com/api/v4/projects
      individual: https://api.gitlab.com/api/v4/users/{user_id}/projects
```

## Design Principles

### 1. Platform Separation

**Why separate `github` and `gitlab` sections?**

- **Different API Architectures**: GitHub and GitLab have fundamentally different API designs, authentication methods, and response formats
- **Versioning Differences**: GitLab uses `/api/v4` in the path, while GitHub uses versioning through headers
- **Base URL Variations**: GitHub uses `api.github.com`, while GitLab can be self-hosted (defaulting to `gitlab.com`)
- **Isolation**: Separating platforms allows independent updates and maintenance without affecting the other platform's configuration

### 2. Resource Hierarchy

**Why organize by resource type (`projects`)?**

- **Scalability**: As the tool grows, additional resources (milestones, issues, labels, etc.) can be added under their respective sections
- **Logical Grouping**: Related endpoints are grouped together, making the configuration intuitive
- **Maintainability**: Changes to project-related endpoints are isolated from other resource types

### 3. Organization vs Individual Scope

**Why separate `organization` and `individual` endpoints?**

#### GitHub Differences

- **Organization Projects**:
  - Endpoint: `/orgs/{organization}/projectsV2`
  - Uses Projects V2 API (newer, more feature-rich)
  - Requires organization-level permissions
  - Supports team-based project management
  - Reference API: [List Projects for Organization](https://docs.github.com/en/rest/projects/projects?apiVersion=2022-11-28#list-projects-for-organization)

- **Individual Projects**:
  - Endpoint: `/users/{username}/projects`
  - Uses traditional Projects API
  - Requires user-level permissions
  - Simpler structure for personal projects
  - Reference API: [List Projects for User](https://docs.github.com/en/rest/projects/projects?apiVersion=2022-11-28#list-projects-for-user)

#### GitLab Differences

- **Organization Projects**:
  - Endpoint: `/api/v4/projects`
  - Lists all projects accessible to the authenticated user
  - Includes both personal and group projects
  - Uses group/organization context from project ownership
  - Reference API: [List All Projects](https://docs.gitlab.com/api/projects/#list-all-projects)

- **Individual Projects**:
  - Endpoint: `/api/v4/users/{user_id}/projects`
  - Specifically targets projects owned by a user
  - Filters out group/organization projects
  - Useful for personal project migration
  - Reference API: [List a User Projects](https://docs.gitlab.com/api/projects/#list-a-users-projects)

**Migration Use Cases**:
- **Organization Migration**: When migrating entire teams or organizations, use organization endpoints
- **Personal Migration**: When migrating individual developer projects, use individual endpoints
- **Selective Migration**: The structure allows the tool to query both scopes and filter results as needed

## URL Pattern Analysis

### Placeholder Variables

#### GitHub
- `{organization}`: GitHub organization name (e.g., "microsoft", "facebook")
- `{username}`: GitHub username (e.g., "octocat")

#### GitLab
- `{user_id}`: GitLab user ID (numeric identifier, not username)

**Why different identifier types?**
- **GitHub**: Uses human-readable names (usernames/organization names) in URLs
- **GitLab**: Uses numeric IDs for users, which are more stable and don't change with username updates

### API Versioning

- **GitHub**: Versioning handled via HTTP headers (`Accept: application/vnd.github+json`), not in URL
- **GitLab**: Explicit versioning in URL path (`/api/v4/`)

This difference is why the configuration structure separates platforms - they handle versioning differently.

## Benefits of This Structure

### 1. **Flexibility**
The hierarchical structure allows easy addition of new resources:
```yaml
api:
  github:
    projects: ...
    issues: ...
    milestones: ...
  gitlab:
    projects: ...
    issues: ...
    milestones: ...
```

### 2. **Type Safety**
The structure maps naturally to TypeScript types:
```typescript
type ConfigObject = {
  api: {
    github: { projects: { organization: string; individual: string } };
    gitlab: { projects: { organization: string; individual: string } };
  };
};
```

### 3. **Easy Configuration Access**
The dot-notation key system (`config('api.github.projects.organization')`) provides intuitive access to nested endpoints.

### 4. **Maintainability**
- Platform-specific changes are isolated
- Adding new endpoints doesn't require restructuring
- Clear separation of concerns

## Migration Tool Integration

This structure supports the migration tool's workflow:

1. **Source Selection**: Choose GitLab as source (individual or organization)
2. **Destination Selection**: Choose GitHub as destination (individual or organization)
3. **Endpoint Resolution**: Tool resolves correct endpoints based on scope
4. **API Calls**: Uses resolved endpoints to fetch and create resources

## Future Considerations

### Potential Extensions

1. **Additional Resources**:
   ```yaml
   api:
     github:
       projects: ...
       issues: ...
       milestones: ...
       labels: ...
   ```

2. **Environment-Specific URLs**:
   ```yaml
   api:
     gitlab:
       projects:
         organization: ${GITLAB_URL}/api/v4/projects
   ```

3. **Authentication Endpoints**:
   ```yaml
   api:
     github:
       auth: https://api.github.com/user
     gitlab:
       auth: ${GITLAB_URL}/api/v4/user
   ```

## Conclusion

The REST API structure in `repository-api.yaml` is designed to:
- Accommodate the architectural differences between GitHub and GitLab APIs
- Support both organization and individual project migrations
- Provide a scalable foundation for future resource types
- Enable type-safe, maintainable configuration access

This structure ensures the migration tool can handle the diverse needs of users migrating projects between these two platforms while maintaining clean, organized code.

