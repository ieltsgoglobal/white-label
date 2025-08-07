import { z } from "zod"

const xssSafeString = (max: number) => z
    .string()
    .min(1, "Required")
    .max(max, "Too long")
    .refine((val) => !/[<>]/.test(val), {
        message: "Invalid characters detected",
    })

export const registerPartnerSchema = z.object({
    name: xssSafeString(30),
    phone: z
        .string()
        .min(10, "Phone must be at least 10 digits")
        .max(15, "Phone can't be longer than 15 digits"),
    address: xssSafeString(200),
    email: z
        .string()
        .min(5, "Email too short")
        .max(100, "Email too long")
        .email("Invalid email address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(64, "Password too long"),

    // gst: xssSafeString.optional().default("").max(20),
    // pan: xssSafeString.optional().default("").max(10),

    subdomain: z
        .string()
        .min(3, "Subdomain too short")
        .max(25, "Subdomain too long")
        .regex(/^[a-z0-9-]+$/, {
            message: "Only lowercase letters, numbers, and hyphens allowed",
        }),

    agreeToTerms: z
        .boolean()
        .refine((val) => val === true, {
            message: "You must accept the terms and conditions",
        }),
})

export type RegisterPartnerData = z.infer<typeof registerPartnerSchema>