import { Suspense } from "react";
import DotPulseLoader from "@/components/loaders/mock-tests/speaking/DotPulseLoader";
import SpeakingContent from "./_components/SpeakingContent";

export default function Page() {
    return (
        <Suspense fallback={<DotPulseLoader />}>
            <SpeakingContent />
        </Suspense>
    );
}