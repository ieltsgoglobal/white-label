// components/teacher/display-students.tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getSessionUser } from "@/lib/auth/session/get-user"
import { getStudentsByTeacherId } from "@/lib/superbase/student-table"
import { jwtVerify } from "jose"
import { cookies } from "next/headers"
import Link from "next/link"


const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "super-secret-key")


export default async function DisplayStudentsTable() {


    // Get JWT from cookies
    const token = cookies().get("token")?.value
    if (!token) {
        return <p className="text-center text-red-500">Not authenticated</p>
    }
    let teacherId: string
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET)

        if (payload.role !== "teacher" || !payload.teacherId) {
            return <p className="text-center text-red-500">Access denied</p>
        }

        teacherId = payload.teacherId as string
    } catch (err) {
        return <p className="text-center text-red-500">Invalid session</p>
    }


    // fetch students
    let students;
    const result = await getStudentsByTeacherId(teacherId)
    if ("error" in result) {
        return <p className="text-center text-red-500">Error loading students: {result.error}</p>
    }
    if (result) { console.log(result); students = result.students }


    if (!students) return <>Loading...</>

    return (
        <Card>
            <CardHeader>
                <CardTitle>Students</CardTitle>
                <CardDescription>List of students assigned to you</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date Created</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead className="text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center text-sm text-muted-foreground">
                                        No Students Found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                students.map((student) => (
                                    <TableRow key={student.id}>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {new Date(student.created_at).toLocaleDateString("en-GB")}
                                        </TableCell>
                                        <TableCell className="text-sm">{student.name}</TableCell>
                                        <TableCell className="text-sm">{student.username}</TableCell>
                                        <TableCell className="flex justify-center items-center">
                                            <Link href={`/mock-scores?teacher-review=true&studentid=${student.id}`}>
                                                <Button size="sm" variant="outline">
                                                    View Details
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}