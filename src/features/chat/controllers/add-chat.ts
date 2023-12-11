import { Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { chatService } from "@service/db/chat.service";
// import { IMessageData } from "@chat/interfaces/chat.interface";
import { IMessageData } from "@chat/interfaces/chat.interface";
import { socketIOChatObject } from "@root/shared/sockets/chat";
import Logger from "bunyan";
import { config } from "@root/config";
import { ISettingChatData } from "@chat/interfaces/settings.interface";

const log: Logger = config.createLogger("chat");

export class Add {
  public async message(req: Request, res: Response): Promise<void> {
    const { conversationId, receiverId, receiverName, body } = req.body;
    const messageObjectId: ObjectId = new ObjectId();
    const conversationObjectId: ObjectId = !conversationId ? new ObjectId() : new mongoose.Types.ObjectId(conversationId);

    const messageData: IMessageData = {
      _id: `${messageObjectId}`,
      conversationId: new mongoose.Types.ObjectId(conversationObjectId),
      receiverId,
      receiverName,
      senderName: `${req.currentUser!.username.toLowerCase()}`,
      senderId: `${req.currentUser!.userId}`,
      body,
      createdAt: new Date()
    };

    Add.prototype.emitSocketIOEvent(messageData);

    // if (!isRead) {
    //   Add.prototype.messageNotification({
    //     currentUser: req.currentUser!,
    //     message: body,
    //     receiverName: receiverName,
    //     receiverId,
    //     messageData
    //   });
    // }

    await chatService.addMessageToDB(messageData);

    res.status(HTTP_STATUS.OK).json({ message: "Message added", conversationId: conversationObjectId });
  }

  public async timeSettings(req: Request, res: Response): Promise<void> {
    const { startTime, endTime, startDay, endDay } = req.body;
    const settingObjectId: ObjectId = new ObjectId();

    const settingsData: ISettingChatData = {
      _id: `${settingObjectId}`,
      startTime,
      endTime,
      startDay,
      endDay
    };

    res.status(HTTP_STATUS.OK).json({ message: "Setting time added" });

    await chatService.addSettingsChatToDB(settingsData);
  }

  private emitSocketIOEvent(data: IMessageData): void {
    socketIOChatObject.emit("message received", data);
    socketIOChatObject.emit("chat list", data);
  }
}
