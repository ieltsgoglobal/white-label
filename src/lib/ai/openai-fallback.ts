type ChatMessage = {
    role: "user";
    content: string;
};

export function isRateLimitError(error: any) {
    return error?.status === 429 || error?.error?.error?.code === "rate_limit_exceeded";
}

export async function createOpenAIJsonCompletion({
    messages,
    temperature,
    maxTokens,
}: {
    messages: ChatMessage[];
    temperature: number;
    maxTokens: number;
}) {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error("Missing OPENAI_API_KEY in environment");
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
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
