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
import { ArrowRight, Check } from "lucide-react";

export default function CategoriesPage() {
  return (
    <ContentLayout title="Categories">
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
            <BreadcrumbPage>Practice Mocks</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PlaceholderContent >
        <div className="container px-4 md:px-6 py-12 relative">
          <div className="text-center max-w-3xl mx-auto mb-12" >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Explore Our Mock Tests
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Practice smarter with a variety of AI-powered IELTS mock tests.
              Choose your module, test your skills, and track your progress with confidence.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto mb-12">
            {Array.from({ length: 10 }).map((_, i) => (
              <PracticeCard key={i} val={i + 2} />
            ))}
          </div>
        </div>
      </PlaceholderContent>
    </ContentLayout>
  );
}





function PracticeCard({ val }: { val: number }) {
  return (
    <div className="rounded-3xl border border-border bg-muted/20 p-6 shadow-sm transition hover:shadow-md flex flex-col justify-center min-h-[16rem]">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-2">
          IELTS Mock Test {val}
        </h2>
        <p className="text-sm text-muted-foreground">
          Practice test for Academic and General Training modules.
        </p>
      </div>
      <div className="mt-4">
        <Link href={`/mock-tests/${val}`}>
          <button className="h-10 px-4 inline-flex items-center justify-center rounded-full text-sm font-medium transition bg-gradient-to-r from-foreground to-foreground/70 text-background hover:brightness-110">
            Start Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </Link>
      </div>
    </div>
  );
}