// _components/AudioPlayer.tsx

"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX, MoreHorizontal } from "lucide-react"

type AudioPlayerProps = {
    src: string
    title?: string
    className?: string
}

function formatTime(secs: number) {
    if (!isFinite(secs) || secs < 0) secs = 0
    const h = Math.floor(secs / 3600)
    const m = Math.floor((secs % 3600) / 60)
    const s = Math.floor(secs % 60)
    const mm = String(m).padStart(2, "0")
    const ss = String(s).padStart(2, "0")
    return h > 0 ? `${h}:${mm}:${ss}` : `${m}:${ss}`
}

export default function AudioPlayer({ src, title = "Audio", className }: AudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [isReady, setIsReady] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1)
    const [muted, setMuted] = useState(false)
    const [rate, setRate] = useState(1)

    // Keep slider in sync without jitter
    const progressValue = useMemo(() => {
        if (duration <= 0) return [0]
        return [Math.min(Math.max(currentTime, 0), duration)]
    }, [currentTime, duration])

    // Attach audio event listeners
    useEffect(() => {
        const audio = new Audio(src)
        audio.preload = "metadata"
        audioRef.current = audio

        const onLoadedMetadata = () => {
            setDuration(audio.duration || 0)
            setIsReady(true)
        }
        const onTimeUpdate = () => setCurrentTime(audio.currentTime || 0)
        const onEnded = () => setIsPlaying(false)
        const onPlay = () => setIsPlaying(true)
        const onPause = () => setIsPlaying(false)

        audio.addEventListener("loadedmetadata", onLoadedMetadata)
        audio.addEventListener("timeupdate", onTimeUpdate)
        audio.addEventListener("ended", onEnded)
        audio.addEventListener("play", onPlay)
        audio.addEventListener("pause", onPause)

        // initial volume
        audio.volume = volume
        audio.muted = muted
        audio.playbackRate = rate

        return () => {
            audio.pause()
            audio.removeEventListener("loadedmetadata", onLoadedMetadata)
            audio.removeEventListener("timeupdate", onTimeUpdate)
            audio.removeEventListener("ended", onEnded)
            audio.removeEventListener("play", onPlay)
            audio.removeEventListener("pause", onPause)
            audioRef.current = null
        }
    }, [src])

    // React to volume/mute changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume
            audioRef.current.muted = muted
        }
    }, [volume, muted])

    // React to playback rate changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.playbackRate = rate
        }
    }, [rate])

    const togglePlay = async () => {
        const audio = audioRef.current
        if (!audio) return
        if (audio.paused) {
            try {
                await audio.play()
            } catch {
                // ignore autoplay restrictions
            }
        } else {
            audio.pause()
        }
    }

    const seekTo = (time: number) => {
        const audio = audioRef.current
        if (!audio || !isReady) return
        audio.currentTime = Math.min(Math.max(time, 0), duration || 0)
    }

    const skipBy = (delta: number) => {
        seekTo((audioRef.current?.currentTime || 0) + delta)
    }

    const toggleMute = () => setMuted((m) => !m)

    const onProgressChange = (v: number[]) => {
        if (!isReady) return
        const target = v[0] ?? 0
        seekTo(target)
    }

    const onVolumeChange = (v: number[]) => {
        const target = v[0] ?? 0
        setVolume(target)
        if (target === 0) setMuted(true)
        else if (muted) setMuted(false)
    }

    const rates = [0.75, 1, 1.25, 1.5, 1.75, 2]

    return (
        <Card
            role="region"
            aria-label="Audio player"
            className={cn("w-full max-w-2xl p-4 md:p-6 bg-card text-card-foreground border", className)}
        >
            <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">Now Playing</p>
                    <h2 className="text-balance font-medium">{title}</h2>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="Playback options">
                            <MoreHorizontal className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuLabel className="font-normal">Playback speed</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={String(rate)} onValueChange={(v) => setRate(Number(v))}>
                            {rates.map((r) => (
                                <DropdownMenuRadioItem key={r} value={String(r)}>
                                    {r}x
                                </DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="mt-4 flex items-center gap-3">
                <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => skipBy(-15)}
                    disabled={!isReady}
                    aria-label="Rewind 15 seconds"
                >
                    <SkipBack className="h-3 w-3" />
                </Button>

                <Button
                    variant="default"
                    size="icon"
                    onClick={togglePlay}
                    disabled={!isReady}
                    aria-label={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                </Button>

                <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => skipBy(15)}
                    disabled={!isReady}
                    aria-label="Forward 15 seconds"
                >
                    <SkipForward className="h-3 w-3" />
                </Button>

                <div className="ml-2 flex items-center gap-2 min-w-[140px]">
                    <Button variant="ghost" size="icon" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>
                        {muted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                    <Slider
                        aria-label="Volume"
                        value={[muted ? 0 : volume]}
                        min={0}
                        max={1}
                        step={0.01}
                        onValueChange={onVolumeChange}
                        className="w-28"
                    />
                </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
                <span className="tabular-nums text-xs text-muted-foreground w-12 text-right">{formatTime(currentTime)}</span>
                <Slider
                    aria-label="Seek"
                    value={progressValue}
                    min={0}
                    max={duration || 0}
                    step={0.1}
                    onValueChange={onProgressChange}
                    className="flex-1"
                />
                <span className="tabular-nums text-xs text-muted-foreground w-12">{formatTime(duration)}</span>
            </div>

            {/* Hidden audio element kept for a11y reference, not rendered to DOM tree */}
            {/* The Audio instance is managed programmatically via audioRef */}
        </Card>
    )
}
