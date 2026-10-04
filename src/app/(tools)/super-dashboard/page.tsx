import Link from "@/components/demo/link";

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

import { unstable_noStore as noStore } from "next/cache";
import { SuperDashboardOverview } from "./_components/super-dashboard-overview";

export default async function UsersPage({ searchParams }: { searchParams?: { month?: string } }) {
    noStore();

    // note: no month means current month
    const month = searchParams?.month ?? new Date().toISOString().slice(0, 7)

    return (
        <ContentLayout title="Super Dashboard">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Super Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <PlaceholderContent>
                <div className="container px-4 md:px-6 py-12 relative">
                    <SuperDashboardOverview month={month} />
                </div>
            </PlaceholderContent>
        </ContentLayout >
    );
}
