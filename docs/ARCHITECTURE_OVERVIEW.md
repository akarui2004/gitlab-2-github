# Architecture Overview

## Project Purpose

GitLab2GitHub is a TypeScript-based migration tool designed to transfer projects, milestones, and issues from GitLab to GitHub. The project uses Bun as the runtime environment and follows a clean architecture pattern with clear separation of concerns.

## Architecture Layers

### 1. Configuration Layer (`/src/config`)

**Purpose**: Centralized configuration management

- **YAML-based configuration** for API endpoints
- **Hierarchical structure** matching API organization
- **Variable interpolation** support for dynamic URLs
- **Platform separation** (GitHub vs GitLab)

**Key File**: `repository-api.yaml`

**Access Pattern**: 
```typescript
import { config } from '@/helpers';
const apiUrl = config<string>('api.gitlab.user.profile');
```

---

### 2. Type System (`/src/types`)

**Purpose**: Type safety and contract definitions

- **API response types** for GitLab and GitHub
- **Request/response interfaces**
- **Query parameter types**
- **Utility function types**

**Organization**:
- Platform-specific types in `lib/api-client/`
- Shared types at root level
- Barrel exports for clean imports

**Example**:
```typescript
interface GitlabProfileResponse {
  id: number;
  username: string;
  email: string;
  // ... more fields
}
```

---

### 3. Error Handling (`/src/errors`)

**Purpose**: Custom error classes for better error management

- **RequestError**: API request failures with status codes
- **Extensible**: Easy to add domain-specific errors
- **Context-rich**: Includes status codes and response bodies

**Usage**:
```typescript
throw new RequestError(
  'Request failed',
  404,
  'Resource not found'
);
```

---

### 4. Enumerations (`/src/enums`)

**Purpose**: Type-safe constant definitions

- **RequestMethod**: HTTP methods (GET, POST, PUT, DELETE)
- **Extensible**: Easy to add new enumerations
- **Type-safe**: Prevents typos and invalid values

---

### 5. Helper Functions (`/src/helpers`)

**Purpose**: Pure utility functions

**Key Helpers**:

1. **`config.helper.ts`**
   - Loads YAML configuration
   - Provides dot-notation access
   - Type-safe configuration retrieval

2. **`dir.helper.ts`**
   - Path resolution utilities
   - Base directory resolution
   - File path construction

3. **`string.helper.ts`**
   - String interpolation
   - Template variable replacement
   - Formatting utilities

**Characteristics**:
- Pure functions (no side effects)
- Stateless
- Reusable across modules

---

### 6. Utility Classes (`/src/utils`)

**Purpose**: Stateful utility classes

**Key Utility**:

**`ApiRequest` Class**:
- HTTP request management
- Authentication token handling
- Query parameter building
- Request/response transformation
- Error handling
- Timeout management

**Features**:
- Supports GET, POST, PUT, DELETE
- Automatic JSON parsing
- Bearer token authentication
- Query parameter filtering
- Abort signal for timeouts

---

### 7. API Client Layer (`/src/lib/api-client`)

**Purpose**: Low-level API communication

**Architecture**:

```
lib/api-client/
├── base.ts                    # Base class with common functionality
├── github/                    # GitHub API clients (future)
└── gitlab/                    # GitLab API clients
    ├── me/                    # User-scoped endpoints
    │   ├── profile.ts         # User profile API
    │   └── project.ts         # User projects API
    ├── organization/          # Organization-scoped endpoints
    │   └── project.ts         # Organization projects API
    └── project/               # Project-scoped endpoints
        └── issue.ts          # Project issues API
```

**BaseApiClient Features**:
- Authentication token management
- API URL building with interpolation
- Request object initialization
- Environment variable validation

**Client Organization**:
- **By Platform**: `gitlab/` vs `github/`
- **By Scope**: `me/`, `organization/`, `project/`
- **By Resource**: Each file represents a resource type

**Example Client**:
```typescript
class Profile extends BaseApiClient {
  async getProfile(): Promise<GitlabProfileResponse> {
    this.apiRequest.setUrl(this.buildApiUrl('api.gitlab.user.profile'));
    return await this.apiRequest.send<GitlabProfileResponse>();
  }
}
```

---

### 8. Service Layer (`/src/services`)

**Purpose**: Business logic and orchestration

**Current Status**: Reserved for future implementation

**Intended Use**:
- Migration workflows
- Data transformation
- Multi-step operations
- Error recovery
- Business rules

**Example Structure** (planned):
```
services/
├── github/
│   └── migration.service.ts
└── gitlab/
    └── migration.service.ts
```

**Responsibilities**:
- Orchestrate API clients
- Transform data between platforms
- Handle complex workflows
- Manage error recovery
- Implement business logic

---

## Data Flow

### Request Flow

```
1. Entry Point (index.ts)
   │
   └─> Service Layer (/src/services)
       │
       ├─> API Client (/src/lib/api-client)
       │   │
       │   ├─> BaseApiClient (authentication, URL building)
       │   │
       │   └─> ApiRequest (/src/utils)
       │       │
       │       └─> HTTP Request (fetch API)
       │
       ├─> Helpers (/src/helpers)
       │   └─> Pure functions for transformations
       │
       └─> Types (/src/types)
           └─> Type definitions for data structures
```

### Configuration Flow

