import JWT from 'jsonwebtoken';
import { jwtSecret } from '../config/environment';
import { User } from '../db/models';

export const getUserFromToken = async (token: string) => {
  try {
    const tokenPayload = (await JWT.verify(token, jwtSecret!)) as {
      userId: string;
    };
    const userInfo = await User.findById(tokenPayload.userId);
    return userInfo;
  } catch (err: any) {
    return null;
  }
};
