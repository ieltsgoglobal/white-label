import { NextRequest, NextResponse } from "next/server";
import { B2CPlanId, getDodoB2CProductId, requireB2CPlan } from "@/app/data/plans/b2c-plans";

const getDodoBaseUrl = () => process.env.NODE_ENV === "production" ? "https://live.dodopayments.com" : "https://test.dodopayments.com";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    const { planId, redirectUrl, userId, TYPE } = await req.json();

    if (TYPE !== "B2C_V1_FIXED") {
        return NextResponse.json({ error: "Invalid TYPE" }, { status: 400 });
    }

    const plan = requireB2CPlan(planId as B2CPlanId);
    const productId = getDodoB2CProductId(plan.id);
    const returnUrl = `${redirectUrl}?provider=dodo&amount=${plan.priceInr * 100}&type=${TYPE}`;

    const response = await fetch(`${getDodoBaseUrl()}/checkouts`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.DODO_PAYMENTS_API_KEY}`, "Content-Type": "application/json"
        },
        body: JSON.stringify({
            product_cart: [{ product_id: productId, quantity: 1 }],
            return_url: returnUrl,
            metadata: {
                planId: plan.id,
                userId,
                duration: plan.durationDays,
                TYPE
            }
        })
    });

    const data = await response.json();

    if (!response.ok) {
        return NextResponse.json({ error: data?.message ?? "Dodo checkout failed" }, { status: response.status });
    }

    return NextResponse.json({ redirectUrl: data.checkout_url });
}
