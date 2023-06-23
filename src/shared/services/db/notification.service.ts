import { INotificationDocument } from "@notification/interfaces/notification.interface";
import { NotificationModel } from "@notification/models/notification.model";
import mongoose from "mongoose";

class NotificationService {
  public async getNotifications(userId: string): Promise<INotificationDocument[]> {
    const notifications: INotificationDocument[] = await NotificationModel.aggregate([
      { $match: { userTo: new mongoose.Types.ObjectId(userId) } },
      { $lookup: { from: "User", localField: "userFrom", foreignField: "_id", as: "userFrom" } },
      { $unwind: "$userFrom" },
      { $lookup: { from: "Auth", localField: "userFrom.authId", foreignField: "_id", as: "authId" } },
      { $unwind: "$authId" },
      {
        $project: {
          _id: 1,
          message: 1,
          createdAt: 1,
          createdItemId: 1,
          entityId: 1,
          notificationType: 1,
          event: 1,
          read: 1,
          userTo: 1,
          userFrom: {
            username: "$authId.username",
            uId: "$authId.uId"
          }
        }
      }
    ]);
    return notifications;
  }

  public async updateNotification(notificationId: string): Promise<void> {
    await NotificationModel.updateOne({ _id: notificationId }, { $set: { read: true } }).exec();
  }

  public async deleteNotification(notificationId: string): Promise<void> {
    await NotificationModel.deleteOne({ _id: notificationId }).exec();
  }
}

export const notificationService: NotificationService = new NotificationService();
