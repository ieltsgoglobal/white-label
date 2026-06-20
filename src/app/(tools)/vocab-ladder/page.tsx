"use client"

import { useEffect, useState } from "react"
import { CurvedLine, MockTestsCard, PracticeQuestionsCard, LevelNode, PremiumCard } from "./_components/vocab-helper-components"
import { getVocabLadderDataLocalStorage, LadderNode } from "./_lib/vocab-ladder-data-manager"
import { ContentLayout } from "@/components/admin-panel/content-layout";


export default function VocabLadderPage() {
    const [nodes,] = useState<LadderNode[]>(() => getVocabLadderDataLocalStorage())

    // on load go to bottom of screen
    useEffect(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
    }, [])

    return (
        <ContentLayout title="IELTS GO GLOBAL">
            <main className="min-h-screen px-6 py-6">
                <div className="mx-auto flex max-w-5xl gap-8">
                    <LadderSection nodes={nodes} />
                    <Sidebar />
                </div>
            </main>
        </ContentLayout>
    )
}

function LadderSection({ nodes }: { nodes: LadderNode[] }) {
    return (
        <section className="flex-1 mx-auto max-w-md overflow-hidden rounded-[2rem] bg-white shadow-sm">
            <div className="relative mx-auto h-[1100px] w-full max-w-sm">
                <CurvedLine />
                {nodes.map((node) => <LevelNode key={node.id} node={node} />)}
            </div>

            <LadderHeader />
        </section>
    )
}


// MISC UI

function Sidebar() {
    return (
        <aside className="hidden w-80 lg:block">
            <div className="sticky top-6 space-y-5">
                <PremiumCard />
                <MockTestsCard />
                <PracticeQuestionsCard />
            </div>
        </aside>
    )
}

function LadderHeader() {
    return (
        <header className="sticky top-0 z-50 m-5 rounded-3xl border-b-[7px] border-[#d97800] bg-[#ff9700] px-7 py-6 text-white">
            <p className="text-sm font-bold uppercase tracking-wider">
                Vocabulary journey
            </p>

            <h1 className="mt-1 text-2xl font-extrabold">
                Complete your daily ladder
            </h1>
        </header>
    )
}