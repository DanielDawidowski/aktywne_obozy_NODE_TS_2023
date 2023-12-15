import { Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";
import { chatService } from "@service/db/chat.service";
import { ISettingChatData } from "@chat/interfaces/settings.interface";

export class Edit {
  public async timeSettings(req: Request, res: Response): Promise<void> {
    const { startTime, endTime, startDay, endDay } = req.body;
    const { settingsId } = req.params;
    const settingsData: ISettingChatData = {
      startTime,
      endTime,
      startDay,
      endDay
    };

    await chatService.editSettingsChatToDB(settingsId, settingsData);
    res.status(HTTP_STATUS.OK).json({ message: "Chat settings updated successfully", settingsData });
  }
}
