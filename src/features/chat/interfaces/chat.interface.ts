import mongoose, { Document } from "mongoose";
import { AuthPayload } from "@auth/interfaces/auth.interface";

export interface IMessageDocument extends Document {
  _id: mongoose.Types.ObjectId;
  conversationId: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  senderName: string;
  receiverName: string;
  body: string;
  createdAt: Date;
}

export interface IMessageData {
  _id: string | mongoose.Types.ObjectId;
  conversationId: mongoose.Types.ObjectId;
  receiverId: string;
  receiverName: string;
  senderName: string;
  senderId: string;
  body: string;
  createdAt: Date | string;
}

export interface IMessageNotification {
  currentUser: AuthPayload;
  message: string;
  receiverName: string;
  receiverId: string;
  messageData: IMessageData;
}

export interface IChatUsers {
  userOne: string;
  userTwo: string;
}

export interface IChatList {
  receiverId: string;
  conversationId: string;
}

export interface ITyping {
  sender: string;
  receiver: string;
}

export interface IChatJobData {
  senderId?: mongoose.Types.ObjectId | string;
  receiverId?: mongoose.Types.ObjectId | string;
  messageId?: mongoose.Types.ObjectId | string;
  senderName?: string;
  reaction?: string;
  type?: string;
}

export interface ISenderReceiver {
  senderId: string;
  receiverId: string;
  senderName: string;
  receiverName: string;
}

export interface IGetMessageFromCache {
  index: number;
  message: string;
  receiver: IChatList;
}

export interface IChatUser {
  _id: string;
  username: string;
  email: string;
}
