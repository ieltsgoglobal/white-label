"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import {
  getCurrentVocabBattleProfileAction,
  getVocabBattleLeaderboardAction,
  recordCurrentVocabBattleResultAction,
} from "./actions"
import {
  FINISHED_STATUSES,
  toLeaderboardRow,
  toStats,
} from "./types"
import type {
  BattleQuestion,
  BattleStatus,
  FinalScore,
  LeaderboardRow,
  ServerMessage,
  VocabBattleStats,
} from "./types"

export type { BattleQuestion, BattleStatus, FinalScore } from "./types"
export { TOTAL_QUESTIONS } from "./types"

type BattleState = {
  finalScore: FinalScore | null
  leaderboard: LeaderboardRow[]
  notice: string
  question: BattleQuestion | null
  questionNumber: number
  selectedAnswer: string | null
  stats: VocabBattleStats | null
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

const clearedMatchState = {
  finalScore: null,
  question: null,
  questionNumber: 0,
  selectedAnswer: null,
} satisfies Partial<BattleState>

const toErrorState = (notice: string): Partial<BattleState> => {
  return { status: "error", notice }
}

const toScore = (score: number, opponentScore: number, saveStatus: FinalScore["saveStatus"]) => {
  return { score, opponentScore, saveStatus }
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
    updateBattle(clearedMatchState)
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

      updateBattle({ finalScore: toScore(score, opponentScore, "saving") })

      const savedResult = await recordCurrentVocabBattleResultAction({
        score,
        opponentScore,
      })

      if (!savedResult) {
        updateBattle({ finalScore: toScore(score, opponentScore, "error") })
        return
      }

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
            finalScore: toScore(message.score, message.opponent_score, "saving"),
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
      updateBattle(toErrorState("Vocab battle server URL is not configured."))
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
        updateBattle(toErrorState("Received an unreadable server message."))
      }
    }

    socket.onerror = () => {
      updateBattle(toErrorState("Could not connect to the battle server."))
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
