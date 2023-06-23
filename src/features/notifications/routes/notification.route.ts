import express, { Router } from "express";
import { authMiddleware } from "@global/helpers/auth-middleware";
import { Update } from "@notification/controllers/update-notification";
import { Delete } from "@notification/controllers/delete-notification";
import { Get } from "@notification/controllers/get-notification";

class NotificationRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get("/notifications", authMiddleware.verifyUser, Get.prototype.notifications);
    this.router.put("/notification/:notificationId", authMiddleware.verifyUser, Update.prototype.notification);
    this.router.delete("/notification/:notificationId", authMiddleware.verifyUser, Delete.prototype.notification);

    return this.router;
  }
}

export const notificationRoutes: NotificationRoutes = new NotificationRoutes();
