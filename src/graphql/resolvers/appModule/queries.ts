import { AppModule } from '../../../db/models';

export const appModuleQueries = {
  appModules: async () => AppModule.find(),

  appModule: async (_parent: any, { id }: any) => AppModule.findById(id),
};
