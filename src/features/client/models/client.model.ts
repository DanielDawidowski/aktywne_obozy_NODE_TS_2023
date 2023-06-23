import mongoose, { model, Model, Schema } from "mongoose";
import { IClientDocument } from "@client/interfaces/client.interface";

const clientSchema: Schema = new Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", index: true },
  eventName: { type: String },
  name: { type: String },
  email: { type: String },
  tel: { type: String, default: "" },
  birthDate: { type: String, default: "" },
  price: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

const ClientModel: Model<IClientDocument> = model<IClientDocument>("Client", clientSchema, "Client");

export { ClientModel };
