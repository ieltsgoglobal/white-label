"use server"

import { getUserSession } from "@/lib/auth/session/check-auth"
import type { SessionPayload } from "@/lib/auth/session/check-auth"

import {
  getVocabBattleProfile,
  getVocabBattleLeaderboard,
  recordVocabBattlePlayerResult,
} from "./store-data"

export async function getCurrentVocabBattleProfileAction() {
  const session = await getUserSession()
  if (!isUserSession(session)) return null

  return getVocabBattleProfile(session.userId)
}

export async function getVocabBattleLeaderboardAction() {
  try {
    return await getVocabBattleLeaderboard(25)
  } catch {
    return []
  }
}

export async function recordCurrentVocabBattleResultAction({
  score,
  opponentScore,
}: {
  score: number
  opponentScore: number
}) {
  const session = await getUserSession()
  console.log("[vocab-battle] save requested", { score, opponentScore, session })

  if (!isUserSession(session)) {
    console.log("[vocab-battle] result not saved: no user session")
    return null
  }

  try {
    return await recordVocabBattlePlayerResult({
      userId: session.userId,
      displayName: session.userName,
      score,
      opponentScore,
    })
  } catch (error) {
    console.error("[vocab-battle] result save failed", error)
    return null
  }
}

function isUserSession(session: SessionPayload | null): session is SessionPayload & { role: "user" } {
  return session?.role === "user"
}
