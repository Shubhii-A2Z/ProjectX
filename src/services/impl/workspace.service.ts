import crypto from 'node:crypto';

import { WorkspaceRepository } from "@/repositories/workspace.repository.interface";
import { WorkspaceService } from "../workspace.service.interface";
import { CreateWorkspaceDTO } from '@/dtos/CreateWorkspaceDTO';
import { WorkSpace } from '@prisma/client';
import { NotFoundError } from '@/utils/errors/app.error';

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
        return workSpace;
    }

    async getWorkspaceByJoinCode(joinCode: string): Promise<any | null> {
        const workspace=await this.workspaceRepository.getWorkspaceByJoinCode(joinCode);
        return workspace;
    }

    async addMemberToWorkspace(joinCode: string, user: any): Promise<any | null> {
        const workSpace=await this.workspaceRepository.getWorkspaceByJoinCode(joinCode);
        if(!workSpace){
            throw new NotFoundError("Workspace not found with the provided join code!");
        }
        const response=await this.workspaceRepository.addMemberToWorkspace(workSpace.id, user.id, "USER");
        return response;
        
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