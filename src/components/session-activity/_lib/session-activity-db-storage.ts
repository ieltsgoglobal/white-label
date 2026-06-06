import { getSessionActivity } from "./session-activity-storage";

const ANALYTICS_ENDPOINT = "https://throbbing-waterfall-adfc.ieltsmanager99.workers.dev";

export async function syncSessionActivity() {
    try {
        const response = await fetch(ANALYTICS_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(getSessionActivity()),
        });

        console.log("analytics status", response.status);

        console.log("analytics response", await response.text());
    } catch (error) {
        console.error("analytics sync failed", error);
    }
}