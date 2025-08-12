// server functions

import { requireRole } from "./check-auth"
import { redirect } from "next/navigation";

// explicitly for "user" types only
export async function userActiveAccess() {
    const session = await requireRole("user")

    if (!session) return

    if (session.is_member === false) redirect("/user-pricing")

    return;
}