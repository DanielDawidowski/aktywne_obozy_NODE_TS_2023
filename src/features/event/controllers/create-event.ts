import { Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";
import { ObjectId } from "mongodb";
import { IEventDocument } from "@event/interfaces/event.interface";
import { joiValidation } from "@global/decorators/joi-validation.decorators";
import { eventSchema } from "@event/schemes/event.schema";
import { BadRequestError } from "@global/helpers/error-handler";
import { UploadApiResponse } from "cloudinary";
import { uploads } from "@global/helpers/cloudinary-upload";
import { Helpers } from "@global/helpers/helpers";
import { eventService } from "@service/db/event.service";

export class Create {
  @joiValidation(eventSchema)
  public async event(req: Request, res: Response): Promise<void> {
    const { name, eventType, price, discountPrice, startDate, endDate, image, address, attractions, extraAttractions, energyland, status } =
      req.body;

    const result: UploadApiResponse = (await uploads(image)) as UploadApiResponse;
    if (!result?.public_id) {
      throw new BadRequestError(result.message);
    }

    const eventObjectId: ObjectId = new ObjectId();
    const createdEvent: IEventDocument = {
      _id: eventObjectId,
      userId: req.currentUser!.userId,
      username: req.currentUser!.username,
      email: req.currentUser!.email,
      name,
      eventType,
      price,
      discountPrice,
      startDate,
      endDate,
      image: `https://res.cloudinary.com/dandawid/image/upload/v${result.version}/${result.public_id}`,
      address: {
        hotel: address.hotel,
        street: address.street,
        web: address.web
      },
      attractions,
      extraAttractions,
      imgVersion: result.version.toString(),
      imgId: result.public_id,
      status,
      energyland,
      createdAt: new Date()
    } as IEventDocument;

    // Add to redis cache
    const eventDataForCache: IEventDocument = Create.prototype.eventData(createdEvent, eventObjectId);
    eventDataForCache.image = `https://res.cloudinary.com/dandawid/image/upload/v${result.version}/${result.public_id}`;

    await eventService.addEventToDB(req.currentUser!.userId, createdEvent);

    res.status(HTTP_STATUS.CREATED).json({ message: "Dodano wyjazd" });
  }

  private eventData(data: IEventDocument, eventObjectId: ObjectId): IEventDocument {
    const {
      _id,
      username,
      name,
      email,
      eventType,
      price,
      discountPrice,
      startDate,
      endDate,
      address,
      attractions,
      extraAttractions,
      energyland,
      status
    } = data;
    return {
      _id: eventObjectId,
      userId: _id,
      username: Helpers.firstLetterUppercase(username),
      email,
      name,
      eventType,
      price,
      discountPrice,
      startDate,
      endDate,
      image: "",
      imgVersion: "",
      imgId: "",
      status,
      address,
      attractions,
      extraAttractions,
      energyland,
      createdAt: new Date()
    } as IEventDocument;
  }
}
