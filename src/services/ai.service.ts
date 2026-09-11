import { AVAILABLE_MODELS, groq } from '@/config/groq.config';

export interface ChatMessageDTO {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export class AIService {
    getAvailableModels() {
        return AVAILABLE_MODELS;
    }

    async streamChatCompletion(
        messages: ChatMessageDTO[],
        model: string = 'deepseek-r1-distill-llama-70b',
        onChunk: (chunk: string) => void
    ): Promise<void> {
        // Validate model or fallback
        const selectedModel = AVAILABLE_MODELS.find(m => m.id === model)?.id || 'deepseek-r1-distill-llama-70b';

        const stream = await groq.chat.completions.create({
            model: selectedModel,
            messages: messages.map(msg => ({
                role: msg.role,
                content: msg.content
            })),
            stream: true,
            temperature: 0.6
        });

        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
                onChunk(content);
            }
        }
    }
}

