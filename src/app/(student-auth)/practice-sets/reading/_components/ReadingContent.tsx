import NotFound from "@/app/not-found";
import { buildReadingTest } from "../_utils/buildReadingTest";
import ReadingUI from "./ReadingUI";

export default async function ReadingContent() {

    const { questions, passages, testPath } = await buildReadingTest();

    try {
        return <ReadingUI questions={questions} passages={passages} />

    } catch (err) {
        console.error(err);
        return <NotFound />;
    }
}