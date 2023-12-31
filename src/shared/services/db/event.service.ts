import { UpdateQuery } from "mongoose";
import { UserModel } from "@user/models/user.model";
import { IEventDocument } from "@event/interfaces/event.interface";
import { EventModel } from "@event/models/event.model";
import { IUserDocument } from "@user/interfaces/user.interface";

class EventService {
  public async addEventToDB(userId: string, createdEvent: IEventDocument): Promise<void> {
    const event: Promise<IEventDocument> = EventModel.create(createdEvent);
    const user: UpdateQuery<IUserDocument> = UserModel.updateOne({ _id: userId }, { $inc: { eventCount: 1 } });
    await Promise.all([event, user]);
  }

  public async getEvents(): Promise<IEventDocument[]> {
    const events: IEventDocument[] = await EventModel.find({});
    return events;
  }

  public async getEventById(eventId: string): Promise<IEventDocument> {
    const event: IEventDocument = (await EventModel.findById(eventId)) as IEventDocument;
    return event;
  }

  public async eventsCount(): Promise<number> {
    const count: number = await EventModel.find({}).countDocuments();
    return count;
  }

  public async deleteEvent(eventId: string): Promise<IEventDocument> {
    const deleteEvent: IEventDocument = (await EventModel.deleteOne({ _id: eventId })) as unknown as IEventDocument;
    return deleteEvent;
  }

  public async editEvent(eventId: string, updatedEvent: IEventDocument): Promise<void> {
    const updateEvent: UpdateQuery<IEventDocument> = EventModel.updateOne({ _id: eventId }, { $set: updatedEvent });
    await Promise.all([updateEvent]);
  }
}

export const eventService: EventService = new EventService();
