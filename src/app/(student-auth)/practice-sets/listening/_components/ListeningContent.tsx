
import NotFound from "@/app/not-found";
import { buildListeningTest } from "../_utils/buildListeningTest";
import ListeningUI from "./ListeningUI";

export default async function ListeningContent() {
    try {
        const { audioUrls, questions, answers, testPath } = await buildListeningTest();

        if (!questions || questions.length === 0) {
            return <div>No questions found</div>;
        }

        return <ListeningUI audioUrls={audioUrls} questions={questions} testPath={testPath} answers={answers} />;

    } catch (err) {
        console.error(err);
        return <NotFound />;
    }
}