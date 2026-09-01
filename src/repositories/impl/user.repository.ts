import prisma from "@/prisma/client";
import { UserRepository } from "../user.repository.interface";
import { User } from "@prisma/client";

export class UserRepositoryImpl implements UserRepository{

    async create(data: any): Promise<User | null> {
        const user=await prisma.user.create({
            data: data
        });
        return user;
    }

    async update(id: number, data: any): Promise<User | null>{
        const user=await prisma.user.update({
            where:{
                id: id
            },
            data: data
        });
        return user;
    }
    async delete(_: number): Promise<User | null>{
        return null;
    }

    async getById(_: number): Promise<User | null>{
        return null;
    }

    async getAll(): Promise<User[] | null>{
        return null;
    }

    async getByEmail(email: string): Promise<any | null>{
        const user=await prisma.user.findUnique({
            where:{
                email: email
            },
            select:{
                id: true,
                username: true,
                email: true
            }
        });
        return user;
    }

}