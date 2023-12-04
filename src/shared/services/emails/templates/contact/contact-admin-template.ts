import fs from "fs";
import ejs from "ejs";
import { IContactTemplate } from "@root/features/email/interface/email.interface";

class ContactAdminTemplate {
  public sendMessageToAdmin(templateParams: IContactTemplate): string {
    const { senderName, email, message } = templateParams;

    return ejs.render(fs.readFileSync(__dirname + "/contact-admin-template.ejs", "utf8"), {
      senderName,
      email,
      message,
      image_url: "https://i.ibb.co/S617hrN/Logo.jpg"
    });
  }
}

export const contactAdminTemplate: ContactAdminTemplate = new ContactAdminTemplate();
