"use client"

import { useState, useEffect } from "react"
import { Check, Download, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

type Props = {
    orderId: string;
    amount: number;
};

export default function PaymentSuccessDisplay({ orderId, amount }: Props) {
    const [showContent, setShowContent] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)

    useEffect(() => {
        // Trigger animations in sequence
        const timer1 = setTimeout(() => setShowContent(true), 300)
        const timer2 = setTimeout(() => setShowConfetti(true), 800)

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
        }
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute w-2 h-2 bg-green-400 rounded-full opacity-60 animate-bounce ${showConfetti ? "animate-pulse" : ""
                            }`}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${2 + Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>

            <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                    {/* Animated checkmark */}
                    <div className="relative mb-6">
                        <div
                            className={`w-20 h-20 mx-auto rounded-full bg-green-500 flex items-center justify-center transform transition-all duration-700 ${showContent ? "scale-100 rotate-0" : "scale-0 rotate-180"
                                }`}
                        >
                            <Check className="w-10 h-10 text-white animate-pulse" />
                        </div>

                        {/* Ripple effect */}
                        <div
                            className={`absolute inset-0 w-20 h-20 mx-auto rounded-full bg-green-400 transition-all duration-1000 ${showContent ? "scale-150 opacity-0" : "scale-100 opacity-30"
                                }`}
                        />
                    </div>

                    {/* Success message */}
                    <div
                        className={`transform transition-all duration-500 delay-300 ${showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            }`}
                    >
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                        <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been confirmed.</p>
                    </div>

                    {/* Order details */}
                    <div
                        className={`bg-gray-50 rounded-lg p-4 mb-6 transform transition-all duration-500 delay-500 ${showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            }`}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Order #</span>
                            <span className="font-mono text-sm font-medium  max-w-[240px]">#{orderId}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Amount</span>
                            <span className="font-semibold text-green-600">₹{amount / 100}</span>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div
                        className={`space-y-3 transform transition-all duration-500 delay-700 ${showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            }`}
                    >
                        <Link href="/admin-dashboard">
                            <Button variant="ghost" className="w-full group">
                                Go To Admin Dashboard
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>

                    {/* Floating success indicators */}
                    {showConfetti && (
                        <>
                            <div className="absolute top-4 left-4 animate-bounce delay-100">
                                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            </div>
                            <div className="absolute top-8 right-6 animate-bounce delay-300">
                                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                            </div>
                            <div className="absolute bottom-12 left-8 animate-bounce delay-500">
                                <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                            </div>
                            <div className="absolute bottom-20 right-4 animate-bounce delay-700">
                                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Additional floating elements */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-emerald-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        </div>
    )
}
