"use client"

import { Button } from "@/components/ui/button"
import ExpidiaButton from "@/components/practice-sets/main-dashboard/ExpidiaButton"
import { useRouter } from "next/navigation"
import PracticeSetsDashboardOverview from "./dashboard-overview"
import { useState } from "react"

export default function PracticeSetsPage() {
    const router = useRouter()
    const [activeSection, setActiveSection] = useState<"reading" | "listening" | "writing" | "speaking">("reading")

    return (
        <>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => { setActiveSection("reading") }} size="lg" variant={activeSection !== "reading" ? "outline" : "default"} className="rounded-full h-12 px-8 text-base">
                    Reading Section
                </Button>

                <Button onClick={() => { setActiveSection("listening") }} size="lg" variant={activeSection !== "listening" ? "outline" : "default"} className="rounded-full h-12 px-8 text-base">
                    Listening Section
                </Button>

                <Button onClick={() => { setActiveSection("writing") }} size="lg" variant={activeSection !== "writing" ? "outline" : "default"} className="rounded-full h-12 px-8 text-base">
                    Writing Section
                </Button>

                <Button onClick={() => { setActiveSection("speaking") }} size="lg" variant={activeSection !== "speaking" ? "outline" : "default"} className="rounded-full h-12 px-8 text-base">
                    Speaking Section
                </Button>
            </div >


            <div className="flex items-center justify-center mt-8">
                <ExpidiaButton
                    title={`Start ${activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Practice`}
                    onClick={() => { router.push(`/practice-sets/${activeSection}`) }}
                />
            </div>


            <PracticeSetsDashboardOverview section={activeSection} />
        </>
    )
}
