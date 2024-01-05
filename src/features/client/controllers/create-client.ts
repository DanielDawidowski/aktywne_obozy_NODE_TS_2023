import { clientService } from "@service/db/client.service";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import HTTP_STATUS from "http-status-codes";
import { joiValidation } from "@global/decorators/joi-validation.decorators";
import { clientSchema } from "@client/schemes/client.schema";
import { IClientDocument } from "@client/interfaces/client.interface";
// import { clientConfirmationTemplate } from "@service/emails/templates/client/client-confirmation-template";
import { mailTransport } from "@service/emails/mail.transport";
import { clientConfirmationTemplate } from "@service/emails/templates/client/client-confirmation-template";

export class Create {
  @joiValidation(clientSchema)
  public async client(req: Request, res: Response): Promise<void> {
    const { eventId, name, eventName, email, tel, birthDate, price } = req.body;

    const clientObjectId: ObjectId = new ObjectId();
    const createdClient: IClientDocument = {
      _id: clientObjectId,
      eventId,
      eventName,
      name,
      email,
      tel,
      birthDate,
      price,
      createdAt: new Date()
    } as IClientDocument;

    await clientService.addClientData(createdClient);

    const template: string = clientConfirmationTemplate.sendConfirmationToClient(name, eventName);
    const subject = `Potwierdzenie zgłoszenia na ${eventName}`;
    await mailTransport.sendEmail(email, subject, template);

    res.status(HTTP_STATUS.OK).json({ message: "Dziękujemy za zgłoszenie", client: createdClient });
  }
}
