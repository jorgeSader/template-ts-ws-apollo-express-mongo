import { model, Schema } from 'mongoose';

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      uppercase: true,
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

export default model('Role', RoleSchema);
