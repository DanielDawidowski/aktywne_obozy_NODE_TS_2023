import fs from "fs";
import ejs from "ejs";

class ClientConfirmationTemplate {
  public sendConfirmationToClient(clientName: string, eventName: string): string {
    const imageUrl = "https://i.ibb.co/S617hrN/Logo.jpg";

    return ejs.render(fs.readFileSync(__dirname + "/client-confirmation-template.ejs", "utf8"), {
      clientName,
      eventName,
      image_url: imageUrl
    });
  }
}

export const clientConfirmationTemplate: ClientConfirmationTemplate = new ClientConfirmationTemplate();
