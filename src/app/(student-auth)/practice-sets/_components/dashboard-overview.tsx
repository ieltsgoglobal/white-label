"use client"

import { PerformanceSummary } from "./performance-summary";
import { RecentSessionsTable } from "./recent-sessions-table";
import { useGetPracticeSetsUserSubmissions } from "@/hooks/aws-postgres/practice-sets/get-user-submissons/useGetUserSubmissions";
import { convertListeningSubmissionsToPerformanceSummaryData, convertReadingSubmissionsToPerformanceSummaryData, convertSpeakingSubmissionsToPerformanceSummaryData, convertWritingSubmissionsToPerformanceSummaryData, sanitizeRecentSessionsTableData } from "../_utils/santizeGetUserSubmissions";

export default function PracticeSetsDashboardOverview({ section = 'reading' }: { section?: string }) {

    const { data } = useGetPracticeSetsUserSubmissions(section);

    console.log(data)

    if (!data) return

    let sanitizedPerformanceSummaryStats;
    let sanitizedRecentSessionsTableData;

    switch (section) {
        case "reading":
            sanitizedPerformanceSummaryStats = convertReadingSubmissionsToPerformanceSummaryData(data)
            sanitizedRecentSessionsTableData = sanitizeRecentSessionsTableData(data, "reading")

            break
        case "listening":
            sanitizedPerformanceSummaryStats = convertListeningSubmissionsToPerformanceSummaryData(data)
            sanitizedRecentSessionsTableData = sanitizeRecentSessionsTableData(data, "listening")

            break
        case "writing":
            sanitizedPerformanceSummaryStats = convertWritingSubmissionsToPerformanceSummaryData(data)
            sanitizedRecentSessionsTableData = sanitizeRecentSessionsTableData(data, "writing")

            break
        case "speaking":
            sanitizedPerformanceSummaryStats = convertSpeakingSubmissionsToPerformanceSummaryData(data)
            sanitizedRecentSessionsTableData = sanitizeRecentSessionsTableData(data, "speaking")
            break
        default:
            sanitizedPerformanceSummaryStats = convertReadingSubmissionsToPerformanceSummaryData(data)
            sanitizedRecentSessionsTableData = sanitizeRecentSessionsTableData(data, "speaking")
    }

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 lg:px-8">
            <PerformanceSummary stats={sanitizedPerformanceSummaryStats} section={section} />

            <section className="mt-6 md:mt-8">
                <RecentSessionsTable sessions={sanitizedRecentSessionsTableData} />
            </section>
        </main>
    )
}