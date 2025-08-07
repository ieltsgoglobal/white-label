"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Eye, Ban, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import PasswordCell from "./Password-cell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useEffect, useMemo, useState } from "react"
import { getClientSubdomain } from "@/lib/utils/isSubdomain.client"
import { Student } from "../user-managment"
import { toggleStudentActivation } from "@/lib/superbase/student-table"


export default function DisplayStudents({ users }: { users: Student[] }) {
    const [studentList, setStudentList] = useState<Student[]>([]) // 🆙 local state (we are using this to how that handleToggleActivation is working, without refetching all data again)
    const [searchQuery, setSearchQuery] = useState("")

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    useEffect(() => {
        setStudentList(users)
    }, [users])


    const filteredUsers = useMemo(() => {
        if (!searchQuery.trim()) return studentList
        const query = searchQuery.toLowerCase()

        return studentList.filter(
            (user) =>
                user.name.toLowerCase().includes(query) ||
                user.username.toLowerCase().includes(query)
        )
    }, [studentList, searchQuery])


    // fake the list when the activated status gets updated without fetching data again
    async function handleToggleActivation(user: Student) {
        if (user.created_at) {
            const createdAt = new Date(user.created_at)
            const now = new Date()
            const sixMonthsAfterCreation = new Date(createdAt)
            sixMonthsAfterCreation.setMonth(createdAt.getMonth() + 6)


            console.log("Created At:", createdAt.toISOString())
            console.log("Now:", now.toISOString())
            console.log("Six Months After Creation:", sixMonthsAfterCreation.toISOString())

            // ❌ Block toggling if account is older than 6 months
            if (now >= sixMonthsAfterCreation) {
                alert("You cannot toggle users older than 6 months.")
                return
            }
        }

        const result = await toggleStudentActivation(user)

        if ("error" in result) {
            alert(result.error)
            return
        }

        // ✅ Optimistically update local state
        setStudentList((prev) =>
            prev.map((u) =>
                u.id === user.id ? { ...u, activated: result.newStatus } : u
            )
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>A list of all users including freelancers and clients</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Search by name or username..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="pl-10"
                        />
                    </div>
                    {/* <Select value={roleFilter} onValueChange={setRoleFilter}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Roles</SelectItem>
                            <SelectItem value="freelancer">Freelancer</SelectItem>
                            <SelectItem value="client">Client</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="pending">Deactivated</SelectItem>
                        </SelectContent>
                    </Select> */}
                </div>

                {/* Users Table */}
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date of Creation</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Usernmae</TableHead>
                                <TableHead>Passworod</TableHead>
                                <TableHead>Revenue</TableHead>
                                <TableHead>Valid Till</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center text-sm text-gray-500">
                                        No Users found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="text-sm text-gray-500"> {formatDate(user.created_at)}</TableCell>
                                        <TableCell className="text-sm dark:text-muted-foreground">{user.name}</TableCell>
                                        <TableCell className="text-sm dark:text-muted-foreground">{user.username}</TableCell>
                                        <TableCell className="text-sm dark:text-muted-foreground"><PasswordCell pass={user.password} /></TableCell>
                                        <TableCell className="text-sm text-green-600">{user.revenue}</TableCell>
                                        <TableCell className="text-sm dark:text-muted-foreground">{calculateValidTill(user.created_at)}</TableCell>
                                        <TableCell>{getStatusBadge(user.activated)}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => copyUserDetails(user)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        Copy Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={() => handleToggleActivation(user)}
                                                        className={user.activated ? "text-red-600" : "text-green-600"}
                                                    >
                                                        {renderToggleLabel(user.activated)}
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {/* <div className="flex items-center justify-between space-x-2 py-4">
                        <div className="text-sm text-gray-500">Showing 1 to 5 of 12,847 users</div>
                        <div className="flex space-x-2">
                            <Button variant="outline" size="sm" disabled>
                                Previous
                            </Button>
                            <Button variant="outline" size="sm">
                                Next
                            </Button>
                        </div>
                    </div> */}
            </CardContent>
        </Card>
    )
} function copyUserDetails(user: Student) {
    if (!user) return

    const subdomain = getClientSubdomain()
    const details = `Hi there,

Your IELTS mock test account has been created.

Username: ${user.username}
Password: ${user.password}
Test Link: https://${subdomain}.ieltsgoglobal.com

Please log in to begin your mock test. If you face any issues, feel free to reach out.

Good luck!
`

    navigator.clipboard.writeText(details)
        .then(() => {
            alert("Details copied to clipboard. You can now share them with the student.")
        })
        .catch((err) => {
            console.error("Failed to copy: ", err)
            alert("Failed to copy user details.")
        })
}




// Helper: Format date
function formatDate(dateString: string | null): string {
    if (!dateString) return "-"
    return new Date(dateString).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}

// Helper: Valid till = +6 months
function calculateValidTill(createdAt: string | null): string {
    if (!createdAt) return "-"
    const date = new Date(createdAt)
    date.setMonth(date.getMonth() + 6)
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}

// if 6 months passed then show inactive
const getStatusBadge = (activated: boolean) => {
    return activated ? (
        <Badge className="bg-green-100 text-green-800">Activated</Badge>
    ) : (
        <Badge className="bg-red-100 text-red-800">Deactivated</Badge>
    )
}

const renderToggleLabel = (activated: boolean) => {
    return activated ? (
        <>
            <Ban className="mr-2 h-4 w-4" />
            Deactivate
        </>
    ) : (
        <>
            <CheckCircle className="mr-2 h-4 w-4" />
            Activate
        </>
    )
}