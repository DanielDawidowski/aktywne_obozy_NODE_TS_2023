import { authRoutes } from "@auth/routes/auth.route";
import { currentUserRoutes } from "@auth/routes/current.route";
import { clientRoutes } from "@client/routes/client.route";
import { eventRoutes } from "@event/routes/event.route";
import { Application } from "express";

const BASE_PATH = "/api/v1";

export default (app: Application) => {
  const routes = () => {
    app.use(BASE_PATH, authRoutes.routes());
    app.use(BASE_PATH, authRoutes.signoutRoute());
    app.use(BASE_PATH, currentUserRoutes.routes());
    app.use(BASE_PATH, eventRoutes.routes());
    app.use(BASE_PATH, clientRoutes.routes());
  };
  routes();
};
