import express, { Router } from "express";
import { authMiddleware } from "@global/helpers/auth-middleware";
import { Add } from "@chat/controllers/add-chat";
import { Get } from "@chat/controllers/get-chat-message";
import { Delete } from "@chat/controllers/delete-chat-messages";
import { Edit } from "@chat/controllers/edit-chat";

class ChatRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post("/chat/message", authMiddleware.verifyUser, Add.prototype.message);
    this.router.post("/chat/settings", Add.prototype.timeSettings);
    this.router.get("/chat/message/conversation-list", authMiddleware.verifyUser, Get.prototype.conversationList);
    this.router.get("/chat/message/user/:receiverId", Get.prototype.messages);
    this.router.get("/chat/settings/list", Get.prototype.settings);
    this.router.put("/chat/settings/:settingsId", Edit.prototype.timeSettings);
    this.router.delete("/chat/message/:conversationId/:userId", Delete.prototype.messages);
    return this.router;
  }
}

export const chatRoutes: ChatRoutes = new ChatRoutes();
