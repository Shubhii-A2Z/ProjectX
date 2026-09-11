import express from 'express';
import { AIController } from '@/controllers/ai.controller';

const aiRouter = express.Router();
const aiController = new AIController();

aiRouter.get('/models', aiController.getModels);
aiRouter.post('/chat', aiController.chat);

export default aiRouter;

