import { Server, Socket } from "socket.io";
import Logger from "bunyan";
import { connectedUsersMap } from "./user";
import { config } from "@root/config";
import { ISenderReceiver } from "@chat/interfaces/chat.interface";

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
        log.info(`User ${senderName} with socket id ${senderSocketId} joined the room`);
        const receiverSocketId: string = connectedUsersMap.get(receiverName) as string;
        log.info(`User ${receiverName} with socket id ${receiverSocketId} joined the room`);
        socket.join(senderSocketId);
        socket.join(receiverSocketId);
      });
      // socket.on("message received", (data: IMessageData) => {
      //   log.info(`Message received: ${data}`);
      //   this.io.emit(`message received`, data);
      // });
    });
  }
}
