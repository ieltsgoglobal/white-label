// app/(student-auth)/practice-sets/listening/page.tsx
import { Suspense } from "react";
import ListeningContent from "./_components/ListeningContent";
import DotPulseLoader from "@/components/loaders/mock-tests/speaking/DotPulseLoader";

export default function Page() {
    return (
        <Suspense fallback={<DotPulseLoader />}>
            <ListeningContent />
        </Suspense>
    );
}