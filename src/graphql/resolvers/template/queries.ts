import { Template } from '../../../db/models';

export const templateQueries = {
  templates: async () => Template.find(),
  template: async (_: any, { id }: any) => Template.findById(id),
};
