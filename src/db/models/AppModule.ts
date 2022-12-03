import { model, Schema } from 'mongoose';

const AppModuleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 50,
      unique: true,
    },
    description: {
      type: String,
      require: true,
      trim: true,
      minLength: 3,
      maxLength: 1500,
    },
    rolIds: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      trim: true,
    },
    modulePlanIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ModulePlan',
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model('AppModule', AppModuleSchema);
