import nodemailer from "nodemailer";
import logger from "../logger";
import * as dotenv from "dotenv";

dotenv.config();

const USER_ADDRESS: string | undefined = process.env.USER_ADDRESS;
const USER_PASSWORD: string | undefined = process.env.USER_PASSWORD;
const RECIPIENT_ADDRESS: string | undefined = process.env.RECIPIENT_ADDRESS;

function sendEmail(): void {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: USER_ADDRESS,
      pass: USER_PASSWORD,
    },
  });

  const mailOptions = {
    from: USER_ADDRESS,
    to: RECIPIENT_ADDRESS,
    subject: "Temat wiadomości",
    text: "Treść wiadomości",
  };

  transporter.sendMail(mailOptions, (error: Error | null, info: any) => {
    if (error) {
      logger.error(`Błąd podczas wysyłania e-maila ${error}`);
    } else {
      logger.info(`E-mail został wysłany ${info.response}`);
    }
  });
}

export default sendEmail;