import mongoose, { Document } from "mongoose";

export interface ISettingsChatDocument extends Document {
  _id: mongoose.Types.ObjectId;
  startTime: string;
  endTime: string;
  startDay: string;
  endDay: string;
}

export interface ISettingChatData {
  _id?: string | mongoose.Types.ObjectId;
  startTime: string;
  endTime: string;
  startDay: string;
  endDay: string;
}
