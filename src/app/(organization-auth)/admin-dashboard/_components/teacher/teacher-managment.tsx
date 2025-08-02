'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import CreateTeacherModal from './create-teacher-modal'
import { getSessionUser } from '@/lib/auth/session/get-user'
import { getTeachersByOrgId, Teacher } from '@/lib/superbase/teacher-table'
import DisplayTeachers from './_components/DisplayTeachers'


export default function TeacherManagement() {
    const [teachers, setTeachers] = useState<Teacher[]>([])
    const [open, setOpen] = useState(false) //create teacher modal

    // get all teachers
    useEffect(() => {
        const fetchTeachers = async () => {
            const user = await getSessionUser()
            if (!user || user.role !== 'organization') {
                console.error("Not logged in as organization")
                return
            }

            const result = await getTeachersByOrgId(user.orgId)
            if ('error' in result) {
                console.error("Failed to load teachers:", result.error)
            } else {
                setTeachers(result.teachers)
            }
        }

        fetchTeachers()
    }, [])

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Teacher Management</h1>
                    <p className="text-muted-foreground">Manage all teachers in the system</p>
                </div>
                <Button onClick={() => setOpen(true)} className="rounded-full">Create Teacher</Button>
            </div>

            <CreateTeacherModal open={open} onClose={() => setOpen(false)} />

            <DisplayTeachers teachers={teachers} />
        </div>
    )
}
