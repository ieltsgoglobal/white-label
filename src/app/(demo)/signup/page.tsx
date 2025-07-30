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

export default function AccountPage() {
    return (
        <ContentLayout title="Account">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Term & Conditions</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <PlaceholderContent >
                <div className="container px-4 md:px-6 py-12 relative">
                    <div className="text-center max-w-3xl mx-auto mb-12" >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            Sign Up
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Welcome to IELTSGoGlobal — your trusted partner in IELTS mock test preparation.
                        </p>

                        <div className="max-w-3xl mx-auto space-y-6 text-sm text-muted-foreground text-start p-8 rounded-3xl bg-muted/10 border border-border">
                            <section>
                                <h2 className="font-semibold text-foreground text-lg mb-2">1. How Student Access Works</h2>
                                <p>
                                    IELTSGoGlobal does not support direct student sign-ups. All student accounts must be created by verified consultants to ensure guided preparation and accountability.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-semibold text-foreground text-lg mb-2">2. Need Access? Talk to Your Consultant</h2>
                                <p>
                                    If you're a student looking to use our platform, please reach out to your IELTS consultant. They will handle the registration process and provide you with login credentials.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-semibold text-foreground text-lg mb-2">3. Consultants: Partner with Us</h2>
                                <p>
                                    Are you a certified IELTS consultant? We'd love to collaborate. Reach out to{" "} <span>ieltsmanager99@gmail.com</span> to onboard your students and access exclusive tools and analytics.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-semibold text-foreground text-lg mb-2">4. Thank You for Supporting Quality Learning</h2>
                                <p>
                                    We're committed to empowering both students and consultants in their IELTS journey. Your cooperation helps maintain high standards across the platform.
                                </p>
                            </section>
                        </div>

                        <div className="text-center mt-10">
                            <Link href="/">
                                <Button size="lg" className="rounded-full h-12 px-8 text-base">
                                    Go Back to Home
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </PlaceholderContent>
        </ContentLayout>
    );
}
