import express, { Router } from "express";
import { Create } from "@email/controller/create-email";

class EmailRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post("/contact", Create.prototype.contact);

    return this.router;
  }
}

export const emailRoutes: EmailRoutes = new EmailRoutes();
