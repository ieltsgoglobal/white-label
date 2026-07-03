import { emptyStats, getSuperAdminDashboardData } from "../_lib/super-admin-server-functions";
import { SuperAdminDashboardClient } from "./super-admin-dashboard.client";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function SuperAdminDashboard({ offset = 0 }: { offset?: number }) {
    const { users, statsByUserId, mockTestsByUserId } = await getSuperAdminDashboardData(offset);

    const rows = users.map((user) => {
        const stats = statsByUserId[user.id] ?? emptyStats(user.id);
        return {
            id: user.id,
            name: user.name || "-",
            phone: user.phone || "-",
            email: user.email || "-",
            createdAt: user.created_at || null,
            mockTestsCount: mockTestsByUserId[user.id] ?? 0,
            totalPractices: stats.total_practices,
            listeningCount: stats.listening_count,
            readingCount: stats.reading_count,
            writingCount: stats.writing_count,
            speakingCount: stats.speaking_count,
            lastPracticedAt: stats.last_practiced_at ? new Date(stats.last_practiced_at).toISOString() : null,
        };
    });

    return <SuperAdminDashboardClient rows={rows} totalUsers={users.length} />;
}
