"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getSessionActivity, updateSessionActivity } from "../_lib/session-activity-storage";
import { syncSessionActivity } from "../_lib/session-activity-db-storage";
import { getSyncIntervals } from "../_lib/session-activity-time-management";

export function SessionActivity() {
    const pathname = usePathname();

    // Figures out the pages visited
    useEffect(() => {
        const session = getSessionActivity()
        session.pages.push({ pathname, url: window.location.href, startedAt: Date.now(), buttonsClicked: [] });
        updateSessionActivity(session);
    }, [pathname]);

    // Figure of button clicks on page visited
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const session = getSessionActivity();
            const currentPage = session.pages.at(-1);

            const triggeredElement = (event.target as HTMLElement).closest("button,a") as HTMLElement;

            currentPage!.buttonsClicked.push({
                id: triggeredElement?.id || "",
                text: triggeredElement?.textContent?.trim(),
                timestamp: Date.now(),
            });

            updateSessionActivity(session);
        };

        document.addEventListener("click", handleClick, true);
        return () => document.removeEventListener("click", handleClick, true);
    }, []);

    // Update the DB every SyncInterval
    useEffect(() => {
        if (process.env.NODE_ENV === "development") return
        const timers = getSyncIntervals().map((delay) => setTimeout(syncSessionActivity, delay));
        return () => timers.forEach(clearTimeout);
    }, []);

    return null;
}