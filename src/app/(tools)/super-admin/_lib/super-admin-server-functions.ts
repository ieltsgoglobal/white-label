import { db } from "@/lib/firebase/firebase";
import { postgresQuery } from "@/lib/postgress-aws/postgres-query";
import { getAllUsers } from "@/lib/superbase/user-table";
import { collection, getDocs } from "firebase/firestore";
import { UserDetailsFromDB } from "@/lib/superbase/user-table";

export type UserPracticeStats = {
    totalPractices: number;
    listeningCount: number;
    readingCount: number;
    writingCount: number;
    speakingCount: number;
    lastPracticedAt: string | null;
};

export type SuperAdminDashboardRow = {
    id: string;
    name: string;
    phone: string;
    email: string;
    createdAt: string | null;

    isMember: boolean;
    membershipExpiresAt: string | null;
    lastPaymentAmount: number | null;
    lastPaymentAt: string | null;

    mockTestsCount: number;

} & UserPracticeStats;

export async function getSuperAdminDashboardData(offset = 0, hasPhoneNumber = false, isMember = false) {

    // GET USERS
    const users = (await getAllUsers(offset, hasPhoneNumber, isMember)) as UserDetailsFromDB[];
    const userIds = users.map((user) => user.id);

    // GET USERS PRACTICE AND MOCK TESTS DATA
    const [statsByUserId, mockTestsByUserId] = await Promise.all([
        getUsersPracticeStats(userIds),
        getUsersMockTestCounts(userIds),
    ]);

    return {
        rows: users.map((user) => {

            return {
                id: user.id,
                name: user.name || "-",
                phone: user.phone || "-",
                email: user.email || "-",
                createdAt: user.created_at || null,

                isMember: user.is_member,
                membershipExpiresAt: user.membership_expires_at,
                lastPaymentAmount: user.last_payment_amount,
                lastPaymentAt: user.last_payment_at,

                mockTestsCount: mockTestsByUserId[user.id] ?? 0,

                totalPractices: statsByUserId[user.id]?.totalPractices ?? 0,
                listeningCount: statsByUserId[user.id]?.listeningCount ?? 0,
                readingCount: statsByUserId[user.id]?.readingCount ?? 0,
                writingCount: statsByUserId[user.id]?.writingCount ?? 0,
                speakingCount: statsByUserId[user.id]?.speakingCount ?? 0,
                lastPracticedAt: statsByUserId[user.id]?.lastPracticedAt ? new Date(statsByUserId[user.id]!.lastPracticedAt!).toISOString() : null,
            };
        }),
        totalUsers: users.length,
    };
}


// POSTGRESQL
// GET DATA FOR PRACTICE TEST ATTEMPS

async function getUsersPracticeStats(userIds: string[]): Promise<Record<string, UserPracticeStats>> {
    if (!userIds.length) return {};

    const { rows } = await postgresQuery(
        `
       SELECT
            user_id,
            COUNT(*)::int AS "totalPractices",
            SUM((section = 'listening')::int)::int AS "listeningCount",
            SUM((section = 'reading')::int)::int AS "readingCount",
            SUM((section = 'writing')::int)::int AS "writingCount",
            SUM((section = 'speaking')::int)::int AS "speakingCount",
            MAX(submitted_at) AS "lastPracticedAt"
        FROM (
            SELECT 'listening' section, user_id::text user_id, submitted_at FROM listening_submissions WHERE user_id::text = ANY($1)
            UNION ALL
            SELECT 'reading', user_id::text, submitted_at FROM reading_submissions WHERE user_id::text = ANY($1)
            UNION ALL
            SELECT 'writing', user_id::text, submitted_at FROM writing_submissions WHERE user_id::text = ANY($1)
            UNION ALL
            SELECT 'speaking', user_id::text, submitted_at FROM speaking_submissions WHERE user_id::text = ANY($1)
        ) s
        GROUP BY user_id
        `,
        [userIds]
    );

    return Object.fromEntries((rows as (UserPracticeStats & { user_id: string })[]).map(({ user_id, ...stats }) => [user_id, stats]));
}

// FIREBASE
// GET NUMBER OF MOCK TEST ATTEMPS

async function getUsersMockTestCounts(userIds: string[]): Promise<Record<string, number>> {
    return Object.fromEntries(await Promise.all(
        userIds.map(async (userId) => {
            const attemptsRef = collection(db, "mock-tests", userId, "attempts");
            return [userId, (await getDocs(attemptsRef)).size] as const;
        })
    ));
}
