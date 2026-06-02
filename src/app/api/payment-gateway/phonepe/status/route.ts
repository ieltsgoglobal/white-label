// app/api/payment-gateway/phonepe/status/route.ts
import { NextRequest, NextResponse } from "next/server";
import { phonePeFetch } from "@/lib/phonepe/client";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    const orderId = req.nextUrl.searchParams.get("orderId");
    if (!orderId) return NextResponse.json({ error: "Missing orderId" }, { status: 400 });

    try {
        const response = await phonePeFetch(`/checkout/v2/order/${orderId}/status`, { method: "GET" });
        return NextResponse.json({ state: response.state });
    } catch (err) {
        return NextResponse.json({ error: "Failed to fetch order status" }, { status: 500 });
    }
}
