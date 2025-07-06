"use client"
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { loginStudent } from "@/lib/superbase/student-table"

export function LoginForm({ className, onLoginComplete, ...props }: React.ComponentPropsWithoutRef<"form"> & { onLoginComplete?: (result: any) => void }) {
    const [username, setusername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        const result = await loginStudent(username, password)
        setLoading(false)

        if ("error" in result) {
            setError(result.error || "")
        } else {

            onLoginComplete?.(result)

            // TODO: Save session/token if needed, then redirect
            // e.g., router.push("/partner/dashboard")
        }
    }


    return (
        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your details below to login to your account
                </p>
            </div>
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
                        <a
                            href="#"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </a>
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
                <a href="#" className="underline underline-offset-4">
                    Sign up
                </a>
            </div>
        </form>
    )
}
