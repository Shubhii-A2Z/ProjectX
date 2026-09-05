import { MailService } from "@/services/mail/mail.service";
import { Subscriber } from "../subscriber";
import { Worker } from "bullmq";
import serverConfig from "@/config/server.config";
import logger from "@/config/logger.config";

export class MailQueueSubscriber implements Subscriber {

    processDataFromQueue(): void {
        const worker=new Worker('mailQueue',async (job)=>{
                const emailData=job.data;
                const response=await MailService.sendMail(emailData.to,emailData.subject,emailData.body);
                if(!response){
                    throw new Error('Failed to send mail');
                }
                return response;
            },
            {
                connection:{
                     port: serverConfig.REDIS_PORT,
                     host: serverConfig.REDIS_HOST,
                }
            }
        );

        worker.on('failed',(job, error)=>{
            logger.error('Job failed',job, error);
        });
    }

}