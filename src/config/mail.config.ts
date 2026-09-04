import nodemailer from "nodemailer";
import serverConfig from "./server.config";

const transporter=nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: serverConfig.MAIL_ID,
        pass: serverConfig.APP_PASSWORD
    }
});

export default transporter;