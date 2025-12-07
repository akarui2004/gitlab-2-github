# Quick Reference Guide

## Folder Purpose Summary

| Folder | Purpose | When to Use |
|--------|---------|-------------|
| `/docs` | Documentation | API docs, guides, architecture decisions |
| `/scripts` | Build scripts | Test runners, build tools, dev utilities |
| `/src/config` | Configuration | API endpoints, feature flags, settings |
| `/src/enums` | Enumerations | HTTP methods, status codes, constants |
| `/src/errors` | Custom errors | API errors, validation errors, domain errors |
| `/src/helpers` | Pure functions | String utils, config access, transformations |
| `/src/lib/api-client` | API clients | HTTP communication with external APIs |
| `/src/services` | Business logic | Workflows, orchestration, migrations |
| `/src/types` | Type definitions | Interfaces, types, type aliases |
| `/src/utils` | Utility classes | Stateful utilities, HTTP request class |

---

## Code Placement Decision Tree

```
New Code?
│
├─ Business logic or workflow?
│  └─> /src/services
│
├─ HTTP API call?
│  └─> /src/lib/api-client/{platform}/{scope}
│
├─ Pure function (no side effects)?
│  └─> /src/helpers
│
├─ Stateful utility class?
│  └─> /src/utils
│
├─ Type definition?
│  └─> /src/types
│
├─ Enumeration?
│  └─> /src/enums
│
├─ Custom error?
│  └─> /src/errors
│
└─ Configuration?
   └─> /src/config
```

---

## Import Patterns

```typescript
// Helpers
import { config, interpolate } from '@/helpers';

// Utils
import { ApiRequest } from '@/utils';

// Types
import type { GitlabProfileResponse } from '@/types';

// API Clients
import { GitlabMeProfile, GitlabOrgProject } from '@/lib/api-client';

// Enums
import { RequestMethod } from '@/enums';

// Errors
import { RequestError } from '@/errors';
```

---

## Platform and Scope Organization

### Platforms
- `gitlab/` - GitLab API clients
- `github/` - GitHub API clients (future)

### Scopes
- `me/` - User/personal resources
- `organization/` - Organization-level resources
- `project/` - Project-specific resources

### Example Paths
```
lib/api-client/
├── gitlab/
│   ├── me/profile.ts          # User profile
│   ├── me/project.ts          # User projects
│   ├── organization/project.ts # Org projects
│   └── project/issue.ts       # Project issues
└── github/
    └── (future implementation)
```

---

## Key Files Reference

### Configuration
- `src/config/repository-api.yaml` - API endpoint definitions

### Base Classes
- `src/lib/api-client/base.ts` - BaseApiClient class
- `src/utils/api-request.util.ts` - ApiRequest class

### Helpers
- `src/helpers/config.helper.ts` - Config loading
- `src/helpers/string.helper.ts` - String interpolation
- `src/helpers/dir.helper.ts` - Path resolution

### Types
- `src/types/lib/api-client/gitlab.type.ts` - GitLab types
- `src/types/lib/api-client/base.type.ts` - Base types

---

## Common Tasks

### Adding a New API Endpoint

1. **Add to config** (`src/config/repository-api.yaml`):
```yaml
api:
  gitlab:
    project:
      milestone:
        list: https://gitlab.com/api/v4/projects/{projectId}/milestones
```

2. **Add types** (`src/types/lib/api-client/gitlab.type.ts`):
```typescript
export interface GitlabMilestoneResponse {
  id: number;
  title: string;
  // ... more fields
}
```

3. **Create API client** (`src/lib/api-client/gitlab/project/milestone.ts`):
```typescript
class Milestone extends BaseApiClient {
  async getMilestones(projectId: number) {
    this.apiRequest.setUrl(
      this.buildApiUrl('api.gitlab.project.milestone.list', { projectId })
    );
    return await this.apiRequest.send<GitlabMilestoneResponse[]>();
  }
}
```

4. **Export** (`src/lib/api-client/gitlab/index.ts`):
```typescript
export { Milestone as GitlabProjectMilestone } from './project/milestone';
```

### Adding a New Service

1. **Create service file** (`src/services/gitlab/migration.service.ts`):
```typescript
class MigrationService {
  async migrateProject(projectId: number) {
    // Business logic here
  }
}
```

2. **Export** (`src/services/gitlab/index.ts`):
```typescript
export { MigrationService } from './migration.service';
```

### Adding a New Helper Function

1. **Add to helper file** (`src/helpers/string.helper.ts`):
```typescript
const formatDate = (date: Date): string => {
  return date.toISOString();
};
```

2. **Export** (`src/helpers/index.ts`):
```typescript
export * from './string.helper';
```

---

## Best Practices Checklist

- ✅ Business logic in `/src/services`
- ✅ API calls in `/src/lib/api-client`
- ✅ Pure functions in `/src/helpers`
- ✅ Stateful classes in `/src/utils`
- ✅ Types in `/src/types`
- ✅ Export through `index.ts` files
- ✅ Use path aliases (`@/*`)
- ✅ Separate platforms (gitlab/github)
- ✅ Organize by scope (me/org/project)
- ✅ Keep API clients focused on HTTP only

---

## Documentation Files

1. **FOLDER_STRUCTURE.md** - Detailed folder descriptions
2. **FUNCTIONAL_CODE_GUIDE.md** - Where to place functional code
3. **ARCHITECTURE_OVERVIEW.md** - System architecture
4. **API_STRUCTURE.md** - API configuration documentation
5. **QUICK_REFERENCE.md** - This file

---

## Getting Started

1. **Read**: `FOLDER_STRUCTURE.md` for detailed explanations
2. **Check**: `FUNCTIONAL_CODE_GUIDE.md` before adding code
3. **Review**: `ARCHITECTURE_OVERVIEW.md` for system design
4. **Reference**: This file for quick lookups

---

## Need Help?

- **Where to put code?** → See `FUNCTIONAL_CODE_GUIDE.md`
- **What does a folder do?** → See `FOLDER_STRUCTURE.md`
- **How does it all work?** → See `ARCHITECTURE_OVERVIEW.md`
- **API configuration?** → See `API_STRUCTURE.md`

