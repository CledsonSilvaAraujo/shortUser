import { ObjectId } from 'mongodb';
import mongoose, { UpdateQuery } from 'mongoose';
import User from '../models/User';

const createUser = ( name: string) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name
  });
  return user;
};

const findUser = ( userId : string | object ) => {
  const filter = userId ? { _id: new ObjectId(userId.toString()) } : {};
  
  return User.find(filter);
};


const updateUserById =  ( userId: string , update: UpdateQuery<typeof User>) => {
  const filter = { _id: new ObjectId(userId.toString())}
  const user = User.findOneAndUpdate( filter, update ,{
    new: true
  });
  return user;
};

const deleteUser = ( userId : string ) => {
  return User.findByIdAndDelete(new ObjectId(userId.toString()));
};

export default {
  createUser,
  findUser,
  updateUserById,
  deleteUser,
}