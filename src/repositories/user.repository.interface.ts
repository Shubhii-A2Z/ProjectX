import { User } from "@prisma/client"

export interface UserRepository{
    create(data: any): Promise<User | null>
    update(id: number,data: any): Promise<User | null>
    delete(id: number): Promise<User | null>
    getById(id: number): Promise<User | null>
    getAll(): Promise<User[] | null>
    getByEmail(email: string): Promise<any | null>
}