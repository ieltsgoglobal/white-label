"use client"

import { FormEvent, useEffect, useState } from "react"
import { ArrowRight, Check, FileText, Link, Loader2 } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { saveB2CBillingDetails } from "@/lib/superbase/billing-details/b2c-billing-policy"

export default function PaymentSuccessBillingDetails() {
    const [showContent, setShowContent] = useState(false)
    const [showSaved, setShowSaved] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        const timer = window.setTimeout(() => setShowContent(true), 100)
        return () => window.clearTimeout(timer)
    }, [])

    useEffect(() => {
        if (!isSaved) return

        const timer = window.setTimeout(() => setShowSaved(true), 50)
        return () => window.clearTimeout(timer)
    }, [isSaved])

    async function saveBillingDetails(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError("")
        setIsSaving(true)

        try {
            const result = await saveB2CBillingDetails(new FormData(event.currentTarget))
            if (!result.success) {
                setError(result.error || "Unable to save billing details")
                return
            }

            setIsSaved(true)
        } catch {
            setError("Unable to save billing details")
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto border-0 bg-white/80 shadow-2xl backdrop-blur-sm">
            <CardContent className="p-8">
                {isSaved ? (
                    <div className="py-3 text-center">
                        <div className="relative mb-6">
                            <div
                                className={`relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500 text-white transition-all duration-700 ${showSaved ? "scale-100 rotate-0" : "scale-0 rotate-180"}`}
                            >
                                <Check className="h-10 w-10" strokeWidth={3} />
                            </div>
                            <div
                                className={`absolute inset-0 mx-auto h-20 w-20 rounded-full bg-green-400 transition-all duration-1000 ${showSaved ? "scale-150 opacity-0" : "scale-100 opacity-30"}`}
                            />
                        </div>

                        <div
                            className={`transition-all duration-500 delay-200 ${showSaved ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                        >
                            <h1 className="text-2xl font-bold text-gray-900">Details saved!</h1>
                            <p className="mt-2 text-gray-600">
                                We&apos;ll send your bill to your email address shortly.
                            </p>
                            <Button variant="ghost" className="mt-8 w-full group" onClick={() => { window.location.href = "/practice" }}>
                                Go To{" "}{"Practice"}
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={saveBillingDetails} className="space-y-4">
                        <div
                            className={`mb-6 text-center transform transition-all duration-500 ${showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                        >
                            <div className="relative mb-4">
                                <div
                                    className={`relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white transition-all duration-700 ${showContent ? "scale-100 rotate-0" : "scale-0 rotate-180"}`}
                                >
                                    <FileText className="h-8 w-8" />
                                </div>
                                <div
                                    className={`absolute inset-0 mx-auto h-16 w-16 rounded-full bg-green-400 transition-all duration-1000 ${showContent ? "scale-150 opacity-0" : "scale-100 opacity-30"}`}
                                />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">Billing details</h1>
                            <p className="mt-2 text-gray-600">
                                Share your details so we can send your bill.
                            </p>
                        </div>

                        <div
                            className={`grid gap-2 transform transition-all duration-500 delay-150 ${showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                        >
                            <Label htmlFor="name">Full name</Label>
                            <Input
                                id="name"
                                name="name"
                                required
                                autoComplete="name"
                                placeholder="e.g. Priya Sharma"
                            />
                        </div>

                        <div
                            className={`grid gap-2 transform transition-all duration-500 delay-300 ${showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                        >
                            <Label htmlFor="phone">Phone number</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                autoComplete="tel"
                                placeholder="Enter phone number"
                            />
                        </div>

                        <div
                            className={`grid gap-2 transform transition-all duration-500 delay-500 ${showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                        >
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                placeholder="you@example.com"
                            />
                        </div>

                        {error && (
                            <Alert variant="destructive" className="mt-2">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div
                            className={`pt-2 transform transition-all duration-500 delay-700 ${showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                        >
                            <Button type="submit" variant="ghost" className="w-full group" disabled={isSaving}>
                                {isSaving ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save billing details"
                                )}
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </form>
                )}
            </CardContent>
        </Card>
    )
}
