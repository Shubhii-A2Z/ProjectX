import { User } from "@prisma/client";

export interface UserService{
    get(id: number): Promise<User | null>;
    getAll(): Promise<User[] | null>;
    create(data: any): Promise<User | null>;
    update(id: number, data: any): Promise<User | null>;
    delete(id: number): Promise<User | null>;
    getByEmail(email: string): Promise<User | null>;
}