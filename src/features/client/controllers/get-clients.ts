import { Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";
import { IClientDocument } from "@client/interfaces/client.interface";
import { clientService } from "@service/db/client.service";

const PAGE_SIZE = 10;

export class Get {
  public async clients(req: Request, res: Response): Promise<void> {
    const { page } = req.params;
    const skip: number = (parseInt(page) - 1) * PAGE_SIZE;
    const limit: number = PAGE_SIZE * parseInt(page);

    await clientService.getClients({}, skip, limit, { createdAt: -1 });
    await clientService.clientsCount();
    res.status(HTTP_STATUS.OK).json({ message: "All clients" });
  }

  public async client(req: Request, res: Response): Promise<void> {
    const { clientId } = req.params;
    const client: IClientDocument = await clientService.getClientById(clientId);
    res.status(HTTP_STATUS.OK).json({ message: "Client", client });
  }
}
