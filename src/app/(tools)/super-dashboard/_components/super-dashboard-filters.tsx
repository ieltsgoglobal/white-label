"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

export function SuperDashboardFilters({ month }: { month: string }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [year, m] = month.split("-")

    const update = (newYear = year, newMonth = m) => {
        const params = new URLSearchParams(searchParams)
        params.set("month", `${newYear}-${newMonth}`)
        router.push(`${pathname}?${params}`)
    }

    return (
        <div className="flex gap-2">
            <Select value={m} onValueChange={v => update(year, v)}>
                <SelectTrigger className="w-36">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {months.map((name, i) => (
                        <SelectItem
                            key={name}
                            value={String(i + 1).padStart(2, "0")}
                        >
                            {name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select value={year} onValueChange={v => update(v, m)}>
                <SelectTrigger className="w-24">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {[2024, 2025, 2026, 2027].map(y => (
                        <SelectItem key={y} value={String(y)}>
                            {y}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}