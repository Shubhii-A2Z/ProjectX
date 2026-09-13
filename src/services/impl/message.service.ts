import { MessageRepository } from "@/repositories/message.repository.interface";
import { MessageService } from "../message.service.interface";

export class MessageServiceImpl implements MessageService{

    private readonly messageRepository: MessageRepository;

    constructor(messageRepository: MessageRepository){
        this.messageRepository=messageRepository;
    }

    async createMessage(data: any): Promise<any> {
        return this.messageRepository.create(data);
    }

}