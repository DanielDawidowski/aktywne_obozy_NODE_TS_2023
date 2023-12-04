import { Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";
import { IUserDocument } from "@user/interfaces/user.interface";
import { userService } from "@service/db/user.service";

const PAGE_SIZE = 12;

export class Get {
  public async profile(req: Request, res: Response): Promise<void> {
    const existingUser: IUserDocument = await userService.getUserById(`${req.currentUser!.userId}`);
    res.status(HTTP_STATUS.OK).json({ message: "Get user profile", user: existingUser });
  }

  public async profileByUserId(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    const existingUser: IUserDocument = await userService.getUserById(userId);
    res.status(HTTP_STATUS.OK).json({ message: "Get user profile by id", user: existingUser });
  }

  public async users(req: Request, res: Response): Promise<void> {
    const { page } = req.params;
    const skip: number = (parseInt(page) - 1) * PAGE_SIZE;
    const limit: number = PAGE_SIZE * parseInt(page);
    const users = await userService.getAllUsers(`${req.currentUser!.userId}`, skip, limit);
    res.status(HTTP_STATUS.OK).json({ message: "All Users", users });
  }

  public async admins(req: Request, res: Response): Promise<void> {
    const admin: IUserDocument[] = await userService.getAllAdminUsers();
    res.status(HTTP_STATUS.OK).json({ message: "All admins", admin });
  }
}
