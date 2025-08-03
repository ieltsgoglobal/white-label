"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export function QueryProvider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: Infinity,              // never auto-stale
                        refetchOnMount: false,            // do not refetch on mount
                        refetchOnWindowFocus: false,      // do not refetch on tab focus
                        refetchOnReconnect: false,        // do not refetch on network reconnect
                        retry: 1,                          // optional: retry once on error
                    },
                },
            })
    );

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}