import { Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";
import { IEventDocument } from "@event/interfaces/event.interface";
import { eventService } from "@service/db/event.service";

const PAGE_SIZE = 10;

export class Get {
  public async events(req: Request, res: Response): Promise<void> {
    const { page } = req.params;
    const skip: number = (parseInt(page) - 1) * PAGE_SIZE;
    const limit: number = PAGE_SIZE * parseInt(page);
    const events = await eventService.getEvents({}, skip, limit, { createdAt: -1 });
    res.status(HTTP_STATUS.OK).json({ message: "All events", events });
  }

  public async event(req: Request, res: Response): Promise<void> {
    const { eventId } = req.params;
    const event: IEventDocument = await eventService.getEventById(eventId);
    res.status(HTTP_STATUS.OK).json({ message: "Event", event });
  }

  public async eventsWithImage(req: Request, res: Response): Promise<void> {
    const { page } = req.params;
    const skip: number = (parseInt(page) - 1) * PAGE_SIZE;
    const limit: number = PAGE_SIZE * parseInt(page);
    const events = await eventService.getEvents({ imgId: "$ne" }, skip, limit, { createdAt: -1 });
    res.status(HTTP_STATUS.OK).json({ message: "All events with images", events });
  }
}
