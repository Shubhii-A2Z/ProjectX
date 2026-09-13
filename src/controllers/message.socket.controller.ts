import { MessageService } from "@/services/message.service.interface";
import { Socket } from "socket.io";

export class MessageSocketController {

    private readonly messageService: MessageService;

    constructor(messageService: MessageService){
        this.messageService=messageService;
    }

    register=async (socket: Socket)=>{
        socket.on(
            "sendMessage",
            async(payload: any, acknowledgement: any)=>{
                const message=await this.messageService.createMessage(payload);
                // We broadcast it to all the users having same channelId
                socket.to(payload.channelId).emit('messageReceived', message);
                acknowledgement({
                    success: true,
                    message: "Message Created Successfully",
                    data: message
                });
            }
        );
    }

}