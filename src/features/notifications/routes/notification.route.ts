import express, { Router } from "express";
import { Update } from "@notification/controllers/update-notification";
import { Delete } from "@notification/controllers/delete-notification";
import { Get } from "@notification/controllers/get-notification";

class NotificationRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get("/notifications", Get.prototype.notifications);
    this.router.put("/notification/:notificationId", Update.prototype.notification);
    this.router.delete("/notification/:notificationId", Delete.prototype.notification);

    return this.router;
  }
}

export const notificationRoutes: NotificationRoutes = new NotificationRoutes();
