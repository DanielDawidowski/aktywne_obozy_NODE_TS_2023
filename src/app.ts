import express, { Express } from "express";
import { AOServer } from "@root/setupServer";
import dbConnection from "@root/setupDB";
import { config } from "@root/config";

class Application {
  public initialize(): void {
    this.loadConfig();
    dbConnection();
    const app: Express = express();
    const server: AOServer = new AOServer(app);
    server.start();
  }

  private loadConfig(): void {
    config.validateConfig();
    config.cloudinaryConfig();
  }
}

const application: Application = new Application();
application.initialize();
