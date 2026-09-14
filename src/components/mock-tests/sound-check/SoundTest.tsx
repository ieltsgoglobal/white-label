"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function SoundTest({ onNext }: { onNext: () => void }) {
    const [soundPlayed, setSoundPlayed] = useState(false);
    const [nextEnabled, setNextEnabled] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // cleanup for when component unmounts
    useEffect(() => {
        return () => { audioRef.current?.pause(); };
    }, []);

    // Function to play the sound
    const playSound = () => {
        audioRef.current?.pause();

        const audio = new Audio("/mock-tests/sound-check/sample-sound.mp3");
        audioRef.current = audio;
        setError(null);
        setSoundPlayed(false);
        setNextEnabled(false);

        audio.onplaying = () => setSoundPlayed(true);
        audio.onended = () => setNextEnabled(true);
        audio.onerror = () => setError("The sample sound could not be played. Check your connection and try again.");
        audio.play().catch(() => setError("Your browser blocked the sample sound. Check that this tab is not muted, then try again."));
    };

    return (
        <div className="w-full min-h-[95vh] flex items-center justify-center rounded-3xl p-4 dark:bg-black/90">
            <Card className="w-full max-w-lg rounded-2xl shadow-lg">
                <CardContent className="p-6 flex flex-col items-center space-y-6">
                    <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-300">Sound Test</h1>

                    <Image
                        src="/mock-tests/sound-check/sound-check.png"
                        alt="Sound test character"
                        width={240}
                        height={240}
                        className="rounded-xl object-contain w-full max-w-xs sm:max-w-sm"
                    />

                    <div className="w-full flex flex-col space-y-4">
                        <Button onClick={playSound} className="rounded-2xl" variant="secondary">
                            {soundPlayed ? "Play Sound Again" : "Play Sound"}
                        </Button>
                        {nextEnabled && <SoundConfirmation onConfirm={onNext} onRetry={playSound} />}

                        {error && (
                            <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-200">
                                {error} Also check your device volume, headphones/Bluetooth output, and browser-tab sound settings.
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// MISC CODE

// ask user that did it hear the default sound 

function SoundConfirmation({ onConfirm, onRetry }: { onConfirm: () => void; onRetry: () => void }) {
    return (
        <div className="w-full flex flex-col gap-2 text-center">
            <p className="text-sm">Did you hear the sample sound?</p>
            <div className="w-full flex gap-4">
                <Button onClick={onConfirm} className="w-full rounded-2xl">Yes, continue</Button>
                <Button variant="outline" onClick={onRetry} className="w-full rounded-2xl">No, play again</Button>
            </div>
            <SoundHelpButton />
        </div>
    );
}



// code to help user who press no after no errors :(

const SOUND_HELP: Partial<Record<OperatingSystem, { href: string; label: string }>> = {
    Windows: {
        href: "https://support.microsoft.com/en-us/windows/fix-sound-or-audio-problems-in-windows-73025246-b61c-40fb-671a-2535c7cd56c8",
        label: "Windows sound help",
    },
    macOS: {
        href: "https://support.apple.com/guide/mac-help/change-the-sound-output-settings-mchlp2256/mac",
        label: "Mac sound help",
    },
    iOS: {
        href: "https://support.apple.com/118432",
        label: "iPhone/iPad sound help",
    },
    Android: {
        href: "https://support.google.com/android/answer/9082609",
        label: "Android sound help",
    },
    Linux: {
        href: "https://help.ubuntu.com/stable/ubuntu-help/sound-nosound.html",
        label: "Linux sound help",
    },
};

function SoundHelpButton() {
    const os = getOSvalue();
    const help = SOUND_HELP[os];
    if (!help) return null;
    return (
        <Button variant="link" size="sm" asChild>
            <a href={help.href} target="_blank" rel="noreferrer">
                Can&apos;t hear it? {help.label}
            </a>
        </Button>
    );
}



// get OS values

export type OperatingSystem = "Windows" | "macOS" | "Android" | "iOS" | "Linux" | "unknown";


export function getOSvalue(): OperatingSystem {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;

    if (/iPhone|iPad|iPod/.test(userAgent)) return "iOS";

    // Newer iPads can identify themselves as Mac
    if (platform === "MacIntel" && navigator.maxTouchPoints > 1) return "iOS";

    if (/Android/i.test(userAgent)) return "Android";
    if (/Windows/i.test(userAgent)) return "Windows";
    if (/Macintosh|Mac OS X/i.test(userAgent)) return "macOS";
    if (/Linux/i.test(userAgent)) return "Linux";
    return "unknown";

}
