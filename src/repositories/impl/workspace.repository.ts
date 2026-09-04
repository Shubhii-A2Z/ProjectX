import prisma from "@/prisma/client";
import { WorkspaceRepository } from "../workspace.repository.interface";
import { CreateWorkspaceDTO } from "@/dtos/CreateWorkspaceDTO";
import { Role } from "@prisma/client";

export class WorkspaceRepositoryImpl implements WorkspaceRepository{

    async getWorkspaceByName(workspaceName: string): Promise<any | null> {
        const workspace=await prisma.workSpace.findFirst({
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
            },
            include:{
                members: true,
                channel: true,
            }
        });
        return workspace;
    }

    async addMemberToWorkspace(workspaceId: number, userId: number, role: Role): Promise<any | null> {
        const isExistingUser=await prisma.workspaceMember.findUnique({
            where:{
                userId_workspaceId:{
                    userId: userId,
                    workspaceId: workspaceId
                }
            }
        });
        if(isExistingUser){
            return null;
        }
        
        const memberShip=await prisma.workspaceMember.create({
            data:{
                userId: userId,
                workspaceId: workspaceId,
                role: role
            }
        });
        return memberShip;
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
            },
            include:{
                members: true,
                channel: true
            }
        });
        return workspace;
    }

    async fetchAllWorkspaceByMemberId(userId: number): Promise<any | null> {
        const workspaces=await prisma.workSpace.findMany({
            where:{
                members:{
                    some:{
                        id: userId
                    }
                }
            },
            include:{
                members: true,
                channel: true,
            }
        });
        return workspaces;
    }

    async createWorkspace(data: CreateWorkspaceDTO, joinCode: string): Promise<any> {
        const workspace=await prisma.workSpace.create({
            data:{
                name: data.name,
                description: data.description || null,
                joinCode: joinCode,
            }
        });
        return workspace;
    }

}