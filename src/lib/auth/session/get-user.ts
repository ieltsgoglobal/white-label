// uses cookies and jwt to get current user details
// used in client side authentication

export type SessionUser =
  | { role: "student"; studentId: string; studentName: string }
  | { role: "organization"; orgId: string; organizationName: string }
  | { role: "teacher"; teacherId: string; teacherName: string }

export const getSessionUser = async (): Promise<SessionUser | null> => {
  try {
    const res = await fetch("/api/auth/me", {
      method: "GET",
      credentials: "include", // ✅ Sends HttpOnly cookie
    })


    if (!res.ok) return null

    const data = await res.json()

    if (data.role === "student" && data.studentId) {
      return { role: "student", studentId: data.studentId, studentName: data.studentName }
    }

    if (data.role === "organization" && data.orgId) {
      return { role: "organization", orgId: data.orgId, organizationName: data.organizationName }
    }

    if (data.role === "teacher" && data.teacherId) {
      return { role: "teacher", teacherId: data.teacherId, teacherName: data.teacherName }
    }

    return null
  } catch {
    return null
  }
}