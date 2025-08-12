import Link from "next/link";
import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserPricingManagment from "../_components/user-pricing-managment";

export default function UsersPage() {
    return (
        <ContentLayout title="IELTS GO GLOBAL">
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
                            <Link href="#">Pricing</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <PlaceholderContent >
                <div className="container px-4 md:px-6 py-12 relative">
                    <div className="text-center max-w-3xl mx-auto mb-12" >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            Pricing
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Choose a plan, unlock full access, and start improving today.
                        </p>
                    </div>

                    <UserPricingManagment />
                </div>
            </PlaceholderContent>
        </ContentLayout>
    );
}
