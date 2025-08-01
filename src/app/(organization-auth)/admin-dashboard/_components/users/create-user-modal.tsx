"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { createStudent } from "@/lib/superbase/student-table"
import ModrenBg from "./bg-create-user-modal.jpg"
import Image from "next/image"
import { getSessionUser } from "@/lib/auth/session/get-user"
import { checkCredits } from "@/lib/superbase/organization-table"
import { getTeachersByOrgId, Teacher } from "@/lib/superbase/teacher-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type PartnerSession = {
    id: string
    name: string
    email: string
    address: string
    phone: string
    gst: string
    pan: string
    credits: number
    subdomain: string
}

export default function CreateUserModal({ open, onClose, }: { open: boolean, onClose: () => void }) {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        revenue: "",
        teacher_id: "",
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (key: string, value: string) => {
        setFormData({ ...formData, [key]: value })
    }

    const handleSubmit = async () => {
        const user = await getSessionUser()
        if (!user || user.role !== "organization") {
            console.error("Not logged in as organization")
            return
        }
        const partnerId = user.orgId

        if (!formData.name || !formData.username || !formData.password) {
            alert("Please fill in all fields.")
            return
        }

        setLoading(true)

        try {
            const result = await createStudent({
                name: formData.name,
                username: formData.username,
                password: formData.password,
                revenue: formData.revenue,
                teacher_id: formData.teacher_id,
                orgId: partnerId,
            })

            if ("error" in result) {
                console.error("Error creating student:", result.error)
                alert(result.error || "Failed to create student.")
            } else {
                alert("Student created successfully.")
                onClose()
            }
        } catch (err) {
            console.error("Unexpected error:", err)
            alert("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

    // ------------- GET CREDITS -------------------

    const [availableCredits, setAvailableCredits] = useState<number>(0)

    useEffect(() => {
        const fetchCredits = async () => {
            const user = await getSessionUser()
            if (!user || user.role !== "organization") {
                console.error("Not logged in as organization")
                return
            }
            const partnerId = user.orgId


            // Check credits
            const creditResult = await checkCredits(partnerId)
            if ("error" in creditResult) {
                console.error("Failed to fetch credits", creditResult.error)
            } else {
                setAvailableCredits(creditResult.credits)
            }
        }

        fetchCredits()
    }, [])


    // --------------- GET TEACHERS -----------------

    const [teachers, setTeachers] = useState<Teacher[]>([])

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
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden border-none bg-transparent">
                <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
                    {/* Left image section */}
                    <div className="relative hidden md:block">
                        <Image
                            src={ModrenBg}
                            alt="Create Student Background"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Right form section */}
                    <div className="p-6 md:p-8 bg-background flex flex-col justify-between">
                        <div>
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-semibold text-foreground">
                                    Create New Student
                                </DialogTitle>
                                <p className="text-sm text-muted-foreground mt-1">Add student credentials and revenue.</p>
                            </DialogHeader>
                            <div className="grid gap-4 mt-6">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="name" className="text-sm font-medium text-foreground/90">
                                        Student Name <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="name"
                                        autoComplete="name"
                                        placeholder="e.g. Priya Sharma"
                                        value={formData.name}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="username" className="text-sm font-medium text-foreground/90">
                                        Username <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="username"
                                        autoComplete="username"
                                        placeholder="e.g. priya123"
                                        value={formData.username}
                                        onChange={(e) => handleChange("username", e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="password" className="text-sm font-medium text-foreground/90">
                                        Password <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="password"
                                        type="password"
                                        autoComplete="new-password"
                                        placeholder="At least 6 characters"
                                        value={formData.password}
                                        onChange={(e) => handleChange("password", e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="teacher" className="text-sm font-medium text-foreground/90">
                                        Assign Teacher <span className="text-red-500">*</span>
                                    </label>
                                    <Select
                                        value={formData.teacher_id}
                                        onValueChange={(value) => handleChange("teacher_id", value)}
                                    >
                                        <SelectTrigger id="teacher" className="h-10">
                                            <SelectValue placeholder="-- Select a Teacher --" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {teachers.map((t) => (
                                                <SelectItem key={t.id} value={t.id}>
                                                    {t.name} ({t.username})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="revenue" className="text-sm font-medium text-foreground/90">
                                        Fee Received (₹) <span className="text-gray-400 text-xs">(Optional)</span>
                                    </label>
                                    <Input
                                        id="revenue"
                                        type="number"
                                        placeholder="e.g. 1500"
                                        min={0}
                                        value={formData.revenue}
                                        onChange={(e) => handleChange("revenue", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <DialogFooter>
                            <div className="flex items-center justify-between w-full mt-6">
                                <div className="text-sm text-muted-foreground">
                                    Remaining Credits: <span className="font-medium">{availableCredits}</span>
                                </div>
                                <Button onClick={handleSubmit} disabled={loading}>
                                    {loading ? "Creating..." : "Create Student"}
                                </Button>
                            </div>
                        </DialogFooter>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}