import { Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";
import { joiValidation } from "@global/decorators/joi-validation.decorators";
import { eventSchema } from "@event/schemes/event.schema";
import { IEventDocument } from "@event/interfaces/event.interface";
import { BadRequestError } from "@global/helpers/error-handler";
import { UploadApiResponse } from "cloudinary";
import { uploads } from "@global/helpers/cloudinary-upload";
import { eventService } from "@service/db/event.service";

export class Update {
  @joiValidation(eventSchema)
  public async event(req: Request, res: Response): Promise<void> {
    const { imgId, imgVersion } = req.body;
    if (imgId && imgVersion) {
      Update.prototype.updateEvent(req);
    } else {
      const result: UploadApiResponse = await Update.prototype.addImageToExistingEvent(req);
      if (!result.public_id) {
        throw new BadRequestError(result.message);
      }
    }
    res.status(HTTP_STATUS.OK).json({ message: "Edytowano pomyślnie" });
  }

  private async updateEvent(req: Request): Promise<void> {
    const {
      name,
      eventType,
      price,
      discountPrice,
      startDate,
      endDate,
      imgVersion,
      imgId,
      address,
      attractions,
      extraAttractions,
      energyland,
      status
    } = req.body;
    const { eventId } = req.params;
    const updatedEvent: IEventDocument = {
      name,
      eventType,
      price,
      discountPrice,
      startDate,
      endDate,
      address,
      attractions,
      extraAttractions,
      energyland,
      status,
      imgId: imgId ? imgId : "",
      imgVersion: imgVersion ? imgVersion : ""
    } as IEventDocument;

    await eventService.editEvent(eventId, updatedEvent);
  }

  private async addImageToExistingEvent(req: Request): Promise<UploadApiResponse> {
    const { name, eventType, price, discountPrice, startDate, endDate, image, address, attractions, extraAttractions, energyland, status } =
      req.body;
    const { eventId } = req.params;
    const result: UploadApiResponse = (await uploads(image)) as UploadApiResponse;

    if (!result?.public_id) {
      return result;
    }
    const updatedEvent: IEventDocument = {
      name,
      eventType,
      price,
      discountPrice,
      startDate,
      endDate,
      address,
      attractions,
      extraAttractions,
      energyland,
      status,
      imgId: image ? result.public_id : "",
      imgVersion: image ? result.version.toString() : ""
    } as IEventDocument;

    updatedEvent.image = `https://res.cloudinary.com/dandawid/image/upload/v${result.version}/${result.public_id}`;

    await eventService.editEvent(eventId, updatedEvent);

    return result;
  }
}
