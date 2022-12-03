import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },

    profileId: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        trim: true,
      },
    ],

    isActive: {
      type: Boolean,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model('User', userSchema);
