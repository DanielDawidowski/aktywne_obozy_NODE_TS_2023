import { Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";
import mongoose from "mongoose";
// import { socketIOChatObject } from "@socket/chat";
import { joiValidation } from "@global/decorators/joi-validation.decorators";
import { markChatSchema } from "@chat/schemes/chat";
import { chatService } from "@service/db/chat.service";

export class Update {
  @joiValidation(markChatSchema)
  public async message(req: Request, res: Response): Promise<void> {
    const { senderId, receiverId } = req.body;
    // socketIOChatObject.emit("message read", updatedMessage);
    // socketIOChatObject.emit("chat list", updatedMessage);

    await chatService.markMessagesAsRead(new mongoose.Types.ObjectId(senderId), new mongoose.Types.ObjectId(receiverId));
    res.status(HTTP_STATUS.OK).json({ message: "Message marked as read" });
  }
}
