import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, FileCheck, IndianRupee, Users } from "lucide-react"
import { getSuperDashboardData } from "../_lib/super-dashboard-server-functions"
import { SuperDashboardFilters } from "./super-dashboard-filters"

export async function SuperDashboardOverview({ month }: { month: string }) {
    const { totalUsers, totalMembers, totalPracticeTests, subscriptions } = await getSuperDashboardData(month)
    const formattedRevenue = calculateRevenue(subscriptions, month)

    return (
        <>
            <div className="mb-6 flex justify-end">
                <SuperDashboardFilters month={month} />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                <Card>
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm text-muted-foreground">User Signups</p>
                            <p className="text-3xl font-bold">{totalUsers.toLocaleString()}</p>
                        </div>
                        <Users className="h-8 w-8 text-muted-foreground" />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm text-muted-foreground">Members</p>
                            <p className="text-3xl font-bold">{totalMembers.toLocaleString()}</p>
                        </div>
                        <CreditCard className="h-8 w-8 text-muted-foreground" />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm text-muted-foreground">Practice Tests Taken</p>
                            <p className="text-3xl font-bold">{totalPracticeTests.toLocaleString()}</p>
                        </div>
                        <FileCheck className="h-8 w-8 text-muted-foreground" />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm text-muted-foreground">Revenue</p>
                            <p className="text-3xl font-bold">{formattedRevenue}</p>
                        </div>
                        <IndianRupee className="h-8 w-8 text-muted-foreground" />
                    </CardContent>
                </Card>
            </div>
        </>
    )
}



// MISC CODE

function calculateRevenue(
    subscriptions: Awaited<ReturnType<typeof getSuperDashboardData>>["subscriptions"],
    month: string
) {
    let revenue = 0

    for (const { b2c_transaction_history_details } of subscriptions) {
        for (const transaction of b2c_transaction_history_details ?? []) {
            if (!transaction.received_at) continue

            const date = new Date(transaction.received_at)
                .toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" })

            if (date.startsWith(month)) {
                revenue += Number(transaction.amount ?? 0)
            }
        }
    }

    return revenue.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
    })
}