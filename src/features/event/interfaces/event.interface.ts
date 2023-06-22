import { ObjectId } from "mongodb";
import mongoose, { Document } from "mongoose";

export interface IEventDocument extends Document {
  _id?: string | mongoose.Types.ObjectId;
  userId: string;
  username: string;
  email: string;
  name: string;
  eventType: string;
  price: number;
  discountPrice?: number;
  startDate: Date;
  endDate: Date;
  address?: IEventAddress;
  attractions?: string[];
  extraAttractions?: string[];
  image?: string;
  imgVersion?: string;
  imgId?: string;
  status: string;
  energyland: boolean;
  createdAt?: Date;
}

export interface IEventAddress {
  hotel?: string;
  street?: string;
  web?: string;
}

export interface IGetEventQuery {
  _id?: ObjectId | string;
  imgId?: string;
}

export interface ISaveEventToCache {
  key: ObjectId | string;
  currentUserId: string;
  uId: string;
  createdEvent: IEventDocument;
}

export interface IEventJobData {
  key?: string;
  value?: IEventDocument;
  keyOne?: string;
  keyTwo?: string;
}

export interface IQueryComplete {
  ok?: number;
  n?: number;
}

export interface IQueryDeleted {
  deletedCount?: number;
}
