// schemas/teacher/create-teacher-schema.ts

import { z } from "zod"

const xssSafeString = (max: number) =>
    z.string()
        .min(1, "Name Required")
        .max(max, "Too long")
        .refine((val) => !/[<>]/.test(val), {
            message: "Invalid characters detected",
        })

export const createTeacherSchemaClient = z.object({
    name: xssSafeString(50),
    username: z.string()
        .min(5, "Username too short")
        .max(30, "Username too long")
        .regex(/^[a-zA-Z0-9_]+$/, "Only alphanumeric characters and underscores allowed"),
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .max(64, "Password too long"),
})

export const createTeacherSchemaServer = createTeacherSchemaClient.extend({
    orgId: z.string().uuid("Invalid organization ID"),
})

export type CreateTeacherInputClient = z.infer<typeof createTeacherSchemaClient>
export type CreateTeacherInputServer = z.infer<typeof createTeacherSchemaServer>