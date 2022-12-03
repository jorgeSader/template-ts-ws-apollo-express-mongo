import { model, Schema } from 'mongoose';

const ModulePlanSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      min: 3,
      max: 50,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      require: true,
      min: 3,
      max: 50,
      trim: true,
    },
    freeTrialPeriod: {
      type: Number,
      require: true,
      min: 0,
    },
    setupFee: {
      type: Number,
      require: true,
      min: 0,
    },
    paymentFrequency: {
      type: Number,
      require: true,
    },
    basePrice: {
      type: Number,
      require: true,
      min: 0,
    },
    pricePerUser: {
      type: Number,
      require: true,
      min: 0,
    },
    sellingPoints: {
      type: String,
      min: 3,
    },
  },
  {
    timestamps: true,
  }
);

export default model('ModulePlan', ModulePlanSchema);
