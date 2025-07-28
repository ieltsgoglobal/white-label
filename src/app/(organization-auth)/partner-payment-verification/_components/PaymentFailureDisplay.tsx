"use client"

import { useState, useEffect } from "react"
import { X, RefreshCw, MessageCircle, ArrowLeft, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"


type Props = {
    orderId: string;
    amount: number;
};

export default function PaymentFailureDisplay({ orderId, amount }: Props) {
    const [showContent, setShowContent] = useState(false)
    const [showShake, setShowShake] = useState(false)

    useEffect(() => {
        // Trigger animations in sequence
        const timer1 = setTimeout(() => setShowContent(true), 300)
        const timer2 = setTimeout(() => setShowShake(true), 800)
        const timer3 = setTimeout(() => setShowShake(false), 1300)

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
            clearTimeout(timer3)
        }
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-red-400 rounded-full opacity-40 animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>

            <Card
                className={`w-full max-w-md mx-auto shadow-2xl border-0 bg-white/80 backdrop-blur-sm ${showShake ? "animate-pulse" : ""}`}
            >
                <CardContent className="p-8 text-center">
                    {/* Animated error icon */}
                    <div className="relative mb-6">
                        <div
                            className={`w-20 h-20 mx-auto rounded-full bg-red-500 flex items-center justify-center transform transition-all duration-700 ${showContent ? "scale-100 rotate-0" : "scale-0 rotate-180"
                                } ${showShake ? "animate-bounce" : ""}`}
                        >
                            <X className="w-10 h-10 text-white" />
                        </div>

                        {/* Error ripple effect */}
                        <div
                            className={`absolute inset-0 w-20 h-20 mx-auto rounded-full bg-red-400 transition-all duration-1000 ${showContent ? "scale-150 opacity-0" : "scale-100 opacity-30"
                                }`}
                        />
                    </div>

                    {/* Error message */}
                    <div
                        className={`transform transition-all duration-500 delay-300 ${showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            }`}
                    >
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
                        <p className="text-gray-600 mb-6">
                            We couldn't process your payment. Please try again or use a different payment method.
                        </p>
                    </div>

                    {/* Error details */}
                    <div
                        className={`bg-red-50 border border-red-200 rounded-lg p-4 mb-6 transform transition-all duration-500 delay-500 ${showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            }`}
                    >
                        <div className="flex items-center mb-3">
                            <AlertTriangle className="w-4 h-4 text-red-500 mr-2" />
                            <span className="text-sm font-medium text-red-800">Transaction Details</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Transaction ID</span>
                            <span className="font-mono text-sm font-medium">#{orderId}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Amount</span>
                            <span className="font-semibold text-gray-700">{amount * 100}</span>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div
                        className={`space-y-3 transform transition-all duration-500 delay-700 ${showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            }`}
                    >

                        <Link href="/admin-dashboard">
                            <Button className="w-full bg-red-600 hover:bg-red-700 text-white group">
                                <RefreshCw className="w-4 h-4 mr-2 group-hover:animate-spin" />
                                Try Again
                            </Button>
                        </Link>


                        <Link href="contact">
                            <Button variant="outline" className="w-full group bg-transparent border-red-200 hover:bg-red-50">
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Contact Support
                            </Button>
                        </Link>

                        <Link href="/admin-dashboard">
                            <Button variant="ghost" className="w-full group text-gray-600 hover:text-gray-800">
                                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                Go To Admin Dashboard
                            </Button>
                        </Link>
                    </div>

                    {/* Helpful tips */}
                    <div
                        className={`mt-6 p-4 bg-blue-50 rounded-lg transform transition-all duration-500 delay-900 ${showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            }`}
                    >
                        <h3 className="text-sm font-medium text-blue-800 mb-2">Common Solutions:</h3>
                        <ul className="text-xs text-blue-700 space-y-1 text-left">
                            <li>• Check your card balance</li>
                            <li>• Verify card details are correct</li>
                            <li>• Try a different payment method</li>
                            <li>• Contact your bank if issues persist</li>
                        </ul>
                    </div>

                    {/* Floating error indicators */}
                    {showShake && (
                        <>
                            <div className="absolute top-4 left-4 animate-pulse delay-100">
                                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                            </div>
                            <div className="absolute top-8 right-6 animate-pulse delay-300">
                                <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                            </div>
                            <div className="absolute bottom-12 left-8 animate-pulse delay-500">
                                <div className="w-2 h-2 bg-red-300 rounded-full"></div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Additional floating elements */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-200 rounded-full opacity-10 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-rose-200 rounded-full opacity-10 animate-pulse delay-1000"></div>
        </div>
    )
}
