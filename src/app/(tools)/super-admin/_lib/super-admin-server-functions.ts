import { db } from "@/lib/firebase/firebase";
import { postgresQuery } from "@/lib/postgress-aws/postgres-query";
import { getAllUsers } from "@/lib/superbase/user-table";
import { collection, getDocs } from "firebase/firestore";

export type UserPracticeStats = {
    user_id: string;
    total_practices: number;
    listening_count: number;
    reading_count: number;
    writing_count: number;
    speaking_count: number;
    last_practiced_at: string | Date | null;
};

export type UserRow = {
    id: string;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    created_at?: string | null;
};

export async function getSuperAdminDashboardData(offset = 0, limit = 50) {
    const users = (await getAllUsers(offset, limit)) as UserRow[];
    const userIds = users.map((user) => user.id);
    const [statsByUserId, mockTestsByUserId] = await Promise.all([
        getUsersPracticeStats(userIds),
        getUsersMockTestCounts(userIds),
    ]);

    return { users, statsByUserId, mockTestsByUserId };
}

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

async function getUsersMockTestCounts(userIds: string[]): Promise<Record<string, number>> {
    const counts = await Promise.all(
        userIds.map(async (userId) => {
            const attemptsRef = collection(db, "mock-tests", userId, "attempts");
            const snapshot = await getDocs(attemptsRef);

            return [userId, snapshot.size] as const;
        })
    );

    return Object.fromEntries(counts);
}

export function formatDate(value: UserPracticeStats["last_practiced_at"]) {
    if (!value) return "-";
    return new Date(value).toLocaleString();
}

export function emptyStats(userId: string): UserPracticeStats {
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
