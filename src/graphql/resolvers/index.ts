import {
  appModuleMutations,
  appModuleQueries,
  appModuleFields,
} from './appModule';
import { authFields, authMutations, authQueries } from './auth';
import { userMutations, userQueries, userFields } from './user';
import {
  userAccountMutations,
  userAccountQueries,
  userAccountFields,
} from './userAccount';

export const resolvers = {
  Query: {
    ...appModuleQueries,
    ...authQueries,
    ...userAccountQueries,
    ...userQueries,
  },

  Mutation: {
    ...appModuleMutations,
    ...authMutations,
    ...userAccountMutations,
    ...userMutations,
  },

  ...appModuleFields,
  ...authFields,
  ...userFields,
  ...userAccountFields,
};
