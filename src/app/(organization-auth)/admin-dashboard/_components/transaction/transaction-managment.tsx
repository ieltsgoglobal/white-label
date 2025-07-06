"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal, Eye, Trash2, Flag, Briefcase, Clock, CheckCircle, Users } from "lucide-react"
import { getAllTransactionsByOrgId } from "@/lib/superbase/transaction-table"
import { IndianRupee, CreditCard, ListChecks } from "lucide-react"
import { getPartnerId } from "@/lib/login/indexedDB"

interface Transaction {
    id: string
    users_purchased: number
    amount_received: number
    created_at: string
}

export function TransactionManagment() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [transactionStats, setTransactionStats] = useState([
        {
            title: "Total Credits Purchased",
            value: "0",
            icon: CreditCard,
            color: "text-blue-600",
        },
        {
            title: "Total Amount Paid",
            value: "₹0",
            icon: IndianRupee,
            color: "text-green-600",
        },
        {
            title: "Last Transaction",
            value: "-",
            icon: Clock,
            color: "text-yellow-600",
        },
        {
            title: "Total Transactions",
            value: "0",
            icon: ListChecks,
            color: "text-purple-600",
        },
    ])

    // fetch all transactions
    useEffect(() => {
        const fetchTransactions = async () => {
            const partnerId = await getPartnerId()
            if (!partnerId) return

            const result = await getAllTransactionsByOrgId(partnerId)

            if ("error" in result) {
                console.error("Error fetching transactions:", result.error)
                setTransactions([])
            } else {
                setTransactions(result.transactions)
            }
        }

        fetchTransactions()
    }, [])

    //update 4 stat cards
    useEffect(() => {
        if (transactions.length === 0) return

        const totalCredits = transactions.reduce((sum, t) => sum + t.users_purchased, 0)
        const totalAmount = transactions.reduce((sum, t) => sum + Number(t.amount_received), 0)
        const lastTransactionDate = transactions[0]?.created_at
            ? new Date(transactions[0].created_at).toLocaleDateString()
            : "-"

        setTransactionStats([
            {
                title: "Total Credits Purchased",
                value: totalCredits.toString(),
                icon: CreditCard,
                color: "text-blue-600",
            },
            {
                title: "Total Amount Paid",
                value: `₹${totalAmount.toLocaleString()}`,
                icon: IndianRupee,
                color: "text-green-600",
            },
            {
                title: "Last Transaction",
                value: lastTransactionDate,
                icon: Clock,
                color: "text-yellow-600",
            },
            {
                title: "Total Transactions",
                value: transactions.length.toString(),
                icon: ListChecks,
                color: "text-purple-600",
            },
        ])
    }, [transactions])

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Open":
                return <Badge className="bg-green-100 text-green-800">Open</Badge>
            case "In Progress":
                return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
            case "Hired":
                return <Badge className="bg-yellow-100 text-yellow-800">Hired</Badge>
            case "Completed":
                return <Badge className="bg-purple-100 text-purple-800">Completed</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Transaction Management</h1>
                <p className="text-gray-600">Manage all job postings and applications on the platform</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {transactionStats.map((stat) => (
                    <Card key={stat.title}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Jobs Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Job Listings</CardTitle>
                    <CardDescription>All job postings on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search jobs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="open">Open</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="hired">Hired</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Filter by category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="web-development">Web Development</SelectItem>
                                <SelectItem value="design">Design</SelectItem>
                                <SelectItem value="writing">Writing</SelectItem>
                                <SelectItem value="marketing">Marketing</SelectItem>
                                <SelectItem value="data-science">Data Science</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Transaction ID</TableHead>
                                    <TableHead>Credits Purchased</TableHead>
                                    <TableHead>Amount Paid (₹)</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center text-sm text-gray-500">
                                            No transactions found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    transactions.map((txn) => (
                                        <TableRow key={txn.id}>
                                            <TableCell className="text-xs break-all">{txn.id}</TableCell>
                                            <TableCell>{txn.users_purchased}</TableCell>
                                            <TableCell>₹{txn.amount_received}</TableCell>
                                            <TableCell>{new Date(txn.created_at).toLocaleDateString()}</TableCell>
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
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Users className="mr-2 h-4 w-4" />
                                                            View Applications
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-orange-600">
                                                            <Flag className="mr-2 h-4 w-4" />
                                                            Mark as Spam
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600">
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete Job
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
                    <div className="flex items-center justify-between space-x-2 py-4">
                        <div className="text-sm text-gray-500">Showing 1 to 5 of 1,234 jobs</div>
                        <div className="flex space-x-2">
                            <Button variant="outline" size="sm" disabled>
                                Previous
                            </Button>
                            <Button variant="outline" size="sm">
                                Next
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
