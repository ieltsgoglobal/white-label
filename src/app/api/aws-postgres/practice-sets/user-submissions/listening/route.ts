import { insertListeningSubmission } from "@/lib/postgress-aws/helper-functions/user-submissions/listening";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, testPath, answers, startedAt, metadata } = body;

        await insertListeningSubmission({
            userId,
            testPath,
            answers,
            startedAt,
            metadata,
        });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("API error:", err);
        return NextResponse.json(
            { success: false, error: err.message || JSON.stringify(err) },
            { status: 500 }
        );
    }
}