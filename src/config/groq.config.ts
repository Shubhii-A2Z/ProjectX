import Groq from "groq-sdk";

export const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || "",
});

export const AVAILABLE_MODELS = [
    {
        id: "core",
        name: "Core",
        provider: "Groq",
        providerModel: "openai/gpt-oss-20b",
        description: "Your everyday AI assistant",
        supportsReasoning: true
    },
    {
        id: "deep",
        name: "Deep",
        provider: "Groq",
        providerModel: "openai/gpt-oss-120b",
        description: "Advanced reasoning for complex tasks",
        supportsReasoning: true
    },
    {
        id: "flash",
        name: "Flash",
        provider: "Groq",
        providerModel: "openai/gpt-oss-20b",
        description: "Fastest Reasoning",
        supportsReasoning: true
    }
];