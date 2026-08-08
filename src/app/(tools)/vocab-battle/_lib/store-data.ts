import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const TABLE = "vocab_battle_profiles"
const XP_PER_LEVEL = 500

type ProfileRow = {
  user_id: string
  display_name: string | null
  xp: number
  level: number
  wins: number
  losses: number
  draws: number
  total_duels: number
  current_streak: number
  best_streak: number
}

export type VocabBattleProfile = {
  userId: string
  displayName: string | null
  xp: number
  level: number
  wins: number
  losses: number
  draws: number
  totalDuels: number
  currentStreak: number
  bestStreak: number
}

export async function getVocabBattleProfile(userId: string) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("user_id", userId)
    .maybeSingle<ProfileRow>()

  if (error) throw new Error(error.message)
  return data ? toProfile(data) : null
}

export async function recordVocabBattlePlayerResult({
  userId,
  displayName = null,
  score,
  opponentScore,
}: {
  userId: string
  displayName?: string | null
  score: number
  opponentScore: number
}) {
  console.log("[vocab-battle] recording result", { userId, displayName, score, opponentScore })

  const previous = await getVocabBattleProfile(userId)
  const didWin = score > opponentScore
  const didDraw = score === opponentScore
  const xpEarned = 25 + score * 20 + (didWin ? 50 : 0) + (didDraw ? 15 : 0)
  const currentStreak = didWin ? (previous?.currentStreak ?? 0) + 1 : 0

  const nextProfile = {
    user_id: userId,
    display_name: displayName ?? previous?.displayName,
    xp: (previous?.xp ?? 0) + xpEarned,
    wins: (previous?.wins ?? 0) + (didWin ? 1 : 0),
    losses: (previous?.losses ?? 0) + (!didWin && !didDraw ? 1 : 0),
    draws: (previous?.draws ?? 0) + (didDraw ? 1 : 0),
    total_duels: (previous?.totalDuels ?? 0) + 1,
    current_streak: currentStreak,
    best_streak: Math.max(previous?.bestStreak ?? 0, currentStreak),
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from(TABLE)
    .upsert({
      ...nextProfile,
      level: Math.floor(nextProfile.xp / XP_PER_LEVEL) + 1,
    })
    .select("*")
    .single<ProfileRow>()

  if (error) {
    console.error("[vocab-battle] supabase upsert failed", error)
    throw new Error(error.message)
  }

  console.log("[vocab-battle] result saved", { userId, xpEarned, totalXp: nextProfile.xp })
  return { profile: toProfile(data), xpEarned }
}

export async function getVocabBattleLeaderboard(limit = 25) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("xp", { ascending: false })
    .order("wins", { ascending: false })
    .limit(limit)
    .returns<ProfileRow[]>()

  if (error) throw new Error(error.message)
  return data.map(toProfile)
}

function toProfile(row: ProfileRow): VocabBattleProfile {
  return {
    userId: row.user_id,
    displayName: row.display_name,
    xp: row.xp,
    level: row.level,
    wins: row.wins,
    losses: row.losses,
    draws: row.draws,
    totalDuels: row.total_duels,
    currentStreak: row.current_streak,
    bestStreak: row.best_streak,
  }
}
