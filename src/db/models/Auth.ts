import { model, Schema } from 'mongoose';

const AuthSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      require: true,
      minLength: 3,
    },
  },

  {
    timestamps: true,
  }
);

export default model('Auth', AuthSchema);
