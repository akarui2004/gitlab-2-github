import { GitlabMeProfile, GitlabMeProject } from '@/lib/api-client';

const userGitLabApiClient = new GitlabMeProfile();
const profile = await userGitLabApiClient.getProfile();

const userProjectApiClient = new GitlabMeProject();
const userProjects = await userProjectApiClient.getProjects(profile.id, {
  search: 'todo-application',
  simple: true,
});

console.log(userProjects);
