# Folder Structure Documentation

## Overview

This document provides a comprehensive guide to the folder structure of the GitLab2GitHub migration tool. Each folder serves a specific purpose in organizing the codebase for maintainability, scalability, and clarity.

## Root Directory Structure

```
GitLab2GitHub/
├── docs/                    # Documentation files
├── scripts/                 # Build and utility scripts
├── src/                     # Source code (main application code)
│   ├── config/              # Configuration files (YAML, JSON)
│   ├── enums/               # TypeScript enumerations
│   ├── errors/              # Custom error classes
│   ├── helpers/             # Utility helper functions
│   ├── lib/                 # Library code (API clients, external integrations)
│   ├── services/            # Business logic and service layer
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions and classes
├── index.ts                 # Application entry point
├── package.json             # Project dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project overview
```

---

## Detailed Folder Descriptions

### `/docs` - Documentation

**Purpose**: Contains all project documentation, API references, and architectural guides.

**Contents**:
- `API_STRUCTURE.md` - REST API endpoint configuration documentation
- `FOLDER_STRUCTURE.md` - This file (folder structure guide)
- `FUNCTIONAL_CODE_GUIDE.md` - Guide for where to place functional code
- Additional documentation as the project grows

**When to use**: Add documentation files here when:
- Documenting new features
- Creating API references
- Writing architectural decisions
- Creating user guides

---

### `/scripts` - Build and Utility Scripts

**Purpose**: Contains executable scripts for development, testing, and deployment tasks.

**Contents**:
- `test.ts` - Test execution scripts
- Build scripts
- Deployment scripts
- Development utilities

**When to use**: Add scripts here for:
- Automated testing
- Build processes
- Code generation
- Development tooling

**Note**: These are executable scripts, not part of the main application code.

---

### `/src/config` - Configuration Files

**Purpose**: Stores static configuration data, API endpoint definitions, and environment-specific settings.

**Contents**:
- `repository-api.yaml` - API endpoint configurations for GitLab and GitHub

**Key Features**:
- YAML-based configuration for readability
- Hierarchical structure matching API organization
- Supports variable interpolation (e.g., `{userId}`, `{projectId}`)

**Example Structure**:
```yaml
api:
  github:
    user:
      me: https://api.github.com/user
    project:
      organization: https://api.github.com/orgs/{organization}/projectsV2
  gitlab:
    user:
      profile: https://gitlab.com/api/v4/user
    project:
      issue:
        list: https://gitlab.com/api/v4/projects/{projectId}/issues
```

**When to use**: Add configuration files here for:
- API endpoint definitions
- Feature flags
- Environment-specific settings
- External service configurations

**Access Pattern**: Configuration is loaded via `@/helpers/config.helper` using dot-notation keys (e.g., `config('api.gitlab.user.profile')`).

---

### `/src/enums` - TypeScript Enumerations

**Purpose**: Defines constant enumerations used throughout the application.

**Contents**:
- `request.enum.ts` - HTTP request method enumerations (GET, POST, PUT, DELETE)
- `index.ts` - Barrel export file

**Example**:
```typescript
enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
```

**When to use**: Add enumerations here for:
- HTTP methods
- Status codes
- State values
- Constant sets of related values

**Best Practices**:
- Use enums for fixed sets of related constants
- Export through `index.ts` for clean imports
- Use descriptive names that indicate the enum's purpose

---

### `/src/errors` - Custom Error Classes

**Purpose**: Defines custom error classes for better error handling and debugging.

**Contents**:
- `request.error.ts` - Custom error for API request failures
- `index.ts` - Barrel export file

**Example**:
```typescript
class RequestError extends Error {
  constructor(
    message: string,
    public status?: number,
    public responseBody?: string
  ) {
    super(message);
    this.name = 'RequestError';
  }
}
```

**When to use**: Add error classes here for:
- API-specific errors
- Validation errors
- Business logic errors
- Domain-specific error types

**Best Practices**:
- Extend the base `Error` class
- Include relevant context (status codes, response bodies, etc.)
- Use descriptive error names
- Export through `index.ts`

---

### `/src/helpers` - Utility Helper Functions

**Purpose**: Contains pure utility functions that provide common functionality across the application.

