import express from 'express';

import { genericErrorHandler } from './middlewares/error.middleware';
import serverConfig from './config/server.config';
import logger from './config/logger.config';
import apiRouter from './routers';
import { Subscriber } from './subscribers/subscriber';
import { MailQueueSubscriber } from './subscribers/impl/mail.queue.subscriber';

const app=express();

app.use(express.json());

/**
 * Adding the error handler middleware: this will replace the default error handler middlware
 */
app.use(genericErrorHandler);

app.use('/api',apiRouter);

app.listen(serverConfig.PORT,()=>{
    console.log(`Server started at PORT: ${serverConfig.PORT}`);
    logger.info('Server Started',{success: true}); // Logging with Metadata

    /**
     * Initializing the subscriber to listen for the jobs
     */
    const subscriber: Subscriber=new MailQueueSubscriber();
    subscriber.processDataFromQueue();
});