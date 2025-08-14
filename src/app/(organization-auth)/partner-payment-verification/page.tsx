"use client";

import { useEffect, useRef, useState } from "react";
import DotPulseLoader from "@/components/loaders/mock-tests/speaking/DotPulseLoader";
import PaymentSuccessDisplay from "./_components/PaymentSuccessDisplay";
import PaymentFailureDisplay from "./_components/PaymentFailureDisplay";

export default function PartnerPaymentVerification() {
    const statusRef = useRef<"loading" | "success" | "failed">("loading");
    const [renderTrigger, setRenderTrigger] = useState(0); // just to re-render UI when status changes

    const [merchantOrderId, setMerchantOrderId] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [redirectURL, setRedirectURL] = useState<string>("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const orderId = params.get("merchantOrderId");
        const amountStr = params.get("amount") || "0";
        const type = params.get("type") as "B2B_CREDIT_PACKAGE" | "B2C_V1_FIXED" | null;

        if (!orderId) {
            statusRef.current = "failed";
            setRenderTrigger(v => v + 1);
            return;
        }

        // Set redirect URL based on type
        if (type === "B2B_CREDIT_PACKAGE") {
            setRedirectURL("/admin-dashboard");
        } else if (type === "B2C_V1_FIXED") {
            setRedirectURL("/practice");
        } else {
            setRedirectURL("/"); // fallback
        }

        setMerchantOrderId(orderId);
        setAmount(parseInt(amountStr));


        const checkStatus = async () => {
            try {
                const res = await fetch(`/api/payment-gateway/phonepe/status?orderId=${orderId}`, {
                    cache: "no-store",
                });
                const data = await res.json();
                statusRef.current = data.state === "COMPLETED" ? "success" : "failed";
                setRenderTrigger(v => v + 1); // trigger re-render

                await giveTempAccess(type);

            } catch (err) {
                statusRef.current = "failed";
                setRenderTrigger(v => v + 1);
            }
        };

        checkStatus();

    }, []);

    // make the "USER COOKEIE's is_member:true"
    // it will automaticaly get expired after one day
    // and then we can fetch new data from backend on login
    const giveTempAccess = async (type: string | null) => {
        if (type === "B2B_CREDIT_PACKAGE") return
        if (statusRef.current === "failed") return;
        await fetch("/api/auth/user/set-temp-access", { method: "POST" });
    }

    if (statusRef.current === "loading") return <DotPulseLoader />;

    return statusRef.current === "success" ? (
        <PaymentSuccessDisplay orderId={merchantOrderId} amount={amount} redirectURL={redirectURL} />
    ) : (
        <PaymentFailureDisplay orderId={merchantOrderId} amount={amount} redirectURL={redirectURL} />
    );
}