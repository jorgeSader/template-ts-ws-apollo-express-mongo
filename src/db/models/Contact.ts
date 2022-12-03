import { model, Schema } from 'mongoose';

const ContactSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    titles: [
      {
        title: String!,
        company: String!,
      },
    ],
    emails: [
      {
        name: String!,
        address: String!,
        isDefault: Boolean!,
      },
    ]!,
    phones: [
      {
        name: String!,
        phone: String!,
        extension: String,
        isDefault: Boolean!,
      },
    ]!,
    adressess: [
      {
        name: String!,
        address: {
          address1: String!,
          address2: String,
          city: String!,
          state: String!,
          zipCode: String,
        },
      },
    ]!,
    keyEvents: [
      {
        name: String!,
        date: Date!,
      },
    ]!,
    websites: [
      {
        name: String!,
        address: String!,
        isDefault: Boolean!,
      },
    ]!,
    notes: [
      {
        message: String!,
        createdAt: Date!,
        updatedAt: Date!,
      },
    ]!,
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },

  {
    timestamps: true,
  }
);

export default model('Contact', ContactSchema);
