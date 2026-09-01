import { CreateUserDTO } from "@/dtos/CreateUserDTO";
import { SignInUserDTO } from "@/dtos/SignInUserDTO";
import { User } from "@prisma/client";

export interface UserService{
    get(id: number): Promise<User | null>;
    getAll(): Promise<User[] | null>;
    create(data: CreateUserDTO): Promise<User | null>;
    update(id: number, data: any): Promise<User | null>;
    delete(id: number): Promise<User | null>;
    getByEmail(data: SignInUserDTO): Promise<any | null>;
}