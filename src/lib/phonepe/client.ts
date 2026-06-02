import { getPhonePeBaseUrl, getStoredPhonePeAccessToken } from "./store-access-token";

export async function phonePeFetch(path: string, init: RequestInit) {
    const response = await fetch(`${getPhonePeBaseUrl()}${path}`, {
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...init.headers,
            Authorization: `O-Bearer ${await getStoredPhonePeAccessToken()}`,
        },
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) throw new Error(data?.message || `PhonePe request failed with ${response.status}`);

    return data;
}
