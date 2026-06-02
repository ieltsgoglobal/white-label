// app/api/payment-gateway/phonepe/status/route.ts
import { NextRequest, NextResponse } from "next/server";
import { StandardCheckoutClient, Env } from "pg-sdk-node";


const { clientId, clientSecret, clientVersion, env } = getPhonePeConfig();
const client = StandardCheckoutClient.getInstance(clientId, clientSecret, clientVersion, env);

export async function GET(req: NextRequest) {
    const orderId = req.nextUrl.searchParams.get("orderId");
    if (!orderId) return NextResponse.json({ error: "Missing orderId" }, { status: 400 });

    try {
        const response = await client.getOrderStatus(orderId);
        return NextResponse.json({ state: response.state });
    } catch (err) {
        return NextResponse.json({ error: "Failed to fetch order status" }, { status: 500 });
    }
}


// MISC GET ENV VARS 
function getPhonePeConfig() {
    const isProd = process.env.NODE_ENV === "production";

    return {
        clientId: isProd
            ? process.env.PHONEPE_CLIENT_ID_PROD!
            : process.env.PHONEPE_CLIENT_ID!,
        clientSecret: isProd
            ? process.env.PHONEPE_CLIENT_SECRET_PROD!
            : process.env.PHONEPE_CLIENT_SECRET!,
        clientVersion: 1,
        env: isProd
            ? Env.PRODUCTION
            : Env.SANDBOX,
    };
}