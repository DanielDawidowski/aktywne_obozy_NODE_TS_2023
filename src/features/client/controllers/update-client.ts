import { Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";
import { joiValidation } from "@global/decorators/joi-validation.decorators";
import { clientSchema } from "@client/schemes/client.schema";
import { IClientDocument } from "@client/interfaces/client.interface";
import { clientService } from "@service/db/client.service";

export class Update {
  @joiValidation(clientSchema)
  public async client(req: Request, res: Response): Promise<void> {
    const { eventId, name, email, tel, birthDate, price, eventName } = req.body;
    const { clientId } = req.params;
    const updatedClient: IClientDocument = {
      eventId,
      name,
      email,
      eventName,
      tel,
      birthDate,
      price
    } as IClientDocument;

    await clientService.editClient(clientId, updatedClient);
    res.status(HTTP_STATUS.OK).json({ message: "Event updated successfully" });
  }
}
