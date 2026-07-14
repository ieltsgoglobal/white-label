"use server";

import { createReportError } from "@/lib/superbase/report-error-table";

export async function uploadReportScreenshot(screenshotUrl: string) {
    const form = new FormData();
    form.append("file", screenshotUrl);
    form.append("upload_preset", "report_errors");

    const response = await fetch("https://api.cloudinary.com/v1_1/stydflvg/image/upload", {
        method: "POST",
        body: form,
    });
    const data = await response.json();

    return data.secure_url as string;
}

export async function submitReportError(input: {
    source: string;
    message: string;
    screenshotUrl: string | null;
    metadata?: Record<string, unknown>;
}) {
    return createReportError(input);
}
