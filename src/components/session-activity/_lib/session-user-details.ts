const ANALYTICS_USER_SESSION_DETAILS_KEY = "__igg_analytics_user_session_details";

/**
 * Builds a small, stable snapshot of the user's browser session.
 *
 * This is separate from activity tracking:
 * - session activity stores what the user did: pages, clicks, timestamps.
 * - session details stores the environment they used: locale, device, network.
 *
 * The value is cached in sessionStorage so every sync for the same browser tab
 * sends the same details without recalculating or duplicating work.
 *
 * Do not add sensitive data here: no cookies, tokens, OTPs, or form values.
 * Server-side location such as country/city should be added by the analytics
 * worker from request metadata, not collected in the browser.
 */
export function getSessionUserDetails() {
    const cached = sessionStorage.getItem(ANALYTICS_USER_SESSION_DETAILS_KEY);
    if (cached) return JSON.parse(cached);

    const connection = (navigator as any).connection;
    const details = {
        schemaVersion: 1,
        locale: {
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            language: navigator.language,
        },
        device: {
            type: getDeviceType(),
            browser: getBrowser(),
            os: getOS(),
            platform: navigator.platform,
            userAgent: navigator.userAgent,
            hardwareConcurrency: navigator.hardwareConcurrency ?? null,
        },
        network: {
            effectiveType: connection?.effectiveType ?? null,
            saveData: connection?.saveData ?? null,
        },
    };

    sessionStorage.setItem(ANALYTICS_USER_SESSION_DETAILS_KEY, JSON.stringify(details));
    return details;
}


// MISC CODE

const getDeviceType = () =>
    /iPad|Tablet/i.test(navigator.userAgent)
        ? "tablet"
        : /Mobi|Android|iPhone/i.test(navigator.userAgent)
            ? "mobile"
            : "desktop";

const getBrowser = () => {
    const ua = navigator.userAgent;
    if (ua.includes("Edg/")) return "Edge";
    if (ua.includes("Chrome/")) return "Chrome";
    if (ua.includes("Safari/")) return "Safari";
    if (ua.includes("Firefox/")) return "Firefox";
    return "Unknown";
};

const getOS = () => {
    const ua = navigator.userAgent;
    if (ua.includes("Windows")) return "Windows";
    if (ua.includes("Mac OS")) return "macOS";
    if (ua.includes("Android")) return "Android";
    if (/iPhone|iPad|iPod/.test(ua)) return "iOS";
    if (ua.includes("Linux")) return "Linux";
    return "Unknown";
};
