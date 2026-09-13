import express from 'express';

import { genericErrorHandler } from './middlewares/error.middleware';
import serverConfig from './config/server.config';
import logger from './config/logger.config';
import apiRouter from './routers';
import { Subscriber } from './subscribers/subscriber';
import { MailQueueSubscriber } from './subscribers/impl/mail.queue.subscriber';
import bullServerAdapter from './config/bull-board.config';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app=express();

// creating a common server for both our express app and socket.io
const server=createServer(app);

// passing common server object to create the io object so io server is created
const io=new Server(server);

app.use(express.json());

// Allowing all the requests to access our servers. We can change this later on
app.use(cors());

// TODO(#1): Implement Rate Limiter via Redis for auth and other endpoints

/**
 * Adding the error handler middleware: this will replace the default error handler middlware
 */
app.use(genericErrorHandler);

app.use('/api',apiRouter);

app.use('/ui',bullServerAdapter.getRouter());

// Logging whenever a new client is connected to our server
io.on('connection',(socket)=>{
    console.log('A user connected: ',socket.id);
    socket.on('messageFromClient', (message: string)=>{
        console.log(`Message from client ${message}`);
        io.emit('messageFromServer',`Hello Client: ${message}. Welcome to Project-X`);
    });
});

// Now instead of app.listen, we are using server.listen because we want to use our http server with socket.io
server.listen(serverConfig.PORT,()=>{
    console.log(`Server started at PORT: ${serverConfig.PORT}`);
    logger.info('Server Started',{success: true}); // Logging with Metadata

    /**
     * Initializing the subscriber to listen for the jobs
     */
    const subscriber: Subscriber=new MailQueueSubscriber();
    subscriber.processDataFromQueue();
});