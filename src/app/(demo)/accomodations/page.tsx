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

export const metadata = pageMetadata("Student Accommodations", "Find your student home in London and beyond. Explore properties, compare available offers, and register your interest with University Living.", "/accomodations");

export default function AccommodationsPage() {
  return (
    <ContentLayout title="Accommodations">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Accommodations</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PlaceholderContent >
        <div className="container px-4 md:px-6 pt-12 relative">
          <div className="text-center max-w-3xl mx-auto mb-12" >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Student accommodation
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Find a place to call home while you study abroad. Explore student
              accommodations in London and beyond.
            </p>
          </div>
        </div>
        <div className="px-0 sm:px-4">
          <iframe
            id="student-properties"
            title="Search student accommodations"
            className="w-full h-[800px] scroll-mt-24 rounded-lg border-0 bg-white"
            srcDoc={`<!DOCTYPE html>
              <html lang="en">
                <head><meta name="viewport" content="width=device-width, initial-scale=1" /><title>Student accommodations</title></head>
                <body>
                  <div id="root-ul" data-widgetId="699840989039f2e98f978850" data-city="london" data-primaryColor="#111" data-fontColor="#333" data-iconColor="#111"></div>
                  <script src="https://d3hk5c2fo9op52.cloudfront.net/widget.js"></script>
                </body>
              </html>`}
          />
        </div>
      </PlaceholderContent>
    </ContentLayout >
  );
}
