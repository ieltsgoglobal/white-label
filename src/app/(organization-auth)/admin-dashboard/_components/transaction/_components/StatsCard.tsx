"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Clock, CreditCard, IndianRupee, ListChecks } from "lucide-react";
import { useEffect, useState } from "react";
import { Transaction } from "../transaction-managment";

export default function StatsCard({ transactions }: { transactions: Transaction[] }) {

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

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {transactionStats.map((stat) => (
                <Card key={stat.title}>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                                <p className="text-2xl font-bold">{stat.value}</p>
                            </div>
                            {/* <stat.icon className={`h-8 w-8`} /> */}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}