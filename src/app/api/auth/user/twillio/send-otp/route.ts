import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req: NextRequest) {
    try {
        const { to } = await req.json();

        if (!to) return NextResponse.json({ success: false, message: "Phone number is required." }, { status: 400 });

        const verification = await twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!).verify.v2
            .services(process.env.VERIFICATION_SERVICE_SID!)
            .verifications.create({ channel: "sms", to });

        return NextResponse.json({ success: true, status: verification.status });
    } catch (error: any) {
        console.error("TWILIO ERROR:", error);

        return NextResponse.json(
            { success: false, message: error.message || "Failed to send OTP." },
            { status: 500 }
        );
    }
}
