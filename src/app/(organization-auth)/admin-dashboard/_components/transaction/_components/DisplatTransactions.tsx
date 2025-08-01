import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Transaction } from "../transaction-managment"

export default function DisplayTransactions({ transactions }: { transactions: Transaction[] }) {
    const [fromDate, setFromDate] = useState<string>("")
    const [toDate, setToDate] = useState<string>("")

    const [tempFromDate, setTempFromDate] = useState("")
    const [tempToDate, setTempToDate] = useState("")


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
    )
}