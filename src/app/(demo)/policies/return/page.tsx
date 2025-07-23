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

export default function TagsPage() {
    return (
        <ContentLayout title="Refund Policy">
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
                        <BreadcrumbPage>Policies</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <PlaceholderContent >
                <div className="container px-4 md:px-6 py-12 relative">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            Return Policy
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            This page outlines our return policy for services purchased through IELTSGoGlobal.
                        </p>

                        <div className="max-w-3xl mx-auto space-y-6 text-sm text-muted-foreground text-start p-8 rounded-3xl bg-muted/10 border border-border">
                            <section>
                                <h2 className="font-semibold text-foreground text-lg mb-2">1. Digital Services Are Non-Returnable</h2>
                                <p>
                                    All services and subscriptions offered by IELTSGoGlobal are delivered digitally. Once access is granted, returns are not permitted under any circumstances.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-semibold text-foreground text-lg mb-2">2. No Physical Products</h2>
                                <p>
                                    As we do not sell any physical items, there is no return shipping or physical item restocking involved.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-semibold text-foreground text-lg mb-2">3. Contact for Support</h2>
                                <p>
                                    If you're facing technical difficulties or issues accessing content, please contact us at ieltsmanager99@gmail.com. We'll assist you in resolving the problem.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-semibold text-foreground text-lg mb-2">4. Policy Agreement</h2>
                                <p>
                                    By using our platform and purchasing our services, you acknowledge and agree to this return policy.
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
