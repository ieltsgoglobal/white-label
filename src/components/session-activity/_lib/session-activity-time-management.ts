/**
 * Analytics sync scheduling utilities.
 *
 * Instead of syncing analytics at a fixed interval, we generate
 * exponentially increasing sync checkpoints. This allows us to
 * capture short sessions accurately while reducing unnecessary
 * network and database writes for long-running sessions.
 *
 * Example schedule:
 * 3s
 * 5s
 * 7s
 * 10s
 * 15s
 * 23s
 * 34s
 * 51s
 * 77s
 * 116s
 * ...
 * up to 2 hours.
 *
 * A session start timestamp is persisted in sessionStorage.
 * When the page reloads, previously elapsed intervals are removed
 * so the sync schedule continues from where the session left off
 * instead of restarting from the beginning.
 *
 * Example:
 *
 * Session starts
 * → syncs at 3s, 5s, 7s, 10s, 15s
 *
 * User reloads at 18s
 * → next syncs become 23s, 34s, 51s...
 * → not 3s, 5s, 7s again
 *
 * Benefits:
 * - Captures short-lived visits accurately.
 * - Minimizes writes for long sessions.
 * - Survives page reloads.
 * - Works well alongside pagehide/unload syncs.
 * - Uses the sessionId as a heartbeat and analytics snapshot.
 */

const SESSION_STARTED_AT_KEY = "__igg_analytics_started_at";


export function getSyncIntervals(): number[] {
    return getRemainingIntervals(makeSmoothIntervals());
}

function makeSmoothIntervals() {
    const intervals: number[] = [];
    let delay = 3_000;

    while (delay <= 2 * 60 * 60 * 1000) {
        intervals.push(delay);
        delay *= 1.5;
    }

    return intervals;
}

function getRemainingIntervals(intervals: number[]) {
    const elapsed = Date.now() - getSessionStartedAt();
    return intervals.filter(delay => delay > elapsed).map(delay => delay - elapsed);
}

function getSessionStartedAt() {
    let startedAt = Number(sessionStorage.getItem(SESSION_STARTED_AT_KEY));

    if (!startedAt) {
        startedAt = Date.now();
        sessionStorage.setItem(SESSION_STARTED_AT_KEY, String(startedAt));
    }

    return startedAt;
}
