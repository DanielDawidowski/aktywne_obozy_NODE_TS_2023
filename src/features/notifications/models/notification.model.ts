import { INotificationDocument, INotification } from "@notification/interfaces/notification.interface";
import { notificationService } from "@service/db/notification.service";
import mongoose, { model, Model, Schema } from "mongoose";

const notificationSchema: Schema = new Schema({
  userTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  userFrom: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  read: { type: Boolean, default: false },
  message: { type: String, default: "" },
  notificationType: String,
  entityId: mongoose.Types.ObjectId,
  createdItemId: mongoose.Types.ObjectId,
  event: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now() }
});

notificationSchema.methods.insertNotification = async function (body: INotification) {
  const { userTo, userFrom, message, notificationType, entityId, createdItemId, createdAt, event } = body;

  await NotificationModel.create({
    userTo,
    userFrom,
    message,
    notificationType,
    entityId,
    createdItemId,
    createdAt,
    event
  });
  try {
    const notifications: INotificationDocument[] = await notificationService.getNotifications(userTo);
    return notifications;
  } catch (error) {
    return error;
  }
};

const NotificationModel: Model<INotificationDocument> = model<INotificationDocument>("Notification", notificationSchema, "Notification");
export { NotificationModel };
