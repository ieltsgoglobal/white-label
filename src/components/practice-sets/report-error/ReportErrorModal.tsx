"use client";

import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { submitReportError, uploadReportScreenshot } from "./report-error-functions";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

type ReportErrorModalProps = {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    testPath: string
};

export function ReportErrorModal({ open, onOpenChange, testPath }: ReportErrorModalProps) {
    const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
    const [hasTriedCapture, setHasTriedCapture] = useState(false);
    const [message, setMessage] = useState("");
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // get user desktop ss on load
    useEffect(() => {
        if (!open) {
            setScreenshotUrl(null);
            setHasTriedCapture(false);
            return;
        }

        const page = document.documentElement;

        html2canvas(page, {
            height: page.scrollHeight,
            logging: false,
            scale: 1,
            useCORS: true,
            width: page.scrollWidth,
            windowHeight: page.scrollHeight,
            windowWidth: page.scrollWidth
        })
            .then((canvas) => setScreenshotUrl(canvas.toDataURL("image/png")))
            .catch(() => setScreenshotUrl(null))
            .finally(() => setHasTriedCapture(true));
    }, [open]);

    // upload image to freeimage.host
    useEffect(() => {
        if (!open || !screenshotUrl) return;

        void uploadReportScreenshot(screenshotUrl)
            .then(setUploadedImageUrl)
            .catch(console.error);
    }, [open, screenshotUrl]);

    const handleSubmit = async () => {
        setIsSubmitting(true);

        const result = await submitReportError({
            source: "practice-sets",
            message,
            screenshotUrl: uploadedImageUrl,
            metadata: {
                testPath,
                pageUrl: window.location.href
            }
        });

        setIsSubmitting(false);

        if ("success" in result) {
            setMessage("");
            onOpenChange?.(false);
        } else {
            console.error(result.error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {(!open || hasTriedCapture) && (
                <DialogContent className="max-w-xl gap-5 overflow-hidden p-0">
                    <div className="relative aspect-[16/9] w-full bg-muted">

                        {screenshotUrl && <img src={screenshotUrl} alt="Page screenshot" className="h-full w-full object-contain" />}

                        <div className="absolute left-4 top-4 rounded-md bg-background/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm">
                            Report error
                        </div>
                    </div>

                    <div className="space-y-5 px-6 pb-6">
                        <DialogHeader className="space-y-2">
                            <DialogTitle>Report an issue</DialogTitle>
                            <DialogDescription>
                                A page snapshot has been attached automatically.
                            </DialogDescription>
                        </DialogHeader>

                        <Textarea
                            placeholder="Describe the issue..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={4}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">
                                    Close
                                </Button>
                            </DialogClose>

                            <Button
                                disabled={isSubmitting}
                                onClick={handleSubmit}
                            >
                                {isSubmitting ? "Submitting..." : "Submit Report"}
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            )}
        </Dialog>
    );
}

export default ReportErrorModal;
