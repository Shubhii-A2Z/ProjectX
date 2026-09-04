import { CreateWorkspaceDTO } from "@/dtos/CreateWorkspaceDTO";
import { UpdateWorkspaceDTO } from "@/dtos/UpdateWorkspaceDTO";

export interface WorkspaceService{
    createWorkspace(data: CreateWorkspaceDTO, user: any): Promise<any>;
    getWorkspaceUserIsMemberOf(user: any): Promise<any | null>;
    getWorkspaceByJoinCode(joinCode: string): Promise<any | null>;
    addMemberToWorkspace(joinCode: string, user: any): Promise<any | null>;
    updateWorkspace(workspaceId: number, userId: number, data: UpdateWorkspaceDTO): Promise<any | null>;
}