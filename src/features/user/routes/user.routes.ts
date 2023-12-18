import express, { Router } from "express";
import { Delete } from "@user/controllers/delete-user";
import { Get } from "@user/controllers/get-profile";
import { authMiddleware } from "@global/helpers/auth-middleware";

class UserRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.delete("/user/:userId", Delete.prototype.user);
    this.router.get("/user/profile/:userId", Get.prototype.profileByUserId);
    this.router.get("/user/all/:page", Get.prototype.users);
    this.router.get("/admins", Get.prototype.admins);
    return this.router;
  }
}

export const userRoutes: UserRoutes = new UserRoutes();
