export interface MessageService{
    createMessage(data: any): Promise<any>;
}