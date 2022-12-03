// import { UserAccount } from '../../../db/models';

// interface UserAccountCreateArgs {
//   name: string;
//   legalName: string;
//   legalAddress: {
//     name: string;
//     address: {
//       address1: string;
//       address2: string;
//       city: string;
//       state: string;
//       zipCode: string;
//     };
//   };
//   activeAppModuleIds: string[];
//   billingInfo: string | null;
//   userIds: string[];
//   ownerId: string;
//   notes: string[] | null;
// }
// interface UserAccountPayload {
//   userErrors: {
//     message: string;
//     code: string;
//     field: string;
//   }[];
//   userAccount: typeof UserAccount;
// }

export const userAccountMutations = {
  // userAccountCreate: async (
  //   _parent: any,
  //   {
  //     name,
  //     legalName,
  //     legalAddress,
  //     activeAppModuleIds,
  //     billingInfo,
  //     userIds,
  //     ownerId,
  //     notes,
  //   }: UserAccountCreateArgs,
  // ): Promise<UserAccountPayload> => {
  //   const userAccount = new UserAccount({
  //     name,
  //     legalName,
  //     legalAddress,
  //     activeAppModuleIds,
  //     billingInfo,
  //     userIds,
  //     ownerId,
  //     notes,
  //   });
  //   return {
  //     userErrors: [],
  //     userAccount,
  //     // userAccount,
  //   };
  // },
  // userAccountUpdate: async (_: any) => {},
};
