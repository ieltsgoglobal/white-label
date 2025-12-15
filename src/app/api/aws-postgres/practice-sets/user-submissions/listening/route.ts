import { insertListeningSubmission } from "@/lib/postgress-aws/helper-functions/practice-sets/user-submissions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { testPath, answers, startedAt, metadata } = body;

        await insertListeningSubmission({
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