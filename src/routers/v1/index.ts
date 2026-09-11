import express from 'express';
import userRouter from './user.router';
import workspaceRouter from './workspace.router';
import paymentRouter from './payment.router';
import aiRouter from './ai.router';

const v1Router=express.Router();

v1Router.use('/users', userRouter);
v1Router.use('/workspaces', workspaceRouter);
v1Router.use('/payments', paymentRouter);
v1Router.use('/ai', aiRouter);

export default v1Router;