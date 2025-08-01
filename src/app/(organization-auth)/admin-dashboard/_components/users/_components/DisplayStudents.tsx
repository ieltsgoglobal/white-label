import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Eye, Ban, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import PasswordCell from "./Password-cell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export type Student = {
    id: string
    username: string
    org_id: string | null
    created_at: string | null
    password: string
    revenue: number
    name: string
}

export default function DisplayStudents({ users }: { users: Student[] }) {
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
                            placeholder="Search by name or email..."
                            value={''}
                            onChange={(e) => () => { }}
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
                            {users.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center text-sm text-gray-500">
                                        No Users found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users.map((user) => (
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
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-600">
                                                        <Ban className="mr-2 h-4 w-4" />
                                                        Block User
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-green-600">
                                                        <CheckCircle className="mr-2 h-4 w-4" />
                                                        Unblock
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
}


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
