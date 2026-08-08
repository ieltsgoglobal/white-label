import { db } from "@/lib/firebase/firebase";
import { getAllUsers, getUserByPhone } from "@/lib/superbase/user-table";
import { collection, getDocs } from "firebase/firestore";
import { UserDetailsFromDB } from "@/lib/superbase/user-table";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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
    return getSuperAdminDashboardDataFromUsers(users);
}

// GET SINGLE USER DATA
export async function getSuperAdminDashboardDataByStudentPhone(studentPhone: string) {
    const phone = studentPhone.trim();
    if (!phone) return { rows: [], totalUsers: 0 };

    const user = await getUserByPhone(phone);
    if (!user) return { rows: [], totalUsers: 0 };

    return getSuperAdminDashboardDataFromUsers([user]);
}

// GET ALL USER DATA
async function getSuperAdminDashboardDataFromUsers(users: UserDetailsFromDB[]) {
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


// SUPABASE
// GET DATA FOR PRACTICE TEST ATTEMPTS

async function getUsersPracticeStats(userIds: string[]): Promise<Record<string, UserPracticeStats>> {
    if (!userIds.length) return {};

    type PracticeStatsRpcRow = {
        user_id: string;
        total_practices: number | null;
        listening_count: number | null;
        reading_count: number | null;
        writing_count: number | null;
        speaking_count: number | null;
        last_practiced_at: string | null;
    };

    // RPC: get_practice_stats_for_users
    // users here are students and users both
    // reffrer src/app/(auth)/login/_components/README.md
    const { data, error } = await supabase.rpc("get_practice_stats_for_users", { p_user_ids: userIds });

    if (error) { throw new Error(`Failed to fetch practice stats: ${error.message}`) }

    return Object.fromEntries(
        ((data ?? []) as PracticeStatsRpcRow[]).map((row) => [
            row.user_id,
            {
                totalPractices: row.total_practices ?? 0,
                listeningCount: row.listening_count ?? 0,
                readingCount: row.reading_count ?? 0,
                writingCount: row.writing_count ?? 0,
                speakingCount: row.speaking_count ?? 0,
                lastPracticedAt: row.last_practiced_at ?? null,
            },
        ])
    );
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
