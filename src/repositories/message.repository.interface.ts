export interface MessageRepository{
    create(data: any): Promise<any>;
}