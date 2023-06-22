import express, { Router } from "express";
import { Delete } from "@auth/controllers/delete-auth";
import { Password } from "@auth/controllers/password";
import { SignIn } from "@auth/controllers/signin";
import { SignOut } from "@auth/controllers/signout";
import { SignUp } from "@auth/controllers/signup";

class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post("/signup", SignUp.prototype.create);
    this.router.post("/signin", SignIn.prototype.read);
    this.router.post("/forgot-password", Password.prototype.create);
    this.router.post("/reset-password/:token", Password.prototype.update);
    this.router.delete("/auth/:authId", Delete.prototype.auth);

    return this.router;
  }

  public signoutRoute(): Router {
    this.router.get("/signout", SignOut.prototype.update);

    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
