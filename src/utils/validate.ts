import { GraphQLError } from 'graphql';
import validator from 'validator';

interface Address {
  name: string;
  address1: string;
  address2: string | null;
  city: string;
  state: string;
  zipCode: string;
}

export const validateText = (
  fieldName: string,
  text: string,
  min: number,
  max: number
) => {
  const isValidText = text && text.length >= min && text.length <= max;
  if (!isValidText) {
    throw new GraphQLError(
      `${fieldName} field is required and its content between ${min} and ${max} characters long.`,
      {
        extensions: {
          code: 'BAD_USER_INPUT',
          field: `${fieldName}: ${text}`,
        },
      }
    );
  }
  return text;
};

export const validateMongoId = (fieldName: string, id: string) => {
  if (!validator.isMongoId(id)) {
    throw new GraphQLError(`Invalid ID. ${id} is not a valid ID.`, {
      extensions: {
        code: 'BAD_USER_INPUT',
        field: `${fieldName}: ${id}`,
      },
    });
  }
  return id;
};

export const validateMongoIdArray = (fieldName: string, ids: string[]) => {
  ids.map((id) => {
    validateMongoId(fieldName, id);
  });
  return ids;
};

export const validateEmail = (email: string) => {
  const isValidEmail = validator.isEmail(email);
  if (!isValidEmail) {
    throw new GraphQLError(`Please enter a valid email`, {
      extensions: {
        code: 'BAD_USER_INPUT',
        field: `email: ${email}`,
      },
    });
  }
  return email;
};

export const validatePassword = (password: string) => {
  const isStrongPassword = validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });

  if (!isStrongPassword) {
    throw new GraphQLError(
      `Insecure Password. Must be 8+ characters long with at least 1 lowercase letter, 1 upprecase letter, 1 number, and one symbol.`,
      {
        extensions: {
          code: 'BAD_USER_INPUT',
          field: `password: ${password}`,
        },
      }
    );
  }
  return password;
};

export const validateFullName = (fullName: string) => {
  const trimmedInput = fullName.trim();
  const hasBlankInBetween = validator.contains(trimmedInput, ' ');

  const isLongEnough = validator.isLength(trimmedInput, { min: 5 });

  if (!hasBlankInBetween || !isLongEnough) {
    throw new GraphQLError(`Please enter a valid Full Name`, {
      extensions: {
        code: 'BAD_USER_INPUT',
        field: `fullName: ${fullName}`,
      },
    });
  }
  return trimmedInput;
};

export const validateAddress = (address: Address) => {
  const { name, address1, city, state, zipCode } = address;

  // const validName = validateText('name', name, 3, 150);
  const validAddress1 = validateText('address1', address1, 3, 350);
  const validCity = validateText('city', city, 3, 150);
  const validState = validateText('state', state, 2, 150);
  const validZipCode = validateText('zipCode', zipCode, 3, 150);

  if (
    // !validName ||
    !validAddress1 ||
    !validCity ||
    !validState ||
    !validZipCode
  ) {
    return {
      userErrors: [
        {
          message: `Please enter a valid address`,
          code: 'BAD_USER_INPUT',
          field: `${name}: ${address.name}`,
        },
      ],
      token: null,
    };
  }

  return address;
};

export const validatePhoneNumber = (phoneNumber: string) => {
  const phone = { number: '', extension: '' };
  const numbersWithX = phoneNumber.replace(/[^0-9x]/gi, '');
  const hasExtension = numbersWithX.includes('x' || 'X');

  if (hasExtension) {
    const splitNumber = numbersWithX.split('x');

    phone.number = splitNumber[0];
    phone.extension = splitNumber[splitNumber.length - 1];
  } else {
    phone.number = numbersWithX;
  }

  const isValidPhoneNumber =
    phone.number.length >= 10 && phone.number.length <= 12;
  if (!isValidPhoneNumber) {
    return {
      userErrors: [
        {
          message: 'Invalid Phone. Please enter a valid Phone Number',
          code: 'BAD_USER_INPUT',
          field: `phoneNumber: ${phoneNumber}`,
        },
      ],
    };
  }
  return {
    number: phone.number,
    extension: phone.extension,
  };
};
