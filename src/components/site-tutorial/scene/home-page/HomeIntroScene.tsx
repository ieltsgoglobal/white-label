'use client'

import Image from 'next/image'
import MAYA from '../../_images/greeting.png'
import { TourSceneProps } from '../../OnboardingTourController'
import { useEffect } from 'react'

export default function HomeIntroScene({ next, setTarget }: TourSceneProps) {
    useEffect(() => {
        setTarget(null)
    }, [setTarget])

    return (
        <>
            <div className="
                    intro-bubble 
                    absolute 
                    bottom-[350px] sm:bottom-[280px] 
                    right-[40px] sm:right-[260px] 
                    max-w-xs 
                    pointer-events-auto
                "
            >
                <div className="relative bg-white text-black px-5 py-4 sm:px-6 sm:py-4 rounded-2xl shadow-xl font-semibold text-base sm:text-lg leading-snug">
                    <p className="font-semibold text-base sm:text-lg leading-snug">
                        Hey! I’m <span className="text-blue-600">Maya</span> 👋
                        <br />
                        I’ll help you with your IELTS preparation step by step.
                    </p>

                    <button
                        onClick={next}
                        className="intro-btn mt-4 text-sm font-bold text-blue-600 underline sm:no-underline hover:underline"
                    >
                        Click to continue →
                    </button>
                    <div className="
                        absolute -bottom-4 
                        right-20 sm:right-10
                        w-0 h-0
                        border-l-[12px] border-l-transparent
                        border-r-[12px] border-r-transparent
                        border-t-[16px] border-t-white"
                    />
                </div>
            </div>

            <div className="
                    intro-maya 
                    absolute 
                    bottom-0 
                    right-[-4rem] sm:right-8 md:right-16 
                    pointer-events-none
                "
            >
                <Image src={MAYA} alt="Maya assistant" width={360} height={360} priority />
            </div>

            <style jsx>{`
                .intro-bubble {
                    animation: bubbleEnter 0.35s ease-out forwards;
                }

                .intro-btn {
                    animation: buttonNudge 1.6s ease-in-out infinite;
                }

                .intro-maya {
                    animation: mayaEnter 0.4s ease-out forwards;
                }

                @keyframes overlayFadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
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