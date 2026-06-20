import { Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VocabMainSoundMaker } from "../../_lib/vocab-main-sound-maker"

/**
 * QuizSpeakWordButton
 *
 * Uses the browser's Speech Synthesis API to pronounce
 * the provided vocabulary word.
 *
 * Voice preference order:
 * 1. Samantha (macOS/iOS)
 * 2. Alex (macOS)
 * 3. Any en-US voice
 *
 * The current speech queue is cancelled before speaking
 * to prevent overlapping pronunciations.
 */
export function VocabQuizSpeakWordButton({ word }: { word: string }) {
    const speakWord = () => {
        VocabMainSoundMaker.buttonPressed()
        const voices = window.speechSynthesis.getVoices()

        const voice =
            voices.find((v) => v.name === "Samantha") ||
            voices.find((v) => v.name === "Alex") ||
            voices.find((v) => v.lang === "en-US")

        const utterance = new SpeechSynthesisUtterance(word)

        if (voice) { utterance.voice = voice }

        window.speechSynthesis.cancel()
        window.speechSynthesis.speak(utterance)
    }

    return (
        <Button
            type="button"
            size="icon"
            onClick={speakWord}
            aria-label={`Pronounce ${word}`}
            className="
                h-10 w-10 rounded-xl
                bg-sky-400 hover:bg-sky-400
                text-sky-950

                border-b-4 border-sky-600

                shadow-[0_4px_0_0_rgb(8_145_178)]
                active:translate-y-1
                active:border-b-0
                active:shadow-none

                transition-all
            "
        >
            <Volume2 className="h-6 w-6 fill-current" />
        </Button>
    )
}
