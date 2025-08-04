
import { getUserSession } from "@/lib/auth/session/check-auth";
import UserNavDropdown from "./userNavDropdown.client";
import { Suspense } from "react";

type UserInfo = {
  id: string
  name: string
  role: string
}

export default async function UserNav() {
  const session = await getUserSession();

  const user: UserInfo = session
    ? session.role === "organization"
      ? { id: session.orgId!, name: session.organizationName!, role: "organization" }
      : session.role === "student"
        ? { id: session.studentId!, name: session.studentName!, role: "student" }
        : session.role === "teacher"
          ? { id: session.teacherId!, name: session.teacherName!, role: "teacher" }
          : { id: "", name: "Guest", role: "guest" }
    : { id: "", name: "Guest", role: "guest" };


  return (
    <div>
      <Suspense fallback={<>Loading..</>}>
        <UserNavDropdown user={user} />
      </Suspense>
    </div>
  );
} ``

