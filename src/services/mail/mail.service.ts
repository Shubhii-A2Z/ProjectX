import logger from "@/config/logger.config";
import transporter from "@/config/mail.config";
import serverConfig from "@/config/server.config";

export class MailService{

    static async sendMail(to: string, subject: string, body: any): Promise<any>{
        const message={
            to: to,
            from: {
                name: 'ProjectX',
                address: serverConfig.MAIL_ID || ''
            },
            subject: subject,
            html: body
        };

        const response=await transporter.sendMail(message);
        logger.info(`Email Sent To: ${to}`);
        return response;
    }

}