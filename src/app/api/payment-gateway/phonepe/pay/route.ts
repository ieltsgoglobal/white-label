import { NextRequest, NextResponse } from 'next/server';
import { StandardCheckoutClient, Env, StandardCheckoutPayRequest, MetaInfo } from 'pg-sdk-node';
import { randomUUID } from 'crypto';
import { B2CPlanId, computeB2CAmountPaise, requireB2CPlan } from '@/app/data/plans/b2c-plans';
import { B2BPlanId, computeB2BAmountPaise, requireB2BPlan } from '@/app/data/plans/b2b-plans';

const clientId = process.env.PHONEPE_CLIENT_ID!;
const clientSecret = process.env.PHONEPE_CLIENT_SECRET!;
const clientVersion = 1;
const env =
    process.env.NODE_ENV === "production" ? Env.PRODUCTION : Env.SANDBOX;

const client = StandardCheckoutClient.getInstance(clientId, clientSecret, clientVersion, env);

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
    const metaInfo = new MetaInfo(
        JSON.stringify({ orgId, usersPurchased, TYPE, userId, duration }), // udf1
        "", // udf2
        "", // udf3
        "", // udf4
        ""  // udf5
    );

    const payRequest = StandardCheckoutPayRequest.builder()
        .merchantOrderId(merchantOrderId)
        .amount(amount)
        .metaInfo(metaInfo)
        .redirectUrl(redirectUrlWithParams)
        .build();

    const response = await client.pay(payRequest);
    return NextResponse.json({ redirectUrl: response.redirectUrl });
}