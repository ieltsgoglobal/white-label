"use client"

import { getActivePlans, PlanId, requirePlan } from "../utils/plans";

export default function PartnerPricingManagment() {
    const plans = getActivePlans();

    return (
        <div className="flex flex-wrap items-center justify-around p-6 gap-6">
            {plans.map((plan) => (
                <PricingCard key={plan.id} planId={plan.id} />
            ))}
        </div>
    );
}


function PricingCard({ planId }: { planId: PlanId }) {
    const plan = requirePlan(planId);
    const { title, users, pricePerUser: price } = plan;

    return (
        <div className="flex flex-col rounded-3xl dark:border border-border shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)]">
            <div className="px-6 py-8 sm:p-10 sm:pb-6">
                <div className="grid items-center justify-center w-full grid-cols-1 text-left">
                    <div>
                        <h2 className="text-lg font-medium tracking-tighter lg:text-3xl">
                            {title} <span className="text-base tracking-tight text-muted-foreground">Plan</span>
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            {users} user{users > 1 ? "s" : ""} package
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

    // get partnerId from params
    const searchParams = new URLSearchParams(window.location.search);
    const partnerId = searchParams.get("partnerId");
    const returnTo = searchParams.get("returnTo");

    // Guard clause: check partnerId is present
    if (!partnerId) {
        console.error("❌ partnerId not found in query params");
        return;
    }

    // rest phonepe code
    const redirectUrl = `${returnTo}/partner-payment-verification`;
    const TYPE = 'B2B_CREDIT_PACKAGE';

    const res = await fetch("api/payment-gateway/phonepe/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, redirectUrl, orgId: partnerId, TYPE }),
    });

    const data = await res.json();
    window.location.href = data.redirectUrl;
};