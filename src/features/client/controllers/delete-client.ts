import { Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";
import { clientService } from "@service/db/client.service";

export class Delete {
  public async client(req: Request, res: Response): Promise<void> {
    await clientService.deleteClient(req.params.clientId);
    res.status(HTTP_STATUS.OK).json({ message: "Client deleted successfully" });
  }
}
