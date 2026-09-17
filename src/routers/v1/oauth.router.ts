import { OAuthController } from '@/controllers/oauth.controller';
import { OAuthRepositoryImpl } from '@/repositories/impl/oauth.repository';
import { OAuthServiceImpl } from '@/services/impl/oauth.service';
import { OAuthRepository } from '@/repositories/oauth.repository.interface';
import { OAuthService } from '@/services/oauth.service.interface';
import express from 'express';
import { UserRepository } from '@/repositories/user.repository.interface';
import { UserRepositoryImpl } from '@/repositories/impl/user.repository';

const oauthRouter=express.Router();

const oauthRepository: OAuthRepository=new OAuthRepositoryImpl();
const userRepository: UserRepository=new UserRepositoryImpl();
const oauthService: OAuthService=new OAuthServiceImpl(oauthRepository, userRepository);
const oauthController: OAuthController=new OAuthController(oauthService);

oauthRouter.get('/google', oauthController.googleLogin);
oauthRouter.get('/google/callback', oauthController.googleCallback);

export default oauthRouter;