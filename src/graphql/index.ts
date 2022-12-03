import { join } from 'path';
// import { fileURLToPath } from 'url';
import { readdirSync, readFileSync } from 'fs';
import { resolvers } from './resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';

const gqlFiles = readdirSync(join(__dirname, './typeDefs'));

let typeDefs = '';
gqlFiles.forEach((file) => {
  typeDefs += readFileSync(join(__dirname, './typeDefs', file), {
    encoding: 'utf8',
  });
});

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
