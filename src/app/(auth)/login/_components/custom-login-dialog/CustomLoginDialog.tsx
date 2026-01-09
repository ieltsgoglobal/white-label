"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Sparkles } from "lucide-react"

import { LoginForm as UserLoginForm } from "../user-login/login-form"
import { LoginForm as StudentLoginForm } from "../student-login/login-form"
import { getClientSubdomain } from "@/lib/utils/isSubdomain.client"

// ------------------------------------
// -------- Types ---------------------
// ------------------------------------

type LoginDialogProps = {
    trigger?: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
    onLoginDone?: () => void
}

// ------------------------------------
// -------- Data ----------------------
// ------------------------------------

const LOGIN_BENEFITS = [
    { id: "q", label: "Unlock 4,000+ practice questions", delay: 0 },
    { id: "ai", label: "AI-powered answer review", delay: 80 },
    { id: "score", label: "Personalized score insights", delay: 160 },
    { id: "track", label: "Track progress over time", delay: 240 },
] as const

// ------------------------------------
// -------- Public component ----------
// ------------------------------------

export function CustomLoginDialog({
    trigger,
    open,
    onOpenChange,
    onLoginDone,
}: LoginDialogProps) {
    const isSubdomain = Boolean(getClientSubdomain())

    const handleLoginSuccess = () => {
        onOpenChange?.(false)
        onLoginDone?.()
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

            <DialogContent className="sm:max-w-md p-0 overflow-hidden">
                <LoginDialogHeader />
                <LoginBenefits />
                <Separator />
                <LoginFormSection
                    isSubdomain={isSubdomain}
                    onSuccess={handleLoginSuccess}
                />
            </DialogContent>
        </Dialog>
    )
}

// ------------------------------------
// -------- Header (WHY) --------------
// ------------------------------------

function LoginDialogHeader() {
    return (
        <DialogHeader className="px-6 pt-6 space-y-3">
            <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <DialogTitle className="text-xl">
                    Review your test.
                </DialogTitle>
                <Badge variant="secondary" className="text-base">
                    Free
                </Badge>
            </div>

            <DialogDescription>
                Create a personalized account to unlock everything below.
            </DialogDescription>
        </DialogHeader>
    )
}

// ------------------------------------
// -------- Benefits (WHAT) -----------
// ------------------------------------

function LoginBenefits() {
    return (
        <div className="px-6 mt-4 mb-6">
            <div className="grid grid-cols-2 gap-3">
                {LOGIN_BENEFITS.map((benefit) => (
                    <BenefitPill
                        key={benefit.id}
                        delayMs={benefit.delay}
                    >
                        {benefit.label}
                    </BenefitPill>
                ))}
            </div>
        </div>
    )
}

// ------------------------------------
// ------ Benefit pill component ------
// ------------------------------------

function BenefitPill({
    children,
    delayMs,
}: {
    children: React.ReactNode
    delayMs: number
}) {
    return (
        <Card
            className="animate-fade-up"
            style={{ animationDelay: `${delayMs}ms` }}
        >
            <CardContent className="flex items-center gap-2 py-3 px-3 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                <span>{children}</span>
            </CardContent>
        </Card>
    )
}

// ------------------------------------
// -------- Login resolver (HOW) ------
// ------------------------------------

function LoginFormSection({
    isSubdomain,
    onSuccess,
}: {
    isSubdomain: boolean
    onSuccess: () => void
}) {
    return (
        <div className="px-6 py-6">
            {isSubdomain ? (
                <StudentLoginForm
                    hideHeader
                    defferRedirectOnSuccess
                    onLoginSuccess={onSuccess}
                />
            ) : (
                <UserLoginForm
                    hideHeader
                    defferRedirectOnSuccess
                    onLoginSuccess={onSuccess}
                />
            )}
        </div>
    )
}