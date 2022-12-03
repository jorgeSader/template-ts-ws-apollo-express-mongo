import { GraphQLError } from 'graphql';
// import validator from 'validator';
import { ModulePlan } from '../../../db/models';
import { validateText } from '../../../utils/validate';

export const modulePlanMutations = {
  modulePlanCreate: async (_: any, { input }: any) => {
    // Deconstruct input
    const {
      name,
      description,
      freeTrialPeriod,
      setupFee,
      paymentFrequency,
      basePrice,
      pricePerUser,
      sellingPoints,
    } = input;

    // Validate inputs
    validateText('name', name, 3, 50);
    validateText('description', description, 3, 1500);

    // Create from model
    const modulePlan = new ModulePlan({
      name,
      description,
      freeTrialPeriod,
      setupFee,
      paymentFrequency,
      basePrice,
      pricePerUser,
      sellingPoints,
    });

    // Save to database
    try {
      return await modulePlan.save();
    } catch (error: any) {
      throw new GraphQLError(error, {
        extensions: {
          code: 'DB_REJECTION',
        },
      });
    }
  },

  modulePlanUpdate: async (_: any) => {},
};
