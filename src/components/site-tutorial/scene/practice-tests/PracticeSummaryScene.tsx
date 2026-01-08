'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import MAYA from '../../_images/explaining.png'
import { TourSceneProps } from '../../OnboardingTourController'

export default function PracticeSummaryScene({
    next,
    setTarget,
    endTourForRoute
}: TourSceneProps) {
    useEffect(() => {
        setTarget(null)
    }, [setTarget])

    return (
        <>
            {/* Maya chat bubble */}
            <div className="
                    maya-chat 
                    absolute 
                    bottom-[350px] sm:bottom-[280px] 
                    right-[40px] sm:right-[260px] 
                    max-w-xs 
                    pointer-events-auto 
                    z-12
                "
            >
                <div className="relative bg-white text-black px-6 py-4 rounded-2xl shadow-xl font-semibold text-base leading-snug">
                    <p
                        className="
                            text-sm sm:text-base
                            leading-relaxed
                            text-gray-900
                        "
                    >
                        Here you can switch between <strong>Reading</strong>, <strong>Listening</strong>,{" "}
                        <strong>Writing</strong>, and <strong>Speaking</strong> summaries to track your
                        progress.
                    </p>
                    <button
                        onClick={endTourForRoute}
                        className="maya-btn mt-4 text-sm font-bold text-blue-600 hover:underline"
                    >
                        Got it →
                    </button>

                    {/* Bubble tail */}
                    <div
                        className="
                        absolute -bottom-4 
                        right-28 sm:right-10 
                        w-0 h-0
                        border-l-[12px] border-l-transparent
                        border-r-[12px] border-r-transparent
                        border-t-[16px] border-t-white"
                    />
                </div>
            </div>

            {/* Maya */}
            <div className="maya absolute bottom-0 right-8 md:right-16 pointer-events-none z-12">
                <Image
                    src={MAYA}
                    alt="Maya assistant"
                    width={340}
                    height={340}
                    priority
                />
            </div>

            <style jsx>{`
                .maya-chat {
                    animation: bubbleEnter 0.35s ease-out forwards;
                }

                .maya-btn {
                    animation: buttonNudge 1.6s ease-in-out infinite;
                }

                .maya {
                    animation: mayaEnter 0.4s ease-out forwards;
                }

                @keyframes bubbleEnter {
                    from {
                        opacity: 0;
                        transform: translateY(12px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes buttonNudge {
                    0% {
                        transform: translateX(0);
                    }
                    50% {
                        transform: translateX(6px);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }

                @keyframes mayaEnter {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </>
    )
}