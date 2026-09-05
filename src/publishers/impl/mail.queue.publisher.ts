import logger from "@/config/logger.config";
import { Publisher } from "@/publishers/publisher";
import mailQueue from "@/queues/mail.queue";

export class MailQueuePublisher implements Publisher {

    async addToQueue(data: any) {
        try {
            await mailQueue.add('mailJob', data);
        } catch (error) {
            logger.error('Error adding mail job to queue');
            throw error;
        }
        logger.info("Mail Job Added to Queue");
    }

}