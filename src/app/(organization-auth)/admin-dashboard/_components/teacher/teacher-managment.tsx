'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import CreateTeacherModal from './create-teacher-modal'
import DisplayTeachers from './_components/DisplayTeachers'
import { useTeachers } from '@/hooks/supabase/teachers-table'


export default function TeacherManagement() {
    const [open, setOpen] = useState(false) //create teacher modal

    const { data: teachers = [] } = useTeachers();

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
