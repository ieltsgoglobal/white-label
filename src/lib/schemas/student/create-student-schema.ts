import { z } from "zod"

const xssSafeString = (max: number) =>
    z.string()
        .min(3, "Required")
        .max(max, "Too long")
        .refine((val) => !/[<>]/.test(val), {
            message: "Invalid characters detected",
        })

export const createStudentSchemaClient = z.object({
    name: xssSafeString(50),
    username: z.string()
        .min(5, "Username too short")
        .max(30, "Username too long")
        .regex(/^[a-zA-Z0-9_]+$/, "Only alphanumeric characters and underscores allowed"),
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .max(64, "Password too long"),
    teacher_id: z.string().min(1, "Teacher is required"),
    revenue: z.number().nonnegative("Revenue must be a valid non-negative number"),
})


export const createStudentSchemaServer = createStudentSchemaClient.extend({
    orgId: z.string().uuid("Invalid Organization ID")
})

export type CreateStudentInputClient = z.infer<typeof createStudentSchemaClient>
export type CreateStudentInputServer = z.infer<typeof createStudentSchemaServer>