**Contents**:
- `config.helper.ts` - Configuration loading and access utilities
- `dir.helper.ts` - Directory path resolution utilities
- `string.helper.ts` - String manipulation utilities (interpolation, formatting)
- `index.ts` - Barrel export file

**Key Functions**:
- `config<T>(key: string)` - Load configuration values by dot-notation key
- `resolveBase(relativePath: string)` - Resolve file paths relative to project root
- `interpolate(template: string, vars: object)` - String template interpolation

**When to use**: Add helper functions here for:
- Pure functions (no side effects)
- Reusable utility operations
- Cross-cutting concerns
- Functions used by multiple modules

**Best Practices**:
- Keep functions pure when possible
- Make functions stateless
- Export through `index.ts`
- Document function purposes and parameters

**Note**: Helpers are different from utils - helpers are typically pure functions, while utils may contain classes or stateful utilities.

---

### `/src/lib` - Library Code

**Purpose**: Contains library code, API clients, and external service integrations.

**Structure**:
```
lib/
└── api-client/
    ├── base.ts              # Base API client class
    ├── index.ts             # Barrel exports
    ├── github/              # GitHub API client implementations
    └── gitlab/              # GitLab API client implementations
        ├── index.ts
        ├── me/              # User-specific endpoints
        │   ├── profile.ts
        │   └── project.ts
        ├── organization/    # Organization-level endpoints
        │   └── project.ts
        └── project/         # Project-specific endpoints
            └── issue.ts
```

**Key Components**:

1. **`base.ts`** - Base API client class that provides:
   - Authentication token management
   - API URL building with path interpolation
   - Request object initialization
   - Common functionality for all API clients

2. **Platform-specific clients** (`github/`, `gitlab/`):
   - Organized by platform (GitHub, GitLab)
   - Further organized by resource scope (me, organization, project)
   - Each client extends `BaseApiClient`
   - Implements specific API endpoints

**When to use**: Add code here for:
- API client implementations
- External service integrations
- Third-party library wrappers
- Reusable library components

**Best Practices**:
- Extend `BaseApiClient` for new API clients
- Organize by platform and resource scope
- Use the configuration system for API URLs
- Keep API clients focused on HTTP communication

---

### `/src/services` - Business Logic and Service Layer

**Purpose**: Contains business logic, orchestration, and high-level service implementations.

**Structure**:
```
services/
├── github/                   # GitHub service implementations
└── gitlab/                  # GitLab service implementations
```

**Current Status**: Folders exist but are currently empty (reserved for future implementation).

**When to use**: Add service classes here for:
- Business logic orchestration
- Complex operations that span multiple API calls
- Data transformation and mapping
- Migration workflows
- High-level operations that combine multiple API clients

**Best Practices**:
- Services should orchestrate API clients, not make direct HTTP calls
- Keep business logic separate from API communication
- Services can call multiple API clients
- Handle complex workflows and error recovery

**Example Use Case**:
```typescript
// services/gitlab/migration.service.ts
class GitLabMigrationService {
  async migrateProject(projectId: number) {
    // 1. Fetch project details (uses GitLab API client)
    // 2. Transform data format
    // 3. Create project in GitHub (uses GitHub API client)
    // 4. Migrate issues (orchestrates multiple API calls)
    // 5. Handle errors and rollback if needed
  }
}
```

---

### `/src/types` - TypeScript Type Definitions

**Purpose**: Contains TypeScript interfaces, types, and type definitions used throughout the application.

**Structure**:
```
types/
├── api-request-util.type.ts    # Types for API request utilities
├── config-helper.type.ts       # Types for configuration helpers
├── string-helper.type.ts       # Types for string helpers
├── index.ts                    # Barrel exports
└── lib/
    └── api-client/
        ├── base.type.ts        # Base API client types
        ├── gitlab.type.ts      # GitLab API response types
        ├── gitlab-query.type.ts # GitLab query parameter types
        └── index.ts            # Barrel exports
```

**Key Types**:
- API response interfaces (e.g., `GitlabProfileResponse`, `GitlabProjectResponse`)
- Request/response types
- Configuration types
- Query parameter types
- Utility function parameter types

**When to use**: Add type definitions here for:
- API response shapes
- Function parameters and return types
- Configuration object types
- Domain model types
- Shared type definitions

