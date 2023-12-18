import { Document } from "mongoose";
import { ObjectId } from "mongodb";

export interface IUserDocument extends Document {
  _id: string | ObjectId;
  authId: string | ObjectId;
  uId?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: string;
  createdAt?: Date;
}

export interface IUser {
  _id: string | ObjectId;
  authId: string | ObjectId;
  uId: string;
  username: string;
  email: string;
  password?: string;
  role: string;
  createdAt: Date;
}

export interface IResetPasswordParams {
  username: string;
  email: string;
  ipaddress: string;
  date: string;
}

export interface ISearchUser {
  _id: string;
  username: string;
  email: string;
}

export interface ILogin {
  userId: string;
}

export interface IUserJobInfo {
  key?: string;
  value?: string;
}

export interface IUserJob {
  keyOne?: string;
  keyTwo?: string;
  key?: string;
  value?: string | IUserDocument;
}

export interface IEmailJob {
  receiverEmail: string;
  template: string;
  subject: string;
}

export interface IAllUsers {
  users: IUserDocument[];
}
