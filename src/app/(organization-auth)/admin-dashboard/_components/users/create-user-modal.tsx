import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { createStudent } from "@/lib/superbase/student-table"
import ModrenBg from "./bg-create-user-modal.jpg"
import Image from "next/image"

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


export default function CreateUserModal({ open, onClose, partnerSession, }: { open: boolean, onClose: () => void, partnerSession: PartnerSession }) {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        revenue: "",
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (key: string, value: string) => {
        setFormData({ ...formData, [key]: value })
    }

    const handleSubmit = async () => {
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
                orgId: partnerSession.id,
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

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden">
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
                    <div className="p-6 md:p-8 bg-white flex flex-col justify-between">
                        <div>
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-semibold text-gray-800">
                                    Create New Student
                                </DialogTitle>
                                <p className="text-sm text-gray-500 mt-1">Add student credentials and revenue.</p>
                            </DialogHeader>
                            <div className="grid gap-4 mt-6">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="name" className="text-sm font-medium text-gray-700">
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
                                    <label htmlFor="username" className="text-sm font-medium text-gray-700">
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
                                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
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
                                    <label htmlFor="revenue" className="text-sm font-medium text-gray-700">
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

                        <DialogFooter className="mt-6">
                            <Button variant="outline" onClick={onClose} disabled={loading}>
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit} disabled={loading}>
                                {loading ? "Creating..." : "Create Student"}
                            </Button>
                        </DialogFooter>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}