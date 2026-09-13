import prisma from "@/prisma/client";
import { MessageRepository } from "../message.repository.interface";

export class MessageRepositoryImpl implements MessageRepository{

    async create(data: any): Promise<any> {
        const resp=await prisma.message.create({
            data: data
        });
        return resp;
    }

}