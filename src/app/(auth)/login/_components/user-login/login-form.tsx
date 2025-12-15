"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useState } from 'react'
import { simpleEncryptOtp } from './utils/encryptOtp'
import { sendOtpRequest } from './utils/sendOtpRequest'
import { PhoneInput } from '../../../../../components/auth/user/phone-number/phone-input'
import { ResendOtp } from './ResendOtp'

export function LoginForm() {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [otp, setOtp] = useState("")
    const [sentOtps, setSentOtps] = useState<string[]>([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const generateRandomOtp = () => {
        return Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit string
    }

    const handleSendOtp = async () => {
        if (!name.trim() || phone.length > 15) {
            setError("Please enter a valid name and phone number.")
            return
        }

        const generatedOtp = generateRandomOtp()
        const encryptedOtp = simpleEncryptOtp(generatedOtp)

        setError("")
        setSentOtps((prev) => [...prev, generatedOtp])

        try {
            const normalizedPhone = phone.replace(/^\+/, "")
            await sendOtpRequest(normalizedPhone, encryptedOtp)
        } catch (err: any) {
            setError(err.message)
            setSentOtps([])
        }
    }

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault()

        if (otp.length !== 4) {
            setError("Please enter a valid 4-digit OTP.")
            return
        }

        if (!sentOtps.includes(otp)) {
            setError("Incorrect OTP. Please try again.")
            return
        }


        setError("")
        setLoading(true)

        try {
            const response = await fetch("/api/auth/user/user-auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phone }),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || "Login failed")
            }

            window.location.href = "/practice-sets"
        } catch (err: any) {
            setError(err.message)
        }
    }


    const handleResendOtp = async () => {
        const generatedOtp = generateRandomOtp()
        const encryptedOtp = simpleEncryptOtp(generatedOtp)

        setError("")
        setSentOtps((prev) => [...prev, generatedOtp])

        const normalizedPhone = phone.replace(/\D/g, "")
        await sendOtpRequest(normalizedPhone, encryptedOtp)
    }

    return (
        <form
            onSubmit={sentOtps.length > 0 ? handleVerifyOtp : (e) => {
                e.preventDefault()
                handleSendOtp()
            }}
            className={"flex flex-col gap-6"}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Log into User Account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your details below to login to your account
                </p>
            </div>
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
                    <p className="text-xs text-muted-foreground">
                        You will receive the OTP on <span className="font-medium">WhatsApp</span>
                    </p>
                </div>

                {sentOtps.length > 0 && (
                    <>
                        <div className="grid gap-2">
                            <Label htmlFor="otp">Enter OTP</Label>
                            <Input
                                id="otp"
                                type="text"
                                maxLength={4}
                                inputMode="numeric"
                                pattern="\d{4}"
                                placeholder="1234"
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
                        : sentOtps.length > 0
                            ? "Verify OTP"
                            : "Send OTP"}
                </Button>
            </div>
            <div className="text-center text-sm">
                Having trouble logging in?{" "}
                <Link href="/register-complaint" className="underline underline-offset-4">
                    Get help
                </Link>
            </div>
        </form>
    )
}
