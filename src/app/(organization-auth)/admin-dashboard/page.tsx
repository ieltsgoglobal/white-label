"use client"
import { useState } from "react"
import { AdminLayout } from "./_components/layout/admin-layout"
import { DashboardOverview } from "./_components/dashboard/dashboard-overview"
import { JobManagement } from "./_components/jobs/job-managment"
import { PaymentManagement } from "./_components/payments/payment-management"
import { UserManagement } from "./_components/users/user-managment"
import PartnerLogin from "@/components/login/partner-login/admin-login"

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("dashboard")

    const [partnerSession, setPartnerSession] = useState<any>(null) // partner details who logged in
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const renderContent = () => {
        switch (activeTab) {
            case "users":
                return <UserManagement partnerSession={partnerSession} />
            case "jobs":
                return <JobManagement />
            case "payments":
                return <PaymentManagement />
            case "dashboard":
            default:
                return <DashboardOverview />
        }
    };

    if (!isLoggedIn) {
        return (
            <PartnerLogin
                onLoginComplete={(result) => {
                    setIsLoggedIn(true)
                    setPartnerSession(result.org) // partner details who logged in
                }}
            />
        )
    }

    return (
        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            {renderContent()}
        </AdminLayout>
    )
}
