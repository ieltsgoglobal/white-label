export interface SpeakingBandBreakdown {
    fluency_and_coherence: number
    lexical_resource: number
    grammatical_range_and_accuracy: number
    pronunciation: number
    overall_band: number
}

export interface PerQuestionStat {
    fluency: number
    pronounciation: number
    coherence_and_cohesion: number
    lexical_resource: number
    grammatical_range_and_accuracy: number
}

// Rounding of scores 2nd time in speaking task
// Round to nearest 0.5 or whole number
function roundToNearestHalf(num: number): number {
    return Math.round(num * 2) / 2;
}

export function calculateOverallSpeakingBand(statsList: PerQuestionStat[]): SpeakingBandBreakdown {
    let fluency = 0, pronunciation = 0, coherence = 0, lexical = 0, grammar = 0;

    for (const s of statsList) {
        fluency += s.fluency;
        pronunciation += s.pronounciation;
        coherence += s.coherence_and_cohesion;
        lexical += s.lexical_resource;
        grammar += s.grammatical_range_and_accuracy;
    }

    const count = statsList.length;
    const fluencyAvg = fluency / count;
    const pronunciationAvg = pronunciation / count;
    const coherenceAvg = coherence / count;
    const lexicalAvg = lexical / count;
    const grammarAvg = grammar / count;

    const overallBand = parseFloat(
        ((fluencyAvg + pronunciationAvg + coherenceAvg + lexicalAvg + grammarAvg) / 5).toFixed(1)
    );

    return {
        fluency_and_coherence: parseFloat(roundToNearestHalf((coherenceAvg + fluencyAvg) / 2).toFixed(1)), // merging fluency + coherence_and_cohesion
        lexical_resource: parseFloat(roundToNearestHalf(lexicalAvg).toFixed(1)),
        grammatical_range_and_accuracy: parseFloat(roundToNearestHalf(grammarAvg).toFixed(1)),
        pronunciation: parseFloat(roundToNearestHalf(pronunciationAvg).toFixed(1)),
        overall_band: parseFloat(roundToNearestHalf(overallBand).toFixed(1)),
    };
}