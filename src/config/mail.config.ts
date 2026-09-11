import nodemailer from "nodemailer";
import serverConfig from "./server.config";

const transporter = serverConfig.NODE_ENV=="DEV"
? nodemailer.createTransport({
    host: process.env.SMTP_HOST || "localhost",
    port: Number(process.env.SMTP_PORT) || 1025,
    secure: false,
    ignoreTLS: true,
})
: nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
    user: serverConfig.MAIL_ID,
    pass: serverConfig.APP_PASSWORD,
    },
});

export default transporter;