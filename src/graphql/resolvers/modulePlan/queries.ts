import { ObjectId } from 'mongodb';
import { ModulePlan } from '../../../db/models';

export const modulePlanQueries = {
  modulePlans: async () => ModulePlan.find(),
  modulePlan: async (_parent: any, { id }: ObjectId) => ModulePlan.findById(id),
};
