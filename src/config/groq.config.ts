import Groq from 'groq-sdk';

export const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || ''
});

export const AVAILABLE_MODELS = [
    {
        id: 'deepseek-r1-distill-llama-70b',
        name: 'DeepSeek R1',
        provider: 'Groq',
        description: 'Advanced reasoning and chain-of-thought capabilities',
        supportsReasoning: true,
    },
    {
        id: 'llama-3.3-70b-versatile',
        name: 'Llama 3.3 70B',
        provider: 'Groq',
        description: 'High-speed general intelligence',
        supportsReasoning: false,
    },
    {
        id: 'llama-3.1-8b-instant',
        name: 'Llama 3.1 8B Instant',
        provider: 'Groq',
        description: 'Blazing fast responses for quick queries',
        supportsReasoning: false,
    }
];

