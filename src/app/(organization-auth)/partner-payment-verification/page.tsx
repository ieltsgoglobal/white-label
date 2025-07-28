"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DotPulseLoader from "@/components/loaders/mock-tests/speaking/DotPulseLoader";
import PaymentSuccessDisplay from "./_components/PaymentSuccessDisplay";
import PaymentFailureDisplay from "./_components/PaymentFailureDisplay";

export default function PartnerPaymentVerification() {
    const params = useSearchParams();
    const merchantOrderId = params.get("merchantOrderId");
    const users = params.get("users");
    const amount = params.get("amount");

    const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");

    useEffect(() => {
        const checkStatus = async () => {
            if (!merchantOrderId) return;

            const res = await fetch(`/api/payment-gateway/phonepe/status?orderId=${merchantOrderId}`);
            const data = await res.json();

            if (data.state === "COMPLETED") {
                setStatus("success");
            } else {
                setStatus("failed");
            }
        };

        checkStatus();
    }, [merchantOrderId]);

    if (status === "loading") return <DotPulseLoader />;

    return status === "success" ? (
        <PaymentSuccessDisplay orderId={merchantOrderId ?? ""} amount={parseInt(amount ?? "0")} />
    ) : (
        <PaymentFailureDisplay orderId={merchantOrderId ?? ""} amount={parseInt(amount ?? "0")} />
    );
}