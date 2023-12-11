import { Model, model, Schema } from "mongoose";
import { ISettingsChatDocument } from "@chat/interfaces/settings.interface";

const settingsChatSchema: Schema = new Schema({
  startTime: { type: String, default: 0 },
  endTime: { type: String, default: 0 },
  startDay: { type: String, default: 0 },
  endDay: { type: String, default: 0 }
});

const SettingsChatModel: Model<ISettingsChatDocument> = model<ISettingsChatDocument>("Settings", settingsChatSchema, "Settings");
export { SettingsChatModel };
