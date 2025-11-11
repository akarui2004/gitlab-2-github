# GitLab2GitHub

A TypeScript-based migration tool to transfer projects, milestones, and issues from GitLab to GitHub.

## Overview

GitLab2GitHub is a command-line utility that helps you seamlessly migrate your GitLab repositories, including their milestones and issues, to GitHub. Built with TypeScript and powered by Bun for fast execution.

## Features

- 🚀 Migrate GitLab projects to GitHub repositories
- 📋 Transfer milestones with their metadata
- 🐛 Migrate issues with labels, assignees, and comments
- ⚡ Fast execution with Bun runtime
- 🔒 Secure token-based authentication for both platforms

## Prerequisites

- [Bun](https://bun.sh/) installed on your system
- GitLab personal access token with API access
- GitHub personal access token with repo permissions

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/GitLab2GitHub.git

# Navigate to the project directory
cd GitLab2GitHub

# Install dependencies
bun install
```

## Configuration

Create a `.env` file in the root directory with your API tokens:

```env
GITLAB_TOKEN=your_gitlab_personal_access_token
GITLAB_URL=https://gitlab.com/api/v4
GITHUB_TOKEN=your_github_personal_access_token
```

## Usage

```bash
# Run the migration tool
bun run start

# Build the project
bun run build

# Run tests
bun test
```

## API Tokens

### GitLab Personal Access Token

1. Go to GitLab → Settings → Access Tokens
2. Create a token with `api` scope
3. Copy the token to your `.env` file

### GitHub Personal Access Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Create a token with `repo` scope
3. Copy the token to your `.env` file

## Project Structure

```
GitLab2GitHub/
├── src/
│   ├── gitlab/       # GitLab API integration
│   ├── github/       # GitHub API integration
│   ├── migrator/     # Migration logic
│   └── index.ts      # Main entry point
├── .env              # Environment variables (not tracked)
├── .gitignore        # Git ignore rules
├── LICENSE           # MIT License
├── package.json      # Project dependencies
├── tsconfig.json     # TypeScript configuration
└── README.md         # This file
```

## Limitations

- Rate limits apply based on your GitLab and GitHub API quotas
- Large repositories may require multiple runs
- Attachments and images must be migrated manually

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Minh Doan**

## Acknowledgments

- Built with [Bun](https://bun.sh/)
- Powered by [GitLab API](https://docs.gitlab.com/ee/api/)
- Powered by [GitHub API](https://docs.github.com/en/rest)

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
```