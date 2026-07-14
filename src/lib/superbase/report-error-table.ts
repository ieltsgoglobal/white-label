"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function createReportError({
    source,
    message,
    screenshotUrl,
    metadata
}: {
    source: string;
    message: string;
    screenshotUrl: string | null;
    metadata?: Record<string, unknown>;
}) {
    const { error } = await supabase.from("report_error").insert({
        source,
        message,
        screenshot_url: screenshotUrl,
        metadata: metadata ?? {}
    });

    if (error) {
        return { error: error.message };
    }

    return { success: true };
}
