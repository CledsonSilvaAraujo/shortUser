import { Document, Schema } from "mongoose";
import mongoose  from "mongoose";
import { ObjectId } from "mongodb";

export interface IUser {
  name: string;
  shortLinksId: ObjectId;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    shortLinksId: { type: ObjectId, require: true}
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model<IUserModel>('User',UserSchema);