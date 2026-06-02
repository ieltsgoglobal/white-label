// app/api/payment-gateway/phonepe/status/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getPhonePeClient } from "@/lib/phonepe/client";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    const orderId = req.nextUrl.searchParams.get("orderId");
    if (!orderId) return NextResponse.json({ error: "Missing orderId" }, { status: 400 });

    try {
        const response = await getPhonePeClient().getOrderStatus(orderId);
        return NextResponse.json({ state: response.state });
    } catch (err) {
        return NextResponse.json({ error: "Failed to fetch order status" }, { status: 500 });
    }
}
