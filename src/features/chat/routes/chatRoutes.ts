import express, { Router } from "express";
import { authMiddleware } from "@global/helpers/auth-middleware";
import { Add } from "@chat/controllers/add-chat";
import { Get } from "@chat/controllers/get-chat-message";
import { Delete } from "@chat/controllers/delete-chat-messages";
import { Edit } from "@chat/controllers/edit-chat-settings";

class ChatRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post("/chat/message", authMiddleware.verifyUser, Add.prototype.message);
    this.router.post("/chat/settings", authMiddleware.verifyUser, Add.prototype.timeSettings);
    this.router.get("/chat/message/conversation-list", authMiddleware.verifyUser, Get.prototype.conversationList);
    this.router.get("/chat/message/user/:receiverId", authMiddleware.verifyUser, Get.prototype.messages);
    this.router.get("/chat/settings/list", authMiddleware.verifyUser, Get.prototype.settings);
    this.router.put("/chat/settings/:settingsId", authMiddleware.verifyUser, Edit.prototype.timeSettings);
    this.router.delete("/chat/message/:conversationId/:userId", authMiddleware.verifyUser, Delete.prototype.messages);
    return this.router;
  }
}

export const chatRoutes: ChatRoutes = new ChatRoutes();
