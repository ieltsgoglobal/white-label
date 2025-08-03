"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircleIcon } from "lucide-react"
import CreateUserModal from "./create-user-modal"
import DisplayStudents from "./_components/DisplayStudents"
import { StatsCard } from "./_components/StatsCard"
import { useStudents } from "@/hooks/supabase/student"
import { useCredits } from "@/hooks/supabase/organization-table"

export type Student = {
    id: string
    username: string
    org_id: string | null
    created_at: string | null
    password: string
    revenue: number
    name: string
}

export function UserManagement() {
    const [open, setOpen] = useState(false) //create user modal

    // tanstack fetching
    const { data: users = [] } = useStudents();
    const { data: availableCredits = 0 } = useCredits();


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

