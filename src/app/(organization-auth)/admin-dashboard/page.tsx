"use client"

import { useState } from "react"
import { AdminLayout } from "./_components/layout/admin-layout"
import { DashboardOverview } from "./_components/dashboard/dashboard-overview"
import { TransactionManagment } from "./_components/transaction/transaction-managment"
import { PaymentManagement } from "./_components/payments/payment-management"
import { UserManagement } from "./_components/users/user-managment"
import PartnerLogin from "@/components/login/partner-login/admin-login"
import { savePartnerId } from "@/lib/login/indexedDB"

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("dashboard")
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const renderContent = () => {
        switch (activeTab) {
            case "users":
                return <UserManagement />
            case "jobs":
                return <TransactionManagment />
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
                onLoginComplete={async (result) => {
                    setIsLoggedIn(true)
                    await savePartnerId(result.org.id) // ✅ store in IndexedDB
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
