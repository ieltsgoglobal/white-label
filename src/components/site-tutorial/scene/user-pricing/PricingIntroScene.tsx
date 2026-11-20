'use client'

import Image from 'next/image'
import MAYA from '../../_images/explaining.png'
import type { TourSceneProps } from '../../OnboardingTourController'

export default function PricingIntroScene({ endTourForRoute }: TourSceneProps) {
    return (
        <div className="absolute inset-x-4 bottom-0 flex max-h-full flex-col items-end sm:left-auto sm:right-16">
            <div className="pointer-events-auto relative z-10 max-w-xs shrink-0 rounded-2xl bg-white px-6 py-4 text-gray-900 shadow-xl sm:mr-32">
                <p className="text-sm font-semibold leading-relaxed sm:text-base">
                    Pick an access plan based on how long you want to prepare. Each plan unlocks full access to IELTS practice tests and evaluations.
                </p>
                <button
                    type="button"
                    onClick={endTourForRoute}
                    className="mt-4 text-sm font-bold text-blue-600 hover:underline"
                >
                    Got it →
                </button>
                <div aria-hidden="true" className="absolute -bottom-3 right-10 h-0 w-0 border-x-[10px] border-t-[12px] border-x-transparent border-t-white" />
            </div>
            <Image
                src={MAYA}
                alt="Maya assistant"
                className="h-auto max-h-[45dvh] w-auto object-contain object-right-bottom"
                width={340}
                height={340}
            />
        </div>
    )
}
