import {Octokit} from '@octokit/core';

export interface GithubEvent {
  id: string;
  type: string;
  created_at: string;
  actor: {
    id: number;
    login: string;
    display_login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
}

const octokit = new Octokit({
  auth: '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',
});

export async function fetchEventsAPI(): Promise<GithubEvent> {
  try {
    const response = await octokit.request('GET /events?per_page=25', {
      org: 'octokit',
      type: 'private',
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch events from GitHub API');
  }
}
