import ShortLink from '../models/ShortLink';
import utils from '../util/utils';
import { ObjectId } from 'mongodb';
import  { FilterQuery, UpdateQuery } from 'mongoose';
import User from '../models/User';
import shortlinkService from './shortlink.service';

const sizeOfShortLink = 8;

const createUser = async ( name: string) => {
  try{
    
    if(name.length < 2 ) throw new Error("Name is to short");
    const user = new User({
      name: name
    });

    const shortLink = shortlinkService.createShortLink(user._id);
    user.shortLinksId = shortLink._id;
  
    await shortLink.save();
    await user.save();
    return user;
  }catch(error){
    return error;
  }
};

const findUser = async ( userId : string ) => {
  const id = userId.toString();
  return await User.findById(id).exec();
};


const updateUserById =  async ( userId: string , update: UpdateQuery<typeof User>) => {
  const id  = userId.toString();
  const filter: FilterQuery<typeof User> = { _id: new ObjectId(id) };
  return await User.findOneAndUpdate( filter, update).exec();
};

const deleteUser = async ( userId : string ) => {
  return await User.findByIdAndDelete(new ObjectId(userId.toString()));
};

const addLinkToUser =  async ( userId: string , link: string) => {
  const id  = userId.toString();
  const user =  await User.findById(id).exec();
  if(!user){ throw new Error( 'The User dosen\'t exist') }

  const  _id  = user.shortLinksId;
  const filter :  FilterQuery<typeof ShortLink> = { _id: new ObjectId(_id) };
  const shortenLink: string = utils.generateString(sizeOfShortLink).trim();
  const update = {
      $push :  {"userShortLinks": [{ "shortenLink" : `${shortenLink}`, "link": `${link}`}]}
  };
  const updatedShortLink= await ShortLink.findOneAndUpdate( filter, update).exec()
  return updatedShortLink;

};

const getUserShortLink =  async ( userId: string , shortLink: string) => {
  const id  = userId.toString();
  const object = await User.find({_id: id} , { "shortLinks" : { shortLink } } ).exec()
  return object;
};

export default {
  createUser,
  findUser,
  updateUserById,
  deleteUser,
  addLinkToUser,
  getUserShortLink,
}