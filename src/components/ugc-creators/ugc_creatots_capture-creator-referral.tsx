"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ugc_creatots_server_actions_etCreatorReferralFromUrl } from "./ugc-creatots-server-actions"

export function Ugc_creatots_CaptureCreatorReferral() {
    const searchParams = useSearchParams()
    const referral = searchParams.get("ref") ?? undefined

    useEffect(() => {
        void ugc_creatots_server_actions_etCreatorReferralFromUrl(referral)
    }, [referral])

    return null
}
