import { GraphQLError } from 'graphql';
import { AppModule } from '../../../db/models';
import {
  validateMongoId,
  validateMongoIdArray,
  validateText,
} from '../../../utils/validate';

export const appModuleMutations = {
  appModuleCreate: async (_: any, { input }: any) => {
    // Deconstruct input
    const { name, description } = input;

    // Validate inputs
    validateText('name', name, 3, 50);
    validateText('description', description, 3, 1500);

    // Create from model
    const appModule = new AppModule({
      name,
      description,
      modulePlanIds: [],
    });

    // Save to database
    try {
      return await appModule.save();
    } catch (error: any) {
      throw new GraphQLError(error, {
        extensions: {
          code: 'DB_REJECTION',
        },
      });
    }
  },

  appModuleUpdate: async (_: any, { input }: any) => {
    // Deconstruct input
    const { id, name, description, modulePlanIds } = input;

    // Validate inputs
    validateText('name', name, 3, 50);
    validateText('description', description, 3, 1500);
    validateMongoId('appModule', id);
    validateMongoIdArray('modulePlanIds', modulePlanIds);

    // Verify existance
    const currentAppModule = AppModule.findById(id);
    if (!currentAppModule) {
      throw new GraphQLError(
        `Invalid Id. No App Module was found with id '${id}'`,
        {
          extensions: {
            code: 'DB_RECORD_NOT_FOUND',
          },
        }
      );
    }

    // Create from model
    const appModule = new AppModule({
      name,
      description,
      modulePlanIds: [],
    });

    // Save to database
    try {
      return await appModule.save();
    } catch (error: any) {
      throw new GraphQLError(error, {
        extensions: {
          code: 'DB_REJECTION',
        },
      });
    }
  },
};
