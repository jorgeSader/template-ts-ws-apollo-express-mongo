import { GraphQLError } from 'graphql';
// import validator from 'validator';
import { Template } from '../../../db/models';

export const templateMutations = {
  templateCreate: async (_: any, { input }: any) => {
    // Deconstruct input
    const {} = input;

    // Validate inputs

    // Create from model
    const template = new Template({});

    // Save to database
    try {
      return await template.save();
    } catch (error: any) {
      throw new GraphQLError(error, {
        extensions: {
          code: 'DB_REJECTION',
        },
      });
    }
  },

  templateUpdate: async (_: any) => {},
};
