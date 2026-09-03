import { WorkspaceService } from "@/services/workspace.service.interface";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class WorkspaceController{

    private readonly workspaceService: WorkspaceService;

    constructor(workspaceService: WorkspaceService){
        this.workspaceService=workspaceService;
    }

    async createWorkspace(req: Request, resp: Response){
        const workspace=await this.workspaceService.createWorkspace(req.body);
        return resp.status(StatusCodes.CREATED).json({
            success: true,
            message: "Workspace created successfully",
            data: workspace
        });
    }

}