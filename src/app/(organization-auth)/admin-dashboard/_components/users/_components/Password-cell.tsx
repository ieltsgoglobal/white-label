'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Lock, Unlock } from "lucide-react"

export default function PasswordCell({ pass }: { pass: string }) {
    const [hidden, setHidden] = useState(true)

    const toggleHidden = () => setHidden(!hidden)

    return (
        <div className="flex items-center gap-2" >
            <span className="font-mono" >
                {hidden ? "•".repeat(pass.length) : pass}
            </span>
            < Button
                variant="ghost"
                size="icon"
                onClick={toggleHidden}
                className="w-6 h-6"
            >
                {hidden ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
            </Button>
        </div>
    )
}