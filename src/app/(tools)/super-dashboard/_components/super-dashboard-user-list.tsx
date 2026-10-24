"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

type Props = {
    subscriptions: Record<string, any>[]
}

export function SuperDashboardDailyUserList({ subscriptions }: Props) {

    return (
        <div className="mt-6 rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Transaction history</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {subscriptions.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-mono text-xs">{user.id}</TableCell>
                            <TableCell>{user.membership_status ?? "—"}</TableCell>
                            <TableCell>
                                <TransactionHistory transactions={user.b2c_transaction_history_details} />
                            </TableCell>
                        </TableRow>
                    ))}
                    {subscriptions.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                                No users found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

// MISC CODE

function formatDate(value: string | null) {
    return value ? new Date(value).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }) : "—"
}

type Transaction = {
    id: string
    amount: number | null
    gateway: string | null
    received_at: string | null
    duration_in_days: number | null
    membership_started_at: string | null
    membership_expires_at: string | null
}

function TransactionHistory({ transactions }: { transactions: Transaction[] | null }) {
    if (!transactions?.length) {
        return <span className="text-muted-foreground">No transactions</span>
    }

    return (
        <div className="min-w-64 divide-y">
            {transactions.map((transaction) => (
                <div key={transaction.id} className="space-y-1 py-2">
                    <div className="flex items-center gap-2">
                        <span className="font-medium">Amount: {transaction.amount ?? "—"}</span>
                        <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                            {transaction.gateway ?? "—"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            {transaction.duration_in_days != null ? `${transaction.duration_in_days} days` : "—"}
                        </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Paid on {formatDate(transaction.received_at)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Started {formatDate(transaction.membership_started_at)} · Expires {formatDate(transaction.membership_expires_at)}
                    </p>
                </div>
            ))}
        </div>
    )
}
