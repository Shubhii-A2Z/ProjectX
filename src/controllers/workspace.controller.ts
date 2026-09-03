import { WorkspaceService } from "@/services/workspace.service.interface";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class WorkspaceController{

    private readonly workspaceService: WorkspaceService;

    constructor(workspaceService: WorkspaceService){
        this.workspaceService=workspaceService;
    }

    createWorkspace=async (req: Request, resp: Response)=>{
        const workspace=await this.workspaceService.createWorkspace(req.body, (req as any).user);
        return resp.status(StatusCodes.CREATED).json({
            success: true,
            message: "Workspace created successfully",
            data: workspace
        });
    }

    getWorkspaceUserIsMemberOf=async (req: Request, resp: Response)=>{
        const workSpaces=await this.workspaceService.getWorkspaceUserIsMemberOf((req as any).user);
        return resp.status(StatusCodes.OK).json({
            success: true,
            message: "Fetched corresponding workspaces",
            data: workSpaces
        });
    }

}