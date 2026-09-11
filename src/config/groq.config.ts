import Groq from "groq-sdk";

export const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || "",
});

export const AVAILABLE_MODELS = [
    {
        id: "openai/gpt-oss-20b",
        name: "GPT OSS 20B",
        provider: "Groq",
        description: "Fast general-purpose reasoning and chat",
        supportsReasoning: true,
    },
    {
        id: "openai/gpt-oss-120b",
        name: "GPT OSS 120B",
        provider: "Groq",
        description: "Advanced reasoning and complex tasks",
        supportsReasoning: true,
    },
];