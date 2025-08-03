// hooks/supabse/organization-table.ts
import { useQuery } from "@tanstack/react-query";
import { getSessionUser } from "@/lib/auth/session/get-user";
import { checkCredits } from "@/lib/superbase/organization-table";

export const useCredits = () => {
    return useQuery({
        queryKey: ["credits"],
        queryFn: async () => {
            const user = await getSessionUser();
            if (!user || user.role !== "organization") throw new Error("Unauthorized");

            const result = await checkCredits(user.orgId);
            if ("error" in result) throw new Error(result.error);
            return result.credits;
        },
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });
};