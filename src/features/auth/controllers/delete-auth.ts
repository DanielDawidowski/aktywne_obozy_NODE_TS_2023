import { authService } from "@service/db/auth.service";
import { Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";

export class Delete {
  public async auth(req: Request, res: Response): Promise<void> {
    const { authId } = req.params;
    authService.deleteAuthUser(authId);
    res.status(HTTP_STATUS.OK).json({ message: "Auth User deleted successfully" });
  }
}
