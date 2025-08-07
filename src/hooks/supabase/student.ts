import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createStudent, getStudentsByOrg } from "@/lib/superbase/student-table";
import { getSessionUser } from "@/lib/auth/session/get-user";
import { Student } from "@/app/(organization-auth)/admin-dashboard/_components/users/user-managment";

export const useStudents = () => {
    return useQuery<Student[]>({
        queryKey: ["students"],
        queryFn: async () => {
            const user = await getSessionUser();
            if (!user || user.role !== "organization") throw new Error("Unauthorized");
            const { data, error } = await getStudentsByOrg(user.orgId);
            if (error) throw new Error(error.message);
            return data || [];
        },
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });
};


export const useCreateStudent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: {
            name: string;
            username: string;
            password: string;
            revenue: number;
            teacher_id: string;
        }) => {
            const user = await getSessionUser();
            if (!user || user.role !== "organization") throw new Error("Unauthorized");

            return await createStudent({ ...payload, orgId: user.orgId });
        },
        onSuccess: (data) => {
            if (!("error" in data)) {
                queryClient.invalidateQueries({ queryKey: ["students"] });
                queryClient.invalidateQueries({ queryKey: ["credits"] });
            }
        },
    });
};