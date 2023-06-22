import { Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";
import { userService } from "@service/db/user.service";

export class Delete {
  public async user(req: Request, res: Response): Promise<void> {
    await userService.deleteUser(req.params.userId);
    res.status(HTTP_STATUS.OK).json({ message: "User deleted successfully" });
  }
}
