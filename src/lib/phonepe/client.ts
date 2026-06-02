import { Env, StandardCheckoutClient } from "pg-sdk-node";

let phonePeClient: ReturnType<typeof StandardCheckoutClient.getInstance> | null = null;

export function getPhonePeClient() {
    if (phonePeClient) return phonePeClient;

    const { clientId, clientSecret, clientVersion, env } = getPhonePeConfig();
    phonePeClient = StandardCheckoutClient.getInstance(clientId, clientSecret, clientVersion, env);

    return phonePeClient;
}

function getPhonePeConfig() {
    const isProd = process.env.NODE_ENV === "production";

    return {
        clientId: isProd
            ? process.env.PHONEPE_CLIENT_ID_PROD!
            : process.env.PHONEPE_CLIENT_ID!,
        clientSecret: isProd
            ? process.env.PHONEPE_CLIENT_SECRET_PROD!
            : process.env.PHONEPE_CLIENT_SECRET!,
        clientVersion: 1,
        env: isProd
            ? Env.PRODUCTION
            : Env.SANDBOX,
    };
}
