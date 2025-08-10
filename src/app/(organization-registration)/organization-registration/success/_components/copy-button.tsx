"use client"

import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"
import { useState } from "react"

export default function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false)

    async function onCopy() {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
        } catch {
            // ignore
        }
    }

    return (
        <Button type="button" onClick={onCopy} variant="outline" size="sm" className="shrink-0 bg-transparent">
            {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
        </Button>
    )
}
