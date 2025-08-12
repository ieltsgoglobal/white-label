"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { simpleEncryptOtp } from './utils/encryptOtp'
import { sendOtpRequest } from './utils/sendOtpRequest'

export function LoginForm() {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [otp, setOtp] = useState("")
    const [sentOtp, setSentOtp] = useState("")
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
        setSentOtp(generatedOtp)

        try {
            await sendOtpRequest(phone, encryptedOtp)
        } catch (err: any) {
            setError(err.message)
            setSentOtp("")
        }
    }

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault()

        if (otp.length !== 4) {
            setError("Please enter a valid 4-digit OTP.")
            return
        }

        if (otp !== sentOtp) {
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

            window.location.href = "/practice"
        } catch (err: any) {
            setError(err.message)
        }
    }


    return (
        <form
            onSubmit={sentOtp ? handleVerifyOtp : (e) => {
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
                        country={'in'}
                        value={phone}
                        onChange={setPhone}
                        inputProps={{
                            name: 'phone',
                            required: true,
                            autoFocus: false,
                        }}
                        inputStyle={{
                            width: '100%',
                            height: '40px',
                            fontSize: '14px',
                        }}
                    />
                </div>

                {sentOtp && (
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
                )}


                {error && <div className="text-sm text-red-500">{error}</div>}
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading
                        ? "Processing..."
                        : sentOtp
                            ? "Verify OTP"
                            : "Send OTP"}
                </Button>
            </div>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4">
                    Sign up
                </Link>
            </div>
        </form>
    )
}
