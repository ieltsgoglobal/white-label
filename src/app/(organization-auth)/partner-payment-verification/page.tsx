"use client";

import { useEffect, useState } from "react";
import DotPulseLoader from "@/components/loaders/mock-tests/speaking/DotPulseLoader";
import PaymentSuccessDisplay from "./_components/PaymentSuccessDisplay";
import PaymentFailureDisplay from "./_components/PaymentFailureDisplay";

export default function PartnerPaymentVerification() {
    const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
    const [merchantOrderId, setMerchantOrderId] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const orderId = params.get("merchantOrderId");
        const amountStr = params.get("amount") || "0";

        if (!orderId) {
            setStatus("failed");
            return;
        }

        setMerchantOrderId(orderId);
        setAmount(parseInt(amountStr));

        const checkStatus = async () => {
            try {
                const res = await fetch(`/api/payment-gateway/phonepe/status?orderId=${orderId}`, {
                    cache: "no-store",
                });
                const data = await res.json();

                setStatus(data.state === "COMPLETED" ? "success" : "failed");
            } catch (err) {
                setStatus("failed");
            }
        };

        checkStatus();
    }, []);

    if (status === "loading") return <DotPulseLoader />;

    return status === "success" ? (
        <PaymentSuccessDisplay orderId={merchantOrderId} amount={amount} />
    ) : (
        <PaymentFailureDisplay orderId={merchantOrderId} amount={amount} />
    );
}