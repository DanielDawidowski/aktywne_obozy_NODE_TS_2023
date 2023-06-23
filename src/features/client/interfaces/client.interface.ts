import { ObjectId } from "mongodb";
import mongoose, { Document } from "mongoose";

export interface IClientDocument extends Document {
  _id?: string | mongoose.Types.ObjectId;
  eventId: string;
  eventName: string;
  name: string;
  email: string;
  tel: string;
  birthDate: string;
  price: string;
  createdAt?: Date;
}

export interface IGetClientQuery {
  _id?: ObjectId | string;
  name?: string;
}

export interface ISaveClientToCache {
  key: ObjectId | string;
  createdClient: IClientDocument;
}

export interface IClientJobData {
  key?: ObjectId | string;
  value?: IClientDocument;
  keyOne?: string;
  keyTwo?: string;
}
