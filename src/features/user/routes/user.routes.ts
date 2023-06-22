import express, { Router } from "express";
import { Delete } from "@user/controllers/delete-user";
import { Get } from "@user/controllers/get-profile";

class UserRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.delete("/user/:userId", Delete.prototype.user);
    this.router.get("/user/profile/:userId", Get.prototype.profileByUserId);
    this.router.get("/user/all/:page", Get.prototype.users);
    return this.router;
  }
}

export const userRoutes: UserRoutes = new UserRoutes();
