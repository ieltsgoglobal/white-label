// app/api/payment-gateway/phonepe/status/route.ts
import { NextRequest, NextResponse } from "next/server";
import { StandardCheckoutClient, Env } from "pg-sdk-node";

const client = StandardCheckoutClient.getInstance(
    process.env.PHONEPE_CLIENT_ID!,
    process.env.PHONEPE_CLIENT_SECRET!,
    1,
    Env.SANDBOX // or Env.PRODUCTION
);

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