import { Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";
import { IEventDocument } from "@event/interfaces/event.interface";
import { eventService } from "@service/db/event.service";

export class Get {
  public async events(req: Request, res: Response): Promise<void> {
    const events = await eventService.getEvents();
    res.status(HTTP_STATUS.OK).json({ message: "All events", events });
  }

  public async event(req: Request, res: Response): Promise<void> {
    const { eventId } = req.params;
    const event: IEventDocument = await eventService.getEventById(eventId);
    res.status(HTTP_STATUS.OK).json({ message: "Event", event });
  }
}
