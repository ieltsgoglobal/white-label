import { redirect } from "next/navigation";
import PaymentSuccessDisplay from "./_components/PaymentSuccessDisplay";
import PaymentFailureDisplay from "./_components/PaymentFailureDisplay";

export default async function PartnerPaymentVerification({ searchParams }: { searchParams: { [key: string]: string } }) {
    const merchantOrderId = searchParams.merchantOrderId;
    const users = parseInt(searchParams.users || "0");
    const amount = parseInt(searchParams.amount || "0");

    if (!merchantOrderId) redirect("/404");

    const res = await fetch(`https://ieltsgoglobal.com/api/payment-gateway/phonepe/status?orderId=${merchantOrderId}`, {
        cache: "no-store", // ensure latest status
    });

    const data = await res.json();

    if (data.state === "COMPLETED") {
        return <PaymentSuccessDisplay orderId={merchantOrderId} amount={amount} />;
    } else {
        return <PaymentFailureDisplay orderId={merchantOrderId} amount={amount} />;
    }
}