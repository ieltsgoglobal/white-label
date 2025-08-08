"use client"

import { Student } from "@/app/(organization-auth)/admin-dashboard/_components/users/user-managment"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"

export function DisplayStudentsTable({ students }: { students: Student[] }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null)

    const filteredStudents = useMemo(
        () => filterStudents(students, searchQuery, selectedLetter),
        [students, searchQuery, selectedLetter]
    )
    return (
        <Card>
            <CardHeader>
                <CardTitle>Students</CardTitle>
                <CardDescription>List of students assigned to you</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Search by name or username..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    <AlphabetFilter value={selectedLetter} onChange={setSelectedLetter} />
                </div>
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
                            {filteredStudents.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center text-sm text-muted-foreground">
                                        No Students Found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredStudents.map((student) => (
                                    <TableRow key={student.id}>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {student.created_at
                                                ? new Date(student.created_at).toLocaleDateString("en-GB")
                                                : "N/A"}
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



function AlphabetFilter({
    value,
    onChange,
}: {
    value: string | null
    onChange: (letter: string | null) => void
}) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
    return (
        <div className="flex flex-wrap gap-2">
            <Button
                size="sm"
                variant={value === null ? "default" : "outline"}
                onClick={() => onChange(null)}
            >
                All
            </Button>
            {letters.map((L) => (
                <Button
                    key={L}
                    size="sm"
                    variant={value === L ? "default" : "outline"}
                    onClick={() => onChange(L)}
                    aria-pressed={value === L}
                >
                    {L}
                </Button>
            ))}
        </div>
    )
}


function filterStudents(students: Student[], q: string, initial: string | null) {
    // Guard: nothing to filter
    if (!q && !initial) return students

    const query = q.trim().toLowerCase()
    return students.filter((s) => {
        const name = (s.name ?? "").toLowerCase()
        const username = (s.username ?? "").toLowerCase()

        // Guard: if initial is set and neither field starts with it, reject
        if (initial) {
            const i = initial.toLowerCase()
            const startsWithInitial =
                name.startsWith(i) || username.startsWith(i)
            if (!startsWithInitial) return false
        }

        // Guard: if no query, we've already passed initial filter
        if (!query) return true

        // Apply text query
        return name.includes(query) || username.includes(query)
    })
}