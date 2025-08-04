// lib/utils/isSubdomain.client.ts

export function getClientSubdomain(): string | null {
    if (typeof window === "undefined") return null;

    const host = window.location.hostname;

    // Handle www and apex domain
    const parts = host.split(".");
    if (parts.length < 3) return null;

    return parts[0]; // e.g., orgname.ieltsgoglobal.com => "orgname"
}