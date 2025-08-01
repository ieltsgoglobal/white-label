import { Card, CardContent } from "@/components/ui/card";
import { Ban, CheckCircle, LucideIcon, UserCheck, Users } from "lucide-react";
import { useEffect, useState } from "react";

type Student = {
    id: string
    username: string
    org_id: string | null
    created_at: string | null
    password: string
    revenue: number
    name: string
}

type UserStats = {
    totalUsers: number
    totalRevenue: number
    activeUsers: number
    deactivatedUsers: number
}

type Stats = {
    title: string
    value: string
    icon: LucideIcon
}

export function StatsCard({ users }: { users: Student[] }) {
    const [userStats, setUserStats] = useState<UserStats>({
        totalUsers: 0,
        totalRevenue: 0,
        activeUsers: 0,
        deactivatedUsers: 0,
    })

    const displayStats: Stats[] = [
        {
            title: "Total Users",
            value: userStats.totalUsers.toString(),
            icon: Users,
        },
        {
            title: "Total Fee Collected",
            value: `₹${userStats.totalRevenue}`,
            icon: UserCheck,
        },
        {
            title: "Active Users",
            value: userStats.activeUsers.toString(),
            icon: CheckCircle,
        },
        {
            title: "Deactivated Users",
            value: userStats.deactivatedUsers.toString(),
            icon: Ban,
        },
    ];


    // calculate what to show on the 4 cards
    useEffect(() => {
        const now = new Date()
        let active = 0
        let revenue = 0

        for (const user of users) {
            revenue += Number(user.revenue) || 0

            if (user.created_at) {
                const created = new Date(user.created_at)
                const validTill = new Date(created)
                validTill.setMonth(validTill.getMonth() + 6)

                if (now <= validTill) active++
            }
        }

        setUserStats({
            totalUsers: users.length,
            totalRevenue: revenue,
            activeUsers: active,
            deactivatedUsers: users.length - active,
        })
    }, [users])



    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayStats.map((stat) => (
                <Card key={stat.title}>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                                <p className="text-2xl font-bold">{stat.value}</p>
                            </div>
                            <stat.icon className="h-8 w-8" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}