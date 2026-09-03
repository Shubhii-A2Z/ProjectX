import express from 'express';
import userRouter from './user.router';
import workspaceRouter from './workspace.router';

const v1Router=express.Router();

v1Router.use('/users', userRouter);
v1Router.use('/workspaces', workspaceRouter);

export default v1Router;