
"use client"

import UserNavDropdown from "./userNavDropdown.client";
import { useEffect, useState } from "react";
import { getSessionUser } from "@/lib/auth/session/get-user";

type UserInfo = {
  id: string
  name: string
  role: string
}

export default function UserNav() {
  const [user, setUser] = useState<UserInfo | null>(null)

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSessionUser()

      if (!session) {
        setUser({ id: "", name: "Guest", role: "guest" })
        return
      }

      // Map session to uniform UserInfo structure
      const mappedUser: UserInfo =
        session.role === "organization"
          ? { id: session.orgId, name: session.organizationName, role: "organization" }
          : session.role === "student"
            ? { id: session.studentId, name: session.studentName, role: "student" }
            : session.role === "teacher"
              ? { id: session.teacherId, name: session.teacherName, role: "teacher" }
              : { id: "", name: "Guest", role: "guest" }

      setUser(mappedUser)
    }

    fetchSession()
  }, [])


  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <UserNavDropdown user={user} />
  );
}

