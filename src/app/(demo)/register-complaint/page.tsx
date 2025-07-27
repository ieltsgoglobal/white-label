import Link from "next/link";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function RegisterComplaintPage() {
    return (
        <ContentLayout title="Register a Complaint">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Register a Complaint</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <PlaceholderContent>
                <div className="container px-4 md:px-6 py-12 relative">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            Register a Complaint
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Facing an issue? We're here to resolve it.
                            Submit your complaint using the form below and we’ll get back to you as soon as possible.
                        </p>

                        <div className="max-w-xl mx-auto w-full space-y-6">
                            <form
                                className="space-y-6"
                                action="https://formsubmit.co/ieltsmanager99@gmail.com"
                                method="POST"
                            >
                                {/* Hidden fields */}
                                <input type="hidden" name="_subject" value="New Complaint from Register Complaint Page" />

                                {/* Phone */}
                                <div className="text-left">
                                    <Label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
                                        Phone Number
                                    </Label>
                                    <Input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="+91 9876543210"
                                        required
                                        className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                                    />
                                </div>

                                {/* Complaint Message */}
                                <div className="text-left">
                                    <Label htmlFor="notes" className="block text-sm font-medium text-foreground mb-1">
                                        Describe Your Complaint
                                    </Label>
                                    <Textarea
                                        id="notes"
                                        name="notes"
                                        rows={4}
                                        placeholder="Please describe the issue in detail..."
                                        required
                                        className="resize-none h-36 w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                                    />
                                </div>

                                {/* Submit Button */}
                                <Button type="submit" size="lg" className="rounded-full h-12 px-8 text-base">
                                    Submit Complaint
                                    <ArrowRight className="ml-2 size-4" />
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </PlaceholderContent>
        </ContentLayout>
    );
}