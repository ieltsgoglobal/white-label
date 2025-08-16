"use client"

import { getSessionUser } from "@/lib/auth/session/get-user";

export default function UserPricingManagment() {
    const pricingTiers = [
        {
            title: "7-Day Access",
            label: "1-Week Validity",
            durationInDays: 7,
            price: 699,
            type: "B2C_V1_FIXED",
        },
        {
            title: "14-Day Access",
            label: "2-Week Validity",
            durationInDays: 14,
            price: 799,
            type: "B2C_V1_FIXED",
        },
        {
            title: "21-Day Access",
            label: "3-Week Validity",
            durationInDays: 21,
            price: 899,
            type: "B2C_V1_FIXED",
        },
        // {
        //     title: "Monthly Membership",
        //     label: "4-Week Validity",
        //     price: 599,
        //     originalPrice: 999,
        //     offerEnds: "15th September 2025",
        //     isOffer: true,
        //     type: "B2C_V1_AUTOPAY_MONTLY"
        // },
        {
            title: "7-Day Test",
            label: "1-Week Validity",
            durationInDays: 7,
            price: 1,
            type: "B2C_V1_FIXED",
        },
    ];


    return (
        <div className="flex flex-wrap items-center justify-around p-6 gap-6">
            {pricingTiers.map((tier, index) => {
                const isAutoPay = tier.type.includes("AUTOPAY")

                // if (isAutoPay) {
                //     return (
                //         <PricingCardAutoPay
                //             key={index}
                //             title={tier.title}
                //             label={tier.label}
                //             price={tier.price}
                //             originalPrice={tier.originalPrice}
                //             isOffer={tier.isOffer}
                //             offerEnds={tier.offerEnds}
                //         />
                //     )
                // }

                return (
                    <PricingCardFixed
                        key={index}
                        title={tier.title}
                        price={tier.price}
                        label={tier.label}
                        type={tier.type}
                        duration={tier.durationInDays}
                    />
                )
            })}
        </div>
    )
}

function PricingCardFixed({ title, price, label, type, duration }: { title: string; price: number, label: string, type: string, duration?: number }) {

    const handlePayment = async () => {

        // get userId
        const user = await getSessionUser()
        if (!user || user.role !== "user") {
            console.error("Not logged in as User")
            return
        }
        const userId = user.userId


        // rest phonepe code
        const amount = price * 100; // Convert to paise
        const redirectUrl = `${window.location.origin}/partner-payment-verification`;

        const res = await fetch("api/payment-gateway/phonepe/pay", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount, redirectUrl, userId, TYPE: type, duration }),
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
                <button onClick={handlePayment} className="items-center justify-center w-full px-6 py-2.5 text-center duration-200 border border-border rounded-full hover:border-foreground text-sm">
                    Get started
                </button>
            </div>
        </div>
    )
}

function PricingCardAutoPay({
    title,
    label,
    price,
    originalPrice,
    isOffer,
    offerEnds,
}: {
    title: string
    label: string
    price: number
    originalPrice?: number
    isOffer?: boolean
    offerEnds?: string
}) {
    const handlePayment = async () => {
        console.log("yo")
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

                    {isOffer &&
                        <div className="mt-6">
                            <p className="text-muted-foreground">
                                Note: Price After {offerEnds} {" "} <br />
                                <span className="text-xl font-light tracking-tight">
                                    ₹{originalPrice}
                                </span>
                                <span className="text-base font-medium"> /user </span>
                            </p>
                        </div>
                    }
                </div>
            </div>
            <div className="flex px-6 pb-8 sm:px-8">
                <button onClick={handlePayment} className="items-center justify-center w-full px-6 py-2.5 text-center duration-200 border border-border rounded-full hover:border-foreground text-sm">
                    Start Membership →
                </button>
            </div>
        </div>
    )
}