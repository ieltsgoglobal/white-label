"use client"

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Celebrate from "./_components/celebrate"
import CopyButton from "./_components/copy-button"
import Steps from "./_components/steps"

type SuccessData = {
    org: string | null;
    subdomain: string | null;
    email: string | null;
    createdAt: string | null;
};

export default function SuccessPage() {
    const [data, setData] = useState<SuccessData>({ org: null, subdomain: null, email: null, createdAt: null });

    // get data from url params
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setData({ org: params.get("org"), subdomain: params.get("subdomain"), email: params.get("email"), createdAt: params.get("createdAt") });
    }, []);

    const subdomain = (data.subdomain ?? "").toLowerCase().replace(/[^a-z0-9-]/g, "")
    const miniSiteUrl = `https://${subdomain}.ieltsgoglobal.com`

    return (
        <main className="relative min-h-[100dvh] overflow-hidden">
            {/* Decorative background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_10%_10%,rgba(16,185,129,0.15),transparent),radial-gradient(50%_35%_at_90%_20%,rgba(147,51,234,0.12),transparent),radial-gradient(60%_50%_at_50%_100%,rgba(20,184,166,0.14),transparent)]"
            />
            <div className="container mx-auto max-w-6xl px-4 py-10 md:py-16">
                <div className="mx-auto max-w-3xl text-center">
                    <Celebrate />
                    <Badge className="mb-3 inline-flex bg-emerald-600/90 text-white hover:bg-emerald-600">Success</Badge>
                    <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">Your mini-website is on the way!</h1>
                    <p className="mt-3 text-muted-foreground md:text-lg">
                        Thank you for registering. Our engineers have started creating your mini website. We’ll notify you within
                        one day.
                    </p>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
                    {/* Left: Steps and status */}
                    <Steps
                        createdAt={data.createdAt}
                        subdomain={subdomain}
                        email={data.email ?? ""}
                    />

                    {/* Right: Mini site details */}
                    <Card className="order-1 md:order-2">
                        <CardHeader className="space-y-1">
                            <CardTitle>Your mini site</CardTitle>
                            <CardDescription>Students will take mock tests and access resources here</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="rounded-lg border p-3">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="truncate font-medium">{miniSiteUrl}</p>
                                        <p className="truncate text-sm text-muted-foreground">{data.org}</p>
                                    </div>
                                    <CopyButton text={miniSiteUrl} />
                                </div>
                            </div>

                            <div className={cn("flex flex-wrap items-center gap-2")}>
                                <Badge variant="secondary" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                                    Subdomain
                                </Badge>
                                <span className="text-sm text-muted-foreground">{subdomain}.ieltsgoglobal.com</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="mx-auto mt-10 max-w-3xl text-center text-sm text-muted-foreground">
                    Need changes or made a mistake? Reply to the confirmation email and we’ll adjust the details for you.
                </div>
            </div>


        </main>
    )
}


