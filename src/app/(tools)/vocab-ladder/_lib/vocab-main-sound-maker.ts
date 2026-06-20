let audioContext: AudioContext | null = null

function getAudioContext() {
    if (typeof window === "undefined") return null

    if (!audioContext) {
        audioContext = new window.AudioContext()
    }

    return audioContext
}

function playTone(
    frequency: number,
    durationMs: number,
    type: OscillatorType = "sine"
) {
    const ctx = getAudioContext()
    if (!ctx) return

    if (ctx.state === "suspended") {
        void ctx.resume()
    }

    const oscillator = ctx.createOscillator()
    const gain = ctx.createGain()

    oscillator.type = type
    oscillator.frequency.value = frequency

    oscillator.connect(gain)
    gain.connect(ctx.destination)

    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + durationMs / 1000
    )

    oscillator.start()
    oscillator.stop(ctx.currentTime + durationMs / 1000)
}

/**
 * Centralized sound manager for the Vocabulary Ladder experience.
 *
 * Provides lightweight synthesized sound effects without
 * requiring audio assets or external files.
 */
export const VocabMainSoundMaker = {
    optionSelected() {
        playTone(700, 60)
    },

    buttonPressed() {
        playTone(500, 50)
    },

    correctAnswer() {
        playTone(700, 80)
        setTimeout(() => playTone(900, 100), 80)
    },

    wrongAnswer() {
        playTone(300, 150, "square")
    },

    continue() {
        playTone(800, 60)
    },

    quizCompleted() {
        playTone(600, 80)
        setTimeout(() => playTone(800, 80), 100)
        setTimeout(() => playTone(1000, 150), 200)
    },

    ladderLevelUnlocked() {
        playTone(600, 60)
        setTimeout(() => playTone(750, 60), 80)
        setTimeout(() => playTone(900, 120), 160)
    },
}
