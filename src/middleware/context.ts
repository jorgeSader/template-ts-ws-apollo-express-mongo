import { getUserFromToken } from '../utils/getUserFromToken';

export const context = async ({ req }: any) => {
  const token = await req.headers.authorization;
  const userInfo = token ? getUserFromToken(token) : null;
  console.log('🚀 ~ file: context.ts:6 ~ context ~ userInfo: ', userInfo);

  return {
    userInfo,
  };
};

// const token = (await req.headers.token)?.toString() || '';
// return token ? await getUserFromToken(token) : null;
