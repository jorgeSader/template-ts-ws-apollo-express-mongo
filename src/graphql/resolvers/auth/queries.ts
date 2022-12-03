import { Auth } from '../../../db/models';

export const authQueries = {
  auths: async () => Auth.find(),
  auth: async (_: any, { id }: any) => Auth.findById(id),
};
