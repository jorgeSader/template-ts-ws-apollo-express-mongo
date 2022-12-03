import { AppModule } from '../../../db/models';

export const appModuleFields = {
  AppModule: {
    modulePlans: async (appModule: any) => {
      AppModule.find();
      console.log(
        'resolving modulePlan for AppModule: ',
        appModule.modulePlanIds
      );
    },
  },
};
