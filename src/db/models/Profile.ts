import { model, Schema } from 'mongoose';

const ProfileSchema = new Schema(
  {
    userAccountIds: [
      {
        type: Schema.Types.ObjectId,
        require: true,
        unique: true,
        trim: true,
      },
    ],
    contactId: {
      type: Schema.Types.ObjectId,
      ref: 'Contacts',
    },
    image: {
      name: String!,
      altText: String,
      path: String!,
    },
    bio: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

export default model('Profile', ProfileSchema);
