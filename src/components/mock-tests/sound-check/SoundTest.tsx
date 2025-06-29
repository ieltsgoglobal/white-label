"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function SoundTest({ onNext }: { onNext: () => void }) {
    const [soundPlayed, setSoundPlayed] = useState(false);
    const [nextEnabled, setNextEnabled] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Function to play the sound
    const playSound = () => {
        // Stop previous audio if it exists
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        const newAudio = new Audio("/mock-tests/sound-check/sample-sound.mp3");
        audioRef.current = newAudio;
        newAudio.play();
        setSoundPlayed(true);
    };

    // Effect to enable the "Next" button after sound is played
    useEffect(() => {
        if (soundPlayed) {
            const timer = setTimeout(() => setNextEnabled(true), 4700);
            return () => clearTimeout(timer);
        }
    }, [soundPlayed]);

    return (
        <div className="w-full min-h-[95vh] flex items-center justify-center rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100 p-4">
            <Card className="w-full max-w-lg rounded-2xl shadow-lg">
                <CardContent className="p-6 flex flex-col items-center space-y-6">
                    <h1 className="text-3xl font-bold text-center text-gray-800">Sound Test</h1>

                    <Image
                        src="/mock-tests/sound-check/sound-check.png"
                        alt="Sound test character"
                        width={240}
                        height={240}
                        className="rounded-xl object-contain w-full max-w-xs sm:max-w-sm"
                    />

                    <div className="w-full flex flex-col space-y-4">
                        <Button onClick={playSound} className="rounded-2xl">
                            Play Sound
                        </Button>
                        <Button onClick={onNext} disabled={!nextEnabled} className="rounded-2xl">
                            Next
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}