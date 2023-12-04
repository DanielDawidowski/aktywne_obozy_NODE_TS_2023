import mongoose, { Model, model, Schema } from "mongoose";
import { IMessageDocument } from "@chat/interfaces/chat.interface";

const messageSchema: Schema = new Schema({
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  senderName: { type: String, default: "" },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiverName: { type: String, default: "" },
  body: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const MessageModel: Model<IMessageDocument> = model<IMessageDocument>(
  "Message",
  messageSchema,
  "Message"
);
export { MessageModel };
