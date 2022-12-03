import { GraphQLError } from 'graphql';
import JWT from 'jsonwebtoken';
import { jwtSecret } from '../config/environment';

export const getUserFromToken = (token: string) => {
  try {
    const jwtPayload = JWT.verify(token, jwtSecret!);
    return jwtPayload;
  } catch (err: any) {
    throw new GraphQLError(err, {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });
  }
};
