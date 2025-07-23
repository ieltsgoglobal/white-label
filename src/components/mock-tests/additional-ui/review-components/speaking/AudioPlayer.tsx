"use client"

import { useRef, useState, useEffect } from "react"
import { Play, Pause, Volume2, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import clsx from "clsx"

interface AudioPlayerCardProps {
    src: string
    question?: string
    variant?: "question" | "answer"
}

export default function AudioPlayerCard({ src, question, variant }: AudioPlayerCardProps) {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)

    // amazon s3 webm dosent give metadata initially so we need to show error
    const [isStreaming, setIsStreaming] = useState(null as boolean | null)

    // Handle audio metadata loading (amazon s3 webm files)
    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const updateStreamingState = () => {
            const duration = audio.duration
            const shouldStream = !isFinite(duration) || duration === 0
            setIsStreaming(shouldStream)
            console.log("🎧 Checked metadata. Duration:", duration, "isStreaming:", shouldStream)
        }

        // Handle cases where metadata comes late (e.g., after playback ends)
        audio.addEventListener("loadedmetadata", updateStreamingState)
        audio.addEventListener("ended", updateStreamingState)

        return () => {
            audio.removeEventListener("loadedmetadata", updateStreamingState)
            audio.removeEventListener("ended", updateStreamingState)
        }
    }, [src])


    const handlePlayPause = () => {
        const audio = audioRef.current
        if (!audio) return

        if (isPlaying) {
            audio.pause()
        } else {
            audio.play()
        }

        setIsPlaying(!isPlaying)
    }

    const handleTimeUpdate = () => {
        const audio = audioRef.current
        if (!audio || !audio.duration) return
        const percent = (audio.currentTime / audio.duration) * 100
        setProgress(percent)
    }

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        console.log(isStreaming)
        if (isStreaming !== true) {
            const audio = audioRef.current
            if (!audio || !audio.duration) return

            const rect = e.currentTarget.getBoundingClientRect()
            const clickX = e.clientX - rect.left
            const seekTime = (clickX / rect.width) * audio.duration

            audio.currentTime = seekTime
        }
    }

    // fix dropbox url
    function getValidAudioUrl(originalUrl: string): string {
        if (!originalUrl) return ""
        if (originalUrl.includes("dropbox.com")) {
            return originalUrl.replace("www.dropbox.com", "dl.dropboxusercontent.com")
        }
        return originalUrl
    }

    useEffect(() => {
        setProgress(0)
        setIsPlaying(false)
        audioRef.current?.pause()
        audioRef.current?.load()
    }, [src])

    const isQuestion = variant === "question"

    return (
        <Card
            className={clsx(
                "shadow-sm border rounded-xl",
                "bg-muted/40 border-border"
            )}
        >
            <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-1">
                    {isQuestion ? (
                        <Volume2 className="w-4 h-4 text-slate-500" />
                    ) : (
                        <Mic className="w-4 h-4 text-slate-500" />
                    )}
                    <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">
                        {isQuestion ? "Question" : "Your Answer"}
                    </span>
                </div>

                {question && (
                    <CardTitle className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                        {question}
                    </CardTitle>
                )}
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                    <Button
                        size="sm"
                        variant="outline"
                        className="h-9 w-9 p-0 rounded-full border border-slate-300 dark:border-slate-700"
                        onClick={handlePlayPause}
                    >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>

                    <div
                        className="relative w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full cursor-pointer "
                        onClick={handleSeek}
                    >
                        <div
                            className="absolute top-0 left-0 h-full bg-slate-800 dark:bg-slate-300 rounded-full transition-all duration-150"
                            style={{ width: `${progress}%` }}
                        />
                        {isPlaying && isStreaming === true && (
                            <div className="absolute top-2 left-0 h-full text-xs font-medium text-blue-600 mt-1 animate-pulse">
                                Streaming audio…
                            </div>
                        )}
                    </div>
                </div>

                <audio
                    ref={audioRef}
                    src={getValidAudioUrl(src)}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => setIsPlaying(false)}
                    preload="metadata"
                    className="hidden"
                />
            </CardContent>
        </Card>
    )
}