import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { MoreHorizontal, Eye, Edit, Ban, Search, Lock, Unlock } from 'lucide-react'
import { useState } from 'react'
import { Teacher } from '@/lib/superbase/teacher-table'
import { Button } from '@/components/ui/button'

export default function DisplayTeachers({ teachers }: { teachers: Teacher[] }) {
    const [search, setSearch] = useState('')


    const filteredTeachers = teachers.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.username.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <Card>
            <CardHeader>
                <CardTitle>Teachers</CardTitle>
                <CardDescription>List of all registered teachers</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Search by name or username..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date created</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Password</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredTeachers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center text-sm text-gray-500">
                                        No Teachers Found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredTeachers.map((teacher, i) => (
                                    <TableRow key={teacher.id}>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {new Date(teacher.created_at).toLocaleDateString("en-GB")}
                                        </TableCell>
                                        <TableCell className="text-sm">{teacher.name}</TableCell>
                                        <TableCell className="text-sm">{teacher.username}</TableCell>
                                        <TableCell className="text-sm">
                                            <PasswordCell pass={teacher.password} />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-600">
                                                        <Ban className="mr-2 h-4 w-4" />
                                                        Disable
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
            </CardContent>
        </Card>
    )
}



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