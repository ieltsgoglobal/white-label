import { Suspense } from "react";
import DotPulseLoader from "@/components/loaders/mock-tests/speaking/DotPulseLoader";
import WritingContent from "./_components/WritingConent";

export default function Page() {
    return (
        <Suspense fallback={<DotPulseLoader />}>
            <WritingContent />
        </Suspense>
    );
}