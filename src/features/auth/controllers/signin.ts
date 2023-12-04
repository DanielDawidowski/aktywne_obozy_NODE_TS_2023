import { Request, Response } from "express";
import { config } from "@root/config";
import JWT from "jsonwebtoken";
import HTTP_STATUS from "http-status-codes";
import { authService } from "@service/db/auth.service";
import { BadRequestError } from "@global/helpers/error-handler";
import { IAuthDocument } from "@auth/interfaces/auth.interface";
import { IUserDocument } from "@user/interfaces/user.interface";
import { userService } from "@service/db/user.service";

export class SignIn {
  public async read(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const existingUser: IAuthDocument = await authService.getAuthUserByUsername(
      username
    );
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordsMatch: boolean = await existingUser.comparePassword(
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    const user: IUserDocument = await userService.getUserByAuthId(
      `${existingUser._id}`
    );
    const userJwt: string = JWT.sign(
      {
        userId: existingUser._id,
        uId: existingUser.uId,
        email: existingUser.email,
        username: existingUser.username,
        role: user.role,
      },
      config.JWT_TOKEN!
    );
    req.session = { jwt: userJwt };

    const userDocument: IUserDocument = {
      ...user,
      authId: existingUser!._id,
      username: existingUser!.username,
      email: existingUser!.email,
      uId: existingUser!.uId,
      createdAt: existingUser!.createdAt,
      role: user.role,
    } as IUserDocument;

    res.status(HTTP_STATUS.OK).json({
      message: "User login successfully",
      user: userDocument,
      token: userJwt,
    });
  }
}
