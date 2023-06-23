import { notificationService } from "@service/db/notification.service";
import { Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";

export class Delete {
  public async notification(req: Request, res: Response): Promise<void> {
    const { notificationId } = req.params;
    await notificationService.deleteNotification(notificationId);
    res.status(HTTP_STATUS.OK).json({ message: "Notification deleted successfully" });
  }
}
