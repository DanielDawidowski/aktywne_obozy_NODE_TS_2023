import mongoose from "mongoose";
import { UserModel } from "@user/models/user.model";
// import { Helpers } from "@global/helpers/helpers";
import { IUserDocument } from "@user/interfaces/user.interface";

class UserService {
  public async addUserData(data: IUserDocument): Promise<void> {
    await UserModel.create(data);
  }

  // public async getUserById(userId: string): Promise<IUserDocument> {
  //   const users: IUserDocument[] = await UserModel.aggregate([
  //     { $match: { _id: new mongoose.Types.ObjectId(userId) } },
  //     { $lookup: { from: "Auth", localField: "authId", foreignField: "_id", as: "authId" } },
  //     { $unwind: "$authId" },
  //     { $project: this.aggregateProject() }
  //   ]);
  //   return users[0];
  // }

  public async getUserById(authId: string): Promise<IUserDocument> {
    const user: IUserDocument = (await UserModel.findOne({ authId })) as IUserDocument;
    return user;
  }

  public async getAllUsers(userId: string, skip: number, limit: number): Promise<IUserDocument[]> {
    const users: IUserDocument[] = await UserModel.aggregate([
      { $match: { _id: { $ne: new mongoose.Types.ObjectId(userId) } } },
      { $skip: skip },
      { $limit: limit },
      { $sort: { createdAt: -1 } },
      { $lookup: { from: "Auth", localField: "authId", foreignField: "_id", as: "authId" } },
      { $unwind: "$authId" },
      { $project: this.aggregateProject() }
    ]);
    return users;
  }

  public async getUserByAuthId(authId: string): Promise<IUserDocument> {
    const users: IUserDocument[] = await UserModel.aggregate([
      { $match: { authId: new mongoose.Types.ObjectId(authId) } },
      { $lookup: { from: "Auth", localField: "authId", foreignField: "_id", as: "authId" } },
      { $unwind: "$authId" },
      { $project: this.aggregateProject() }
    ]);
    return users[0];
  }

  public async deleteUser(value: string): Promise<IUserDocument> {
    const deleteUser: IUserDocument = (await UserModel.deleteOne({ _id: value })) as unknown as IUserDocument;
    return deleteUser;
  }

  private aggregateProject() {
    return {
      _id: 1,
      username: "$authId.username",
      uId: "$authId.uId",
      email: "$authId.email",
      role: "$authId.role",
      createdAt: "$authId.createdAt",
      notifications: 1
    };
  }
}

export const userService: UserService = new UserService();
