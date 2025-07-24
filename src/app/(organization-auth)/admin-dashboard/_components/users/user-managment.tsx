"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal, Eye, Edit, Ban, CheckCircle, Users, UserCheck, UserX, PlusCircleIcon, Unlock, Lock } from "lucide-react"
import CreateUserModal from "./create-user-modal"
import { getStudentsByOrg } from "@/lib/superbase/student-table"
import { getSessionUser } from "@/lib/auth/session/get-user"

type Student = {
    id: string
    username: string
    org_id: string | null
    created_at: string | null
    password: string
    revenue: number
    name: string
}

type UserStats = {
    totalUsers: number
    totalRevenue: number
    activeUsers: number
    deactivatedUsers: number
}


export function UserManagement() {
    const [searchTerm, setSearchTerm] = useState("")
    const [roleFilter, setRoleFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")
    const [open, setOpen] = useState(false)

    const [users, setUsers] = useState<Student[]>([])
    const [userStats, setUserStats] = useState<UserStats>({
        totalUsers: 0,
        totalRevenue: 0,
        activeUsers: 0,
        deactivatedUsers: 0,
    })
    const displayStats = [
        {
            title: "Total Users",
            value: userStats.totalUsers.toString(),
            icon: Users,
        },
        {
            title: "Total Fee Collected",
            value: `₹${userStats.totalRevenue}`,
            icon: UserCheck,
        },
        {
            title: "Active Users",
            value: userStats.activeUsers.toString(),
            icon: CheckCircle,
        },
        {
            title: "Deactivated Users",
            value: userStats.deactivatedUsers.toString(),
            icon: Ban,
        },
    ]


    // fetch students initially
    useEffect(() => {
        const fetchStudents = async () => {
            const user = await getSessionUser()
            if (!user || user.role !== "organization") {
                console.error("Not logged in as organization")
                return
            }
            const partnerId = user.orgId

            const { data, error } = await getStudentsByOrg(partnerId)
            if (error) {
                console.error("Failed to fetch students:", error)
            } else {
                setUsers(data || [])
            }
        }

        fetchStudents()
    }, [])


    // calculate what to show on the 4 cards
    useEffect(() => {
        const now = new Date()
        let active = 0
        let revenue = 0

        for (const user of users) {
            revenue += Number(user.revenue) || 0

            if (user.created_at) {
                const created = new Date(user.created_at)
                const validTill = new Date(created)
                validTill.setMonth(validTill.getMonth() + 6)

                if (now <= validTill) active++
            }
        }

        setUserStats({
            totalUsers: users.length,
            totalRevenue: revenue,
            activeUsers: active,
            deactivatedUsers: users.length - active,
        })
    }, [users])


    // if 6 months passed then show inactive
    const getStatusBadge = (created_at: string | null) => {
        if (!created_at) {
            return <Badge className="bg-gray-100 text-gray-600">Unknown</Badge>
        }

        const createdDate = new Date(created_at)
        const validTill = new Date(createdDate.setMonth(createdDate.getMonth() + 6))
        const now = new Date()

        const isActive = now <= validTill

        return isActive ? (
            <Badge className="bg-green-100 text-green-800">Activated</Badge>
        ) : (
            <Badge className="bg-red-100 text-red-800">Deactivated</Badge>
        )
    }



    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">

                <div>
                    <h1 className="text-2xl font-bold">User Management</h1>
                    <p className="text-muted-foreground">Manage freelancers and clients on the platform</p>
                </div>
                <div>
                    {/* create new user button  */}
                    <Button onClick={() => setOpen(!open)}>Create New User <PlusCircleIcon className="ml-2 w-4 h-4" /></Button>
                </div>
            </div>

            {/* create new user modal  */}
            <CreateUserModal open={open} onClose={() => setOpen(false)} />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayStats.map((stat) => (
                    <Card key={stat.title}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                </div>
                                <stat.icon className={`h-8 w-8`} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Filters and Search */}
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
                                placeholder="Search by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={roleFilter} onValueChange={setRoleFilter}>
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
                        </Select>
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
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <TableCell className="text-sm text-gray-500">
                                                {user.created_at
                                                    ? new Date(user.created_at).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    })
                                                    : "-"}
                                            </TableCell>
                                        </TableCell>
                                        <TableCell className="text-sm dark:text-muted-foreground">{user.name}</TableCell>
                                        <TableCell className="text-sm dark:text-muted-foreground">{user.username}</TableCell>
                                        <TableCell className="text-sm dark:text-muted-foreground"><PasswordCell pass={user.password} /></TableCell>
                                        <TableCell className="text-sm text-green-600">{user.revenue}</TableCell>
                                        <TableCell className="text-sm dark:text-muted-foreground">
                                            {user.created_at
                                                ? new Date(new Date(user.created_at).setMonth(new Date(user.created_at).getMonth() + 6)).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })
                                                : "-"}
                                        </TableCell>
                                        <TableCell>{getStatusBadge(user.created_at)}</TableCell>
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
                                                    <DropdownMenuItem>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View Profile
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit User
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    {/* {user.status === "Al" && ( */}
                                                    <DropdownMenuItem className="text-green-600">
                                                        <CheckCircle className="mr-2 h-4 w-4" />
                                                        Approve
                                                    </DropdownMenuItem>
                                                    {/* )} */}
                                                    {/* {user.status === "Active" && ( */}
                                                    <DropdownMenuItem className="text-red-600">
                                                        <Ban className="mr-2 h-4 w-4" />
                                                        Block User
                                                    </DropdownMenuItem>
                                                    {/* )} */}
                                                    {/* {user.status === "Blocked" && ( */}
                                                    <DropdownMenuItem className="text-green-600">
                                                        <CheckCircle className="mr-2 h-4 w-4" />
                                                        Unblock
                                                    </DropdownMenuItem>
                                                    {/* )} */}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
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
        </div>
    )
}



// set password hidden initially
function PasswordCell({ pass }: { pass: string }) {
    const [hidden, setHidden] = useState(true)

    return (
        <div className="flex items-center gap-2">
            <span className="font-mono">
                {hidden ? "•".repeat(pass.length) : pass}
            </span>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setHidden(!hidden)}
                className="w-6 h-6"
            >
                {hidden ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
            </Button>
        </div>
    )
}