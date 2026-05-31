"use client";

import { useQuery } from "@tanstack/react-query";
import { getSessionUser } from "@/lib/auth/session/get-user";
import { getPracticeSetsListeningSubmissions, getPracticeSetsReadingSubmissions, getPracticeSetsSpeakingSubmissions, getPracticeSetsWritingSubmissions } from "@/lib/postgress-aws/helper-functions/practice-sets/user-submissions";

// helper function for TanStack Query
export async function getPracticeSetsSubmissions(section: string) {
    switch (section) {
        case "reading":
            return await getPracticeSetsReadingSubmissions({});
        case "listening":
            return await getPracticeSetsListeningSubmissions({});
        case "writing":
            return await getPracticeSetsWritingSubmissions({});
        case "speaking":
        default:
            return await getPracticeSetsSpeakingSubmissions({});
    }
}

export const useGetPracticeSetsUserSubmissions = (section: string) =>
    useQuery({
        queryKey: ["practice-sets-submissions", section],
        queryFn: async () => {
            const user = await getSessionUser();
            if (!user) throw new Error("Unauthorized: No session user");

            return await getPracticeSetsSubmissions(section);
        },
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });