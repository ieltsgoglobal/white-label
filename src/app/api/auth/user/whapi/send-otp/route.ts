import { simpleDecryptOtp } from '@/app/(auth)/login/_components/user-login/utils/encryptOtp';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { to, encryptedOtp } = await req.json(); // ✅ get values from request body

    //code to send OTP via WHAPI
    const generatedOtp = simpleDecryptOtp(encryptedOtp)
    const apiKey = process.env.WHAPI_API_KEY;
    const url = 'https://gate.whapi.cloud/messages/text';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            to,
            body: `${generatedOtp} is your one-time password (OTP) for ieltsgoglobal.com.`,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        return NextResponse.json({ error: data.error }, { status: response.status });
    }

    return NextResponse.json({ success: true, data });
}