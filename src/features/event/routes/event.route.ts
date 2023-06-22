import express, { Router } from "express";
import { Create } from "@event/controllers/create-event";
import { Get } from "@event/controllers/get-events";
import { Delete } from "@event/controllers/delete-event";
import { Update } from "@event/controllers/update.event";
import { authMiddleware } from "@global/helpers/auth-middleware";

class EventRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get("/event/all/:page", Get.prototype.events);
    this.router.get("/event/images/:page", Get.prototype.eventsWithImage);
    this.router.get("/event/:eventId", Get.prototype.event);
    this.router.post("/event", authMiddleware.verifyUser, Create.prototype.event);
    this.router.post("/event/image/event", authMiddleware.verifyUser, Create.prototype.eventWithImage);
    this.router.delete("/event/:eventId", authMiddleware.verifyUser, Delete.prototype.event);
    this.router.put("/event/:eventId", authMiddleware.verifyUser, Update.prototype.event);
    this.router.put("/event/image/:eventId", authMiddleware.verifyUser, Update.prototype.eventWithImage);
    return this.router;
  }
}

export const eventRoutes: EventRoutes = new EventRoutes();
