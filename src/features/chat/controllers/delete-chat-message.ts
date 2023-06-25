import { Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";
import mongoose from "mongoose";
import { chatService } from "@service/db/chat.service";

export class Delete {
  public async markMessageAsDeleted(req: Request, res: Response): Promise<void> {
    const { messageId, type } = req.params;

    await chatService.markMessageAsDeleted(new mongoose.Types.ObjectId(messageId), type);

    res.status(HTTP_STATUS.OK).json({ message: "Message marked as deleted" });
  }
}
