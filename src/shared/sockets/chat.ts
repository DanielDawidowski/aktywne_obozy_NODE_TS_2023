import { ISenderReceiver } from "./../../features/chat/interfaces/chat.interface";
import { Server, Socket } from "socket.io";
import Logger from "bunyan";
import { config } from "@root/config";
import { connectedUsersMap } from "./user";

const log: Logger = config.createLogger("chat");

export let socketIOChatObject: Server;

export class SocketIOChatHandler {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    socketIOChatObject = io;
  }

  public listen(): void {
    this.io.on("connection", (socket: Socket) => {
      socket.on("join room", (users: ISenderReceiver) => {
        const { senderName, receiverName } = users;
        const senderSocketId: string = connectedUsersMap.get(senderName) as string;
        log.info(`senderName --- ${senderName} with socketId ${senderSocketId} joinned room`);
        const receiverSocketId: string = connectedUsersMap.get(receiverName) as string;
        log.info(`receiverName --- ${receiverName} with socketId ${receiverSocketId} joinned room`);
        socket.join(senderSocketId);
        socket.join(receiverSocketId);
      });
    });
  }
}
