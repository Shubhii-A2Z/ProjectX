export interface WorkspaceRepository{
    getWorkspaceByName(name: String): any;
    getWorkspaceByJoinCode(name: String): any;
    addMemberToWorkspace(workspaceId: number, userId: number): any;
    addChannelToWorkspace(workspaceId: number, channelName: string): any;
    fetchAllWorkspaceByMemberId(): any;
    createWorkspace(data: any, joinCode: string): any;
}