import { NextRequest, NextResponse } from 'next/server';
import { StandardCheckoutClient, Env, StandardCheckoutPayRequest, MetaInfo } from 'pg-sdk-node';
import { randomUUID } from 'crypto';

const clientId = process.env.PHONEPE_CLIENT_ID!;
const clientSecret = process.env.PHONEPE_CLIENT_SECRET!;
const clientVersion = 1;
const env = Env.PRODUCTION; // Change to Env.PRODUCTION in prod or Env.SANDBOX for dev

const client = StandardCheckoutClient.getInstance(clientId, clientSecret, clientVersion, env);

export async function POST(req: NextRequest) {
    const { amount, redirectUrl, orgId, usersPurchased, TYPE, userId, duration } = await req.json();

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