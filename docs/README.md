# Documentation Index

Welcome to the GitLab2GitHub documentation. This directory contains comprehensive documentation about the project structure, architecture, and development guidelines.

## Documentation Files

### 📁 [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md)
**Complete guide to the project's folder structure**

- Detailed explanation of every folder and its purpose
- When to use each folder
- Import patterns and path aliases
- Organization principles
- Examples and best practices

**Read this if you want to:**
- Understand what each folder does
- Know where to place new code
- Learn about the project organization

---

### 🎯 [FUNCTIONAL_CODE_GUIDE.md](./FUNCTIONAL_CODE_GUIDE.md)
**Guide for placing functional code**

- Decision tree for code placement
- Primary location for business logic (`/src/services`)
- Differences between helpers, utils, and services
- Common patterns and examples
- Best practices and anti-patterns

**Read this if you want to:**
- Know where to put business logic
- Understand the difference between services and API clients
- Learn when to use helpers vs utils
- See examples of correct code organization

---

### 🏗️ [ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md)
**System architecture and design overview**

- Architecture layers and their purposes
- Data flow and request handling
- Design patterns used
- Platform and scope organization
- Type safety and error handling
- Security and performance considerations
- Future enhancements

**Read this if you want to:**
- Understand the overall system design
- Learn about architectural decisions
- See how components interact
- Understand the data flow

---

### ⚡ [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
**Quick lookup guide for common tasks**

- Folder purpose summary table
- Code placement decision tree
- Import patterns
- Common tasks and examples
- Best practices checklist

**Read this if you want to:**
- Quick answers to "where do I put this?"
- Common code patterns
- Quick reference for imports
- Fast lookup for folder purposes

---

### 🔌 [API_STRUCTURE.md](./API_STRUCTURE.md)
**REST API endpoint configuration documentation**

- API configuration structure
- Design principles
- Platform differences (GitHub vs GitLab)
- URL patterns and placeholders
- Migration tool integration

**Read this if you want to:**
- Understand API endpoint configuration
- Learn about platform differences
- See how API URLs are structured
- Understand variable interpolation

---

## Quick Start Guide

### For New Developers

1. **Start here**: Read [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md) to understand the project organization
2. **Then read**: [FUNCTIONAL_CODE_GUIDE.md](./FUNCTIONAL_CODE_GUIDE.md) to learn where to place your code
3. **Deep dive**: [ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md) for system design understanding
4. **Reference**: Use [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) for quick lookups

### For Specific Tasks

- **Adding new code?** → [FUNCTIONAL_CODE_GUIDE.md](./FUNCTIONAL_CODE_GUIDE.md)
- **Understanding a folder?** → [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md)
- **Configuring APIs?** → [API_STRUCTURE.md](./API_STRUCTURE.md)
- **Quick lookup?** → [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
- **System design?** → [ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md)

---

## Documentation Structure

```
docs/
├── README.md                    # This file (documentation index)
├── FOLDER_STRUCTURE.md          # Detailed folder descriptions
├── FUNCTIONAL_CODE_GUIDE.md     # Where to place functional code
├── ARCHITECTURE_OVERVIEW.md     # System architecture
├── API_STRUCTURE.md             # API configuration docs
└── QUICK_REFERENCE.md           # Quick lookup guide
```

---

## Key Concepts

### Folder Organization

- **Platform Separation**: GitLab and GitHub code are separated
- **Scope Organization**: Code organized by scope (user, organization, project)
- **Layer Separation**: Clear separation between API clients, services, and utilities

### Code Placement

- **Business Logic**: `/src/services` (primary location)
- **API Communication**: `/src/lib/api-client`
- **Pure Functions**: `/src/helpers`
- **Stateful Utilities**: `/src/utils`

### Architecture Layers

1. **Configuration Layer**: YAML-based API endpoint configuration
2. **Type System**: Comprehensive TypeScript type definitions
3. **Error Handling**: Custom error classes
4. **Helper Functions**: Pure utility functions
5. **Utility Classes**: Stateful utility classes
6. **API Client Layer**: Low-level API communication
7. **Service Layer**: Business logic and orchestration

---

## Contributing to Documentation

When adding or updating documentation:

1. **Keep it organized**: Follow the existing structure
2. **Be specific**: Include examples and code snippets
3. **Update the index**: Add new docs to this README
4. **Cross-reference**: Link related documents
5. **Keep it current**: Update docs when code changes

---

## Questions?

If you have questions about:

- **Project structure**: See [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md)
- **Code placement**: See [FUNCTIONAL_CODE_GUIDE.md](./FUNCTIONAL_CODE_GUIDE.md)
- **Architecture**: See [ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md)
- **Quick answers**: See [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)

---

## Last Updated

Documentation created: 2024
Project: GitLab2GitHub
Version: 1.0.0

