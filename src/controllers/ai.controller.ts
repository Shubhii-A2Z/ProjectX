import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AIService } from '@/services/ai.service';
import logger from '@/config/logger.config';

const aiService = new AIService();

export class AIController {
    getModels = (_req: Request, resp: Response) => {
        const models = aiService.getAvailableModels();
        return resp.status(StatusCodes.OK).json({
            success: true,
            data: models
        });
    };

    chat = async (req: Request, resp: Response) => {
        const { messages, model } = req.body;

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return resp.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'Messages array is required'
            });
        }

        // Set up Server-Sent Events (SSE) headers for real-time streaming
        resp.setHeader('Content-Type', 'text/event-stream');
        resp.setHeader('Cache-Control', 'no-cache');
        resp.setHeader('Connection', 'keep-alive');
        resp.flushHeaders?.();

        try {
            await aiService.streamChatCompletion(messages, model, (chunk: string) => {
                resp.write(`data: ${JSON.stringify({ content: chunk })}\n\n`);
            });

            resp.write('data: [DONE]\n\n');
            resp.end();
        } catch (error: any) {
            logger.error('Error during AI chat streaming', error);
            resp.write(`data: ${JSON.stringify({ error: error.message || 'Streaming error occurred' })}\n\n`);
            resp.end();
        }
    };
}

