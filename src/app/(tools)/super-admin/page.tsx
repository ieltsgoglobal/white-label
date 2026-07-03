import { postgresQuery } from "@/lib/postgress-aws/postgres-query";
import { getAllUsers } from "@/lib/superbase/user-table";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type UserPracticeStats = {
    user_id: string;
    total_practices: number;
    listening_count: number;
    reading_count: number;
    writing_count: number;
    speaking_count: number;
    last_practiced_at: string | Date | null;
};

type UserRow = {
    id: string;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    created_at?: string | null;
};

async function getUsersPracticeStats(userIds: string[]): Promise<Record<string, UserPracticeStats>> {
    if (!userIds.length) return {};

    const { rows } = await postgresQuery(
        `
            SELECT
                user_id,
                COUNT(*)::int AS total_practices,
                COUNT(*) FILTER (WHERE section = 'listening')::int AS listening_count,
                COUNT(*) FILTER (WHERE section = 'reading')::int AS reading_count,
                COUNT(*) FILTER (WHERE section = 'writing')::int AS writing_count,
                COUNT(*) FILTER (WHERE section = 'speaking')::int AS speaking_count,
                MAX(submitted_at) AS last_practiced_at
            FROM (
                SELECT 'listening' AS section, user_id::text AS user_id, submitted_at
                FROM listening_submissions
                WHERE user_id::text = ANY($1::text[])

                UNION ALL

                SELECT 'reading' AS section, user_id::text AS user_id, submitted_at
                FROM reading_submissions
                WHERE user_id::text = ANY($1::text[])

                UNION ALL

                SELECT 'writing' AS section, user_id::text AS user_id, submitted_at
                FROM writing_submissions
                WHERE user_id::text = ANY($1::text[])

                UNION ALL

                SELECT 'speaking' AS section, user_id::text AS user_id, submitted_at
                FROM speaking_submissions
                WHERE user_id::text = ANY($1::text[])
            ) submissions
            GROUP BY user_id
        `,
        [userIds]
    );

    return (rows as UserPracticeStats[]).reduce<Record<string, UserPracticeStats>>((acc, stats) => {
        acc[stats.user_id] = stats;
        return acc;
    }, {});
}

function formatDate(value: UserPracticeStats["last_practiced_at"]) {
    if (!value) return "-";
    return new Date(value).toLocaleString();
}

function emptyStats(userId: string): UserPracticeStats {
    return {
        user_id: userId,
        total_practices: 0,
        listening_count: 0,
        reading_count: 0,
        writing_count: 0,
        speaking_count: 0,
        last_practiced_at: null,
    };
}

export default async function Page() {
    const users = (await getAllUsers()) as UserRow[];
    const userIds = users.map((user) => user.id);
    const statsByUserId = await getUsersPracticeStats(userIds);

    return (
        <main className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">Super Admin</h1>
                <p className="text-sm text-muted-foreground">
                    Showing practice stats for {users.length} users.
                </p>
            </div>

            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full min-w-[900px] text-sm">
                    <thead className="bg-muted/50 text-left">
                        <tr>
                            <th className="px-4 py-3 font-medium">User</th>
                            <th className="px-4 py-3 font-medium">Contact</th>
                            <th className="px-4 py-3 font-medium">Total Practices</th>
                            <th className="px-4 py-3 font-medium">Listening</th>
                            <th className="px-4 py-3 font-medium">Reading</th>
                            <th className="px-4 py-3 font-medium">Writing</th>
                            <th className="px-4 py-3 font-medium">Speaking</th>
                            <th className="px-4 py-3 font-medium">Last Practiced</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            const stats = statsByUserId[user.id] ?? emptyStats(user.id);

                            return (
                                <tr key={user.id} className="border-t">
                                    <td className="px-4 py-3">
                                        <div className="font-medium">{user.name || "-"}</div>
                                        <div className="font-mono text-xs text-muted-foreground">{user.id}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div>{user.phone || "-"}</div>
                                        <div className="text-xs text-muted-foreground">{user.email || "-"}</div>
                                    </td>
                                    <td className="px-4 py-3 font-semibold">{stats.total_practices}</td>
                                    <td className="px-4 py-3">{stats.listening_count}</td>
                                    <td className="px-4 py-3">{stats.reading_count}</td>
                                    <td className="px-4 py-3">{stats.writing_count}</td>
                                    <td className="px-4 py-3">{stats.speaking_count}</td>
                                    <td className="px-4 py-3 whitespace-nowrap">{formatDate(stats.last_practiced_at)}</td>
                                </tr>
                            );
                        })}

                        {!users.length && (
                            <tr>
                                <td className="px-4 py-8 text-center text-muted-foreground" colSpan={8}>
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
