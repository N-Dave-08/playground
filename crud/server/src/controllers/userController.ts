import { Request, Response } from 'express';
import * as UserModel from '../models/userModel';

export const getUsers = async (req: Request, res: Response) => {
  const users = await UserModel.getAllUsers();
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = await UserModel.getUserById(id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const newUser = await UserModel.createUser(req.body);
  res.status(201).json(newUser);
};

export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updatedUser = await UserModel.updateUser(id, req.body);
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await UserModel.deleteUser(id);
  res.status(204).send();
};
