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
              <Link href="#">Policies</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Refund</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PlaceholderContent >
        <div className="container px-4 md:px-6 py-12 relative">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Refund Policy
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Please read our refund policy carefully before making any purchase or enrollment.
            </p>

            <div className="max-w-3xl mx-auto space-y-6 text-sm text-muted-foreground text-start p-8 rounded-3xl bg-muted/10 border border-border">
              <section>
                <h2 className="font-semibold text-foreground text-lg mb-2">1. No Refunds</h2>
                <p>
                  All payments made to IELTSGoGlobal are non-refundable. Once a course, subscription, or service is purchased, no refund will be issued under any circumstances.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-foreground text-lg mb-2">2. Why No Refunds?</h2>
                <p>
                  Our services offer immediate access to premium content, test modules, and educational tools. As digital goods are delivered instantly, we are unable to offer refunds after access is granted.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-foreground text-lg mb-2">3. Support</h2>
                <p>
                  If you experience any technical issues or need help accessing your course materials, please reach out to our support team. We’re here to help and ensure your learning experience is smooth.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-foreground text-lg mb-2">4. Refund Processing Time</h2>
                <p>
                  In rare cases where a refund is approved (e.g., duplicate payment or verified access failure), the amount will be credited to your original payment method within 7–10 business days.
                </p>
              </section>


              <section>
                <h2 className="font-semibold text-foreground text-lg mb-2">5. Policy Acceptance</h2>
                <p>
                  By purchasing or enrolling in any of our services, you acknowledge that you have read and agreed to this refund policy.
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
