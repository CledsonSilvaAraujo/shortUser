import { ObjectId } from 'mongodb';
import  mongoose, { FilterQuery, UpdateQuery } from 'mongoose';
import User, { IUser } from '../models/User';

const createUser = async ( name: string) => {
  const user = new User({
    name: name
  });
  await user.save();
  return user;
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
  const filter :  FilterQuery<typeof User> = { _id: new ObjectId(id) };
  const update = { $push: {"shortLink": link} }
  return await User.findOneAndUpdate( filter, update).exec();
};

const getUserShortLink =  async ( userId: string , linkId: number) => {
  const id  = userId.toString();
  const object = await User.find({_id: id} , { "shortLink" : { $slice : [linkId , linkId] } } ).exec()
  const link = object[0].shortLink ?  object[0].shortLink[0] : null;
  return link;
};

export default {
  createUser,
  findUser,
  updateUserById,
  deleteUser,
  addLinkToUser,
  getUserShortLink,
}