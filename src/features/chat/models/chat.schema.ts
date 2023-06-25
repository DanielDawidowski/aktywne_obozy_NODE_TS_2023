import mongoose, { Model, model, Schema } from "mongoose";
import { IMessageDocument } from "@chat/interfaces/chat.interface";

const messageSchema: Schema = new Schema({
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  senderUsername: { type: String, default: "" },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiverUsername: { type: String, default: "" },
  body: { type: String, default: "" },
  isRead: { type: Boolean, default: false },
  deleteForMe: { type: Boolean, default: false },
  deleteForEveryone: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const MessageModel: Model<IMessageDocument> = model<IMessageDocument>("Message", messageSchema, "Message");
export { MessageModel };
