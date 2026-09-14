"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { getOSvalue, type OperatingSystem } from "../sound-check/SoundTest";

export default function MicCheck({ onNext }: { onNext: () => void }) {
    const [micAllowed, setMicAllowed] = useState<"idle" | "granted" | "denied">("idle");
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const [micError, setMicError] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    // cleans up the temporary recording-preview URL from runtime cache
    useEffect(() => () => releaseAudioUrl(audioURL), [audioURL]);

    const requestMicAccess = async () => {
        setMicError(null);
        setMicAllowed("idle");

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            releaseMicResources(mediaRecorderRef.current?.stream);
            setMicAllowed("granted");

            // note: diffrent mimeType for diffrent browsers
            const mimeType = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : MediaRecorder.isTypeSupported("audio/mp4") ? "audio/mp4" : "";

            const mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            // handle unexpected errors
            mediaRecorder.onerror = () => {
                setIsRecording(false);
                setMicError("Recording stopped unexpectedly. Close other apps using the microphone and try again.");
            };

            mediaRecorder.onstop = () => {
                // if no bytes recorded warn user
                if (!chunksRef.current.length) {
                    setMicError("No audio was recorded. Check that your microphone is not muted and try again.");
                    return;
                }

                const blob = new Blob(chunksRef.current, { type: mimeType || "audio/webm" });
                const url = URL.createObjectURL(blob);
                setAudioURL(url);
            };
        } catch (err) {
            console.error("Microphone access denied:", err);
            setMicAllowed("denied");
            setMicError(getMicErrorMessage(err));
        }
    };

    const handleButtonClick = () => {
        if (isRecording) {
            mediaRecorderRef.current?.stop();
            setIsRecording(false);
        } else if (audioURL) {
            // Reset for a new test
            releaseMicResources(mediaRecorderRef.current?.stream);
            setAudioURL(null);
            requestMicAccess();
        } else {
            // Start new recording
            chunksRef.current = [];
            mediaRecorderRef.current?.start();
            setIsRecording(true);
            setAudioURL(null);
        }
    };

    // request for mic on browser
    useEffect(() => {
        requestMicAccess();
        return () => {
            stopRecorder(mediaRecorderRef.current);
            releaseMicResources(mediaRecorderRef.current?.stream);
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
                        className={`rounded-xl object-contain transition-all duration-300 ${isRecording ? "boom-glow" : ""}`}
                    />


                    {isRecording ? (
                        <p className="text-xl font-medium text-center animate-pulse text-gray-700 dark:text-gray-300">
                            Recording...
                        </p>
                    ) : (
                        <p className="text-xl font-medium text-center text-gray-700 dark:text-gray-300">
                            <span className="italic">"Say something to test your microphone.”</span>
                        </p>

                    )}

                    <div className="w-full flex flex-col space-y-4">
                        <Button
                            onClick={handleButtonClick}
                            className="rounded-2xl"
                            disabled={micAllowed !== "granted"}
                            variant={"secondary"}
                        >
                            {getButtonLabel()}
                        </Button>

                        {audioURL && (
                            <>
                                <audio controls src={audioURL} className="w-full" />
                                <RecordingConfirmation onConfirm={onNext} onRetry={handleButtonClick} />
                            </>
                        )}
                    </div>

                    {micAllowed === "denied" && (
                        <div className="flex flex-col w-full text-center">
                            <p className="text-sm text-red-600 mt-2">
                                {micError || "Please allow microphone access and refresh the page."}
                            </p>

                            {micError?.startsWith("Microphone permission is blocked") && (
                                <PermissionBlockedInstructions onRetry={requestMicAccess} />
                            )}

                        </div>
                    )}

                    {micError && micAllowed === "granted" && (
                        <p className="w-full text-center text-sm text-red-600">{micError}</p>
                    )}
                </CardContent>
            </Card>


            <style jsx>{`
  @keyframes boomGlow {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(0, 149, 255, 0.4);
    }
    50% {
      transform: scale(1.08);
      box-shadow: 0 0 30px 12px rgba(0, 149, 255, 0.6);
    }
  }

  .boom-glow {
    animation: boomGlow 1.4s ease-in-out infinite;
    border-radius: 9999px;
  }
`}</style>
        </div >
    );
}

// MISC CODE

function getMicErrorMessage(error: unknown) {
    const name = error instanceof DOMException ? error.name : "";

    if (name === "NotAllowedError" || name === "SecurityError") {
        return "Microphone permission is blocked. Allow microphone access from the lock/site-settings icon in your browser, then refresh this page.";
    }
    if (name === "NotFoundError") {
        return "No microphone was found. Connect or enable a microphone, then try again.";
    }
    if (name === "NotReadableError" || name === "AbortError") {
        return "Your microphone is being used by another app or browser tab. Close it, then try again.";
    }

    return "We could not start your microphone. Check your device and browser microphone settings, then try again.";
}

function PermissionBlockedInstructions({ onRetry }: { onRetry: () => void; }) {
    return (
        <>
            <a
                href="https://www.youtube.com/watch?v=YjMAiDAnq9I"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-sm font-medium text-blue-600 underline"
            >
                Watch how to allow microphone access
            </a>
            <Button variant="outline" onClick={onRetry} className="mt-3 rounded-2xl">
                Try Again
            </Button>
        </>
    )
}



// prevents the microphone test from leaving browser resources behind

function releaseMicResources(stream?: MediaStream) {
    stream?.getTracks().forEach((track) => track.stop());
}

function stopRecorder(recorder: MediaRecorder | null) {
    if (!recorder) return;
    recorder.onstop = null;
    if (recorder.state === "recording") recorder.stop();
}

function releaseAudioUrl(url: string | null) {
    if (url) URL.revokeObjectURL(url);
}

// ask user that did he hear the sound it recorded

function RecordingConfirmation({ onConfirm, onRetry }: { onConfirm: () => void; onRetry: () => void }) {
    return (
        <div className="w-full flex flex-col gap-2 text-center">
            <p className="text-sm">Did you hear your recording?</p>
            <div className="w-full flex gap-4">
                <Button onClick={onConfirm} className="w-full rounded-2xl">Yes, continue</Button>
                <Button variant="outline" onClick={onRetry} className="w-full rounded-2xl">No, test again</Button>
            </div>
            <MicHelpButton />
        </div>
    );
}


// code to help user who press no after no errors :(

const MIC_HELP: Partial<Record<OperatingSystem, { href: string; label: string }>> = {
    Windows: {
        href: "https://support.microsoft.com/en-us/windows/turn-on-app-permissions-for-your-microphone-in-windows-10-11-87ebc757-1f87-7f1b-88b0-1624e4e2d6c2",
        label: "Windows microphone help",
    },
    macOS: {
        href: "https://support.apple.com/guide/mac-help/control-access-to-the-microphone-on-mac-mchla1b1e1fe/mac",
        label: "Mac microphone help",
    },
    iOS: {
        href: "https://support.apple.com/102229",
        label: "iPhone/iPad microphone help",
    },
    Android: {
        href: "https://support.google.com/android/answer/9431959",
        label: "Android microphone help",
    },
    Linux: {
        href: "https://help.ubuntu.com/stable/ubuntu-help/sound-input.html",
        label: "Linux microphone help",
    },
};

function MicHelpButton() {
    const help = MIC_HELP[getOSvalue()];
    if (!help) return null;

    return (
        <Button variant="link" size="sm" asChild>
            <a href={help.href} target="_blank" rel="noreferrer">
                Microphone not working? {help.label}
            </a>
        </Button>
    );
}