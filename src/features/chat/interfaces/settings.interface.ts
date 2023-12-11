import mongoose, { Document } from "mongoose";

export interface ISettingsChatDocument extends Document {
  _id: mongoose.Types.ObjectId;
  startTime: number;
  endTime: number;
  startDay: number;
  endDay: number;
}

export interface ISettingChatData {
  _id?: string | mongoose.Types.ObjectId;
  startTime: number;
  endTime: number;
  startDay: number;
  endDay: number;
}
