import { Document, Schema } from "mongoose";
import mongoose  from "mongoose";

export interface IUser {
  name: string;
  shortLink: Array<string> | null;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    shortLink: { type: [String], require: false }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model<IUserModel>('User',UserSchema);