"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import ModrenBg from "./bg-create-teacher-modal.jpg"
import Image from "next/image"
import { getSessionUser } from "@/lib/auth/session/get-user"
import { createTeacher } from "@/lib/superbase/teacher-table"

export default function CreateTeacherModal({ open, onClose, }: { open: boolean, onClose: () => void }) {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (key: string, value: string) => {
        setFormData({ ...formData, [key]: value })
    }

    // -------------- CREATE TEACHER ----------------------

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
            const result = await createTeacher({
                name: formData.name,
                username: formData.username,
                password: formData.password,
                org_id: partnerId,
            })


            if ("error" in result) {
                alert(result.error || "Failed to create teacher.")
            } else {
                alert("Teacher created successfully.")
                onClose()
            }
        } catch (err) {
            console.error("Unexpected error:", err)
            alert("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden border-none bg-transparent">
                <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
                    {/* Left image section */}
                    <div className="relative hidden md:block">
                        <Image
                            src={ModrenBg}
                            alt="Create Teacher Background"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Right form section */}
                    <div className="p-6 md:p-8 bg-background flex flex-col justify-between">
                        <div>
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-semibold text-foreground">
                                    Create New Teacher
                                </DialogTitle>
                                <p className="text-sm text-muted-foreground mt-1">Add Teacher credentials.</p>
                            </DialogHeader>
                            <div className="grid gap-4 mt-6">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="name" className="text-sm font-medium text-foreground/90">
                                        Teacher Name <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="name"
                                        autoComplete="name"
                                        placeholder="e.g. Ms. Priya Sharma"
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
                            </div>
                        </div>

                        <DialogFooter>
                            <div className="flex items-center justify-between w-full mt-6">
                                <Button onClick={handleSubmit} disabled={loading}>
                                    {loading ? "Creating..." : "Create Teacher"}
                                </Button>
                            </div>
                        </DialogFooter>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}