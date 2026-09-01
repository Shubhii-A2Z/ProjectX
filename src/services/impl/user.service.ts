import bcrypt from 'bcrypt';

import { UserService } from "../user.service.interface";
import { User } from "@prisma/client";
import { UserRepository } from "@/repositories/user.repository.interface";

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

    async create(data: any): Promise<User | null> {
        const salt=bcrypt.genSaltSync(10);
        const hashedPassword=bcrypt.hashSync(data.password, salt);
        data.password=hashedPassword;
        const user: User | null =await this.userRepository.create(data);
        return user;
    }

    async update(id: number, data: any): Promise<User | null> {
        const user=await this.userRepository.update(id, data);
        return user;
    }

    async delete(_: number): Promise<User | null> {
        throw new Error("Method not implemented.");
    }

    async getByEmail(email: string): Promise<User | null> {
        const user=await this.userRepository.getByEmail(email);
        return user;
    }

}