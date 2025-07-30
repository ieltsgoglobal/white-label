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

export default function NewPostPage() {
  return (
    <ContentLayout title="Privacy Policy">
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
            <BreadcrumbPage>Privacy Policy</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PlaceholderContent >
        <div className="container px-4 md:px-6 py-12 relative">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how IELTSGoGlobal collects, uses, and protects your personal information.
            </p>

            <div className="max-w-3xl mx-auto space-y-6 text-sm text-muted-foreground text-start p-8 rounded-3xl bg-muted/10 border border-border">
              <section>
                <h2 className="font-semibold text-foreground text-lg mb-2">1. Information We Collect</h2>
                <p>
                  We collect personal information you provide during registration, including your name, email, phone number, and any other details necessary to provide our services.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-foreground text-lg mb-2">2. How We Use Your Information</h2>
                <p>
                  We use your information to deliver services, communicate with you, improve our platform, and comply with legal requirements. We never sell your data to third parties.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-foreground text-lg mb-2">3. Cookies & Tracking</h2>
                <p>
                  We may use cookies and similar tracking tools to enhance your experience and analyze site usage. You can adjust your browser settings to refuse cookies if preferred.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-foreground text-lg mb-2">4. Data Security</h2>
                <p>
                  We implement standard security measures to protect your personal information. However, no online system can be guaranteed 100% secure.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-foreground text-lg mb-2">5. Third-Party Services</h2>
                <p>
                  Some of our services may use third-party platforms (e.g., payment gateways). Their privacy policies will apply in such cases.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-foreground text-lg mb-2">6. Your Rights</h2>
                <p>
                  You have the right to access, update, or request deletion of your personal data. For such requests, please contact us at support@ieltsgoglobal.com.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-foreground text-lg mb-2">7. Updates to This Policy</h2>
                <p>
                  This policy may be updated occasionally. Changes will be reflected on this page with the “Last Updated” date at the bottom.
                </p>
              </section>

              <p className="text-xs text-muted-foreground pt-4">
                Last updated: July 23, 2025
              </p>
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
