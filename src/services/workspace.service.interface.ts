import { CreateWorkspaceDTO } from "@/dtos/CreateWorkspaceDTO";

export interface WorkspaceService{
    createWorkspace(data: CreateWorkspaceDTO, user: any): Promise<any>;
    getWorkspaceUserIsMemberOf(user: any): Promise<any | null>;
}