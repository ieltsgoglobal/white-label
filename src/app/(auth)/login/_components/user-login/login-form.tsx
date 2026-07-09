"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from "@/components/demo/link"
import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import { sendOtpRequest, verifyOtpRequest } from './utils/sendOtpRequest'
import { PhoneInput } from '../../../../../components/auth/user/phone-number/phone-input'
import { ResendOtp } from './ResendOtp'
import { GoogleOAuth } from './GoogleOAuth'
import { isValidPhoneNumber } from "react-phone-number-input"

export function LoginForm() {
    const [showOtp, setShowOtp] = useState<boolean | null>(null);

    useEffect(() => {
        fetch("https://ipwho.is/")
            .then((r) => r.json())
            .then(({ country_code }) => setShowOtp(country_code === "IN")) // show if INDIA
            .catch(() => setShowOtp(true)) // show if IPAI fails
    }, []);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Log into User Account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your details below to login to your account
                </p>
            </div>

            <GoogleOAuth />

            {showOtp && (
                <div className="relative text-center text-xs uppercase text-muted-foreground">
                    <span className="relative bg-background px-2">Or use phone number</span>
                    <span className="absolute left-0 top-1/2 h-px w-full bg-border" />
                </div>
            )}

            {showOtp && <PhoneOtpLoginForm />}

            <div className="text-center text-sm">
                Having trouble logging in?{" "}
                <Link href="/register-complaint" className="underline underline-offset-4">
                    Get help
                </Link>
            </div>
        </div>
    )
}

function PhoneOtpLoginForm() {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [otp, setOtp] = useState("")
    const [otpSent, setOtpSent] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSendOtp = async () => {
        if (!name.trim() || !phone || !isValidPhoneNumber(phone)) {
            setError("Please enter a valid name and phone number.")
            return
        }

        setError("")
        setLoading(true)

        try {
            await sendOtpRequest(phone)
            setOtpSent(true)
        } catch (err: any) {
            setError(err.message)
            setOtpSent(false)
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOtp = async (e: FormEvent) => {
        e.preventDefault()

        if (otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP.")
            return
        }

        setError("")
        setLoading(true)

        try {
            await verifyOtpRequest(phone, otp)

            const response = await fetch("/api/auth/user/user-auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phone }),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || "Login failed")
            }

            if (result.success) {
                window.location.href = document.referrer?.startsWith(window.location.origin) ? document.referrer : "/practice-sets";
                return;
            }

        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleResendOtp = async () => {
        setError("")
        try {
            await sendOtpRequest(phone)
        } catch (err: any) {
            setError(err.message)
        }
    }

    return (
        <form
            onSubmit={otpSent ? handleVerifyOtp : (e) => {
                e.preventDefault()
                handleSendOtp()
            }}
            className={"flex flex-col gap-6"}
        >
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="e.g. Priya Sharma"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <PhoneInput
                        id="phone"
                        defaultCountry="IN"
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={setPhone}
                    />
                </div>

                {otpSent && (
                    <>
                        <div className="grid gap-2">
                            <Label htmlFor="otp">Enter OTP</Label>
                            <Input
                                id="otp"
                                type="text"
                                maxLength={6}
                                inputMode="numeric"
                                pattern="\d{6}"
                                placeholder="123456"
                                required
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <ResendOtp onResend={handleResendOtp} />
                    </>
                )}

                {error && <div className="text-sm text-red-500">{error}</div>}
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading
                        ? "Processing..."
                        : otpSent
                            ? "Verify OTP"
                            : "Send OTP"}
                </Button>
            </div>
        </form>
    )
}
