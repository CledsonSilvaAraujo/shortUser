import { ObjectId } from 'mongodb';
import mongoose, { FilterQuery, UpdateQuery } from 'mongoose';
import ShortLink from '../models/ShortLink';
import userService from './user.service';

const createShortLink = ( userId: string) => {
  const shortLink = new ShortLink({
    _id: new mongoose.Types.ObjectId(),
    userId,
  });
  return shortLink;
};


const updateShortLinkById =  async ( userId: string  , update: UpdateQuery<typeof ShortLink>) => {
  const user  = await  userService.findUser( userId );
  if(!user) throw new Error("No user found");
  const id  = user.shortLinksId.toString();
  const filter: FilterQuery<typeof ShortLink> = { _id: new ObjectId(id) };
  return await ShortLink.findOneAndUpdate( filter, update).exec();
};

const deleteShortLink = async ( shortLinkId : string ) => {
  return await ShortLink.findByIdAndDelete(new ObjectId(shortLinkId.toString()));
};
const findUrlOfShortLink = async (shortLinkId: string) => {
  const shortLinks = await ShortLink.find({"userShortLinks": {$elemMatch:{$elemMatch:{shortenLink: shortLinkId}}}});
  if(!shortLinks[0]?.userShortLinks) return null;
  const url : any = shortLinks[0].userShortLinks.find((elem: Array<Array<object>>) => {
    if(elem[0].shortenLink.toString() === shortLinkId) return true;
    return false;
  });
  if( !url ) return null;
  return url[0].link.toString();
} 

export default {
  createShortLink,
  updateShortLinkById,
  deleteShortLink,
  findUrlOfShortLink,
}