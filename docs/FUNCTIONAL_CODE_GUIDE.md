# Functional Code Placement Guide

## Overview

This guide explains where to place different types of functional code in the GitLab2GitHub project. Understanding the distinction between folders helps maintain clean architecture and proper separation of concerns.

## Quick Reference: Where to Place Code

| Type of Code | Folder | Example |
|--------------|--------|---------|
| Business logic & workflows | `/src/services` | Migration orchestration, data transformation |
| API HTTP communication | `/src/lib/api-client` | GET/POST requests to GitLab/GitHub APIs |
| Pure utility functions | `/src/helpers` | String interpolation, config access |
| Stateful utility classes | `/src/utils` | HTTP request class, stateful utilities |
| Type definitions | `/src/types` | Interfaces, type aliases |
| Enumerations | `/src/enums` | RequestMethod, StatusCode |
| Custom errors | `/src/errors` | RequestError, ValidationError |
| Configuration data | `/src/config` | API endpoints, feature flags |

---

## Detailed Guidelines

### `/src/services` - **PRIMARY LOCATION FOR FUNCTIONAL CODE**

**✅ Best for:**
- Business logic and workflows
- Complex operations that orchestrate multiple API calls
- Data transformation and mapping between platforms
- Migration processes
- High-level operations that combine multiple components
- Error handling and recovery logic
- Validation and business rules

**Example Use Cases:**
```typescript
// services/gitlab/migration.service.ts
class GitLabMigrationService {
  async migrateProject(projectId: number, targetOrg: string) {
    // 1. Fetch project from GitLab
    const project = await this.gitlabClient.getProject(projectId);
    
    // 2. Transform data format for GitHub
    const githubProject = this.transformProject(project);
    
    // 3. Create project in GitHub
    const newProject = await this.githubClient.createProject(githubProject);
    
    // 4. Migrate issues
    await this.migrateIssues(projectId, newProject.id);
    
    // 5. Handle errors and provide rollback
    return { success: true, projectId: newProject.id };
  }
  
  private transformProject(gitlabProject: GitlabProject): GitHubProject {
    // Transformation logic
  }
}
```

**Why `/src/services`?**
- Services orchestrate multiple components
- They contain the "what" and "why" of your application
- They're the entry point for business operations
- They can be easily tested in isolation

---

### `/src/lib/api-client` - **API COMMUNICATION LAYER**

**✅ Best for:**
- Low-level HTTP requests to external APIs
- API endpoint implementations
- Request/response handling
- Authentication management
- URL building and path interpolation

**❌ Not for:**
- Business logic
- Data transformation
- Complex workflows
- Business rules

**Example:**
```typescript
// lib/api-client/gitlab/me/profile.ts
class Profile extends BaseApiClient {
  async getProfile(): Promise<GitlabProfileResponse> {
    this.apiRequest.setUrl(this.userProfileApi());
    return await this.apiRequest.send<GitlabProfileResponse>();
  }
  
  private userProfileApi(): string {
    return this.buildApiUrl('api.gitlab.user.profile');
  }
}
```

**Why `/src/lib/api-client`?**
- Focused on HTTP communication
- Reusable across different services
- Platform-specific implementations
- Easy to mock for testing

---

### `/src/helpers` - **PURE UTILITY FUNCTIONS**

**✅ Best for:**
- Pure functions (no side effects)
- Stateless operations
- Reusable across multiple modules
- Simple transformations
- Cross-cutting concerns

**Example:**
```typescript
// helpers/string.helper.ts
const interpolate = (template: string, vars: object): string => {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] || '');
};

// helpers/config.helper.ts
const config = <T>(key: string): T => {
  // Load and return config value
};
```

**Why `/src/helpers`?**
- Pure functions are easy to test
- No dependencies on external state
- Reusable across the application
- Simple, focused operations

---

### `/src/utils` - **STATEFUL UTILITY CLASSES**

**✅ Best for:**
- Classes that manage state
- Complex utility operations
- Utilities that need instance methods
- Stateful operations

**Example:**
```typescript
// utils/api-request.util.ts
class ApiRequest {
  private authToken: string = '';
  private url: string = '';
  
  setAuthToken(token: string): void {
    this.authToken = token;
  }
  
  async send<T>(): Promise<T> {
    // Make HTTP request with state
  }
}
```

**Why `/src/utils`?**
- Classes manage internal state
- More complex than simple functions
- Need instance methods
- Stateful operations

---

## Decision Flowchart

