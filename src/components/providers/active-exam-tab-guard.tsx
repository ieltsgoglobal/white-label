"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

const LOCK_KEY = "ielts-active-exam-tab-v2"
const TAB_ID_KEY = "ielts-active-exam-tab-id-v2"
const EXPIRE_AFTER_MS = 3 * 60 * 60 * 1000

type ExamLock = {
  tabId: string
  path: string
  createdAt: number
}

type GuardState = {
  pathname: string
  allowed: boolean
}

const isGuardedPath = (path: string) =>
  /^\/practice-sets\/(listening|reading|writing|speaking)\/?$/.test(path) ||
  path.startsWith("/mock-tests/") ||
  path.startsWith("/mock-scores/review/")

function getOrCreateTabId() {
  const tabId = sessionStorage.getItem(TAB_ID_KEY) || crypto.randomUUID()
  sessionStorage.setItem(TAB_ID_KEY, tabId)
  return tabId
}

function getActiveLock(): ExamLock | null {
  try {
    const lock = JSON.parse(localStorage.getItem(LOCK_KEY) || "null") as ExamLock | null

    if (!lock?.tabId || isExpired(lock)) {
      localStorage.removeItem(LOCK_KEY)
      return null
    }

    return lock
  } catch {
    localStorage.removeItem(LOCK_KEY)
    return null
  }
}

function isExpired(lock: ExamLock) {
  return Date.now() - lock.createdAt > EXPIRE_AFTER_MS
}

function writeLock(tabId: string, path: string) {
  localStorage.setItem(LOCK_KEY, JSON.stringify({ tabId, path, createdAt: Date.now() }))
}

function releaseLock(tabId: string) {
  if (getActiveLock()?.tabId === tabId) {
    localStorage.removeItem(LOCK_KEY)
  }
}

function claimLock(tabId: string, path: string) {
  const lock = getActiveLock()
  const allowed = !lock || lock.tabId === tabId

  if (allowed && !lock) {
    writeLock(tabId, path)
  }

  return allowed
}

export default function ActiveExamTabGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isGuardedRoute = useMemo(() => isGuardedPath(pathname), [pathname])
  const [guardState, setGuardState] = useState<GuardState>({ pathname: "", allowed: false })

  useEffect(() => {
    const existingTabId = sessionStorage.getItem(TAB_ID_KEY)
    const tabId = existingTabId || (isGuardedRoute ? getOrCreateTabId() : "")

    function refreshGuardState() {
      if (!isGuardedRoute) {
        releaseLock(tabId)
        setGuardState({ pathname, allowed: true })
        return
      }

      setGuardState({
        pathname,
        allowed: claimLock(tabId, pathname),
      })
    }

    refreshGuardState()
    if (!isGuardedRoute) return

    const unload = () => releaseLock(tabId)
    window.addEventListener("storage", refreshGuardState)
    window.addEventListener("beforeunload", unload)

    return () => {
      window.removeEventListener("storage", refreshGuardState)
      window.removeEventListener("beforeunload", unload)
      releaseLock(tabId)
    }
  }, [isGuardedRoute, pathname])

  const canRenderPage = !isGuardedRoute || (guardState.pathname === pathname && guardState.allowed)

  if (canRenderPage) return <>{children}</>

  return <BlockedExamTab />
}

function BlockedExamTab() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Test already open</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Another practice set or mock test is already open in this browser. Continue there, or close that tab and refresh this page.
          </p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
