// components/teacher/display-students.tsx (Server)

import { getUserSession } from "@/lib/auth/session/check-auth"
import { getStudentsByTeacherId } from "@/lib/superbase/student-table"
import { DisplayStudentsTable } from "./DisplayStudents.client"

export default async function DisplayStudentsServer() {
    const session = await getUserSession()

    if (!session) {
        return <p className="text-center text-red-500">Not authenticated</p>
    }
    if (session.role !== "teacher" || !session.teacherId) {
        return <p className="text-center text-red-500">Access denied</p>
    }

    // Fetch students
    const result = await getStudentsByTeacherId(session.teacherId)
    if ("error" in result) {
        return <p className="text-center text-red-500">Error loading students: {result.error}</p>
    }

    const students = result.students

    return (
        <div>
            <DisplayStudentsTable students={students} />
        </div>
    )

}