import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type MonthRange = {
    startDate: string;
    endDate: string;
};

// =========================================================
// =================== USERS DATA ==========================
// =========================================================

async function getTotalUsers(monthRange?: MonthRange) {
    let usersQuery = supabase
        .from("user")
        .select("id", { count: "exact", head: true });

    if (monthRange) {
        usersQuery = usersQuery
            .gte("created_at", monthRange.startDate)
            .lt("created_at", monthRange.endDate);
    }

    const { count, error } = await usersQuery;

    if (error) {
        throw new Error(`Failed to fetch total users: ${error.message}`);
    }

    return count ?? 0;
}

async function getTotalMembers(monthRange?: MonthRange) {
    let membersQuery = supabase
        .from("user")
        .select("id", { count: "exact", head: true })
        .not("last_payment_amount", "is", null);

    if (monthRange) {
        membersQuery = membersQuery
            .gte("last_payment_at", monthRange.startDate)
            .lt("last_payment_at", monthRange.endDate);
    }

    const { count, error } = await membersQuery;

    if (error) {
        throw new Error(`Failed to fetch total members: ${error.message}`);
    }

    return count ?? 0;
}

// =========================================================
// ================= PRACTICE TEST DATA ====================
// =========================================================

async function getTotalPracticeTests(monthRange: MonthRange) {
    const tables = [
        "practice_sets_listening_submissions",
        "practice_sets_reading_submissions",
        "practice_sets_speaking_submissions",
        "practice_sets_writing_submissions",
    ]

    const counts = await Promise.all(
        tables.map(async table => {
            const { count, error } = await supabase
                .from(table)
                .select("*", { count: "exact", head: true })
                .gte("submitted_at", monthRange.startDate)
                .lt("submitted_at", monthRange.endDate)

            if (error) throw new Error(`Failed to fetch ${table}: ${error.message}`)

            return count ?? 0
        })
    )

    return counts.reduce((sum, count) => sum + count, 0)
}

// =========================================================
// ==================== MAIN LOGIC DATA ====================
// =========================================================


export async function getSuperDashboardData(month: string) {
    const monthRange = getMonthRange(month);
    const [totalUsers, totalMembers, totalPracticeTests] = await Promise.all([
        getTotalUsers(monthRange),
        getTotalMembers(monthRange),
        getTotalPracticeTests(monthRange),
    ]);

    return {
        totalUsers,
        totalMembers,
        totalPracticeTests
    };
}


// =========================================================
// ==================== MISC LOGIC DATA ====================
// =========================================================


function getMonthRange(month: string): MonthRange {
    const [year, monthNumber] = month.split("-").map(Number);
    return { startDate: new Date(Date.UTC(year, monthNumber - 1, 1)).toISOString(), endDate: new Date(Date.UTC(year, monthNumber, 1)).toISOString(), };
}