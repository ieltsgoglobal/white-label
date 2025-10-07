import NotFound from "@/app/not-found";
import { buildReadingTest } from "../_utils/buildReadingTest";
import ReadingUI from "./ReadingUI";

export default async function ReadingContent() {

    const { questions, passages, answers, testPath } = await buildReadingTest();

    try {
        return <ReadingUI questions={questions} passages={passages} answers={answers} testPath={testPath} />

    } catch (err) {
        console.error(err);
        return <NotFound />;
    }
}