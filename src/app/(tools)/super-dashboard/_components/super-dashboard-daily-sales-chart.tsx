"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

type Transaction = { amount: number; received_at: string }
type Subscription = { b2c_transaction_history_details: Transaction[] | null }

export function SuperDashboardDailySalesChart({ subscriptions, month }: { subscriptions: Subscription[], month: string }) {
    const sales: Record<string, number> = {}

    subscriptions.forEach(user =>
        user.b2c_transaction_history_details?.forEach(t => {
            if (!t.received_at) return
            const date = new Date(t.received_at).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" })
            if (date.startsWith(month)) sales[date] = (sales[date] ?? 0) + Number(t.amount ?? 0)
        })
    )

    const chartData = Object.entries(sales).sort(([a], [b]) => a.localeCompare(b)).map(([day, sales]) => ({ day: day.slice(5), sales }))

    return (
        <Card>
            <CardHeader>
                <CardTitle>Daily Sales - {month}</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{ sales: { label: "Revenue", color: "hsl(var(--chart-1))" } }} className="h-[280px] w-full">
                    <AreaChart data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="day" tickLine={false} axisLine={false} />
                        <YAxis tickFormatter={v => `₹${v}`} tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area dataKey="sales" type="monotone" fill="var(--color-sales)" fillOpacity={0.2} stroke="var(--color-sales)" />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}