import { NextRequest, NextResponse } from 'next/server';
import { StandardCheckoutClient, Env, StandardCheckoutPayRequest } from 'pg-sdk-node';
import { randomUUID } from 'crypto';

const clientId = process.env.PHONEPE_CLIENT_ID!;
const clientSecret = process.env.PHONEPE_CLIENT_SECRET!;
const clientVersion = 1;
const env = Env.PRODUCTION; // Change to Env.PRODUCTION in prod or Env.SANDBOX for dev

const client = StandardCheckoutClient.getInstance(clientId, clientSecret, clientVersion, env);

export async function POST(req: NextRequest) {
    const { amount, redirectUrl, orgId, usersPurchased } = await req.json();

    const merchantOrderId = randomUUID();

    // Build redirect URL with query params
    // will be passed in params for payment verification display in partner-payment-verification
    const redirectUrlWithParams = `${redirectUrl}?merchantOrderId=${merchantOrderId}&users=${usersPurchased}&amount=${amount}`;

    const payRequest = StandardCheckoutPayRequest.builder()
        .merchantOrderId(merchantOrderId)
        .amount(amount)
        .metaInfo({
            orgId: orgId.toString(),
            usersPurchased: usersPurchased.toString(), // PhonePe expects string values
        } as any)
        .redirectUrl(redirectUrlWithParams)
        .build();

    const response = await client.pay(payRequest);
    return NextResponse.json({ redirectUrl: response.redirectUrl });
}