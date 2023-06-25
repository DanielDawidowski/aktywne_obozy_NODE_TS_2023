import { Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";
import { joiValidation } from "@global/decorators/joi-validation.decorators";
import { addChatSchema } from "@chat/schemes/chat";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { socketIOChatObject } from "@socket/chat";
import { chatService } from "@service/db/chat.service";
// import { IMessageData } from "@chat/interfaces/chat.interface";

import { IMessageData, IMessageNotification } from "@chat/interfaces/chat.interface";
import { IUserDocument } from "@user/interfaces/user.interface";
import { INotificationTemplate } from "@notification/interfaces/notification.interface";
import { notificationTemplate } from "@service/emails/templates/notifications/notification-template";
import { userService } from "@service/db/user.service";
import { mailTransport } from "@service/emails/mail.transport";

export class Add {
  @joiValidation(addChatSchema)
  public async message(req: Request, res: Response): Promise<void> {
    const { conversationId, receiverId, receiverUsername, body, isRead } = req.body;
    const messageObjectId: ObjectId = new ObjectId();
    const conversationObjectId: ObjectId = !conversationId ? new ObjectId() : new mongoose.Types.ObjectId(conversationId);

    const messageData: IMessageData = {
      _id: `${messageObjectId}`,
      conversationId: new mongoose.Types.ObjectId(conversationObjectId),
      receiverId,
      receiverUsername,
      senderUsername: `${req.currentUser!.username}`,
      senderId: `${req.currentUser!.userId}`,
      body,
      isRead,
      createdAt: new Date(),
      deleteForEveryone: false,
      deleteForMe: false
    };

    Add.prototype.emitSocketIOEvent(messageData);

    // if (!isRead) {
    //   Add.prototype.messageNotification({
    //     currentUser: req.currentUser!,
    //     message: body,
    //     receiverName: receiverUsername,
    //     receiverId,
    //     messageData
    //   });
    // }

    await chatService.addMessageToDB(messageData);

    res.status(HTTP_STATUS.OK).json({ message: "Message added", conversationId: conversationObjectId });
  }

  private emitSocketIOEvent(data: IMessageData): void {
    socketIOChatObject.emit("message received", data);
    socketIOChatObject.emit("chat list", data);
  }

  private async messageNotification({ currentUser, message, receiverName, receiverId }: IMessageNotification): Promise<void> {
    const receiver: IUserDocument = (await userService.getUserById(`${receiverId}`)) as IUserDocument;
    console.log("receiver: ", receiver);
    const templateParams: INotificationTemplate = {
      username: receiverName,
      message,
      header: `Message notification from ${currentUser.username}`
    };
    const template: string = notificationTemplate.notificationMessageTemplate(templateParams);
    const subject = `Otrzymałeś wiadomość od ${currentUser.username}`;
    await mailTransport.sendEmail(receiver.email!, subject, template);
  }
}
