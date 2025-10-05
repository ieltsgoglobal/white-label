import { Suspense } from "react";
import DotPulseLoader from "@/components/loaders/mock-tests/speaking/DotPulseLoader";
import ReadingContent from "./_components/ReadingContent";

export default function Page() {
    return (
        <Suspense fallback={<DotPulseLoader />}>
            <ReadingContent />
        </Suspense>
    );
}