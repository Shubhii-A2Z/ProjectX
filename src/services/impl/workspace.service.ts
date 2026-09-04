import crypto from 'node:crypto';

import { WorkspaceRepository } from "@/repositories/workspace.repository.interface";
import { WorkspaceService } from "../workspace.service.interface";
import { CreateWorkspaceDTO } from '@/dtos/CreateWorkspaceDTO';
import { Prisma, WorkSpace } from '@prisma/client';
import { ConflictError, NotFoundError } from '@/utils/errors/app.error';

export class WorkspaceServiceImpl implements WorkspaceService{
    
    private readonly workspaceRepository: WorkspaceRepository;
    private readonly ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    constructor(workspaceRepository: WorkspaceRepository){
        this.workspaceRepository=workspaceRepository;
    }

    async createWorkspace(data: CreateWorkspaceDTO, user: any): Promise<any>{
        const joinCode=this.generateJoinCode();
        
        const workspace=await this.workspaceRepository.createWorkspace(data, joinCode);
        
        await this.workspaceRepository.addMemberToWorkspace(workspace.id, user.id, "ADMIN");

        const updatedWorkspace=await this.workspaceRepository.addChannelToWorkspace(workspace.id, 'General');
        return updatedWorkspace;
    }

    async getWorkspaceUserIsMemberOf(user: any): Promise<WorkSpace[] | null>{
        const workSpace: WorkSpace[] | null=this.workspaceRepository.fetchAllWorkspaceByMemberId(user.id);
        if(!workSpace){
            throw new NotFoundError("No workspace found for the user");
        }
        return workSpace;
    }

    async getWorkspaceByJoinCode(joinCode: string): Promise<any | null> {
        const workspace=await this.workspaceRepository.getWorkspaceByJoinCode(joinCode);
        if(!workspace){
            throw new NotFoundError("No workspace found for the provided join code");
        }
        return workspace;
    }

    async addMemberToWorkspace(joinCode: string, user: any): Promise<any | null> {
        try {
            const workSpace=await this.workspaceRepository.getWorkspaceByJoinCode(joinCode);
            if(workSpace==null){
                throw new NotFoundError("Workspace not found");
            }
            const response=await this.workspaceRepository.addMemberToWorkspace(workSpace.id, user.id, "USER");
            return response;
        } catch (error) {
            if(error instanceof Prisma.PrismaClientKnownRequestError && error.code==="P2002"){
                throw new ConflictError("User already member of workspace");
            }
            throw error;
        }
    }

    private generateJoinCode(length=6): string {
        let code="";
        for(let i=0;i<length;++i) {
            const index = crypto.randomInt(0, this.ALPHABET.length);
            code += this.ALPHABET[index];
        }
        return code;
    }
    
}