```
Start: I need to add new functional code
│
├─ Is it business logic or workflow?
│  └─ YES → /src/services
│
├─ Is it an HTTP API call?
│  └─ YES → /src/lib/api-client/{platform}/{scope}
│
├─ Is it a pure function (no side effects)?
│  └─ YES → /src/helpers
│
├─ Is it a utility class with state?
│  └─ YES → /src/utils
│
├─ Is it a type definition?
│  └─ YES → /src/types
│
└─ Is it a constant enumeration?
   └─ YES → /src/enums
```

---

## Common Patterns

### Pattern 1: Service Orchestrating API Clients

```typescript
// ✅ CORRECT: Service uses API clients
// services/gitlab/migration.service.ts
class MigrationService {
  constructor(
    private gitlabClient: GitlabMeProject,
    private githubClient: GitHubProject
  ) {}
  
  async migrate() {
    const projects = await this.gitlabClient.getProjects();
    // Business logic here
  }
}

// ❌ WRONG: Service making direct HTTP calls
class MigrationService {
  async migrate() {
    const response = await fetch('https://api.gitlab.com/...');
    // Don't do this - use API clients instead
  }
}
```

### Pattern 2: API Client Focused on HTTP

```typescript
// ✅ CORRECT: API client only handles HTTP
// lib/api-client/gitlab/me/project.ts
class Project extends BaseApiClient {
  async getProjects(): Promise<GitlabProjectResponse[]> {
    this.apiRequest.setUrl(this.buildApiUrl('api.gitlab.user.project.list'));
    return await this.apiRequest.send();
  }
}

// ❌ WRONG: API client with business logic
class Project extends BaseApiClient {
  async getProjectsAndTransform() {
    const projects = await this.apiRequest.send();
    // Don't transform here - that's service layer responsibility
    return projects.map(p => transform(p));
  }
}
```

### Pattern 3: Helper for Pure Functions

```typescript
// ✅ CORRECT: Pure function in helpers
// helpers/string.helper.ts
const formatProjectName = (name: string): string => {
  return name.trim().toLowerCase().replace(/\s+/g, '-');
};

// ❌ WRONG: Stateful operation in helpers
// helpers/project.helper.ts
let projectCache = {}; // Don't use state in helpers
const getProject = (id: number) => {
  // Use services or utils for stateful operations
};
```

---

## Migration Workflow Example

Here's how a complete migration workflow would be organized:

```
1. Entry Point (index.ts)
   └─> Calls MigrationService

2. Service Layer (/src/services/gitlab/migration.service.ts)
   ├─> Uses GitLab API clients to fetch data
   ├─> Uses helper functions for transformations
   ├─> Uses GitHub API clients to create resources
   └─> Handles errors and rollback logic

3. API Clients (/src/lib/api-client/)
   ├─> GitLab clients fetch from GitLab API
   └─> GitHub clients create in GitHub API

4. Helpers (/src/helpers/)
   └─> Transform data formats between platforms

5. Types (/src/types/)
   └─> Define interfaces for GitLab and GitHub data structures

6. Utils (/src/utils/)
   └─> ApiRequest class handles HTTP communication
```

---

## Best Practices

### ✅ DO

1. **Place business logic in services**
   - Services are the primary location for functional code
   - They orchestrate API clients and helpers

2. **Keep API clients focused on HTTP**
   - API clients should only handle HTTP communication
   - No business logic in API clients

3. **Use helpers for pure functions**
   - Helpers should be stateless and side-effect-free
   - Easy to test and reason about

4. **Use utils for stateful classes**
   - When you need to manage state, use utils
   - Classes that need instance methods belong here

5. **Organize by platform and scope**
   - GitLab code in `gitlab/` folders
   - GitHub code in `github/` folders
   - Scope-based organization (me, organization, project)

### ❌ DON'T

1. **Don't put business logic in API clients**
   - API clients should only handle HTTP
   - Keep them focused and reusable

2. **Don't put state in helpers**
   - Helpers should be pure functions
   - Use utils or services for stateful operations

3. **Don't make direct HTTP calls in services**
   - Services should use API clients
   - This enables better testing and separation

4. **Don't mix platforms in the same file**
   - Keep GitLab and GitHub code separate
   - Use services to coordinate between platforms

5. **Don't put types in the same file as implementations**
   - Keep types in `/src/types`
   - This improves maintainability

---

## Summary

**For functional code (business logic, workflows, operations):**

1. **Primary location**: `/src/services` - This is where most functional code should live
2. **Supporting locations**:
   - `/src/lib/api-client` - For API communication only
   - `/src/helpers` - For pure utility functions
   - `/src/utils` - For stateful utility classes

**Key Principle**: Services orchestrate, API clients communicate, helpers transform, utils manage state.

When in doubt, ask: "Is this business logic?" If yes, it belongs in `/src/services`.

