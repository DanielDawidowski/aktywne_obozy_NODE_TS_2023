import { Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";
import mongoose from "mongoose";
import { chatService } from "@service/db/chat.service";
import { IMessageData } from "@chat/interfaces/chat.interface";
import { ISettingChatData } from "@chat/interfaces/settings.interface";

export class Get {
  public async conversationList(req: Request, res: Response): Promise<void> {
    let list: IMessageData[] = [];

    list = await chatService.getUserConversationList(new mongoose.Types.ObjectId(req.currentUser!.userId));

    res.status(HTTP_STATUS.OK).json({ message: "User conversation list", list: list });
  }

  public async messages(req: Request, res: Response): Promise<void> {
    const { receiverId } = req.params;

    let messages: IMessageData[] = [];

    messages = await chatService.getMessages(
      new mongoose.Types.ObjectId(req.currentUser!.userId),
      new mongoose.Types.ObjectId(receiverId),
      { createdAt: 1 }
    );

    res.status(HTTP_STATUS.OK).json({ message: "User chat messages", messages });
  }

  public async settings(req: Request, res: Response): Promise<void> {
    const chatSettings: ISettingChatData[] = await chatService.getSettings();
    res.status(HTTP_STATUS.OK).json({ message: "Chat settings", chatSettings });
  }
}
