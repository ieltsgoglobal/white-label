"use client"

import { getSessionUser } from "@/lib/auth/session/get-user";

export default function PricingManagment() {
    const pricingTiers = [
        { title: "Individual", users: 5, price: 899 },
        { title: "Freelancer", users: 10, price: 799 },
        { title: "Startup", users: 20, price: 699 },
        { title: "Business", users: 50, price: 599 },
        { title: "Enterprise", users: 100, price: 499 },
        { title: "Test", users: 10, price: 1 },
    ];

    return (
        <div className="flex flex-wrap items-center justify-around p-6 gap-6">
            {pricingTiers.map((tier, index) => (
                <PricingCard
                    key={index}
                    title={tier.title}
                    price={tier.price}
                    users={tier.users}
                />
            ))}
        </div>
    )
}

function PricingCard({ title, price, users }: { title: string; price: number; users: number }) {

    const handlePayment = async () => {

        // get partnerId
        const user = await getSessionUser()
        if (!user || user.role !== "organization") {
            console.error("Not logged in as organization")
            return
        }
        const partnerId = user.orgId


        // rest phonepe code
        const amount = price * users * 100; // Convert to paise
        const redirectUrl = `${window.location.origin}/partner-payment-verification`;

        const res = await fetch("api/payment-gateway/phonepe/pay", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount, redirectUrl, usersPurchased: users, orgId: partnerId }),
        });

        const data = await res.json();
        window.location.href = data.redirectUrl;
    };

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
                <button onClick={handlePayment} className="items-center justify-center w-full px-6 py-2.5 text-center duration-200 border border-border rounded-full hover:border-foreground text-sm">
                    Get started
                </button>
            </div>
        </div>
    )
}