import { UserController } from '@/controllers/user.controller';
import { UserRepositoryImpl } from '@/repositories/impl/user.repository';
import { UserRepository } from '@/repositories/user.repository.interface';
import { UserServiceImpl } from '@/services/impl/user.service';
import { UserService } from '@/services/user.service.interface';
import express from 'express';

const userRouter=express.Router();

const userRepository: UserRepository=new UserRepositoryImpl();
const userService: UserService=new UserServiceImpl(userRepository);
const userController: UserController=new UserController(userService);

userRouter.post('/signup', userController.createUser);

export default userRouter;