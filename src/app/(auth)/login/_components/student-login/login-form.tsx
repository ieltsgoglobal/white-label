"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useState } from 'react'

export function LoginForm({
    defferRedirectOnSuccess,
    onLoginSuccess,
    hideHeader
}: {
    defferRedirectOnSuccess?: boolean
    onLoginSuccess?: () => void
    hideHeader?: boolean
}) {
    const [username, setusername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const res = await fetch("/api/auth/student", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            })

            const result = await res.json()

            if (defferRedirectOnSuccess) {
                onLoginSuccess?.()
                return
            }

            if (result === true) {
                window.location.href = '/practice';
                return;
            }

            setError("Login failed.")
        } catch (err) {
            setError("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }


    return (
        <form onSubmit={handleSubmit} className={"flex flex-col gap-6"}>

            {!hideHeader && (
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Log into Student Account</h1>
                    <p className="text-balance text-sm text-muted-foreground">
                        Enter your details below to login to your account
                    </p>
                </div>
            )}
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="username">username</Label>
                    <Input
                        id="username"
                        type="text"
                        placeholder="e.g. priya123"
                        required
                        value={username}
                        onChange={(e) => setusername((e.target as HTMLInputElement).value)}
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link
                            href="/forgot-password"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
                    />
                </div>
                {error && <div className="text-sm text-red-500">{error}</div>}
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
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
