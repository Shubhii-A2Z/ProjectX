import crypto from 'node:crypto';

import { WorkspaceRepository } from "@/repositories/workspace.repository.interface";
import { WorkspaceService } from "../workspace.service.interface";
import { CreateWorkspaceDTO } from '@/dtos/CreateWorkspaceDTO';
import { WorkSpace } from '@prisma/client';

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

    private generateJoinCode(length=6): string {
        let code="";
        for(let i=0;i<length;++i) {
            const index = crypto.randomInt(0, this.ALPHABET.length);
            code += this.ALPHABET[index];
        }
        return code;
    }
    
}