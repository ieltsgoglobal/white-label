"use server"

import { cookies } from "next/headers"

const REFERRAL_COOKIE = "creator_referral_ugc_ieltsgoglobal"

export async function ugc_creatots_server_actions_etCreatorReferralFromUrl(referral: string | string[] | undefined) {
    if (Array.isArray(referral)) referral = referral[0]
    if (!referral || !/^[A-Za-z0-9_-]{1,128}$/.test(referral)) return

    cookies().set(REFERRAL_COOKIE, referral, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
    })
}

export async function ugc_creatots_server_actions_getCreatorReferral() {
    return cookies().get(REFERRAL_COOKIE)?.value ?? null
}
