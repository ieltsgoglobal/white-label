"use client"

import PartnerLogin from "@/components/login/partner-login/admin-login"
import { useState } from "react"

export default function DemoLayout({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    if (!isLoggedIn) {
        return <PartnerLogin onSuccess={() => setIsLoggedIn(true)} />
    }

    return (<>{children}</>)
}