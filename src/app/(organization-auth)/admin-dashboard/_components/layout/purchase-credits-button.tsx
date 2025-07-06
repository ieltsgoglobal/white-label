"use client"
import { Button } from "@/components/ui/button";
import { getPartnerId } from "@/lib/login/indexedDB";
import { addTransactionAndCredits } from "@/lib/superbase/transaction-table";

export default function PurchaseCreditsButton() {
    const handlePurchase = async () => {

        const partnerId = await getPartnerId()
        if (!partnerId) {
            alert("Partner ID not found.")
            return
        }
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