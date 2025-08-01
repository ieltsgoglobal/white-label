"use client"

import { useEffect, useState } from "react"
import { getAllTransactionsByOrgId } from "@/lib/superbase/transaction-table"
import { getSessionUser } from "@/lib/auth/session/get-user"
import StatsCard from "./_components/StatsCard"
import DisplayTransactions from "./_components/DisplatTransactions"

export interface Transaction {
    id: string
    users_purchased: number
    amount_received: number
    created_at: string
}

export function TransactionManagment() {
    const [transactions, setTransactions] = useState<Transaction[]>([])

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
