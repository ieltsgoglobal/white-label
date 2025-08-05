"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Globe,
    Brain,
    Sparkles,
    Palette,
    Infinity,
    ArrowRight,
    Play,
    Rocket,
    Cpu,
    Target,
    Zap,
    RotateCcw,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function Component() {
    const [isHovered, setIsHovered] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [isLandscape, setIsLandscape] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)

    useEffect(() => {
        const checkDevice = () => {
            setIsMobile(window.innerWidth < 768)
            setIsLandscape(window.innerHeight < window.innerWidth)
        }

        checkDevice()
        window.addEventListener("resize", checkDevice)
        window.addEventListener("orientationchange", () => {
            setTimeout(checkDevice, 100) // Delay to ensure orientation change is complete
        })

        return () => {
            window.removeEventListener("resize", checkDevice)
            window.removeEventListener("orientationchange", checkDevice)
        }
    }, [])

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(Boolean(document.fullscreenElement))
        }

        document.addEventListener("fullscreenchange", handleFullscreenChange)

        // Initial check
        handleFullscreenChange()

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange)
        }
    }, [])

    // Show rotation prompt on mobile portrait
    if (isMobile && !isLandscape) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-indigo-50/50 to-purple-50/50 p-6">
                <div className="text-center space-y-6 max-w-sm">
                    <div className="mx-auto w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center animate-bounce">
                        <RotateCcw className="h-12 w-12 text-white animate-spin" style={{ animationDuration: "3s" }} />
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
                            Rotate Your Device
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            For the best experience viewing our AI-powered IELTS platform card, please rotate your device to landscape
                            mode.
                        </p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200 shadow-lg">
                        <div className="flex items-center gap-3 mb-3">
                            <Globe className="h-6 w-6 text-indigo-600" />
                            <span className="font-bold text-gray-900">IELTS Go Global</span>
                        </div>
                        <p className="text-sm text-gray-600">AI-Powered White-Label IELTS Testing Platform</p>
                    </div>

                    <div className="text-xs text-gray-500">🔄 Rotate to landscape • 📱 Best mobile experience</div>

                    <button
                        onClick={() => {
                            if (document.documentElement.requestFullscreen) {
                                document.documentElement.requestFullscreen()
                            }
                        }}
                        className="mt-4 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow hover:from-indigo-700 hover:to-purple-700 transition"
                    >
                        🔍 View Full Screen
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50/50 to-purple-50/50 flex justify-center items-center p-6">
            <div className="flex flex-col items-center justify-center space-y-8 w-full">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-3 leading-tight">
                        AI-Powered IELTS Platform
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-2">White-label • Scalable • Intelligent</p>
                    <p className="text-gray-500">The future of IELTS training</p>
                </div>
                <div className="w-full flex overflow-x-auto py-10">
                    <div className="max-w-6xl mx-auto">
                        <Card
                            className={`overflow-hidden border-0 shadow-[0_20px_40px_-8px_rgba(0,0,0,0.3)] bg-white backdrop-blur-xl relative group ${isMobile ? "aspect-[16/10] h-[350px]" : "aspect-[16/9] h-[500px]"
                                }`}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {/* Card Border Glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-75 blur-sm"></div>
                            <div className="absolute inset-[1px] bg-white rounded-xl"></div>

                            {/* Floating Orbs - Smaller on mobile */}
                            <div
                                className={`absolute -top-2 -right-2 ${isMobile ? "w-12 h-12" : "w-20 h-20"} bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-xl animate-pulse`}
                            ></div>
                            <div
                                className={`absolute -bottom-2 -left-2 ${isMobile ? "w-16 h-16" : "w-24 h-24"} bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-xl animate-pulse delay-1000`}
                            ></div>

                            <div className="relative h-full flex">
                                {/* Left Section - Branding */}
                                <div
                                    className={`${isMobile ? "w-48" : "w-80"} bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden rounded-l-xl`}
                                >
                                    {/* Animated Grid */}
                                    <div className="absolute inset-0 opacity-20">
                                        <div
                                            className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] ${isMobile ? "bg-[size:15px_15px]" : "bg-[size:20px_20px]"}`}
                                        ></div>
                                    </div>

                                    {/* Floating Elements - Smaller on mobile */}
                                    <div
                                        className={`absolute top-4 right-4 ${isMobile ? "w-6 h-6" : "w-12 h-12"} bg-white/10 rounded-xl rotate-12 animate-bounce delay-500`}
                                    ></div>
                                    <div
                                        className={`absolute bottom-6 right-6 ${isMobile ? "w-3 h-3" : "w-6 h-6"} bg-blue-400/40 rounded-full animate-ping`}
                                    ></div>

                                    <div className={`relative ${isMobile ? "p-4" : "p-6"} h-full flex flex-col justify-between`}>
                                        <div>
                                            <div className={`flex items-center gap-2 ${isMobile ? "mb-2" : "mb-4"}`}>
                                                <div className={`${isMobile ? "p-2" : "p-3"} bg-white/10 backdrop-blur-sm rounded-2xl`}>
                                                    <Globe className={`${isMobile ? "h-5 w-5" : "h-8 w-8"} text-white`} />
                                                </div>
                                                <div>
                                                    <h1 className={`${isMobile ? "text-sm" : "text-2xl"} font-bold text-white`}>IELTS Go Global</h1>
                                                    <p className={`text-blue-200 ${isMobile ? "text-xs" : "text-sm"}`}>AI-Powered Platform</p>
                                                </div>
                                            </div>

                                            <Badge
                                                className={`bg-gradient-to-r from-yellow-400 to-orange-400 text-black border-0 font-bold ${isMobile ? "px-2 py-1 text-xs mb-2" : "px-3 py-1 mb-4"}`}
                                            >
                                                🤖 AI-FIRST
                                            </Badge>

                                            <div className={`space-y-2 ${isMobile ? "text-xs" : "text-sm"}`}>
                                                <div className="flex items-center gap-2 text-white/90">
                                                    <Cpu className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} text-blue-300`} />
                                                    <span>Next-Gen AI Technology</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-white/90">
                                                    <Palette className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} text-purple-300`} />
                                                    <span>Complete White-Label</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-white/90">
                                                    <Infinity className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} text-pink-300`} />
                                                    <span>Infinite Scalability</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <div className={`${isMobile ? "text-2xl" : "text-3xl"} font-bold text-white mb-1`}>94%</div>
                                            <div className={`${isMobile ? "text-xs" : "text-xs"} text-blue-200`}>AI Accuracy</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Section - Content */}
                                <div className="flex-1 flex flex-col">
                                    <CardHeader className={`${isMobile ? "pb-2 pt-4 px-3" : "pb-4 pt-6 px-6"}`}>
                                        <CardTitle
                                            className={`${isMobile ? "text-md" : "text-2xl"} font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 bg-clip-text text-transparent leading-tight`}
                                        >
                                            Transform IELTS Training with AI
                                        </CardTitle>
                                        <CardDescription className={`${isMobile ? "text-xs" : "text-base"} text-gray-600 leading-relaxed`}>
                                            Launch your branded IELTS testing platform with cutting-edge AI technology.
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className={`flex-1 ${isMobile ? "px-3 space-y-2" : "px-6 space-y-4"}`}>
                                        {/* AI Features Row */}
                                        <div className={`grid grid-cols-3 ${isMobile ? "gap-1" : "gap-3"}`}>
                                            <div
                                                className={`${isMobile ? "p-2" : "p-3"} rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 text-center group hover:scale-105 transition-transform duration-300`}
                                            >
                                                <Brain
                                                    className={`${isMobile ? "h-4 w-4" : "h-6 w-6"} text-purple-600 mx-auto ${isMobile ? "mb-1" : "mb-2"}`}
                                                />
                                                <div className={`${isMobile ? "text-xs" : "text-xs"} font-semibold text-gray-900`}>AI Scoring</div>
                                                <div className={`${isMobile ? "text-xs" : "text-xs"} text-gray-600`}>Neural Networks</div>
                                            </div>
                                            <div
                                                className={`${isMobile ? "p-2" : "p-3"} rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 text-center group hover:scale-105 transition-transform duration-300`}
                                            >
                                                <Sparkles
                                                    className={`${isMobile ? "h-4 w-4" : "h-6 w-6"} text-blue-600 mx-auto ${isMobile ? "mb-1" : "mb-2"}`}
                                                />
                                                <div className={`${isMobile ? "text-xs" : "text-xs"} font-semibold text-gray-900`}>
                                                    Instant Feedback
                                                </div>
                                                <div className={`${isMobile ? "text-xs" : "text-xs"} text-gray-600`}>Real-time</div>
                                            </div>
                                            {/* <div
                                            className={`${isMobile ? "p-2" : "p-3"} rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 text-center group hover:scale-105 transition-transform duration-300`}
                                        >
                                            <Target
                                                className={`${isMobile ? "h-4 w-4" : "h-6 w-6"} text-green-600 mx-auto ${isMobile ? "mb-1" : "mb-2"}`}
                                            />
                                            <div className={`${isMobile ? "text-xs" : "text-xs"} font-semibold text-gray-900`}>Adaptive</div>
                                            <div className={`${isMobile ? "text-xs" : "text-xs"} text-gray-600`}>Smart Tests</div>
                                        </div> */}
                                            <div
                                                className={`${isMobile ? "p-2" : "p-3"} rounded-xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 text-center group hover:scale-105 transition-transform duration-300`}
                                            >
                                                <Zap
                                                    className={`${isMobile ? "h-4 w-4" : "h-6 w-6"} text-orange-600 mx-auto ${isMobile ? "mb-1" : "mb-2"}`}
                                                />
                                                <div className={`${isMobile ? "text-xs" : "text-xs"} font-semibold text-gray-900`}>24h Deploy</div>
                                                <div className={`${isMobile ? "text-xs" : "text-xs"} text-gray-600`}>Mini Website</div>
                                            </div>
                                        </div>

                                        {/* White-Label Highlight */}
                                        <div
                                            className={`bg-gradient-to-r from-indigo-50 via-white to-purple-50 ${isMobile ? "p-2" : "p-4"} rounded-xl border border-indigo-100 relative overflow-hidden`}
                                        >
                                            <div
                                                className={`absolute top-0 right-0 ${isMobile ? "w-12 h-12" : "w-20 h-20"} bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-xl`}
                                            ></div>
                                            <div className="relative flex items-center justify-between">
                                                <div>
                                                    <h3
                                                        className={`${isMobile ? "text-xs" : "text-sm"} font-bold text-gray-900 mb-1 flex items-center gap-2`}
                                                    >
                                                        <Palette className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} text-indigo-600`} />
                                                        Complete White-Label
                                                    </h3>
                                                    <p className={`${isMobile ? "text-xs" : "text-xs"} text-gray-600`}>Your brand • Your domain</p>
                                                </div>
                                                <div className="flex gap-1">
                                                    <Badge variant="outline" className={`${isMobile ? "text-xs px-1 py-0" : "text-xs px-2 py-1"}`}>
                                                        Custom
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Scalability Stats - Simplified for mobile */}

                                        {!isMobile &&
                                            <div className={`flex items-center justify-between ${isMobile ? "py-1" : "py-2"}`}>
                                                <div className="text-center">
                                                    <div
                                                        className={`${isMobile ? "text-sm" : "text-lg"} font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent`}
                                                    >
                                                        10+
                                                    </div>
                                                    <div className={`${isMobile ? "text-xs" : "text-xs"} text-gray-500`}>Students</div>
                                                </div>
                                                <div className="flex-1 mx-2">
                                                    <div className="h-1 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-full relative">
                                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-3/4"></div>
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <div
                                                        className={`${isMobile ? "text-sm" : "text-lg"} font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent`}
                                                    >
                                                        10,000+
                                                    </div>
                                                    <div className={`${isMobile ? "text-xs" : "text-xs"} text-gray-500`}>Enterprise</div>
                                                </div>
                                            </div>
                                        }
                                    </CardContent>

                                    <CardFooter
                                        className={`${isMobile ? "px-3 py-2" : "px-6 py-4"} bg-gradient-to-r from-gray-50/50 to-white/50 border-t border-gray-100`}
                                    >
                                        <div className="w-full flex items-center justify-between">
                                            <div>
                                                <p className={`${isMobile ? "text-xs" : "text-sm"} font-medium text-gray-900`}>Ready to Launch?</p>
                                                <p className={`${isMobile ? "text-xs" : "text-xs"} text-gray-600`}>
                                                    🚀 No tech skills • 🎨 Customizable
                                                </p>
                                            </div>

                                            <div className={`flex ${isMobile ? "gap-2" : "gap-3"}`}>
                                                <Link href="/become-partner">
                                                    <Button
                                                        variant="outline"
                                                        size={isMobile ? "sm" : "sm"}
                                                        className={`gap-1 border-indigo-200 text-indigo-700 hover:bg-indigo-50 bg-white/80 ${isMobile ? "text-xs px-2" : ""}`}
                                                    >
                                                        <Play className={`${isMobile ? "h-3 w-3" : "h-4 w-4"}`} />
                                                        Demo
                                                    </Button>
                                                </Link>

                                                <Link href="/">
                                                    <Button
                                                        size={isMobile ? "sm" : "sm"}
                                                        className={`gap-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 transition-all duration-300 ${isMobile ? "text-xs px-2" : ""} ${isHovered ? "scale-105 shadow-lg" : ""
                                                            }`}
                                                    >
                                                        <Rocket className={`${isMobile ? "h-3 w-3" : "h-4 w-4"}`} />
                                                        Website
                                                        <ArrowRight className={`${isMobile ? "h-3 w-3" : "h-4 w-4"}`} />
                                                    </Button>
                                                </Link >
                                            </div>
                                        </div>
                                    </CardFooter>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-sm text-gray-500">Transform your organization with cutting-edge AI technology</p>
                </div>

                {!isFullscreen && (
                    <button
                        onClick={() => {
                            if (document.documentElement.requestFullscreen) {
                                document.documentElement.requestFullscreen()
                            }
                        }}
                        className="mt-4 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow hover:from-indigo-700 hover:to-purple-700 transition"
                    >
                        🔍 View Full Screen
                    </button>
                )}
            </div>
        </div>
    )
}
