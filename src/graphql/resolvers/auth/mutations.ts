import { Contact, Profile, User, UserAccount } from '../../../db/models';
import bcrypt from 'bcryptjs';
import { GraphQLError } from 'graphql';
import JWT from 'jsonwebtoken';
import {
  validateEmail,
  validateFullName,
  validateAddress,
  validatePassword,
  validatePhoneNumber,
  validateText,
  validateMongoIdArray,
} from '../../../utils/validate';
import { jwtSecret } from '../../../config/environment';

interface SignInArgs {
  email: string;
  password: string;
}
interface SignUpArgs {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  accountName: string;
  legalName: string;
  legalAddress: {
    name: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
  };
  activeAppModuleIds: string[];
  notes: string | null;
}

interface AuthPayload {
  userErrors: {
    message: string;
    code: string;
    field: string[];
  }[];
  token: string | null;
}

export const authMutations = {
  signUp: async (
    _parent: any,
    {
      fullName,
      email,
      password,
      phoneNumber,
      accountName,
      legalName,
      legalAddress,
      activeAppModuleIds,
    }: SignUpArgs
  ): Promise<AuthPayload> => {
    // Validate User Inputs
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);
    const validFullName = validateFullName(fullName);
    const validPhoneNumber = validatePhoneNumber(phoneNumber);
    const validAccountName = validateText('accountName', accountName, 3, 120);
    const validLegalName = validateText('legalName', legalName, 3, 360);
    const validLegalAddress = validateAddress(legalAddress);
    const validActiveAppModuleIds = validateMongoIdArray(
      'activeAppModuleIds',
      activeAppModuleIds
    );

    // Check if user exists
    const existingUser = await User.findOne({ email: validEmail });

    if (existingUser) {
      throw new GraphQLError(
        `There is already a user with that email, please login or enter a diferent email.`,
        {
          extensions: {
            code: 'BAD_USER_INPUT',
            field: `email: ${email}`,
          },
        }
      );
    }

    // Create new user
    const user = new User({
      email: validEmail,
      password:
        typeof validPassword === 'string'
          ? await bcrypt.hash(validPassword, 12)
          : null,
      profileId: '',
      isActive: true,
    });

    // Create new User Account
    const userAccount = new UserAccount({
      name: validAccountName,
      phone: validPhoneNumber,
      legalName: validLegalName,
      legalAddress: validLegalAddress,
      activeAppModuleIds: validActiveAppModuleIds || [
        '63716a25fbc102c857968162',
      ], // TODO: add default appModule Id.
      billingInfo: 'probably outsourced', // TODO: outsource?
      userIds: [user.id],
    });

    // Create new Profile
    const profile = new Profile({
      userAccountIds: [userAccount._id],
      contactId: '', // gets added later

      image: {
        altText: `One of our favorite Users ;)`, // TODO:
        name: validFullName,
        path: '', // TODO:
      },
    });

    // Create new Contact
    const contact = new Contact({
      name: validFullName,
      emails: [
        {
          name: 'Account Default',
          address: user.email,
          isDefault: true,
        },
      ],
      phones: [
        {
          name: 'Mobile',
          phone: validPhoneNumber.number, // TODO:
          extension: validPhoneNumber.extension,
          isDefault: true,
        },
      ],
      adressess: [
        {
          name: 'Billing',
          address: {
            address1: userAccount.legalAddress?.address1,
            address2: userAccount.legalAddress?.address2,
            city: userAccount.legalAddress?.city,
            state: userAccount.legalAddress?.state,
            zipCode: userAccount.legalAddress?.zipCode,
          },
        },
      ],
      keyEvents: [
        {
          name: 'App Anniversary',
          date: Date(),
        },
      ],
      ownerId: user.id,
    });

    // Update models with newly created fields
    user.profileId = profile.id;
    profile.contactId = contact._id;

    // Save to database
    try {
      await user.save();
      await profile.save();
      await contact.save();
      await userAccount.save();

      // Create JSON Web Token
      const token = await JWT.sign(
        {
          userId: user.id,
        },
        jwtSecret!,
        {
          expiresIn: '24h',
        }
      );
      return {
        userErrors: [],
        token,
      };
    } catch (error: any) {
      throw new GraphQLError(error, {
        extensions: {
          code: 'DB_REJECTION',
          field: ['Save to database event'],
        },
      });
    }
  },

  signIn: async (
    _: any,
    { email, password }: SignInArgs
  ): Promise<AuthPayload> => {
    // Check user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new GraphQLError(`Invalid User or password`, {
        extensions: {
          code: 'BAD_USER_INPUT',
          field: [`email: ${email}`, `password: ${password}`],
        },
      });
    }

    // Check that entered pasword matches stored password.
    const pwdIsMatch = await bcrypt.compare(password, user.password);
    if (!pwdIsMatch) {
      throw new GraphQLError(`Invalid User or password`, {
        extensions: {
          code: 'BAD_USER_INPUT',
          field: [`email: ${email}`, `password: ${password}`],
        },
      });
    }

    // Return new token with userId
    return {
      userErrors: [],
      token: JWT.sign({ userId: user.id }, jwtSecret!, { expiresIn: '24h' }),
    };
  },

  logOut: async (_parent: any, _args: any, context: any) => {
    console.log(
      '🚀 ~ file: mutations.ts:234 ~ logOut: ~ context',
      context.userId
    );
    return;
  },
};
