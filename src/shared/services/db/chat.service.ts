import { IMessageData } from "@chat/interfaces/chat.interface";
import { IConversationDocument } from "@chat/interfaces/conversation.interface";
import { ConversationModel } from "@chat/models/conversation.schema";
import { MessageModel } from "@chat/models/chat.schema";
import { ObjectId } from "mongodb";

import { config } from "@root/config";
import Logger from "bunyan";
import { IUserDocument } from "@user/interfaces/user.interface";
import { UserModel } from "@user/models/user.model";
const log: Logger = config.createLogger("chat");

class ChatService {
  public async addMessageToDB(data: IMessageData): Promise<void> {
    const conversation: IConversationDocument[] = await ConversationModel.find({
      _id: data?.conversationId
    }).exec();
    if (conversation.length === 0) {
      await ConversationModel.create({
        _id: data?.conversationId,
        senderId: data.senderId,
        receiverId: data.receiverId
      });
    }

    await MessageModel.create({
      _id: data._id,
      conversationId: data.conversationId,
      receiverId: data.receiverId,
      receiverName: data.receiverName,
      senderName: data.senderName,
      senderId: data.senderId,
      body: data.body,
      createdAt: data.createdAt
    });
  }

  public async getUserConversationList(userId: ObjectId): Promise<IMessageData[]> {
    const messages: IMessageData[] = await MessageModel.aggregate([
      { $match: { $or: [{ senderId: userId }, { receiverId: userId }] } },
      {
        $group: {
          _id: "$conversationId",
          result: { $last: "$$ROOT" }
        }
      },
      {
        $project: {
          _id: "$result._id",
          conversationId: "$result.conversationId",
          receiverId: "$result.receiverId",
          receiverName: "$result.receiverName",
          senderName: "$result.senderName",
          senderId: "$result.senderId",
          body: "$result.body",
          isRead: "$result.isRead",
          createdAt: "$result.createdAt"
        }
      },
      { $sort: { createdAt: 1 } }
    ]);
    return messages;
  }

  public async getMessages(senderId: ObjectId, receiverId: ObjectId, sort: Record<string, 1 | -1>): Promise<IMessageData[]> {
    const query = {
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    };
    const messages: IMessageData[] = await MessageModel.aggregate([{ $match: query }, { $sort: sort }]);
    return messages;
  }

  public async markMessageAsDeleted(messageId: ObjectId, type: string): Promise<void> {
    if (type === "deleteForMe") {
      await MessageModel.updateOne({ _id: messageId }, { $set: { deleteForMe: true } }).exec();
    } else {
      await MessageModel.updateOne({ _id: messageId }, { $set: { deleteForMe: true, deleteForEveryone: true } }).exec();
    }
  }

  public async markMessagesAsRead(senderId: ObjectId, receiverId: ObjectId): Promise<void> {
    const query = {
      $or: [
        { senderId, receiverId, isRead: false },
        { senderId: receiverId, receiverId: senderId, isRead: false }
      ]
    };
    await MessageModel.updateMany(query, { $set: { isRead: true } }).exec();
  }

  public async deleteChatMessagesAndUser(conversationId: string, userId: string): Promise<void> {
    await MessageModel.deleteMany({ conversationId }).exec();
    await ConversationModel.deleteOne({ _id: conversationId }).exec();
    await UserModel.deleteOne({ _id: userId }).exec();
  }
}

export const chatService: ChatService = new ChatService();
