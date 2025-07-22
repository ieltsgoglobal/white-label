"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function MicCheck({ onNext }: { onNext: () => void }) {
    const [micAllowed, setMicAllowed] = useState<"idle" | "granted" | "denied">("idle");
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const requestMicAccess = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setMicAllowed("granted");

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (e) => {
                chunksRef.current.push(e.data);
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: "audio/webm" });
                const url = URL.createObjectURL(blob);
                setAudioURL(url);
            };
        } catch (err) {
            console.error("Microphone access denied:", err);
            setMicAllowed("denied");
        }
    };

    const handleButtonClick = () => {
        if (isRecording) {
            mediaRecorderRef.current?.stop();
            setIsRecording(false);
        } else if (audioURL) {
            // Reset for a new test
            setAudioURL(null);
            setIsRecording(false);
        } else {
            // Start new recording
            chunksRef.current = [];
            mediaRecorderRef.current?.start();
            setIsRecording(true);
            setAudioURL(null);
        }
    };

    useEffect(() => {
        requestMicAccess();
        return () => {
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
                mediaRecorderRef.current.stop();
            }
        };
    }, []);

    const getButtonLabel = () => {
        if (isRecording) return "Stop Recording";
        if (audioURL) return "Test Again";
        return "Start Recording";
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center p-4 dark:bg-black/90">
            <Card className="w-full max-w-lg rounded-2xl shadow-lg">
                <CardContent className="p-6 flex flex-col items-center space-y-6">
                    <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-300">Microphone Check</h1>

                    <Image
                        src="/mock-tests/microphone-check/microphone-check.png"
                        alt="Microphone Test"
                        width={200}
                        height={200}
                        className="rounded-xl object-contain"
                    />

                    <p className="text-xl font-medium text-center text-gray-700 dark:text-gray-300">
                        Question: <br />
                        <span className="italic">“Briefly introduce yourself.”</span>
                    </p>

                    <div className="w-full flex flex-col space-y-4">
                        <Button
                            onClick={handleButtonClick}
                            className="rounded-2xl"
                            disabled={micAllowed !== "granted"}
                        >
                            {getButtonLabel()}
                        </Button>

                        {audioURL && (
                            <>
                                <audio controls src={audioURL} className="w-full" />
                                <Button onClick={onNext} className="rounded-2xl">
                                    Next
                                </Button>
                            </>
                        )}
                    </div>

                    {micAllowed === "denied" && (
                        <p className="text-sm text-red-600 mt-2 text-center">
                            Please allow microphone access and refresh the page.
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}