**Best Practices**:
- Organize types by domain or feature
- Use descriptive interface names
- Export through barrel files (`index.ts`)
- Keep types close to where they're used (co-location when appropriate)
- Use type aliases for complex types

---

### `/src/utils` - Utility Functions and Classes

**Purpose**: Contains utility classes and functions that provide reusable functionality.

**Contents**:
- `api-request.util.ts` - HTTP request utility class
- `index.ts` - Barrel export file

**Key Components**:

**`ApiRequest` Class**:
- Handles HTTP requests (GET, POST, PUT, DELETE)
- Manages authentication tokens
- Builds query parameters
- Handles request/response transformation
- Error handling and timeout management

**When to use**: Add utilities here for:
- Stateful utility classes
- Complex utility operations
- Classes that manage state
- Utilities that don't fit the "pure function" pattern of helpers

**Difference from Helpers**:
- **Helpers** (`/src/helpers`): Pure functions, stateless, simple operations
- **Utils** (`/src/utils`): Classes, stateful operations, complex utilities

**Best Practices**:
- Use classes for stateful utilities
- Keep utilities focused and single-purpose
- Export through `index.ts`
- Document class methods and properties

---

## Folder Organization Principles

### 1. **Separation of Concerns**
- **API Communication**: `/src/lib/api-client` - Low-level HTTP communication
- **Business Logic**: `/src/services` - High-level operations and workflows
- **Utilities**: `/src/helpers` and `/src/utils` - Reusable functions and classes
- **Types**: `/src/types` - Type definitions

### 2. **Platform Organization**
- GitLab and GitHub code is separated at multiple levels:
  - API clients: `/src/lib/api-client/gitlab` vs `/src/lib/api-client/github`
  - Services: `/src/services/gitlab` vs `/src/services/github`
  - Types: Platform-specific types in `/src/types/lib/api-client/`

### 3. **Scope Organization**
Within platform folders, code is organized by scope:
- **User/Me scope**: Personal user resources (`/me/`)
- **Organization scope**: Organization-level resources (`/organization/`)
- **Project scope**: Project-specific resources (`/project/`)

### 4. **Barrel Exports**
Most folders include an `index.ts` file that re-exports all public members, enabling clean imports:
```typescript
// Instead of:
import { Profile } from '@/lib/api-client/gitlab/me/profile';

// Use:
import { GitlabMeProfile } from '@/lib/api-client/gitlab';
```

---

## Import Patterns

### Recommended Import Paths

```typescript
// Helpers
import { config, interpolate, resolveBase } from '@/helpers';

// Utils
import { ApiRequest } from '@/utils';

// Types
import type { GitlabProfileResponse, ApiRequestOptions } from '@/types';

// API Clients
import { GitlabMeProfile, GitlabOrgProject } from '@/lib/api-client';

// Enums
import { RequestMethod } from '@/enums';

// Errors
import { RequestError } from '@/errors';
```

### Path Aliases

The project uses TypeScript path aliases defined in `tsconfig.json`:
- `@/*` maps to `./src/*`

This enables clean imports without relative path navigation.

---

## Adding New Code

### Decision Tree

1. **Is it a type definition?** → `/src/types`
2. **Is it an enumeration?** → `/src/enums`
3. **Is it a custom error?** → `/src/errors`
4. **Is it a pure utility function?** → `/src/helpers`
5. **Is it a utility class or stateful utility?** → `/src/utils`
6. **Is it an API client?** → `/src/lib/api-client/{platform}/{scope}`
7. **Is it business logic or orchestration?** → `/src/services/{platform}`
8. **Is it configuration?** → `/src/config`
9. **Is it documentation?** → `/docs`

### Platform and Scope Selection

When adding API-related code:
1. Determine the platform: `github` or `gitlab`
2. Determine the scope: `me`, `organization`, or `project`
3. Place code in: `/src/lib/api-client/{platform}/{scope}/`

---

## Summary

This folder structure is designed to:
- **Separate concerns** clearly (API clients, services, utilities, types)
- **Organize by platform** (GitLab vs GitHub)
- **Organize by scope** (user, organization, project)
- **Enable scalability** (easy to add new resources, platforms, or features)
- **Maintain type safety** (comprehensive type definitions)
- **Support clean imports** (barrel exports and path aliases)

For guidance on where to place functional code, see `FUNCTIONAL_CODE_GUIDE.md`.

