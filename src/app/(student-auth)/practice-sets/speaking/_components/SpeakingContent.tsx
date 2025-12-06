import NotFound from "@/app/not-found";
import SpeakingUI from "./SpeakingUI";
import { buidSpeakingTest } from "../_utils/buildSpeakingTest";

interface SpeakingQuestion {
    id: number
    transcript: string
    audioUrl: string
}

export interface SpeakingPart {
    part: number
    questions: SpeakingQuestion[]
}

export default async function SpeakingContent() {

    const { speakingQuestionWithAudioUrl } = await buidSpeakingTest();

    try {
        return <SpeakingUI speakingData={speakingQuestionWithAudioUrl ?? []} />

    } catch (err) {
        console.error(err);
        return <NotFound />;
    }
}