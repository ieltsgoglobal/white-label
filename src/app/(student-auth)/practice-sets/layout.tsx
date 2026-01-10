"use client"

import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { setReviewMode } from "@/lib/mock-tests/indexedDb";
import { useEffect } from "react";

export default function DemoLayout({ children }: { children: React.ReactNode }) {

    // turn OFF isReviewMode on load
    // hack to production-only race condition between AnswerInput and isReviewMode
    useEffect(() => {
        setReviewMode(false)
    }, [])

    return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
