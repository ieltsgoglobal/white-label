"use client"

import StatsCard from "./_components/StatsCard"
import DisplayTransactions from "./_components/DisplatTransactions"
import { useTransactions } from "@/hooks/supabase/transaction-table"

export interface Transaction {
    id: string
    users_purchased: number
    amount_received: number
    created_at: string
}

export function TransactionManagment() {
    const { data: transactions = [], } = useTransactions();

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold ">Transaction Management</h1>
                <p className="text-muted-foreground">Manage all job postings and applications on the platform</p>
            </div>

            <StatsCard transactions={transactions} />

            <DisplayTransactions transactions={transactions} />
        </div>
    )
}
