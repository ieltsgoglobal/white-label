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
import { pageMetadata } from "@/lib/utils/seo";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";

export const metadata = pageMetadata(
    "Become a UGC Creator",
    "Join IELTS Go Global as a UGC creator. Create engaging content, collaborate with our team, and help IELTS learners worldwide.",
    "/become-creator"
)

export default function UsersPage() {
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
                        <BreadcrumbPage>Become a creator</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <PlaceholderContent >
                <div className="container px-4 md:px-6 py-12 relative">
                    <div className="text-center max-w-3xl mx-auto mb-12" >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            Become a UGC creator
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Love creating content? Collaborate with IELTS Go Global,
                            showcase your creativity, and help students achieve
                            their IELTS goals.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button asChild size="lg" className="rounded-full h-12 px-8 text-base">
                                <a href="https://ugc-igg.vercel.app" target="_blank" rel="noopener noreferrer">
                                    Open Creator Portal
                                    <ArrowRight className="ml-2 size-4" />
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </PlaceholderContent>
        </ContentLayout >
    );
}
