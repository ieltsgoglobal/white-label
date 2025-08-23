import { NextRequest, NextResponse } from 'next/server';
import { StandardCheckoutClient, Env, StandardCheckoutPayRequest, MetaInfo } from 'pg-sdk-node';
import { randomUUID } from 'crypto';
import { computeAmountPaise, requirePlan } from '@/app/(organization-auth)/partner-pricing/utils/plans';

const clientId = process.env.PHONEPE_CLIENT_ID!;
const clientSecret = process.env.PHONEPE_CLIENT_SECRET!;
const clientVersion = 1;
const env =
    process.env.NODE_ENV === "production" ? Env.PRODUCTION : Env.SANDBOX;

const client = StandardCheckoutClient.getInstance(clientId, clientSecret, clientVersion, env);

export async function POST(req: NextRequest) {
    const { planId, redirectUrl, orgId, TYPE, userId, duration } = await req.json();

    // Lookup plan from server-side module
    const plan = requirePlan(planId);
    const amount = computeAmountPaise(plan);
    const usersPurchased = plan.users;

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