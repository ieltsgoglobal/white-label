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
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
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
              Terms & Conditions
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Please read these terms carefully before proceeding with your PhonePe Business Account registration.
            </p>

            <div className="max-w-3xl mx-auto space-y-6 text-sm text-muted-foreground text-start p-8 rounded-3xl bg-muted/10 border border-border">
              <section>
                <h2 className="font-semibold text-foreground text-lg mb-2">1. Account Information</h2>
                <p>
                  You agree to provide accurate, current, and complete business details when registering or interacting with IELTSGoGlobal.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-foreground text-lg mb-2">2. Verification</h2>
                <p>
                  We may request documentation such as ID proof, educational records, or payment confirmations to validate your account or service eligibility.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-foreground text-lg mb-2">3. Usage</h2>
                <p>
                  You agree to use our platform only for lawful educational purposes. Misuse of test materials or platform content may lead to account suspension.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-foreground text-lg mb-2">4. Fees</h2>
                <p>
                  Any service fees or charges will be clearly communicated. We reserve the right to update our pricing with prior notice.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-foreground text-lg mb-2">5. Termination</h2>
                <p>
                  IELTSGoGlobal reserves the right to restrict or terminate access to any user violating our terms or engaging in fraudulent behavior.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-foreground text-lg mb-2">6. Ownership</h2>
                <p>
                  This website is proudly operated and maintained by Arnav Jain, committed to delivering quality educational services.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-foreground text-lg mb-2">7. Changes to Terms</h2>
                <p>
                  These Terms & Conditions may be updated from time to time. Continued use of our services indicates your acceptance of any changes.
                </p>
              </section>
            </div>

            <div className="text-center mt-10">
              <Link href="/">
                <Button size="lg" className="rounded-full h-12 px-8 text-base">
                  I Agree & Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </PlaceholderContent>
    </ContentLayout>
  );
}
