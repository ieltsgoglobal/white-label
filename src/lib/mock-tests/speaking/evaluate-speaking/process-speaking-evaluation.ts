// lib/evaluate-speaking.ts

import { getMockAnswers, updateSpeakingScore } from "../../mockAnswersStorage"
import { calculateBand } from "./evaluate-speaking-blob"
import { calculateOverallSpeakingBand, PerQuestionStat, SpeakingBandBreakdown } from "./band-summary"

export interface WordTimestamp {
    text: string
    start: number
    end: number
    confidence: number
    speaker: string | null
}

interface SpeakingQuestion {
    id: number
    transcript: string
    audioUrl: string
}

interface SpeakingPart {
    part: number
    questions: SpeakingQuestion[]
}


export async function evaluateAllSpeakingRecordings({ speakingData }: { speakingData: SpeakingPart[] }) {

    // get s3 url form localstorage
    const data = getMockAnswers()
    if (!data || !data.speaking || data.speaking.length === 0) {
        console.warn("No speaking recordings found.")
        return
    }

    // Store individual evaluation results for each speaking response.
    // Used to calculate the overall average speaking band and store it in localStorage.
    const allStats: PerQuestionStat[] = [];

    // loop though all S3 urls and evaluate them seperately
    for (const { questionId, url } of data.speaking) {
        try {
            // convert s3 url to blob
            const blob = await fetchRecordingAsBlob(url)
            if (!blob) {
                console.warn(`Unable to fetch blob for question ${questionId}`)
                continue
            }

            // convert blob speech-to-text using ASSEMBLY AI
            const transcribedWords: WordTimestamp[] | null = await sendToAssemblyAI(blob)

            // if ASSEMBLY AI gives null value
            // push all 0 scores
            if (!transcribedWords) {
                console.warn(`⚠️ No transcription for question ${questionId}. Using fallback scores.`);
                const fallbackStats: PerQuestionStat = {
                    fluency: 0,
                    pronounciation: 0,
                    coherence_and_cohesion: 0,
                    lexical_resource: 0,
                    grammatical_range_and_accuracy: 0
                };

                allStats.push(fallbackStats);
                console.log(`📥 Pushed Stats (Fallback Q${questionId}):`, fallbackStats);
                continue;
            }

            if (transcribedWords) {
                // Find the question with part info
                const found = speakingData
                    .flatMap((part) =>
                        part.questions.map((q) => ({
                            part: part.part,
                            id: q.id,
                            transcript: q.transcript,
                        }))
                    )
                    .find((q) => q.id === questionId);

                const questionText = found?.transcript || "Unknown question";
                const partNumber = found?.part || 1; // Part 1,2,3

                // returns fluency, lexical, grammar, coherence and prnounciation
                const stats: PerQuestionStat = await calculateBand(transcribedWords, questionText, partNumber)

                // push stats in allStats
                allStats.push(stats)
            }
        } catch (error) {
            console.error(`❌ Error processing Q${questionId}:`, error)
        }
    }


    // takes all scores and return overall score -> then stores in localstorage
    if (allStats.length > 0) {
        const overall: SpeakingBandBreakdown = calculateOverallSpeakingBand(allStats)
        console.log("✅ Overall IELTS Speaking Band:", overall)

        // store speaking scores in localStorage
        updateSpeakingScore(overall)
        return overall
    }
}

// pass S3 url to get the Blob
async function fetchRecordingAsBlob(url: string): Promise<Blob | null> {
    try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Failed to fetch ${url}`)

        return await res.blob()
    } catch (error) {
        console.error("Fetch blob error:", error)
        return null
    }
}

export async function sendToAssemblyAI(blob: Blob): Promise<WordTimestamp[] | null> {
    const res = await fetch('/api/speaking-evaluation/assemblyai', {
        method: 'POST',
        body: blob,
        credentials: "include",
    });

    const data = await res.json();
    return data.words || null;
}