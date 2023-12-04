import { IUserDocument } from "@user/interfaces/user.interface";
import mongoose, { model, Model, Schema } from "mongoose";

const userSchema: Schema = new Schema({
  authId: { type: mongoose.Schema.Types.ObjectId, ref: "Auth", index: true },
  role: { type: String, default: "user" },
  username: { type: String, default: "" },
  passwordResetToken: { type: String, default: "" },
  passwordResetExpires: { type: Number },
});

const UserModel: Model<IUserDocument> = model<IUserDocument>(
  "User",
  userSchema,
  "User"
);
export { UserModel };
