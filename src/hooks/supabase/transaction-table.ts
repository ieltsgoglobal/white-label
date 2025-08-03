// hooks/supabase/Transaction-table.ts
import { useQuery } from "@tanstack/react-query";
import { getSessionUser } from "@/lib/auth/session/get-user";
import { getAllTransactionsByOrgId } from "@/lib/superbase/transaction-table";
import { Transaction } from "@/app/(organization-auth)/admin-dashboard/_components/transaction/transaction-managment"; // or move to shared types

export const useTransactions = () =>
    useQuery<Transaction[]>({
        queryKey: ["transactions"],
        queryFn: async () => {
            const user = await getSessionUser();
            if (!user || user.role !== "organization") throw new Error("Unauthorized");
            const result = await getAllTransactionsByOrgId(user.orgId);
            if ("error" in result) throw new Error(result.error);
            return result.transactions;
        },
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });