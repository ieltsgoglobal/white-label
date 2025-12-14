import Link from "next/link";
import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ChoiceCard } from "./_components/ChoiceCard";

export default function UsersPage() {
    const choiceCards = [
        {
            title: "Mock Tests",
            subtitle: "10 full-length IELTS mock tests with timed, scored & detailed evaluation",
            badge: "Paid",
            meta: "10 Mock Tests",
            cta: "Go To Mock Tests",
            href: "/practice",
        },
        {
            title: "Practice Sets",
            subtitle: "4000+ practice questions across Listening, Reading, Writing & Speaking",
            badge: "Free",
            meta: "4000+ Questions",
            cta: "Start Free Practice",
            href: "/practice-sets",
        },
    ];

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
                            Empowered your IELTS Prep by AI
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Take a full IELTS mock test to simulate the real exam, or practice individual
                            sections at your own pace.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        {choiceCards.map((card) => (
                            <ChoiceCard
                                key={card.title}
                                title={card.title}
                                subtitle={card.subtitle}
                                badge={card.badge as "Paid" | "Free"}
                                meta={card.meta}
                                cta={card.cta}
                                href={card.href}
                            />
                        ))}
                    </div>
                </div>
            </PlaceholderContent>
        </ContentLayout>
    );
}
