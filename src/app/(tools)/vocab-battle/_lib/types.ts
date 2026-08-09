import type { VocabBattleProfile } from "./store-data"

export const TOTAL_QUESTIONS = 7

export type BattleStatus = "idle" | "connecting" | "waiting" | "playing" | "finished" | "opponent_left" | "error"

export const FINISHED_STATUSES: readonly BattleStatus[] = ["finished", "opponent_left", "error", "idle"]

export type BattleQuestion = { word: string; options: string[] }

export type FinalScore = {
  score: number
  opponentScore: number
  xpEarned?: number
  saveStatus?: "saving" | "saved" | "error"
}

export type LeaderboardRow = { name: string; points: string; rank: number }

export type VocabBattleStats = Pick<
  VocabBattleProfile,
  "xp" | "level" | "wins" | "losses" | "draws" | "totalDuels" | "currentStreak" | "bestStreak"
>

export type ServerMessage =
  | { type: "waiting" }
  | { type: "matched" | "question"; number: number; question: BattleQuestion }
  | { type: "game_over"; score: number; opponent_score: number }
  | { type: "opponent_left" }
  | { type: "error"; message: string }

export function toLeaderboardRow(profile: VocabBattleProfile, index: number): LeaderboardRow {
  return {
    name: profile.displayName || `Player ${index + 1}`,
    points: profile.xp.toLocaleString(),
    rank: index + 1,
  }
}

export function toStats({
  xp,
  level,
  wins,
  losses,
  draws,
  totalDuels,
  currentStreak,
  bestStreak,
}: VocabBattleProfile): VocabBattleStats {
  return { xp, level, wins, losses, draws, totalDuels, currentStreak, bestStreak }
}
