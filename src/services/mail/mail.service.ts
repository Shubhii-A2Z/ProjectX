import transporter from "@/config/mail.config";
import serverConfig from "@/config/server.config";

export class MailService{

    static async sendMail(to: string, subject: string, body: any){
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
        return {
            message: 'Email Sent',
            email: response
        };
    }

}