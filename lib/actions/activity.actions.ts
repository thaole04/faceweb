'use server';
// export async function
import Activities from '../models/activity.model';
import Control from '../models/control.model';

import { connectToDB } from '../mongoose';

export const getActivities = async () => {
  try {
    connectToDB();
    const activities = await Activities.find();
    return activities;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getControls = async () => {
  try {
    connectToDB();
    const controls = await Control.find();
    return controls;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createActivity = async (activity: any) => {
  try {
    connectToDB();
    const newActivity = await Activities.create(activity);
    return newActivity;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createControl = async (control: any) => {
  try {
    connectToDB();
    const newControl = await Control.create(control);
    return newControl;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const fetchActivity = async (username: string) => {
  try {
    connectToDB();
    const activity = await Activities.findOne({ username: username });
    return activity;
  } catch (error: any) {
    throw new Error(error);
  }
};
