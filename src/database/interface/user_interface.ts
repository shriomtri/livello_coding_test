import { Document } from "mongoose";

export interface IUser extends Document {
    id: string;
    name: string;
    hobbies: string[];
    createdAt: string | any;
    updatedAt: string | any;
  }
  