"use server"

import { getUserSession } from "@/lib/auth/session/check-auth"
import type { SessionPayload } from "@/lib/auth/session/check-auth"

import {
  getVocabBattleProfile,
  getVocabBattleLeaderboard,
  recordVocabBattlePlayerResult,
} from "./store-data"

export async function getCurrentVocabBattleProfileAction() {
  const session = await getCurrentUser()
  return session ? getVocabBattleProfile(session.userId) : null
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
  const session = await getCurrentUser()
  if (!session) return null

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

async function getCurrentUser() {
  const session = await getUserSession()
  return isUserSession(session) ? session : null
}

function isUserSession(session: SessionPayload | null): session is SessionPayload & { role: "user" } {
  return session?.role === "user"
}
