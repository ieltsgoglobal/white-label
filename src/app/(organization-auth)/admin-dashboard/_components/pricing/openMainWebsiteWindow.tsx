"use client"

import { getSessionUser } from "@/lib/auth/session/get-user";
import { getClientSubdomain } from "@/lib/utils/isSubdomain.client";

/**
 * as we cant make payments in organization.ieltsgoglobal.com 
 * this function opens the admin dashboard on the main website (ieltsgoglobal.com) in a new window,
 * passing the partnerId as a query parameter.
 */


export async function openMainWebsiteWindow() {
    // Step 1: Fetch the partnerId from the authenticated session
    const user = await getSessionUser()
    if (!user || user.role !== "organization") {
        console.error("Not logged in as organization")
        return
    }
    const partnerId = user.orgId

    // Step 2: Get the current page's full URL to return after payment
    const subdomain = getClientSubdomain();

    // Step 3: Construct the target URL with the partnerId as a query parameter
    const targetUrl = `https://ieltsgoglobal.com/partner-pricing?partnerId=${partnerId}&returnTo=${`https://${subdomain}.ieltsgoglobal.com`}`;

    // Step 4: Open the URL in a new popup window
    const win = window.open(targetUrl, "_blank", "width=1280,height=720");

    // Guard clause: Handle popup blocker case
    if (!win) {
        alert("⚠️ Please allow pop-ups to open the admin dashboard.");
    }
}