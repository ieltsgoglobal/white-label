"use client"

import { useState } from "react"
import { AdminLayout } from "./_components/layout/admin-layout"
import { TransactionManagment } from "./_components/transaction/transaction-managment"
import { UserManagement } from "./_components/users/user-managment"

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("dashboard")

    const renderContent = () => {
        switch (activeTab) {
            case "transactions":
                return <TransactionManagment />
            default:
                return <UserManagement />
        }
    };

    return (

        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            {renderContent()}
        </AdminLayout>
    )
}