```
1. YAML Config (/src/config/repository-api.yaml)
   │
   └─> Config Helper (/src/helpers/config.helper.ts)
       │
       └─> API Client (buildApiUrl method)
           │
           └─> String Helper (interpolate variables)
               │
               └─> Final API URL
```

---

## Design Patterns

### 1. **Base Class Pattern**

All API clients extend `BaseApiClient`:
- Reduces code duplication
- Provides common functionality
- Ensures consistent behavior

### 2. **Factory Pattern** (Implicit)

API clients are instantiated as needed:
- Each client is a class that can be instantiated
- Supports dependency injection
- Easy to mock for testing

### 3. **Strategy Pattern**

Different API clients for different platforms:
- `GitlabMeProfile` vs `GitlabOrgProject`
- Same interface, different implementations
- Easy to swap implementations

### 4. **Barrel Export Pattern**

All folders use `index.ts` for exports:
- Clean imports
- Encapsulation
- Easy refactoring

---

## Platform Separation

### GitLab vs GitHub

The architecture separates platforms at multiple levels:

1. **Configuration**: Separate sections in YAML
2. **API Clients**: Separate folders (`gitlab/` vs `github/`)
3. **Types**: Platform-specific type definitions
4. **Services**: Platform-specific service implementations

**Benefits**:
- Clear separation of concerns
- Easy to add new platforms
- Independent evolution
- Better maintainability

---

## Scope Organization

Within each platform, code is organized by scope:

### 1. **User/Me Scope** (`/me/`)
- Personal user resources
- User profile
- User-owned projects

### 2. **Organization Scope** (`/organization/`)
- Organization-level resources
- Group projects
- Team resources

### 3. **Project Scope** (`/project/`)
- Project-specific resources
- Issues, milestones, labels
- Project settings

**Benefits**:
- Clear resource boundaries
- Easy to find relevant code
- Supports permission-based access
- Matches API structure

---

## Type Safety

### TypeScript Configuration

- **Strict mode**: Enabled for maximum type safety
- **Path aliases**: `@/*` maps to `./src/*`
- **Module resolution**: Bundler mode for modern tooling

### Type Definitions

- **API responses**: Fully typed interfaces
- **Request parameters**: Typed query parameters
- **Configuration**: Type-safe config access
- **Utilities**: Typed helper functions

---

## Error Handling Strategy

### Error Hierarchy

```
Error (base)
└─> RequestError (custom)
    ├─> Status code
    ├─> Response body
    └─> Error message
```

### Error Flow

1. **API Request fails** → `RequestError` thrown
2. **Caught by service layer** → Business logic handles
3. **Logged and/or transformed** → User-friendly message
4. **Recovery or rollback** → Service layer manages

---

## Testing Strategy (Future)

### Unit Testing
- **Helpers**: Pure functions, easy to test
- **Utils**: Mock dependencies, test state management
- **API Clients**: Mock HTTP requests
- **Services**: Mock API clients, test business logic

### Integration Testing
- **API Clients**: Test against real APIs (with test tokens)
- **Services**: Test complete workflows
- **End-to-end**: Test full migration process

---

## Scalability Considerations

### Adding New Resources

1. **Add to config**: Update `repository-api.yaml`
2. **Add types**: Create response interfaces
3. **Add API client**: Create client class extending `BaseApiClient`
4. **Add service**: Create service if business logic needed
5. **Export**: Update barrel exports

### Adding New Platforms

1. **Add config section**: New platform in YAML
2. **Create folder structure**: `lib/api-client/{platform}/`
3. **Create base types**: Platform-specific types
4. **Implement clients**: Platform-specific API clients
5. **Create services**: Platform-specific services

---

## Security Considerations

### Authentication

- **Environment variables**: Tokens stored in `.env`
- **Token validation**: Validated at client initialization
- **Bearer tokens**: Standard OAuth2 bearer token format
- **No token storage**: Tokens never logged or exposed

### API Security

- **HTTPS only**: All API calls use HTTPS
- **Token in headers**: Never in URLs
- **Timeout protection**: Prevents hanging requests
- **Error handling**: Doesn't expose sensitive data

---

## Performance Considerations

### Request Optimization

- **Query parameters**: Efficient filtering
- **Timeout management**: Prevents resource leaks
- **JSON parsing**: Efficient response handling
- **Abort signals**: Cancellable requests

### Configuration Loading

- **Eager loading**: Config loaded at module initialization
- **Caching**: Config data cached in memory
- **No file I/O**: After initial load

---

## Future Enhancements

### Planned Features

1. **Service Layer Implementation**
   - Migration workflows
   - Data transformation
   - Error recovery

2. **GitHub API Clients**
   - Complete GitHub integration
   - Project creation
   - Issue migration

3. **Advanced Features**
   - Batch operations
   - Progress tracking
   - Resume capability
   - Dry-run mode

4. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests

---

## Summary

The GitLab2GitHub architecture follows clean architecture principles:

- **Separation of concerns**: Each layer has a clear purpose
- **Platform separation**: GitLab and GitHub code are isolated
- **Scope organization**: Code organized by resource scope
- **Type safety**: Comprehensive TypeScript types
- **Extensibility**: Easy to add new resources and platforms
- **Maintainability**: Clear structure and organization

This architecture supports the project's goal of providing a reliable, maintainable tool for migrating projects between GitLab and GitHub.

