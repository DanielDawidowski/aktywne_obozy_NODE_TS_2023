import mongoose, { model, Model, Schema } from "mongoose";
import { IEventDocument } from "@event/interfaces/event.interface";

const eventSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  username: { type: String },
  email: { type: String },
  name: { type: String, default: "" },
  eventType: { type: String, default: "" },
  price: { type: Number, default: 0 },
  discountPrice: { type: Number, default: 0 },
  startDate: { type: Date, default: "" },
  endDate: { type: Date, default: "" },
  address: {
    hotel: { type: String, default: "" },
    street: { type: String, default: "" },
    web: { type: String, default: "" }
  },
  attractions: [{ type: String, default: "" }],
  extraAttractions: [{ type: String, default: "" }],
  createdAt: { type: Date, default: Date.now },
  image: { type: String, default: "" },
  imgVersion: { type: String, default: "" },
  imgId: { type: String, default: "" },
  status: { type: String, default: "active" },
  energyland: { type: Boolean, default: false }
});

const EventModel: Model<IEventDocument> = model<IEventDocument>("Event", eventSchema, "Event");

export { EventModel };
