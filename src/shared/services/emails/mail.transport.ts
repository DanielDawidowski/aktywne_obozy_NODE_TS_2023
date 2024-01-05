import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import Logger from "bunyan";
import { config } from "@root/config";
import { BadRequestError } from "@global/helpers/error-handler";

interface IMailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const log: Logger = config.createLogger("mailOptions");

class MailTransport {
  public async sendEmail(receiverEmail: string, subject: string, body: string): Promise<void> {
    this.developmentEmailSender(receiverEmail, subject, body);
  }

  private async developmentEmailSender(receiverEmail: string, subject: string, body: string): Promise<void> {
    const transporter: Mail = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.SENDER_EMAIL, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
        pass: process.env.SENDER_EMAIL_PASSWORD // MAKE SURE THIS PASSWORD IS YOUR GMAIL APP PASSWORD WHICH YOU GENERATED EARLIER
      },
      tls: {
        ciphers: "SSLv3"
      }
    });

    const mailOptions: IMailOptions = {
      from: `Aktywne Obozy <${config.SENDER_EMAIL!}>`,
      to: receiverEmail,
      subject,
      html: body
    };

    try {
      await transporter.sendMail(mailOptions);
      log.info("Development email sent successfully.");
    } catch (error) {
      log.error("Error sending email", error);
      throw new BadRequestError("Error sending email");
    }
  }
}

export const mailTransport: MailTransport = new MailTransport();
