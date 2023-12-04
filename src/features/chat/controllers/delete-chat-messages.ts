import { Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";
import { chatService } from "@service/db/chat.service";

export class Delete {
  public async messages(req: Request, res: Response): Promise<void> {
    const { conversationId, userId } = req.params;
    await chatService.deleteChatMessagesAndUser(conversationId, userId);
    res.status(HTTP_STATUS.OK).json({ message: "Messages deleted successfully" });
  }
}
