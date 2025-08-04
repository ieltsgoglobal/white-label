// isSubdomain.client.ts

// checks re-turn if its a subdomain
// doesnt verifys subdomain
export function getClientSubdomain(): string | null {
    if (typeof window === "undefined") return null;

    const host = window.location.hostname; // e.g., "mj.example.com"
    const parts = host.split(".");

    if (parts.length < 2) return null; // No subdomain present
    const subdomain = parts[0];

    return subdomain;
}