"use client"

import PlaceholderContent from "@/components/demo/placeholder-content";
import PartnerPricingManagment from "./_components/partner-pricing-managment";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PartnerPricing() {
    const router = useRouter()
    return (
        <div className="p-8">
            <PlaceholderContent>
                <div className="container px-4 md:px-6 py-12 relative">
                    <div className="text-center max-w-3xl mx-auto mb-12" >
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.back()}
                            className="absolute left-0 top-0 p-2 hover:bg-gray-100 underline text-sm"
                        >
                            <ChevronLeft className="h-5 w-5 text-gray-600" />
                            Back
                        </Button>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            Pricing
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Flexible pricing plans for partners to grow, scale, and support more learners—powered
                            by our all-in-one assessment platform.
                        </p>
                    </div>
                    <PartnerPricingManagment />
                </div>
            </PlaceholderContent>
        </div>
    );
}
