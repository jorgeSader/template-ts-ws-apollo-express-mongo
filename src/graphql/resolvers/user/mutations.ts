// import { Contact, Profile, User, UserAccount } from '../../../db/models';
// import bcrypt from 'bcryptjs';
// import { GraphQLError } from 'graphql';
// import JWT from 'jsonwebtoken';
// import {
//   validateEmail,
//   validateFullName,
//   validateAddress,
//   validatePassword,
//   validateText,
//   validateMongoIdArray,
// } from '../../../utils/validate';
// import { jwtSecret } from '../../../config/environment';

// interface UserCreateArgs {
//   fullName: string;
//   email: string;
//   password: string;
//   accountName: string;
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
//   notes: string | null;
// }

// // interface User {
// //   _id: string;
// //   email: string;
// //   profile: {
// //     userAccounts: typeof UserAccount[];
// //     contact: typeof Contact;
// //     image: typeof Image;
// //     bio: string;
// //     createdAt: string;
// //     updatedAt: string;
// //   };
// //   isActive: boolean;
// //   createdAt: string;
// //   updatedAt: string;
// // }

// interface AuthPayload {
//   userErrors: {
//     message: string;
//     code: string;
//   }[];
//   token: string | null;
// }

export const userMutations = {
  //   userCreate: async (
  //     _parent: any,
  //     {
  //       fullName,
  //       email,
  //       password,
  //       accountName,
  //       legalName,
  //       legalAddress,
  //       activeAppModuleIds,
  //     }: UserCreateArgs,
  //   ): Promise<AuthPayload> => {
  //     // Validate User Inputs
  //     const validFullName = validateFullName(fullName);
  //     const validEmail = validateEmail(email);
  //     const validPassword = validatePassword(password);
  //     const validAccountName = validateText(accountName, 3, 120);
  //     const validLegalName = validateText(legalName, 3, 360);
  //     const validLlegalAddress = validateAddress(legalAddress);
  //     const validActiveAppModuleIds = validateMongoIdArray(activeAppModuleIds);
  //     // Fetch data from Database
  //     // Check if user exists
  //     const existingUser = await User.findOne({ email: validEmail });
  //     if (existingUser) {
  //       return {
  //         userErrors: [
  //           {
  //             message: `There is already a user with that email, please login or enter a diferent email.`,
  //             code: 'BAD_USER_INPUT',
  //           },
  //         ],
  //         token: null,
  //       };
  //     }
  //     //==================================
  //     // Create new user
  //     let user = new User({
  //       email: validEmail,
  //       password:
  //         typeof validPassword === 'string'
  //           ? await bcrypt.hash(validPassword, 12)
  //           : null,
  //       profileId: '',
  //       isActive: true,
  //     });
  //     // Create new User Account
  //     const userAccount = new UserAccount({
  //       name: validAccountName,
  //       legalName: validLegalName,
  //       legalAddress: validLlegalAddress,
  //       activeAppModuleIds: validActiveAppModuleIds || [], // TODO: add default appModule Id.
  //       billingInfo: '', // TODO: outsource?
  //       userIds: [user.id],
  //     });
  //     // Create new Profile
  //     let profile = new Profile({
  //       userAccountIds: [userAccount._id],
  //       contactId: '', // gets added later
  //       image: {
  //         altText: `One of our favorite Users ;)`, // TODO:
  //         name: validFullName,
  //         path: '', // TODO:
  //       },
  //     });
  //     // Create new Contact
  //     let contact = new Contact({
  //       name: validFullName,
  //       titles: [
  //         {
  //           title: '',
  //           company: '',
  //         },
  //       ],
  //       emails: [
  //         {
  //           name: 'Account Default',
  //           address: user.email,
  //           isDefault: true,
  //         },
  //       ],
  //       phones: [
  //         {
  //           name: 'Mobile',
  //           phone: '', // TODO:
  //           extension: '', // TODO:
  //           isDefault: true,
  //         },
  //       ],
  //       adressess: [
  //         {
  //           name: 'Billing',
  //           address: {
  //             address1: userAccount.legalAddress?.address1,
  //             address2: userAccount.legalAddress?.address2,
  //             city: userAccount.legalAddress?.city,
  //             state: userAccount.legalAddress?.state,
  //             zipCode: userAccount.legalAddress?.zipCode,
  //           },
  //         },
  //       ],
  //       keyEvents: [
  //         {
  //           name: 'App Anniversary',
  //           date: Date.now(),
  //         },
  //       ],
  //       websites: [
  //         {
  //           name: '',
  //           address: '',
  //           isDefault: false,
  //         },
  //       ],
  //       notes: [
  //         {
  //           message: '',
  //           createdAt: '',
  //         },
  //       ],
  //       ownerId: user.id,
  //     });
  //     // Update with created fields
  //     user.profileId = profile.id;
  //     profile.contactId = contact._id;
  //     // Save to database
  //     try {
  //       await user.save();
  //       await userAccount.save();
  //       await profile.save();
  //       await contact.save();
  //       const token = await JWT.sign(
  //         {
  //           userId: user.id,
  //         },
  //         jwtSecret!,
  //         {
  //           expiresIn: '24h',
  //         }
  //       );
  //       return {
  //         userErrors: [],
  //         token,
  //       };
  //     } catch (error: any) {
  //       throw new GraphQLError(error, {
  //         extensions: {
  //           code: 'DB_REJECTION',
  //         },
  //       });
  //     }
  //   },
  //   userUpdate: async (_: any) => {},
};
