import { User } from '../../../db/models';

export const userQueries = {
  users: async () => User.find(),
  user: async (_: any, { id }: any) => User.findById(id),
};
