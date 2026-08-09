"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import {
  getCurrentVocabBattleProfileAction,
  getVocabBattleLeaderboardAction,
  recordCurrentVocabBattleResultAction,
} from "./actions"
import type { VocabBattleProfile } from "./store-data"

export const TOTAL_QUESTIONS = 5

const FINISHED_STATUSES = ["finished", "opponent_left", "error", "idle"]

export type BattleStatus =
  | "idle"
  | "connecting"
  | "waiting"
  | "playing"
  | "finished"
  | "opponent_left"
  | "error"

export type BattleQuestion = {
  word: string
  options: string[]
}

export type FinalScore = {
  score: number
  opponentScore: number
  xpEarned?: number
  saveStatus?: "saving" | "saved" | "error"
}

type ServerMessage =
  | { type: "waiting" }
  | { type: "matched" | "question"; number: number; question: BattleQuestion }
  | { type: "game_over"; score: number; opponent_score: number }
  | { type: "opponent_left" }
  | { type: "error"; message: string }

type BattleState = {
  finalScore: FinalScore | null
  leaderboard: { name: string; points: string; rank: number }[]
  notice: string
  question: BattleQuestion | null
  questionNumber: number
  selectedAnswer: string | null
  stats: Pick<
    VocabBattleProfile,
    "xp" | "level" | "wins" | "losses" | "draws" | "totalDuels" | "currentStreak" | "bestStreak"
  > | null
  status: BattleStatus
}

const initialState: BattleState = {
  finalScore: null,
  leaderboard: [],
  notice: "Ready to find an opponent.",
  question: null,
  questionNumber: 0,
  selectedAnswer: null,
  stats: null,
  status: "idle",
}

export function useVocabBattleSocket() {
  const socketRef = useRef<WebSocket | null>(null)
  const resultSavedRef = useRef(false)
  const [battle, setBattle] = useState(initialState)
  const wsUrl = process.env.NEXT_PUBLIC_VOCAB_BATTLE_WS_URL || ""

  const updateBattle = useCallback((next: Partial<BattleState>) => {
    setBattle((current) => ({ ...current, ...next }))
  }, [])

  const closeSocket = useCallback(() => {
    socketRef.current?.close()
    socketRef.current = null
  }, [])

  const resetMatch = useCallback(() => {
    resultSavedRef.current = false
    updateBattle({
      finalScore: null,
      question: null,
      questionNumber: 0,
      selectedAnswer: null,
    })
  }, [updateBattle])

  const refreshStats = useCallback(async () => {
    try {
      const profile = await getCurrentVocabBattleProfileAction()
      if (profile) updateBattle({ stats: toStats(profile) })
    } catch {
      updateBattle({ stats: null })
    }
  }, [updateBattle])

  const refreshLeaderboard = useCallback(async () => {
    try {
      const rows = await getVocabBattleLeaderboardAction()
      updateBattle({ leaderboard: rows.map(toLeaderboardRow) })
    } catch {
      updateBattle({ leaderboard: [] })
    }
  }, [updateBattle])

  const saveResult = useCallback(
    async (score: number, opponentScore: number) => {
      if (resultSavedRef.current) return
      resultSavedRef.current = true

      updateBattle({ finalScore: { score, opponentScore, saveStatus: "saving" } })

      const savedResult = await recordCurrentVocabBattleResultAction({
        score,
        opponentScore,
      })

      if (!savedResult) {
        console.log("[vocab-battle] result save returned null", { score, opponentScore })
        updateBattle({ finalScore: { score, opponentScore, saveStatus: "error" } })
        return
      }

      console.log("[vocab-battle] result save succeeded", savedResult)
      updateBattle({
        finalScore: {
          score,
          opponentScore,
          xpEarned: savedResult.xpEarned,
          saveStatus: "saved",
        },
        stats: toStats(savedResult.profile),
      })
      void refreshLeaderboard()
    },
    [refreshLeaderboard, updateBattle]
  )

  const handleServerMessage = useCallback(
    (message: ServerMessage) => {
      switch (message.type) {
        case "waiting":
          resetMatch()
          updateBattle({
            status: "waiting",
            notice: "Waiting for another student to join.",
          })
          return

        case "matched":
        case "question":
          updateBattle({
            status: "playing",
            question: message.question,
            questionNumber: message.number,
            selectedAnswer: null,
            finalScore: null,
            notice:
              message.type === "matched"
                ? "Opponent found. Choose the closest meaning."
                : "Next word is ready.",
          })
          return

        case "game_over":
          closeSocket()
          updateBattle({
            status: "finished",
            question: null,
            selectedAnswer: null,
            finalScore: {
              score: message.score,
              opponentScore: message.opponent_score,
              saveStatus: "saving",
            },
            notice: "Battle complete.",
          })
          void saveResult(message.score, message.opponent_score)
          return

        case "opponent_left":
          closeSocket()
          updateBattle({
            status: "opponent_left",
            question: null,
            selectedAnswer: null,
            notice: "Your opponent left the battle.",
          })
          return

        case "error":
          updateBattle({ status: "error", notice: message.message })
      }
    },
    [closeSocket, resetMatch, saveResult, updateBattle]
  )

  const connect = useCallback(() => {
    closeSocket()
    resetMatch()

    if (!wsUrl) {
      updateBattle({
        status: "error",
        notice: "Vocab battle server URL is not configured.",
      })
      return
    }

    updateBattle({
      status: "connecting",
      notice: "Connecting to vocab battle server.",
    })

    const socket = new WebSocket(wsUrl)
    socketRef.current = socket

    socket.onmessage = (event) => {
      try {
        handleServerMessage(JSON.parse(event.data) as ServerMessage)
      } catch {
        updateBattle({
          status: "error",
          notice: "Received an unreadable server message.",
        })
      }
    }

    socket.onerror = () => {
      updateBattle({
        status: "error",
        notice: "Could not connect to the battle server.",
      })
    }

    socket.onclose = () => {
      if (socketRef.current === socket) socketRef.current = null

      setBattle((current) => {
        if (FINISHED_STATUSES.includes(current.status)) return current

        return {
          ...current,
          status: "error",
          notice: "Connection closed before the battle finished.",
        }
      })
    }
  }, [closeSocket, handleServerMessage, resetMatch, updateBattle, wsUrl])

  const submitAnswer = useCallback(
    (answer: string) => {
      const socket = socketRef.current
      if (!socket || socket.readyState !== WebSocket.OPEN || battle.selectedAnswer) return

      updateBattle({
        selectedAnswer: answer,
        notice: "Answer submitted. Waiting for your opponent.",
      })
      socket.send(JSON.stringify({ type: "answer", answer }))
    },
    [battle.selectedAnswer, updateBattle]
  )

  useEffect(() => {
    void refreshStats()
    void refreshLeaderboard()
  }, [refreshLeaderboard, refreshStats])

  useEffect(() => closeSocket, [closeSocket])

  return { ...battle, connect, submitAnswer, wsUrl }
}

function toLeaderboardRow(profile: VocabBattleProfile, index: number) {
  return {
    name: profile.displayName || `Player ${index + 1}`,
    points: profile.xp.toLocaleString(),
    rank: index + 1,
  }
}

function toStats({
  xp,
  level,
  wins,
  losses,
  draws,
  totalDuels,
  currentStreak,
  bestStreak,
}: VocabBattleProfile) {
  return { xp, level, wins, losses, draws, totalDuels, currentStreak, bestStreak }
}
