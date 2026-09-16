import { OAuthController } from '@/controllers/oauth.controller';
import express from 'express';

const oauthRouter=express.Router();

const oauthController: OAuthController=new OAuthController();

oauthRouter.post('/google', oauthController.googleLogin);

export default oauthRouter;