import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const getDodoBaseUrl = () => process.env.NODE_ENV === "production" ? "https://live.dodopayments.com" : "https://test.dodopayments.com";

export async function GET(req: NextRequest) {
    const paymentId = req.nextUrl.searchParams.get("paymentId");
    if (!paymentId) return NextResponse.json({ error: "Missing paymentId" }, { status: 400 });

    const response = await fetch(`${getDodoBaseUrl()}/payments/${paymentId}`, {
        headers: { Authorization: `Bearer ${process.env.DODO_PAYMENTS_API_KEY}` },
        cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
        return NextResponse.json({ error: data?.message ?? "Failed to fetch Dodo status" }, { status: response.status });
    }

    return NextResponse.json({ state: data.status });
}
