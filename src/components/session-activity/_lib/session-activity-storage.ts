const VISITOR_ID_KEY = "__igg_analytics_visitor_id";
const SESSION_ID_KEY = "__igg_analytics_session_id";
const SESSION_ACTIVITY_STORAGE_KEY = "__igg_analytics_session_activity";

export interface PageActivity {
    pathname: string;
    url: string;
    startedAt: number;
    endedAt?: number;
    buttonsClicked: {
        id: string;
        text?: string;
        timestamp: number;
    }[];
}

export interface SessionActivity {
    visitorId: string;
    sessionId: string;
    pages: PageActivity[];
}

export function getVisitorId() {
    let id = localStorage.getItem(VISITOR_ID_KEY);
    if (!id) { id = crypto.randomUUID(); localStorage.setItem(VISITOR_ID_KEY, id) }
    return id;
}

export function getSessionId() {
    let id = sessionStorage.getItem(SESSION_ID_KEY);
    if (!id) { id = crypto.randomUUID(); sessionStorage.setItem(SESSION_ID_KEY, id) }
    return id;
}

export function getSessionActivity(): SessionActivity {
    let session = JSON.parse(sessionStorage.getItem(SESSION_ACTIVITY_STORAGE_KEY) || "null");
    if (!session) session = { visitorId: getVisitorId(), sessionId: getSessionId(), pages: [] };
    return session;
}

export function updateSessionActivity(session: SessionActivity) {
    sessionStorage.setItem(SESSION_ACTIVITY_STORAGE_KEY, JSON.stringify(session));
    return session;
}