import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, FileCheck, Users } from "lucide-react"
import { getSuperDashboardData } from "../_lib/super-dashboard-server-functions"
import { SuperDashboardFilters } from "./super-dashboard-filters"

export async function SuperDashboardOverview({ month }: { month: string }) {
    const { totalUsers, totalMembers, totalPracticeTests } = await getSuperDashboardData(month)

    return (
        <>
            <div className="mb-6 flex justify-end">
                <SuperDashboardFilters month={month} />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            </div>
        </>
    )
}