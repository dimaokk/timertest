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
