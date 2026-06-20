"use client"

import { useRouter } from "next/navigation"
import { LadderNode } from "../_lib/vocab-ladder-data-manager"
import { VocabMainSoundMaker } from "../_lib/vocab-main-sound-maker"

export function NodeIcon({ icon }: Pick<LadderNode, "icon">) {
    if (icon === "check") {
        return (
            <svg viewBox="0 0 24 24" className="size-12 fill-none stroke-current stroke-[4]">
                <path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    }

    if (icon === "book") {
        return (
            <svg viewBox="0 0 24 24" className="size-11 fill-none stroke-current stroke-[2.5]">
                <path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22V5.5Z" />
                <path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22V5.5Z" />
            </svg>
        )
    }

    return (
        <svg viewBox="0 0 24 24" className="size-12 fill-current">
            <path d="m12 2.5 2.85 5.77 6.37.93-4.61 4.49 1.09 6.34L12 17.04l-5.7 2.99 1.09-6.34L2.78 9.2l6.37-.93L12 2.5Z" />
        </svg>
    )
}

export function LevelNode({ node }: { node: LadderNode }) {
    const router = useRouter()
    const locked = node.status === "locked"
    const button = (
        <button
            type="button"
            onClick={() => {
                VocabMainSoundMaker.buttonPressed()
                router.push(`/vocab-ladder/quiz-${node.id}`)
            }}
            disabled={locked}
            aria-label={`Level ${node.id}: ${node.status}`}
            className={`
                relative grid size-24 place-items-center rounded-full border-[7px] transition-transform hover:-translate-y-1 active:translate-y-1 
                ${locked
                    ? "border-[#e2e2e2] bg-[#d4d4d4] text-[#aaa] shadow-[0_10px_0_#aaa]"
                    : "border-[#ffad15] bg-[#ff9700] text-white shadow-[0_10px_0_#d87700]"
                }`}
        >
            <span className="absolute inset-2 rounded-full bg-gradient-to-br from-white/15 to-transparent" />
            <span className="relative"><NodeIcon icon={node.icon} /></span>
        </button>
    )
    const start = (
        <div >
            <div className="absolute -top-[3.5rem] left-1/2 -translate-x-1/2">
                <div className="animate-bounce rounded-xl border-2 border-[#dedede] bg-white px-5 py-3 text-xl font-extrabold tracking-wide text-[#ff8a00] shadow-sm after:absolute after:-bottom-2 after:left-1/2 after:size-4 after:-translate-x-1/2 after:rotate-45 after:border-b-2 after:border-r-2 after:border-[#dedede] after:bg-white">
                    START
                </div>
            </div>
            {button}
        </div>
    )

    return (
        <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.left}%`, top: `${node.top}%` }}
        >
            {node.status === "active" ? start : button}
        </div>
    )
}

export function CurvedLine() {
    return (
        <>
            <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
            >
                <path
                    d="M50 5 C50 12 30 13 30 20 S60 28 60 35 S38 43 38 50 S66 58 66 65 S36 73 36 80 S62 88 62 95"
                    fill="none"
                    stroke="#eeeeee"
                    strokeWidth="2"
                    strokeDasharray="1 2"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>    <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
            >
                <path
                    d="M50 5 C50 12 30 13 30 20 S60 28 60 35 S38 43 38 50 S66 58 66 65 S36 73 36 80 S62 88 62 95"
                    fill="none"
                    stroke="#eeeeee"
                    strokeWidth="2"
                    strokeDasharray="1 2"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </>
    )
}

// =============================
// ========== ASIDE ============
// =============================

export function PremiumCard() {
    return (
        <div className="rounded-3xl border bg-white p-6 shadow-[3px_6px_0_0_rgba(0,0,0,0.15)]">
            <div className="mb-4 inline-block rounded-full bg-purple-100 px-3 py-1 text-sm font-bold text-purple-700">
                SUPER
            </div>

            <h3 className="text-2xl font-bold">
                Try Premium
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
                Unlimited vocabulary practice, no ads and detailed analytics.
            </p>

            <button
                type="button"
                onClick={() => VocabMainSoundMaker.buttonPressed()}
                className="
                    mt-5 w-full rounded-2xl bg-indigo-600 py-4 font-bold text-white
                    shadow-[0_6px_0_0_rgb(67_56_202)]
                    transition-all duration-150
                    hover:-translate-y-0.5
                    active:translate-y-1
                    active:shadow-[0_2px_0_0_rgb(67_56_202)]
                "
            >
                TRY 7 DAYS FREE
            </button>
        </div>
    )
}

export function MockTestsCard() {
    return (
        <div className="rounded-3xl border bg-white p-6 shadow-[3px_6px_0_0_rgba(0,0,0,0.15)]">
            <div className="mb-3 text-4xl">
                📝
            </div>

            <h3 className="text-xl font-bold">
                10+ IELTS Mock Tests
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
                Practice full-length IELTS exams with AI evaluation and detailed feedback.
            </p>

            <button
                type="button"
                onClick={() => VocabMainSoundMaker.buttonPressed()}
                className="mt-5 w-full rounded-2xl border-2 py-3 font-bold"
            >
                START MOCK TEST
            </button>
        </div>
    )
}

export function PracticeQuestionsCard() {
    return (
        <div className="rounded-3xl border bg-white p-6 shadow-[3px_6px_0_0_rgba(0,0,0,0.15)]">
            <div className="mb-3 text-4xl">
                📚
            </div>

            <h3 className="text-xl font-bold">
                3000+ Practice Questions
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
                Reading, Listening, Writing and Speaking questions with instant feedback.
            </p>

            <button
                type="button"
                onClick={() => VocabMainSoundMaker.buttonPressed()}
                className="mt-5 w-full rounded-2xl border-2 py-3 font-bold"
            >
                PRACTICE NOW
            </button>
        </div>
    )
}
