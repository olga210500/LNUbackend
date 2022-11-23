import nodemailer from "nodemailer";
import { SMTP_HOST, SMTP_PORT } from "../constants/constant.js";
class MailService {
  constructor() {
    this.data = {
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: "olakovalisko@gmail.com",
        pass: "pscphohsnrtcuyrm",
      },
    };

    this.transporter = nodemailer.createTransport(this.data);
  }

  async sendActivationMail(to, link) {
    console.log(process.env.SMTP_HOST, SMTP_PORT);
    const options = {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    };

    const transporter = nodemailer.createTransport(options);
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Account activation " + process.env.API_URL,
      text: "",
      html: `
                <div>
                    <h1>Для підтвердження авторизації перейдіть за посиланням</h1>
                    <a href="${link}">${link}</a>
                </div>
            `,
    });
  }
}
export default new MailService();
