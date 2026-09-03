import crypto from 'node:crypto';

import { WorkspaceRepository } from "@/repositories/workspace.repository.interface";
import { WorkspaceService } from "../workspace.service.interface";

export class WorkspaceServiceImpl implements WorkspaceService{
    
    private readonly workspaceRepository: WorkspaceRepository;
    private readonly ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    constructor(workspaceRepository: WorkspaceRepository){
        this.workspaceRepository=workspaceRepository;
    }

    async createWorkspace(data: any): Promise<any>{
        const joinCode=this.generateJoinCode();
        const response=await this.workspaceRepository.createWorkspace(data, joinCode);
        await this.workspaceRepository.addMemberToWorkspace(response.id, data.userId);
        await this.workspaceRepository.addChannelToWorkspace(response.id, 'General');
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