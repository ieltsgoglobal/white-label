// app/api/assemblyai/route.ts
import { NextResponse } from 'next/server';

interface WordTimestamp {
    text: string;
    start: number;
    end: number;
    confidence: number;
    speaker: string | null;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024  // 5MB
const API_KEY = process.env.ASSEMBLYAI_API_KEY;

export async function POST(req: Request) {

    if (!API_KEY) {
        return NextResponse.json({ error: 'Missing API key' }, { status: 500 })
    }

    const blob = await req.blob();

    // Check file size before upload
    if (blob.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: "File too large." }, { status: 400 })
    }

    // Step 1: Upload audio
    const uploadRes = await fetch("https://api.assemblyai.com/v2/upload", {
        method: "POST",
        headers: {
            authorization: API_KEY,
        },
        body: blob,
    });

    const uploadData = await uploadRes.json();
    const audio_url = uploadData.upload_url;

    // Step 2: Request transcription
    const transcriptRes = await fetch("https://api.assemblyai.com/v2/transcript", {
        method: "POST",
        headers: {
            authorization: API_KEY,
            "content-type": "application/json",
        },
        body: JSON.stringify({ audio_url }),
    });

    const transcriptData = await transcriptRes.json();
    const transcriptId = transcriptData.id;

    // Step 3: Poll for transcription result
    while (true) {
        const pollingRes = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
            headers: { authorization: API_KEY },
        });

        const pollingData = await pollingRes.json();

        if (pollingData.status === "completed") {
            // calculate how many words are there
            const words = pollingData.words as WordTimestamp[] | undefined;

            if (!words || words.length === 0) {
                console.warn("⚠️ No words returned in transcription.");
                return NextResponse.json({ words: null });
            }

            return NextResponse.json({ words });
        }

        if (pollingData.status === "error") {
            console.error("Transcription failed:", pollingData.error);
            return NextResponse.json({ error: pollingData.error }, { status: 500 });
        }

        // still processing → wait 2 seconds before checking again
        await new Promise((res) => setTimeout(res, 2000)); // wait 2 seconds
    }
}