"use client"

import Link from "next/link";
import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserManagement } from "./_components/users/user-managment";
import { TransactionManagment } from "./_components/transaction/transaction-managment";
import { useState } from "react";
import PricingManagment from "./_components/pricing/pricing-managment";
import TeacherManagement from "./_components/teacher/teacher-managment";
import { QueryProvider } from "@/components/providers/query-provider";

export default function UsersPage() {
    const [activeTab, setActiveTab] = useState<string>("pricing")

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
                            <Link href="#">Admin Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <PlaceholderContent>
                <div className="container px-4 md:px-6 py-12 relative">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            Admin Dashboard
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Manage users, monitor transactions, and oversee test performance — all in one
                            unified dashboard built for efficiency and control.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button onClick={() => setActiveTab("users")} size="lg" className="rounded-full h-12 px-8 text-base">
                                User Managment
                                <ArrowRight className="ml-2 size-4" />
                            </Button>

                            <Button onClick={() => setActiveTab("transactions")} size="lg" variant="outline" className="rounded-full h-12 px-8 text-base">
                                Transaction Managment
                            </Button>

                            <Button onClick={() => setActiveTab("teachers")} size="lg" variant="outline" className="rounded-full h-12 px-8 text-base">
                                Teacher Managment
                            </Button>

                            {activeTab !== "pricing" &&
                                <Button onClick={() => setActiveTab("pricing")} size="lg" variant="outline" className="rounded-full h-12 px-8 text-base">
                                    Pricing
                                </Button>
                            }
                        </div>
                    </div>

                    <QueryProvider>
                        {activeTab !== "" && <div className="border-b border-border my-5"></div>}
                        {activeTab === "users" && <UserManagement />}
                        {activeTab === "transactions" && <TransactionManagment />}
                        {activeTab === "pricing" && <PricingManagment />}
                        {activeTab === "teachers" && <TeacherManagement />}
                    </QueryProvider>

                </div>
            </PlaceholderContent>
        </ContentLayout>
    );
}
