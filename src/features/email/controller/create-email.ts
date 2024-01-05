import { Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";
import { joiValidation } from "@global/decorators/joi-validation.decorators";
import { contactAdminTemplate } from "@service/emails/templates/contact/contact-admin-template";
import { emailSchema } from "@email/schemes/email.schema";
import { IContactTemplate } from "@email/interface/email.interface";
import { config } from "@root/config";
import { mailTransport } from "@service/emails/mail.transport";

export class Create {
  @joiValidation(emailSchema)
  public async contact(req: Request, res: Response): Promise<void> {
    const { senderName, email, message } = req.body;
    const templateParams: IContactTemplate = {
      senderName,
      email,
      message
    } as IContactTemplate;

    const template: string = contactAdminTemplate.sendMessageToAdmin(templateParams);
    const subject = `Nowa wiadomość od ${senderName}`;
    await mailTransport.sendEmail(config.SENDER_EMAIL!, subject, template);

    res.status(HTTP_STATUS.OK).json({ message: "Wiadomość wysłana" });
  }
}
