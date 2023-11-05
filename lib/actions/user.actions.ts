'use server';
import Users from '../models/user.model';
import { connectToDB } from '../mongoose';

// get User by model
export const getUsersByModel = async () => {
  try {
    connectToDB();
    const result = await Users.find({});
    return result;
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
