import bcrypt from 'bcrypt';

import { UserService } from "../user.service.interface";
import { User } from "@prisma/client";
import { UserRepository } from "@/repositories/user.repository.interface";
import { CreateUserDTO } from '@/dtos/CreateUserDTO';
import { NotFoundError, UnauthorizedAccess } from '@/utils/errors/app.error';
import { JWTToken } from '@/utils/common/auth.util';
import { SignInUserDTO } from '@/dtos/SignInUserDTO';
import { MailService } from '../mail/mail.service';
import { SignupTemplate } from '../mail/templates/welcome.template';

export class UserServiceImpl implements UserService{
    
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository){
        this.userRepository=userRepository;
    }

    async get(id: number): Promise<User | null> {
        const user: User | null =await this.userRepository.getById(id);
        return user;
    }

    async getAll(): Promise<User[] | null> {
        const users: User[] | null=await this.userRepository.getAll();
        return users;
    }

    async create(data: CreateUserDTO): Promise<User | null> {
        const salt=bcrypt.genSaltSync(10);
        const hashedPassword=bcrypt.hashSync(data.password, salt);
        data.password=hashedPassword;

        const user: User | null =await this.userRepository.create(data);
        MailService.sendMail(data.email, 'Welcome To ProjectX', SignupTemplate.generate(data.username));
        return user;
    }

    async update(id: number, data: any): Promise<User | null> {
        const user=await this.userRepository.update(id, data);
        return user;
    }

    async delete(_: number): Promise<User | null> {
        throw new Error("Method not implemented.");
    }

    async getByEmail(data: SignInUserDTO): Promise<any | null> {
        const email=data.email;
        const user=await this.userRepository.getByEmail(email);

        if(!user){
            throw new NotFoundError(`User with email ${email} not found`);
        }

        const isMatched=bcrypt.compareSync(data.password, user.password);
        if(!isMatched){
            throw new UnauthorizedAccess("Invalid Password");
        }

        const jwt=JWTToken.generateJWTToken({
            id: user.id,
            data: data
        });
        
        return {
            user: user,
            JWTToken: jwt
        };
    }

}