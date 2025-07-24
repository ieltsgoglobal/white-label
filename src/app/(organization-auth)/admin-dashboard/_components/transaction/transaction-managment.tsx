"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clock } from "lucide-react"
import { getAllTransactionsByOrgId } from "@/lib/superbase/transaction-table"
import { IndianRupee, CreditCard, ListChecks } from "lucide-react"
import { getSessionUser } from "@/lib/auth/session/get-user"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Transaction {
    id: string
    users_purchased: number
    amount_received: number
    created_at: string
}

export function TransactionManagment() {
    // handle filter results 
    const [tempFromDate, setTempFromDate] = useState("")
    const [tempToDate, setTempToDate] = useState("")
    const [fromDate, setFromDate] = useState<string>("")
    const [toDate, setToDate] = useState<string>("")

    // fetch and store transactions
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [transactionStats, setTransactionStats] = useState([
        {
            title: "Total Credits Purchased",
            value: "0",
            icon: CreditCard,
        },
        {
            title: "Total Amount Paid",
            value: "₹0",
            icon: IndianRupee,
        },
        {
            title: "Last Transaction",
            value: "-",
            icon: Clock,
        },
        {
            title: "Total Transactions",
            value: "0",
            icon: ListChecks,
        },
    ])


    // fetch all transactions
    useEffect(() => {
        const fetchTransactions = async () => {
            const user = await getSessionUser()
            if (!user || user.role !== "organization") {
                console.log(user?.role)
                console.error("Not logged in as organization")
                return
            }
            const partnerId = user.orgId

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
            },
            {
                title: "Total Amount Paid",
                value: `₹${totalAmount.toLocaleString()}`,
                icon: IndianRupee,
            },
            {
                title: "Last Transaction",
                value: lastTransactionDate,
                icon: Clock,
            },
            {
                title: "Total Transactions",
                value: transactions.length.toString(),
                icon: ListChecks,
            },
        ])
    }, [transactions])


    // choose dates to filter transactions
    const filteredTransactions = transactions.filter((txn) => {
        const txnDate = new Date(txn.created_at).getTime()
        const from = fromDate ? new Date(fromDate).getTime() : null
        const to = toDate ? new Date(toDate).getTime() : null

        if (from && txnDate < from) return false
        if (to && txnDate > to) return false
        return true
    })

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold ">Transaction Management</h1>
                <p className="text-muted-foreground">Manage all job postings and applications on the platform</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {transactionStats.map((stat) => (
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

            {/* Jobs Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Check Transactions</CardTitle>
                    <CardDescription>All transactions performed on the platform</CardDescription>
                </CardHeader>
                <CardContent>

                    {/* handle filter dates */}
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                            <label htmlFor="from" className="text-sm font-medium text-muted-foreground">From:</label>
                            <Input
                                type="date"
                                id="from"
                                value={tempFromDate}
                                onChange={(e) => setTempFromDate(e.target.value)}
                                className="w-[160px]"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="to" className="text-sm font-medium text-muted-foreground">To:</label>
                            <Input
                                type="date"
                                id="to"
                                value={tempToDate}
                                onChange={(e) => setTempToDate(e.target.value)}
                                className="w-[160px]"
                            />
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setFromDate(tempFromDate)
                                setToDate(tempToDate)
                            }}
                        >
                            Search
                        </Button>
                    </div>


                    {/* Rest of the table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Transaction ID</TableHead>
                                    <TableHead>Credits Purchased</TableHead>
                                    <TableHead>Amount Paid (₹)</TableHead>
                                    <TableHead>Date</TableHead>
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
                                    filteredTransactions.map((txn) => (
                                        <TableRow key={txn.id}>
                                            <TableCell className="text-xs break-all">{txn.id}</TableCell>
                                            <TableCell>{txn.users_purchased}</TableCell>
                                            <TableCell>₹{txn.amount_received}</TableCell>
                                            <TableCell>{new Date(txn.created_at).toLocaleDateString()}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
