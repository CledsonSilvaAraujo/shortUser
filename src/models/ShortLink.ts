import { Document, Schema } from "mongoose";
import mongoose  from "mongoose";

export interface IShortLink {
  userShortLinks: Array<object> | null;
}

export interface IShortLinkModel extends IShortLink, Document {}

const ShortLinkSchema: Schema = new Schema(
  {
    userShortLinks: { type: Array<object> , require: false }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model<IShortLinkModel>('ShortLink',ShortLinkSchema);