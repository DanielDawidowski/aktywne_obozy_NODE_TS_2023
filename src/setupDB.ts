import mongoose from "mongoose";
import Logger from "bunyan";
import { config } from "@root/config";

const log: Logger = config.createLogger("setupDatabase");

export default () => {
  const connect = () => {
    mongoose
      .connect(config.DB_URL!)
      .then(() => {
        log.info("Successfully connected to database.");
      })
      .catch((error) => {
        console.log("Error connecting to database", error);
        return process.exit(1);
      });
  };
  mongoose.set("strictQuery", true);
  connect();
  mongoose.connection.on("disconnected", connect);
};
