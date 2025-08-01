"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircleIcon } from "lucide-react"
import CreateUserModal from "./create-user-modal"
import { getStudentsByOrg } from "@/lib/superbase/student-table"
import { getSessionUser } from "@/lib/auth/session/get-user"
import { checkCredits } from "@/lib/superbase/organization-table"
import DisplayStudents from "./_components/DisplayStudents"
import { StatsCard } from "./_components/StatsCard"

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

export function UserManagement() {
    const [open, setOpen] = useState(false) //create user modal

    const [users, setUsers] = useState<Student[]>([])
    const [availableCredits, setAvailableCredits] = useState<number>(0)


    // fetch students initially
    useEffect(() => {
        const fetchStudents = async () => {
            const user = await getSessionUser()
            if (!user || user.role !== "organization") {
                console.error("Not logged in as organization")
                return
            }
            const partnerId = user.orgId

            // Fetch students
            const { data: studentData, error: studentError } = await getStudentsByOrg(partnerId)
            if (studentError) {
                console.error("Failed to fetch students:", studentError)
            } else {
                setUsers(studentData || [])
            }

            // Check credits
            const creditResult = await checkCredits(partnerId)
            if ("error" in creditResult) {
                console.error("Failed to fetch credits", creditResult.error)
            } else {
                setAvailableCredits(creditResult.credits)
            }
        }

        fetchStudents()
    }, [])


    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">User Management</h1>
                    <p className="text-muted-foreground">Manage freelancers and clients on the platform</p>
                </div>
                <div className="flex gap-3">
                    {/* create new user button  */}
                    <Button variant="outline" className="rounded-full">Available Credits: {availableCredits}</Button>
                    <Button onClick={() => setOpen(!open)} className="rounded-full">Create User <PlusCircleIcon className="ml-2 w-4 h-4" /></Button>
                </div>
            </div>

            {/* create new user modal  */}
            <CreateUserModal open={open} onClose={() => setOpen(false)} />

            {/* Stats Cards */}
            <StatsCard users={users} />

            <DisplayStudents users={users} />
        </div>
    )
}

