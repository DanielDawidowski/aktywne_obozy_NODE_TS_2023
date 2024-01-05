import express, { Router } from "express";
import { Create } from "@client/controllers/create-client";
import { Get } from "@client/controllers/get-clients";
import { Delete } from "@client/controllers/delete-client";
import { Update } from "@client/controllers/update-client";

class ClientRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get("/client/all/:page", Get.prototype.clients);
    this.router.get("/client/:clientId", Get.prototype.client);
    this.router.post("/client", Create.prototype.client);
    this.router.delete("/client/:clientId", Delete.prototype.client);
    this.router.delete("/clients", Delete.prototype.clients);
    this.router.put("/client/:clientId", Update.prototype.client);

    return this.router;
  }
}

export const clientRoutes: ClientRoutes = new ClientRoutes();
