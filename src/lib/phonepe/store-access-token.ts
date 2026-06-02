type PhonePeAccessToken = {
    value: string;
    expiresAt: number;
};

let token: PhonePeAccessToken | null = null;

/**
 * Returns a merchant-level PhonePe OAuth token.
 *
 * This token is not tied to an IELTS user. It belongs to our PhonePe merchant
 * credentials and is reused for all server-side PhonePe API calls while this
 * lambda instance stays warm.
 *
 * Serverless cache behavior:
 * - Warm lambda: the module variable above can be reused across requests.
 * - Cold start, redeploy, or another lambda instance: the cache starts empty.
 * - Expiry: we refresh one minute early to avoid using a token near timeout.
 *
 * This is intentionally an in-memory optimization, not durable storage.
 * Correctness does not depend on the cache; if it is empty, we request a new
 * token from PhonePe and continue.
 */
export async function getStoredPhonePeAccessToken() {
    if (token && token.expiresAt > Date.now() + 60_000) return token.value;

    const config = getPhonePeConfig();
    const response = await fetch(getPhonePeAuthUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: config.clientId,
            client_version: "1",
            client_secret: config.clientSecret,
            grant_type: "client_credentials",
        }),
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) throw new Error(data?.message || `PhonePe auth failed with ${response.status}`);

    token = {
        value: data.access_token,
        expiresAt: Number(data.expires_at || 0) * 1000 || Date.now() + 55 * 60 * 1000,
    };

    return token.value;
}

export function getPhonePeBaseUrl() {
    return process.env.NODE_ENV === "production"
        ? "https://api.phonepe.com/apis/pg"
        : "https://api-preprod.phonepe.com/apis/pg-sandbox";
}

function getPhonePeAuthUrl() {
    return process.env.NODE_ENV === "production"
        ? "https://api.phonepe.com/apis/identity-manager/v1/oauth/token"
        : "https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token";
}

function getPhonePeConfig() {
    const isProd = process.env.NODE_ENV === "production";

    return {
        clientId: isProd ? process.env.PHONEPE_CLIENT_ID_PROD! : process.env.PHONEPE_CLIENT_ID!,
        clientSecret: isProd ? process.env.PHONEPE_CLIENT_SECRET_PROD! : process.env.PHONEPE_CLIENT_SECRET!,
    };
}
