import nodemailer from "nodemailer";
import logger from "../logger";
import * as dotenv from "dotenv";

dotenv.config();

const USER_ADDRESS: string | undefined = process.env.USER_ADDRESS;
const USER_PASSWORD: string | undefined = process.env.USER_PASSWORD;

async function sendEmail(toEmail: string | undefined, rate: number, date: string | null): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
      user: USER_ADDRESS,
      pass: USER_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'noreply@gmail.com',
    to: toEmail,
    subject: "Uwaga: Wartość Miesięcznej Raty jest Ujemna!",
    html: `<body><table align="center" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #ccc;"><tr><td bgcolor="#f2f2f2" align="center" style="padding: 20px 0;"><h1>Wartość Miesięcznej Raty</h1></td></tr><tr><td bgcolor="#ffffff" style="padding: 20px;"><p>Szanowni Państwo,</p><p>Chcieliśmy Państwa poinformować, że wartość miesięcznej raty wynosi ujemną.</p><p>Prosimy o zapoznanie się z poniższymi informacjami:</p><ul><li>Wartość miesięcznej raty: <strong>${rate} zł</strong></li><li>Data operacji: <strong>${date}</strong></li><li>Numer umowy: <strong>ABC123456</strong></li></ul><p>Dziękujemy za korzystanie z naszych usług.</p><p>Pozdrawiamy,</p><p>Zespół Finansowy</p></td></tr><tr><td bgcolor="#f2f2f2" align="center" style="padding: 20px 0;"><p>&copy; 2023 Twoja Firma. Wszelkie prawa zastrzeżone.</p></td></tr></table></body>`
  };

  await transporter.sendMail(mailOptions, (error: Error | null, info: any) => {
    if (error) {
      logger.error(`Błąd podczas wysyłania e-maila ${error}`);
    } else {
      logger.info(`E-mail został wysłany ${info.response}`);
    }
  });
}

export default sendEmail;