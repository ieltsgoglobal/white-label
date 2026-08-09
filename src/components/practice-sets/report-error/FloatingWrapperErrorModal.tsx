"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReportErrorModal from "./ReportErrorModal";

type FloatingWrapperErrorModalProps = {
    testPath: string;
    source?: string;
};

export default function FloatingWrapperErrorModal({
    testPath,
    source,
}: FloatingWrapperErrorModalProps) {
    const [reportErrorOpen, setReportErrorOpen] = useState(false);

    return (
        <>
            <Button
                aria-label="Report an issue"
                className="fixed right-0 top-1/2 z-40 h-10 w-9 -translate-y-1/2 rounded-l-md rounded-r-none border-r-0 border-border bg-background/70 p-0 text-muted-foreground opacity-55 shadow-none backdrop-blur-sm transition-opacity hover:bg-background hover:text-foreground hover:opacity-100 focus-visible:opacity-100 dark:bg-background/60 dark:hover:bg-background"
                onClick={() => setReportErrorOpen(true)}
                title="Report an issue"
                variant="outline"
            >
                <AlertTriangle className="h-4 w-4" />
                <span className="sr-only">Report an issue</span>
            </Button>

            <ReportErrorModal
                open={reportErrorOpen}
                onOpenChange={setReportErrorOpen}
                source={source}
                testPath={testPath}
            />
        </>
    );
}
