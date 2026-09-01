import { UserController } from '@/controllers/user.controller';
import { validateRequestBody } from '@/middlewares/validate.middleware';
import { createUserSchema, signinUserSchema } from '@/models/zod.schema';
import { UserRepositoryImpl } from '@/repositories/impl/user.repository';
import { UserRepository } from '@/repositories/user.repository.interface';
import { UserServiceImpl } from '@/services/impl/user.service';
import { UserService } from '@/services/user.service.interface';
import express from 'express';

const userRouter=express.Router();

const userRepository: UserRepository=new UserRepositoryImpl();
const userService: UserService=new UserServiceImpl(userRepository);
const userController: UserController=new UserController(userService);

userRouter.post('/signup', validateRequestBody(createUserSchema), userController.createUser);

userRouter.post('/signin', validateRequestBody(signinUserSchema), userController.signinUser)

export default userRouter;