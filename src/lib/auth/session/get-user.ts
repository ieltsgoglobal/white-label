// uses cookies and jwt to get current user details

export type SessionUser =
  | { role: "student"; studentId: string }
  | { role: "organization"; orgId: string }
  | { role: "teacher"; teacherId: string }

export const getSessionUser = async (): Promise<SessionUser | null> => {
  try {
    const res = await fetch("/api/auth/me", {
      method: "GET",
      credentials: "include", // ✅ Sends HttpOnly cookie
    })

    if (!res.ok) return null

    const data = await res.json()

    if (data.role === "student" && data.studentId) {
      return { role: "student", studentId: data.studentId }
    }

    if (data.role === "organization" && data.orgId) {
      return { role: "organization", orgId: data.orgId }
    }

    if (data.role === "teacher" && data.teacherId) {
      return { role: "teacher", teacherId: data.teacherId }
    }

    return null
  } catch {
    return null
  }
}