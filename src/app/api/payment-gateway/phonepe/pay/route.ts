import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { B2CPlanId, computeB2CAmountPaise, requireB2CPlan } from '@/app/data/plans/b2c-plans';
import { B2BPlanId, computeB2BAmountPaise, requireB2BPlan } from '@/app/data/plans/b2b-plans';
import { phonePeFetch } from '@/lib/phonepe/client';

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    const { planId, redirectUrl, orgId, TYPE, userId } = await req.json();

    let amount: number;
    let usersPurchased: number | undefined;
    let duration: number | undefined;

    // 🔹 B2B flow
    if (TYPE?.includes("B2B")) {
        const plan = requireB2BPlan(planId as B2BPlanId);
        amount = computeB2BAmountPaise(plan);
        usersPurchased = plan.users;
    }
    // 🔹 B2C flow
    else if (TYPE?.includes("B2C")) {
        const plan = requireB2CPlan(planId as B2CPlanId);
        amount = computeB2CAmountPaise(plan);
        duration = plan.durationDays;
    } else {
        return NextResponse.json({ error: "Invalid TYPE" }, { status: 400 });
    }

    const merchantOrderId = randomUUID();

    // Build redirect URL with query params
    // will be passed in params for payment verification display in partner-payment-verification
    const redirectUrlWithParams = `${redirectUrl}?merchantOrderId=${merchantOrderId}&users=${usersPurchased}&amount=${amount}&userId=${userId}&duration=${duration}&type=${TYPE}`;
    const response = await phonePeFetch("/checkout/v2/pay", {
        method: "POST",
        body: JSON.stringify({
            merchantOrderId,
            amount,
            metaInfo: {
                udf1: JSON.stringify({ orgId, usersPurchased, TYPE, userId, duration }),
                udf2: "",
                udf3: "",
                udf4: "",
                udf5: "",
            },
            paymentFlow: {
                type: "PG_CHECKOUT",
                merchantUrls: { redirectUrl: redirectUrlWithParams },
            },
        }),
    });

    return NextResponse.json({ redirectUrl: response.redirectUrl });
}
