import { WorkspaceController } from '@/controllers/workspace.controller';
import { JWTAuth } from '@/middlewares/auth.middleware';
import { validateRequestBody } from '@/middlewares/validate.middleware';
import { createWorkspaceSchema, updateWorkspaceSchema } from '@/models/zod.schema';
import { WorkspaceRepositoryImpl } from '@/repositories/impl/workspace.repository';
import { WorkspaceRepository } from '@/repositories/workspace.repository.interface';
import { WorkspaceServiceImpl } from '@/services/impl/workspace.service';
import { WorkspaceService } from '@/services/workspace.service.interface';
import express from 'express';

const workspaceRouter=express.Router();

const workspaceRepository: WorkspaceRepository=new WorkspaceRepositoryImpl();
const workspaceService: WorkspaceService=new WorkspaceServiceImpl(workspaceRepository);
const workspaceController: WorkspaceController=new WorkspaceController(workspaceService);

// before creating the workspace: user should be authenticated and request body should be validated
workspaceRouter.post('/', JWTAuth.validateToken, validateRequestBody(createWorkspaceSchema), workspaceController.createWorkspace);

workspaceRouter.get('/', JWTAuth.validateToken, workspaceController.getWorkspaceUserIsMemberOf);

workspaceRouter.get('/:joinCode', workspaceController.getWorkspaceByJoinCode);

workspaceRouter.post('/:joinCode', JWTAuth.validateToken, workspaceController.addMemberToWorkspace);

workspaceRouter.put('/:workspaceId', JWTAuth.validateToken, validateRequestBody(updateWorkspaceSchema), workspaceController.updateWorkspace);

export default workspaceRouter;