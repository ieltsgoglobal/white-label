"use server";

import { createClient } from "@supabase/supabase-js";
import { getUserSession } from "@/lib/auth/session/check-auth";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function createReportError({
    source,
    message,
    screenshotUrl,
    reportedPhone,
    metadata
}: {
    source: string;
    message: string;
    screenshotUrl: string | null;
    reportedPhone?: string;
    metadata?: Record<string, unknown>;
}) {
    const session = await getUserSession();
    const userId = session?.role === "user" ? session.userId : null;

    const { error } = await supabase.from("report_error").insert({
        source,
        message,
        screenshot_url: screenshotUrl,
        reported_phone: reportedPhone?.trim() || null,
        user_id: userId,
        metadata: metadata ?? {}
    });

    if (error) {
        return { error: error.message };
    }

    return { success: true };
}
