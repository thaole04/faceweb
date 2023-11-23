'use server';
import Users from '../models/user.model';
import Control from '../models/control.model';
import { connectToDB } from '../mongoose';

// get User by model
export const getUsersByModel = async () => {
  try {
    connectToDB();
    const result = await Users.find({});
    return JSON.parse(JSON.stringify(result));
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUsersByModelForCheck = async () => {
  try {
    connectToDB();
    const result = await Users.find({});
    return JSON.parse(JSON.stringify(result));
  } catch (error: any) {
    throw new Error(error);
  }
};

// create User by model
export const createUserByModel = async (user: any) => {
  try {
    connectToDB();
    const result = await Users.create(user);
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Insert User by model
export const insertUserByModel = async (user: any) => {
  try {
    connectToDB();
    const result = await Users.insertMany(user);
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Insert Control by model
export const insertControlByModel = async (control: any) => {
  try {
    connectToDB();
    const result = await Control.insertMany(control);
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Delete User by username
export const deleteUserByUsername = async (username: string) => {
  try {
    connectToDB();
    const result = await Users.deleteOne({ username: username });
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};
