import { CreateWorkspaceDTO } from "@/dtos/CreateWorkspaceDTO";

export interface WorkspaceRepository{
    getWorkspaceByName(name: String): any;
    getWorkspaceByJoinCode(name: String): any;
    addMemberToWorkspace(workspaceId: number, userId: number, role: string): any;
    addChannelToWorkspace(workspaceId: number, channelName: string): any;
    fetchAllWorkspaceByMemberId(userId: number): any;
    createWorkspace(data: CreateWorkspaceDTO, joinCode: string): any;
}