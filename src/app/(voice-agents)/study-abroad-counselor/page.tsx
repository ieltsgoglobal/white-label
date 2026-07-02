import Link from "@/components/demo/link";
import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

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
                            <Link href="#">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <PlaceholderContent >
                <div className="container px-4 md:px-6 py-12 relative">
                    <div className="text-center max-w-3xl mx-auto mb-12" >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            AI Powered Study Abroad Guidance
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Get personalized university shortlists, scholarship guidance,
                            visa support, SOP assistance, and career-focused counseling
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/agent?agentType=study-abroad-counselor">
                                <Button size="lg" className="rounded-full h-12 px-8 text-base">
                                    Talk To AI Counselor
                                    <ArrowRight className="ml-2 size-4" />
                                </Button>
                            </Link>
                        </div>
                        <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Check className="size-4 text-primary" />
                                <span>University Shortlisting</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Check className="size-4 text-primary" />
                                <span>Scholarship Guidance</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Check className="size-4 text-primary" />
                                <span>SOP & Visa Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </PlaceholderContent>
        </ContentLayout>
    );
}
