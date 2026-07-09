import { Groq } from "groq-sdk";

type ChatMessage = {
    role: "user";
    content: string;
};

const GROQ_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";
const GROQ_CLIENT = new Groq({ apiKey: process.env.GROQ_API_KEY! });

export async function createJsonCompletionWithFallback({ messages, temperature, maxTokens, }: { messages: ChatMessage[]; temperature: number; maxTokens: number; }) {
    try {
        const completion = await GROQ_CLIENT.chat.completions.create({
            model: GROQ_MODEL,
            messages,
            temperature,
            max_completion_tokens: maxTokens,
            top_p: 1,
            stream: false,
            response_format: { type: "json_object" },
        });

        return completion.choices[0]?.message?.content;
    } catch (error) {
        return createOpenAIJsonCompletion({ messages, temperature, maxTokens });
    }
}

export async function createOpenAIJsonCompletion({ messages, temperature, maxTokens }: { messages: ChatMessage[]; temperature: number; maxTokens: number; }) {

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY!}`,
        },
        body: JSON.stringify({
            model: process.env.OPENAI_FALLBACK_MODEL || "gpt-4.1-mini",
            messages,
            temperature,
            max_tokens: maxTokens,
            response_format: { type: "json_object" },
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.error?.message || "OpenAI fallback request failed");
    }

    return data.choices?.[0]?.message?.content;
}
