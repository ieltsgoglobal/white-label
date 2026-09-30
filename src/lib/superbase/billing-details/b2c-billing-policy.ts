"use server"

import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { createClient } from "@supabase/supabase-js"

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function saveB2CBillingDetails(formData: FormData) {
    const token = cookies().get("token")?.value
    if (!token) return { error: "Unauthorized" }

    try {
        const { userId, role } = jwt.verify(token, JWT_SECRET) as {
            userId?: string
            role?: string
        }

        if (role !== "user" || !userId) {
            return { error: "Unauthorized" }
        }

        const billingDetails = Object.fromEntries(
            Array.from(formData.entries()).map(([key, value]) => [
                key,
                typeof value === "string" ? value.trim() : value,
            ])
        )

        const { error } = await supabase
            .from("user")
            .update({
                b2c_subscription_billing_details: billingDetails,
            })
            .eq("id", userId)

        if (error) {
            return { error: "Unable to save billing details" }
        }

        return { success: true }
    } catch {
        return { error: "Unable to save billing details" }
    }
}