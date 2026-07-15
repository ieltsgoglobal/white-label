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
            <div className="flex flex-col gap-2 px-6 pb-8 sm:px-8">
                <button onClick={() => { handlePayment(planId) }} className="items-center justify-center w-full px-6 py-2.5 text-center duration-200 border border-border rounded-full hover:border-foreground text-sm">
                    <svg className="inline-block mr-2 h-5 w-5 align-middle" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2"><circle cx="-25.926" cy="41.954" r="29.873" fill="#5f259f" transform="rotate(-76.714 -48.435 5.641) scale(8.56802)" /><path d="M372.164 189.203c0-10.008-8.576-18.593-18.584-18.593h-34.323l-78.638-90.084c-7.154-8.577-18.592-11.439-30.03-8.577l-27.17 8.577c-4.292 1.43-5.723 7.154-2.862 10.007l85.8 81.508H136.236c-4.293 0-7.154 2.861-7.154 7.154v14.292c0 10.016 8.585 18.592 18.592 18.592h20.015v68.639c0 51.476 27.17 81.499 72.931 81.499 14.292 0 25.739-1.431 40.03-7.146v45.753c0 12.87 10.016 22.886 22.885 22.886h20.015c4.293 0 8.577-4.293 8.577-8.586V210.648h32.893c4.292 0 7.145-2.861 7.145-7.145v-14.3zM280.65 312.17c-8.576 4.292-20.015 5.723-28.591 5.723-22.886 0-34.324-11.438-34.324-37.176v-68.639h62.915v100.092z" fill="#fff" fillRule="nonzero" /></svg>
                    Pay with PhonePe
                    <svg className="inline-block ml-2 mb-[0.1rem] h-4 w-5 align-middle rounded-sm" viewBox="0 0 122.88 85.48" xmlns="http://www.w3.org/2000/svg"><path fill="#FF9933" d="M6.71 0h109.46c3.7.02 6.71 3.05 6.71 6.75v71.98c0 3.71-3.04 6.75-6.75 6.75H6.71C3.02 85.46 0 82.43 0 78.73V6.75C0 3.05 3.01.02 6.71 0z" /><rect y="28.49" width="122.88" height="28.5" fill="#fff" /><path fill="#128807" d="M0 56.99h122.88v21.74c0 3.71-3.04 6.75-6.75 6.75H6.71C3.02 85.46 0 82.43 0 78.73V56.99z" /><circle cx="61.44" cy="42.74" r="11.4" fill="#000088" /><circle cx="61.44" cy="42.74" r="9.97" fill="#fff" /><circle cx="61.44" cy="42.74" r="2" fill="#000088" /></svg>
                </button>
                <button onClick={() => { handleDodoPayment(planId) }} className="items-center justify-center w-full px-6 py-2.5 text-center duration-200 border border-border rounded-full hover:border-foreground text-sm">
                    <img src="https://dodopayments.com/_astro/logo.4bB1POpK_Z2u8cUw.webp" alt="Dodo Payments" className="inline-block h-5 w-5 mr-2 align-middle" />
                    Pay with Dodo
                    <svg className="inline-block ml-2 h-4 w-4 align-middle" viewBox="0 0 122.88 122.88" xmlns="http://www.w3.org/2000/svg"><path fill="#2394E0" fillRule="evenodd" clipRule="evenodd" d="M61.44 0c33.93 0 61.44 27.51 61.44 61.44 0 33.93-27.51 61.44-61.44 61.44C27.51 122.88 0 95.37 0 61.44 0 27.51 27.51 0 61.44 0z" /><path fill="#A1E367" fillRule="evenodd" clipRule="evenodd" d="M11.76 93.18c-3.62-5.49-6.33-11.64-7.92-18.23l10.82 5.22.06 3.23c0 1.19-2.02 3.71-2.67 4.67l-.29 5.11zm66.55-86.68c20.62 6.85 36.09 25 39.07 47.1l-1.95-.21c-.35 1.5-.67 1.53-.67 3.33 0 1.59 2 2.65 2 6 0 .9-2.11 2.69-2.2 3.01l-3.13-3.67v4.67l-.47-.02-.84-8.62-1.75.55-2.08-6.41-6.85 7.16-.08 5.24-2.24 1.5-2.38-13.44-1.42 1.04-3.22-4.35-4.81.14-1.84-2.11-1.89.52-3.71-4.25-.72.49 2.3 5.88h2.67v-1.33h1.33c.96 2.66 2 1.08 2 2.67 0 5.55-6.85 9.63-11.34 10.67.24 1 .15 2 1.33 2 2.51 0 1.26-.44 4-.67-.13 5.67-6.5 12.44-9.22 16.65l1.22 8.69c.32 1.89-3.92 3.88-5.36 6.01l.69 3.33-1.95.79c-.34 3.42-3.66 7.21-7.39 7.21h-4c0-4.68-3.34-11.37-3.34-14.68 0-2.81 1.33-3.19 1.33-6.67 0-3.22-3.33-7.83-3.33-8.67v-5.34H45.4c-.4-1.49-.15-2-2-2h-.67c-2.91 0-2.42 1.33-5.34 1.33h-2.67c-2.41 0-6.67-7.72-6.67-8.67v-8c0-3.45 3.16-7.21 5.34-8.67v-3.33l3-3.05 1.67-.28c3.58 0 3.15-2 5.34-2h6v4.67l6.6 2.82.62-2.85c2.99.7 3.77 2.03 7.45 2.03h1.33c2.53 0 2.67-3.36 2.67-6l-5.34.53-2.33-5.06-2.31.61c.42 1.81.64 1.06.64 2.59 0 .9-.74 1-1.34 1.33l-2.31-5.86-4.97-3.55-.66.65 4.23 4.45c-.56 1.6-.63 6.21-2.96 2.98l2.18-1.05-5.44-5.7-3.26 1.27-3.22 3.08c-.34 2.48-1.01 3.73-3.61 3.73-1.73 0-.69-.45-3.34-.67v-6.67h6l-1.95-4.44-.72.44v-1.34l9.75-4.49c-.18-1.4-.41-.65-.41-2.18 0-.09.65-1.32.67-1.34l2.52 1.57-.6-2.87-3.89.8-.72-3.49c3.08-1.62 9.87-7.34 12.03-7.34h2c2.11 0 7.75 2.08 8.67 3.33l-5.35-.54 3.97 3.27.38-1.4 2.96-.81.04-1.85h1.34v2z" /></svg>
                </button>
            </div>
        </div>
    )
}

export const handlePayment = async (planId: string) => {

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

export const handleDodoPayment = async (planId: string) => {

    // get userId
    const user = await getSessionUser()
    if (!user || user.role !== "user") {
        console.error("Not logged in as User")
        return
    }
    const userId = user.userId

    // rest dodo code
    const redirectUrl = `${window.location.origin}/partner-payment-verification`;
    const TYPE = "B2C_V1_FIXED"

    const res = await fetch("api/payment-gateway/dodo/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, redirectUrl, userId, TYPE }),
    });

    const data = await res.json();
    window.location.href = data.redirectUrl;
};
