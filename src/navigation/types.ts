import {GithubEvent} from '../api/github';

export type StackParamList = {
  Home: undefined;
  Details: {item: GithubEvent};
};
