import { model, Schema } from 'mongoose';

const userAccountSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
    },
    legalName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
    },
    legalAddress: {
      address1: {
        type: String,
        trim: true,
      },
      address2: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      zipCode: {
        type: String,
        trim: true,
      },
    },
    activeAppModuleIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Module',
      },
    ],
    // TODO: FIXME: billing info will be outsourced to Stripe or similar
    billingInfo: {
      type: String,
      trim: true,
    },
    userIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    notes: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model('UserAccount', userAccountSchema);
