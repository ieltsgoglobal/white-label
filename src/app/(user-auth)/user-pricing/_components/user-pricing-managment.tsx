"use client"

import { B2CPlanId, getActiveB2CPlans, requireB2CPlan } from "@/app/data/plans/b2c-plans";
import { getSessionUser } from "@/lib/auth/session/get-user";

export default function UserPricingManagment() {
    const plans = getActiveB2CPlans()
    return (
        <div className="flex flex-wrap items-center justify-around p-6 gap-6">
            {plans.map((plan) => (
                <PricingCardFixed
                    key={plan.id}
                    planId={plan.id}
                />
            ))}
        </div>
    )
}

function PricingCardFixed({ planId }: { planId: B2CPlanId }) {
    const plan = requireB2CPlan(planId);

    const title = plan.title
    const label = plan.label
    const price = plan.priceInr

    return (
        <div className="flex flex-col rounded-3xl dark:border border-border shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)]">
            <div className="px-6 py-8 sm:p-10 sm:pb-6">
                <div className="grid items-center justify-center w-full grid-cols-1 text-left">
                    <div>
                        <h2 className="text-lg font-medium tracking-tighter lg:text-3xl">
                            {title} <span className="text-base tracking-tight text-muted-foreground">Plan</span>
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            {label}
                        </p>
                    </div>
                    <div className="mt-6">
                        <p>
                            <span className="text-5xl font-light tracking-tight ">
                                ₹{price}
                            </span>
                            <span className="text-base font-medium"> /user </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex px-6 pb-8 sm:px-8">
                <button onClick={() => { handlePayment(planId) }} className="items-center justify-center w-full px-6 py-2.5 text-center duration-200 border border-border rounded-full hover:border-foreground text-sm">
                    Get started
                </button>
            </div>
        </div>
    )
}

const handlePayment = async (planId: string) => {

    // get userId
    const user = await getSessionUser()
    if (!user || user.role !== "user") {
        console.error("Not logged in as User")
        return
    }
    const userId = user.userId


    // rest phonepe code
    const redirectUrl = `${window.location.origin}/partner-payment-verification`;
    const TYPE = "B2C_V1_FIXED"

    const res = await fetch("api/payment-gateway/phonepe/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, redirectUrl, userId, TYPE }),
    });

    const data = await res.json();
    window.location.href = data.redirectUrl;
};
