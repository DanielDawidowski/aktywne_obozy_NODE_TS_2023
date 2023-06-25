import express, { Router } from "express";
import { authMiddleware } from "@global/helpers/auth-middleware";
import { Add } from "@chat/controllers/add-chat-message";
import { Get } from "@chat/controllers/get-chat-message";
import { Delete } from "@chat/controllers/delete-chat-message";
import { Update } from "@chat/controllers/update-chat-message";

class ChatRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post("/chat/message", authMiddleware.verifyUser, Add.prototype.message);
    this.router.get("/chat/message/conversation-list", authMiddleware.verifyUser, Get.prototype.conversationList);
    this.router.get("/chat/message/user/:receiverId", authMiddleware.verifyUser, Get.prototype.messages);
    this.router.put("/chat/message/mark-as-read", authMiddleware.verifyUser, Update.prototype.message);
    this.router.delete("/chat/message/mark-as-deleted/:messageId/:type", authMiddleware.verifyUser, Delete.prototype.markMessageAsDeleted);

    return this.router;
  }
}

export const chatRoutes: ChatRoutes = new ChatRoutes();
