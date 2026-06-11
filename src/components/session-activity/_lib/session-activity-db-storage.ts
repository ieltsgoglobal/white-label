import { getSessionActivity } from "./session-activity-storage";
import { getSessionUserDetails } from "./session-user-details";

const ANALYTICS_ENDPOINT = "https://throbbing-waterfall-adfc.ieltsmanager99.workers.dev";

// responsible to store analytics-data in the D1 cloudflare storage
export async function syncSessionActivity() {
    try {
        const response = await fetch(ANALYTICS_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ activityDetails: getSessionActivity(), sessionDetails: getSessionUserDetails() }),
        });

        console.log("analytics status", response.status);

        console.log("analytics response", await response.text());
    } catch (error) {
        console.error("analytics sync failed", error);
    }
}
