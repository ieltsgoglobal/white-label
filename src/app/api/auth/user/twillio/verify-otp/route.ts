import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req: NextRequest) {
    try {
        const { to, code } = await req.json();

        if (!to || !code) return NextResponse.json({ success: false, message: "Phone number and OTP are required." }, { status: 400 });

        const verificationCheck = await twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!).verify.v2
            .services(process.env.VERIFICATION_SERVICE_SID!)
            .verificationChecks.create({ code, to });

        if (verificationCheck.status !== "approved") {
            return NextResponse.json(
                { success: false, message: "Incorrect OTP. Please try again." },
                { status: 400 }
            );
        }

        return NextResponse.json({ success: true, status: verificationCheck.status });
    } catch (error: any) {
        console.error("TWILIO VERIFY ERROR:", error);

        return NextResponse.json(
            { success: false, message: error.message || "Failed to verify OTP." },
            { status: 500 }
        );
    }
}
