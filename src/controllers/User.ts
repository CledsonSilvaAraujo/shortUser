import userService from "../service/user.service";
import { NextFunction, Request, Response } from "express";

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {name} = req.body;

  const user = userService.createUser( name );
  return user
      .save()
      .then((user: unknown)=> res.status(201).json({ user }))
      .catch((error: unknown)=> res.status(500).json({ error}));
};

const readUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  const user = userService.findUser( userId );
  user
  .then((user: unknown) => (user? res.status(200).json({ user }) : res.status(404).json({
  message: 'Not found'})))
  .catch((error: unknown) => res.status(500).json({ error}));
};
const readAllUsers = (req: Request, res: Response, next: NextFunction) => {

  const user = userService.findUser('');

  user.then((user: unknown) => (user? res.status(200).json({ user }) : res.status(404).json({
  message: 'Not found'})))
  .catch((error: unknown) => res.status(500).json({ error}));
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  const user =  userService.updateUserById(userId, req.body);

  if(user) {
   return user
    .then((user: unknown)=> res.status(201).json({ user }))
    .catch((error: unknown)=> res.status(500).json({ error}));
  }
  else
  {
    return res.status(404).json({ message: 'Not found' });
  }

};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  const user = userService.deleteUser(userId);

  user
  .then((user: unknown) => (user? res.status(201).json({
    message: 'deleted' }) : res.status(404).json({
    message: 'Not found'
  })))
  .catch((error: unknown) => res.status(500).json({ error}));
};

export default {
  createUser,
  readUser,
  readAllUsers,
  updateUser,
  deleteUser,
}