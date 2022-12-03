import Mongoose from 'mongoose';
import { mongo } from '../config/environment';

let isConnected: any;
let db: any;

const connectDB = async () => {
  if (isConnected) return db;

  try {
    db = await Mongoose.connect(<string>mongo.uri);
    isConnected = db.connections[0].readyState;
    return db;
  } catch (err: any) {
    throw new Error(err);
  }
};

export default connectDB;
