import { buildWritingTest } from "../_utils/buildWritingTest";
import WritingUI from "./WritingUI";

export default async function WritingContent() {

    const { writingQuestions, sampleAnswers, writingQuestionsTask1ImageUrl } = await buildWritingTest()

    return (
        <WritingUI
            writingQuestions={writingQuestions}
            sampleAnswers={sampleAnswers}
            writingQuestionsTask1ImageUrl={writingQuestionsTask1ImageUrl}
        />
    );
}