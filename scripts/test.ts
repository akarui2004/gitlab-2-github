import {
  GitlabMeProfile,
  GitlabMeProject,
  GitlabProjectIssue,
} from '@/lib/api-client';
import type { GitlabProjectResponse } from '@/types';

const userGitLabApiClient = new GitlabMeProfile();
const profile = await userGitLabApiClient.getProfile();

const userProjectApiClient = new GitlabMeProject();
const userProjects = await userProjectApiClient.getProjects(profile.id, {
  search: 'ToDo Application',
  simple: true,
});

const filteredProject = userProjects.reduce(
  (acc: GitlabProjectResponse[], project) => {
    if (project.name === 'ToDo Application') {
      acc.push(project);
    }
    return acc;
  },
  []
);

const projectId = filteredProject[0]?.id;
if (!projectId) {
  throw new Error('Project ID not found');
}

const projectIssueApiClient = new GitlabProjectIssue(projectId);
const issues = await projectIssueApiClient.getIssues();

console.log(issues);
