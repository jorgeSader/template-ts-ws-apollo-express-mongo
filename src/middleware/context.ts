import { getUserFromToken } from '../utils/getUserFromToken';
import { PubSub } from 'graphql-subscriptions';

export const context = async ({ req }: any) => {
  const pubSub = new PubSub();
  const token = await req.headers.authorization;
  const currentUser = token ? getUserFromToken(token) : null;

  return {
    currentUser,
    pubSub,
  };
};
