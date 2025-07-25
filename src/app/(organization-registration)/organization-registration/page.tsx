// need to add captcha on submit

"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { User, Mail, Lock, Eye, EyeOff, PhoneForwarded, LocateIcon, Building2 } from "lucide-react"
import { registerPartner } from "@/lib/superbase/organization-table"
import { IdCardIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import DotPulseLoader from "@/components/loaders/mock-tests/speaking/DotPulseLoader"

export default function Component() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        email: "",
        password: "",
        gst: "",
        pan: "",
        subdomain: "",
        agreeToTerms: false,
    })

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true)
        e.preventDefault()

        const response = await registerPartner({
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            email: formData.email,
            password: formData.password,
            gst: formData.gst,
            pan: formData.pan,
            subdomain: formData.subdomain,
        })

        if (response.error) {
            console.log(`❌ ${response.error}`)
        } else {
            setFormData({
                name: "",
                phone: "",
                address: "",
                email: "",
                password: "",
                gst: "",
                pan: "",
                subdomain: "",
                agreeToTerms: false,
            })
            const isProd = process.env.NODE_ENV === "production"

            const domain = isProd
                ? `https://${formData.subdomain}.ieltsgoglobal.com/admin-dashboard`
                : `http://${formData.subdomain}.localhost:3000/admin-dashboard`

            router.push(domain)
            console.log("✅ Organization registered successfully!")
        }
    }

    return (
        <div
            className="
            relative w-full min-h-screen 
            bg-cover bg-center bg-no-repeat
            bg-[url('/organization-registraion/mobile-bg.png')]
            sm:bg-[url('/organization-registraion/registration-bg.jpg')]"
        >

            {/* loader while form submits */}
            {loading && <DotPulseLoader />}

            {/* Dark translucent overlay for contrast */}
            <div className="absolute inset-0 bg-black/40 z-0 w-full h-full min-h-screen" />

            <div className="flex flex-col sm:flex-row justify-between items-center sm:mt-0">
                {/* Left Side - Brand Section */}
                <div className="flex-1 mt-10 hidden lg:block">
                    <div className="z-1 flex flex-col items-center justify-center h-full text-white px-12">
                        {/* Logo and Mascot */}
                        <div className="text-center mb-8 animate-fade-in">
                            <div className="relative mb-6">
                                {/* Left Side - Text Branding */}
                                <div className="flex-1 flex flex-col items-center justify-center text-white px-12 text-left">
                                    <div className="space-y-6 max-w-md">
                                        <h1 className="text-5xl font-extrabold leading-tight tracking-tight">
                                            IELTS Registration
                                        </h1>
                                        <p className="text-lg opacity-90 leading-relaxed">
                                            Get started with your IELTS preparation journey. Register to access personalized coaching, AI tools, and free resources that boost your score.
                                        </p>
                                        <Button
                                            size="lg"
                                            className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 hover:border-white/50 backdrop-blur-sm px-10 py-3 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                                        >
                                            GET STARTED
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Registration Form */}
                <div className="flex-1 flex items-center justify-center p-3 sm:p-8">
                    <Card className="z-1 w-full max-w-2xl shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                        <CardContent className="p-6 sm:p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold mb-2 text-black">Register</h2>
                                <p className="text-gray-600">Create your account, it's free and only takes a minute</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Fields */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                            Organization Name
                                        </Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                                            <Input
                                                id="name"
                                                type="text"
                                                placeholder="Organization Name"
                                                value={formData.name}
                                                onChange={(e) => handleInputChange("name", e.target.value)}
                                                className="pl-10 border-gray-300 focus:border-pink-500 focus:ring-pink-500 rounded-lg text-black"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                                            Phone
                                        </Label>
                                        <div className="relative">
                                            <PhoneForwarded className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                                            <Input
                                                id="phone"
                                                type="text"
                                                placeholder="Phone"
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                                className="pl-10 border-gray-300 focus:border-pink-500 focus:ring-pink-500 rounded-lg"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* address */}
                                <div className="space-y-2">
                                    <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                                        Address
                                    </Label>
                                    <div className="relative">
                                        <LocateIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                                        <Input
                                            id="address"
                                            type="text"
                                            placeholder="address"
                                            value={formData.address}
                                            onChange={(e) => handleInputChange("address", e.target.value)}
                                            className="pl-10 border-gray-300 focus:border-pink-500 focus:ring-pink-500 rounded-lg"
                                        />
                                    </div>
                                </div>

                                {/* Email and Password Fields */}
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Email */}
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                            Email
                                        </Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="Email"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange("email", e.target.value)}
                                                className="pl-10 border-gray-300 focus:border-pink-500 focus:ring-pink-500 rounded-lg"
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                            Password
                                        </Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder="Password"
                                                value={formData.password || ""}
                                                onChange={(e) => handleInputChange("password", e.target.value)}
                                                className="pl-10 border-gray-300 focus:border-pink-500 focus:ring-pink-500 rounded-lg"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Choose Subdomain */}
                                <div className="space-y-2">
                                    <Label htmlFor="subdomain" className="text-sm font-medium text-gray-700">
                                        Choose Your Subdomain
                                    </Label>
                                    <div className="flex w-full overflow-hidden border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-pink-500">
                                        {/* Left: Subdomain input */}
                                        <Input
                                            id="subdomain"
                                            type="text"
                                            placeholder="e.g. abc-overseas"
                                            value={formData.subdomain || ""}
                                            onChange={(e) => handleInputChange("subdomain", e.target.value)}
                                            className="w-1/2 px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none"
                                        />

                                        {/* Right: Fixed domain suffix */}
                                        <div className="w-1/2 bg-gray-100/20 flex items-center justify-center text-gray-700 text-sm font-medium">
                                            .ieltsgoglobal.com
                                        </div>
                                    </div>
                                </div>


                                {/* gst */}
                                <div className="space-y-2">
                                    <Label htmlFor="gst" className="text-sm font-medium text-gray-700">
                                        GST Number
                                    </Label>
                                    <div className="relative">
                                        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                                        <Input
                                            id="gst"
                                            placeholder="GST Number"
                                            value={formData.gst}
                                            onChange={(e) => handleInputChange("gst", e.target.value)}
                                            className="pl-10 pr-10 border-gray-300 focus:border-pink-500 focus:ring-pink-500 rounded-lg"
                                        />

                                    </div>
                                </div>

                                {/* Pan */}
                                <div className="space-y-2">
                                    <Label htmlFor="pan" className="text-sm font-medium text-gray-700">
                                        Pan
                                    </Label>
                                    <div className="relative">
                                        <IdCardIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                                        <Input
                                            id="pan"
                                            placeholder="Pan"
                                            value={formData.pan}
                                            onChange={(e) => handleInputChange("pan", e.target.value)}
                                            className="pl-10 pr-10 border-gray-300 focus:border-pink-500 focus:ring-pink-500 rounded-lg"
                                        />
                                    </div>
                                </div>



                                {/* Terms and Conditions */}
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="terms"
                                        checked={formData.agreeToTerms}
                                        onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                                        className="border-gray-300 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                                    />
                                    <Label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                                        I accept the{" "}
                                        <a href="/terms-conditions" target="_blank" className="text-pink-600 hover:text-pink-500 underline">
                                            Terms and Conditions
                                        </a>
                                    </Label>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-pink-500 to-teal-500 hover:from-pink-600 hover:to-teal-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                                    disabled={!formData.agreeToTerms || loading}
                                >
                                    SIGN UP
                                </Button>

                                {/* Sign In Link */}
                                <p className="text-center text-sm text-gray-600">
                                    Already a member?{" "}
                                    <a href="#" className="text-pink-600 hover:text-pink-500 font-semibold underline">
                                        Sign in
                                    </a>
                                </p>

                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </div>
    )
}
