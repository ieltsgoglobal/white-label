"use client";

import { useEffect } from "react";

export default function RazorpayButton() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/payment-button.js";
        script.setAttribute("data-payment_button_id", "pl_Qot2JnhWQxdXkx");
        script.async = true;

        const form = document.getElementById("razorpay-form");
        if (form) {
            form.appendChild(script);
        }
    }, []);

    return (
        <form id="razorpay-form">
            {/* Razorpay button will load here */}
        </form>
    );
}