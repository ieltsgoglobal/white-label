'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import MAYA from '../../_images/pointing.png'
import { TourSceneProps } from '../../OnboardingTourController'

export const SITE_TOUR_HOME_TARGET_BUTTON = "site-tour-begin-practice-btn"

export default function HomeBeginPracticeScene({
    setTarget,
}: TourSceneProps) {
    useEffect(() => {
        setTarget(SITE_TOUR_HOME_TARGET_BUTTON)
        return () => setTarget(null)
    }, [setTarget])


    return (
        <div className="
                hidden sm:block 
                absolute 
                bottom-[-30px] sm:bottom-0 
                left-[0] sm:left-40 
                pointer-events-none
            "
        >
            <div className="
                    maya-chat 
                    absolute 
                    -top-28 
                    right-20 
                    max-w-xs
                "
            >
                <div className="relative bg-white text-black px-6 py-4 rounded-2xl shadow-xl font-semibold text-base leading-snug">
                    Click here to begin your practice
                    <div
                        className="absolute -bottom-4 left-10 w-0 h-0
                        border-l-[12px] border-l-transparent
                        border-r-[12px] border-r-transparent
                        border-t-[16px] border-t-white"
                    />
                </div>
            </div>

            <Image
                src={MAYA}
                alt="Maya assistant"
                width={320}
                height={320}
                priority
            />

            <style jsx>{`
                .maya-chat {
                    animation: mayaChatIn 0.25s ease-out forwards;
                }

                @keyframes mayaChatIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    )
}