"use client"
import { Button } from "@/components/ui/button";
import { getSessionUser } from "@/lib/auth/session/get-user";
import { addTransactionAndCredits } from "@/lib/superbase/transaction-table";

export default function PurchaseCreditsButton() {
    const handlePurchase = async () => {

        const user = await getSessionUser()
        if (!user || user.role !== "organization") {
            console.error("Not logged in as organization")
            return
        }
        const partnerId = user.orgId // ✅ correct key


        // Example purchase: 10 credits = ₹1000
        const usersPurchased = 10
        const amountReceived = 1000

        const result = await addTransactionAndCredits(partnerId, usersPurchased, amountReceived)

        if ("error" in result) {
            console.log(`❌ ${result.error}`)
        } else {
            console.log(`✅ Purchased ${usersPurchased} credits successfully!`)
        }

    }

    return (
        <Button onClick={handlePurchase}>Buy Credits</Button>
    )
}