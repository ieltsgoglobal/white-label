/**
 * Extracts the subdomain from the client-side hostname.
 * 
 * This function is useful in multitenant applications that rely on subdomains
 * to distinguish between tenants (e.g., org1.example.com).
 * 
 * Returns `null` if:
 * - Running in a non-browser environment (e.g., SSR)
 * - Host is apex domain (e.g., example.com)
 * - Host is prefixed with "www"
 * - Running on localhost (to avoid false positives in development)
 */

export function getClientSubdomain(): string | null {
    // Guard clause: Not available in SSR or server environment
    if (typeof window === "undefined") return null;

    // Get current hostname (e.g., org1.ieltsgoglobal.com)
    const host = window.location.hostname;

    // Guard clause: Ignore localhost and its variations
    if (host === "localhost" || host.endsWith(".localhost")) return null;

    // Split by "." to get subdomain and domain parts
    const parts = host.split(".");

    // Guard clause: Host must have at least 3 parts (e.g., org.domain.com)
    if (parts.length < 3) return null;

    // Guard clause: Remove "www" prefix if present
    if (parts[0] === "www") parts.shift();

    // After removing www, check again
    if (parts.length < 3) return null;

    // Return the first part as the subdomain
    return parts[0];
}