import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import PlaceholderContent from "@/components/demo/placeholder-content";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
    return (
        <ContentLayout title="Forgot Password">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Forgot Password</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <PlaceholderContent>
                <div className="container px-4 md:px-6 py-12 relative">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            Forgot Your Password?
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            No worries — we’ll help you recover your account. Please follow the steps below based on your role.
                        </p>

                        <div className="max-w-3xl mx-auto space-y-6 text-sm text-muted-foreground text-start p-8 rounded-3xl bg-muted/10 border border-border">
                            <section>
                                <h2 className="font-semibold text-foreground text-lg mb-2">1. For Students</h2>
                                <p>
                                    If you're a student and have forgotten your password, please contact your assigned consultant. They will assist you in resetting your login credentials.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-semibold text-foreground text-lg mb-2">2. For Consultants</h2>
                                <p>
                                    If you're a consultant and cannot access your account, please send a password reset request to{" "} <span>ieltsmanager99@gmail.com</span>. Make sure to include your registered email and organization details for verification.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-semibold text-foreground text-lg mb-2">3. Why "Reset Password" Doesn't Work</h2>
                                <p>
                                    Currently, our platform does not support automated password reset via email. All password resets are handled manually to ensure account security and prevent unauthorized access.
                                </p>
                            </section>
                        </div>

                        <div className="text-center mt-10">
                            <Link href="/">
                                <Button size="lg" className="rounded-full h-12 px-8 text-base">
                                    Back to Home
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </PlaceholderContent>
        </ContentLayout>
    );
}