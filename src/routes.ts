import { Application } from "express";
import { authRoutes } from "@auth/routes/auth.route";
import { currentUserRoutes } from "@auth/routes/current.route";
import { clientRoutes } from "@client/routes/client.route";
import { eventRoutes } from "@event/routes/event.route";
import { notificationRoutes } from "@notification/routes/notification.route";
import { emailRoutes } from "@email/routes/email.route";
import { chatRoutes } from "@chat/routes/chatRoutes";
import { userRoutes } from "@user/routes/user.routes";

const BASE_PATH = "/api/v1";

export default (app: Application) => {
  const routes = () => {
    app.use(BASE_PATH, authRoutes.routes());
    app.use(BASE_PATH, authRoutes.signoutRoute());
    app.use(BASE_PATH, currentUserRoutes.routes());
    app.use(BASE_PATH, eventRoutes.routes());
    app.use(BASE_PATH, clientRoutes.routes());
    app.use(BASE_PATH, notificationRoutes.routes());
    app.use(BASE_PATH, emailRoutes.routes());
    app.use(BASE_PATH, chatRoutes.routes());
    app.use(BASE_PATH, userRoutes.routes());
  };
  routes();
};
