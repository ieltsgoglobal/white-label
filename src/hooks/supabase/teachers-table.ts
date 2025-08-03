import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSessionUser } from "@/lib/auth/session/get-user";
import { createTeacher, getTeachersByOrgId, Teacher } from "@/lib/superbase/teacher-table";

// get all teachers
export const useTeachers = () =>
    useQuery<Teacher[]>({
        queryKey: ["teachers"],
        queryFn: async () => {
            const user = await getSessionUser();
            if (!user || user.role !== "organization") throw new Error("Unauthorized");
            const result = await getTeachersByOrgId(user.orgId);
            if ("error" in result) throw new Error(result.error);
            return result.teachers;
        },
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });


export const useCreateTeacher = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: {
            name: string;
            username: string;
            password: string;
        }) => {
            const user = await getSessionUser();
            if (!user || user.role !== "organization") throw new Error("Unauthorized");

            return await createTeacher({
                ...payload,
                org_id: user.orgId,
            });
        },
        onSuccess: (data) => {
            if (!("error" in data)) {
                queryClient.invalidateQueries({ queryKey: ["teachers"] });
            }
        },
    });
};