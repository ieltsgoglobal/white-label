interface WordTimestamp {
    text: string;
    start: number;
    end: number;
    confidence: number;
    speaker: string | null;
}



export async function calculateBand(words: WordTimestamp[], questionText: string, partNumber: number) {
    // calcualte fluency score
    const fluency = calculateFluency(words);

    // calculate pronounciation score
    const pronounciation = calculatePronunciation(words);

    // grok to calculate coherence, lexical and grammar
    // convert the WordTimestamp into normal text
    const fullTranscript = words.map(w => w.text).join(' ');

    const res = await fetch('/api/speaking-evaluation/evaluate-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcription: fullTranscript, question: questionText, partNumber: partNumber }),
    });
    const languageScores = await res.json();

    // IMPORTANT : boost score by 15% and round it to nearest .5
    // we do calculate for nearest .5 again later on in speaking
    const boostAndRound = (score: number) => {
        const boosted = score * 1.15;
        const clamped = Math.min(boosted, 9); // cap at 9
        return Math.round(clamped * 2) / 2; // round to nearest .5
    };

    // extract scores from json and boost them
    const coherence = boostAndRound(languageScores?.coherence_and_cohesion ?? 0);
    const lexical = boostAndRound(languageScores?.lexical_resource ?? 0);
    const grammar = boostAndRound(languageScores?.grammatical_range_and_accuracy ?? 0);

    return {
        fluency: fluency ?? 0,
        pronounciation: pronounciation ?? 0,
        coherence_and_cohesion: coherence ?? 0,
        lexical_resource: lexical ?? 0,
        grammatical_range_and_accuracy: grammar ?? 0
    };
}


function calculateFluency(words: WordTimestamp[],) {

    // if words are less then no point in calculing further
    if (!words || words.length < 2) return null;

    const totalWords = words.length;
    const totalDurationSec = 20 // lets give relaxation by not doing 120 sec for part 2
    const wpm = totalWords / (totalDurationSec / 60);

    let longPauses = 0;
    let totalPauses = 0;
    let pauseDurations: number[] = [];

    for (let i = 1; i < words.length; i++) {
        const pause = words[i].start - words[i - 1].end
        // ignore micro-pauses which are below 500ms
        // rest keep adding up pause above 500ms in totalPauses and pauseDurations
        // pauses above 1500ms will also add up as longPauses
        if (pause > 500) {
            totalPauses++;
            pauseDurations.push(pause);
            if (pause > 1500) longPauses++;
        }
    }

    const avgPause = pauseDurations.length
        ? pauseDurations.reduce((a, b) => a + b, 0) / pauseDurations.length
        : 0;


    // calculate 0-9 band
    const band = estimateFluencyBand(wpm, avgPause, longPauses, totalDurationSec)

    // return {
    // band
    // wpm: Math.round(wpm),
    // totalPauses,
    // longPauses,
    // avgPauseMs: Math.round(avgPause),
    // totalDurationSec: Math.round(totalDurationSec)
    // };

    return band;
}

function estimateFluencyBand(wpm: number, avgPauseMs: number, longPauses: number, totalDurationSec: number) {
    // fluency calculation can be more simple, but its working as todays testing
    // PROBLEM: For part 2, even if we speak about 50 words, it would still fetch good score

    const pausesPerMin = (longPauses / totalDurationSec) * 60;

    if (wpm === 0 || Number.isNaN(wpm)) return 0;
    if (wpm > 0 && wpm <= 10) return 1;

    if (wpm >= 110 && avgPauseMs < 800 && longPauses <= 4 && pausesPerMin <= 4.5) return 9;
    if (wpm >= 100 && avgPauseMs < 950 && longPauses <= 5 && pausesPerMin <= 5) return 8.5;
    if (wpm >= 90 && avgPauseMs < 1050 && longPauses <= 6 && pausesPerMin <= 5.5) return 8;
    if (wpm >= 80 && avgPauseMs < 1150 && longPauses <= 7 && pausesPerMin <= 6) return 7.5;
    if (wpm >= 70 && avgPauseMs < 1250 && longPauses <= 8 && pausesPerMin <= 6.5) return 7;
    if (wpm >= 60 && avgPauseMs < 1350 && longPauses <= 9 && pausesPerMin <= 7) return 6.5;
    if (wpm >= 50 && avgPauseMs < 1500 && longPauses <= 10) return 6;
    if (wpm >= 40 && avgPauseMs < 1700 && longPauses <= 11) return 5.5;
    if (wpm >= 30 && avgPauseMs < 1900 && longPauses <= 12) return 5;
    if (wpm >= 25 && avgPauseMs < 2200) return 4.5;
    if (wpm >= 20 && avgPauseMs < 2500) return 4;
    if (wpm >= 15 && avgPauseMs < 2800) return 3.5;

    return wpm < 15 || avgPauseMs > 3500 ? 2 : 3;
}

function calculatePronunciation(words: WordTimestamp[]) {
    if (!words || words.length === 0) return 0;

    const confidences = words.map(w => w.confidence);
    const avgConfidence = confidences.reduce((sum, val) => sum + val, 0) / confidences.length;

    // Filter low-confidence words
    let lowConfidenceWords = confidences.filter(c => c < 0.85);

    // 🚨 Ignore the first two low-confidence word, if any
    if (lowConfidenceWords.length > 0) {
        lowConfidenceWords = lowConfidenceWords.slice(2);
    }

    // +5 to just give extra boost to pronunciation score
    const lowConfidenceRatio = lowConfidenceWords.length / (words.length + 5);

    let band = 2;

    if (avgConfidence >= 0.93 && lowConfidenceRatio <= 0.05) band = 9;
    else if (avgConfidence >= 0.91 && lowConfidenceRatio <= 0.07) band = 8.5;
    else if (avgConfidence >= 0.89 && lowConfidenceRatio <= 0.10) band = 8;
    else if (avgConfidence >= 0.87 && lowConfidenceRatio <= 0.13) band = 7.5;
    else if (avgConfidence >= 0.85 && lowConfidenceRatio <= 0.16) band = 7;
    else if (avgConfidence >= 0.83 && lowConfidenceRatio <= 0.18) band = 6.5;
    else if (avgConfidence >= 0.81 && lowConfidenceRatio <= 0.20) band = 6;
    else if (avgConfidence >= 0.79 && lowConfidenceRatio <= 0.22) band = 5.5;
    else if (avgConfidence >= 0.77 && lowConfidenceRatio <= 0.25) band = 5;
    else if (avgConfidence >= 0.75 && lowConfidenceRatio <= 0.28) band = 4.5;
    else if (avgConfidence >= 0.73 && lowConfidenceRatio <= 0.30) band = 4;
    else if (avgConfidence >= 0.71 && lowConfidenceRatio <= 0.33) band = 3.5;
    else if (avgConfidence >= 0.69 && lowConfidenceRatio <= 0.36) band = 3;

    // return {
    // band
    // avgConfidence: Number(avgConfidence.toFixed(4)),
    // lowConfidenceWords,
    // totalWords: words.length,
    // lowConfidenceRatio: Number((lowConfidenceRatio * 100).toFixed(2)) + "%"
    // };

    return band;
}