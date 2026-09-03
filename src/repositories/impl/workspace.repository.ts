import prisma from "@/prisma/client";
import { WorkspaceRepository } from "../workspace.repository.interface";

export class WorkspaceRepositoryImpl implements WorkspaceRepository{

    async getWorkspaceByName(workspaceName: string): Promise<any | null> {
        const workspace=await prisma.workSpace.findUnique({
            where:{
                name: workspaceName
            }
        });
        return workspace;
    }

    async getWorkspaceByJoinCode(joinCode: string): Promise<any | null> {
        const workspace=await prisma.workSpace.findFirst({
            where:{
                joinCode: joinCode
            }
        });
        return workspace;
    }

    async addMemberToWorkspace(workspaceId: number, userId: number): Promise<any | null> {
        const workspace=await prisma.workSpace.update({
            where:{
                id: workspaceId
            },
            data:{
                membersId: {
                    push: userId
                }
            }
        });
        return workspace;
    }

    async addChannelToWorkspace(workspaceId: number, channelName: string): Promise<any | null> {
        const workspace=await prisma.workSpace.update({
            where:{
                id: workspaceId
            },
            data:{
                channel:{
                    create:{
                        name: channelName
                    }
                }
            }
        });
        return workspace;
    }

    async fetchAllWorkspaceByMemberId(): Promise<any | null> {
        throw new Error("Method not implemented.");
    }

}