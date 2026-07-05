import Link from "@/components/demo/link";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { getSuperAdminDashboardData } from "./_lib/super-admin-server-functions";
import { SuperAdminDashboardClient } from "./_components/super-admin-dashboard.client";
import { unstable_noStore as noStore } from "next/cache";

export default async function UsersPage({ searchParams }: { searchParams?: { offset?: string; hasPhoneNumber?: boolean; isMember?: boolean; } }) {

    // note: used so fresh data if fetched on-load
    noStore();

    const offset = Number(searchParams?.offset ?? 0) || 0;
    const data = await getSuperAdminDashboardData(offset, searchParams?.hasPhoneNumber, searchParams?.isMember);

    return (
        <ContentLayout title="Users">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Super Admin Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <PlaceholderContent >
                <div className="container px-4 md:px-6 py-12 relative">
                    <div className="text-center max-w-3xl mx-auto mb-12" >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            Super Admin
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Welcome to the central administration dashboard. Monitor platform activity, manage users and
                            organizations, oversee system operations.
                        </p>
                    </div>
                </div>

                <SuperAdminDashboardClient {...data} />
            </PlaceholderContent>
        </ContentLayout >
    );
}
