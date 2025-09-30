import TableCompletion from "@/components/mock-tests/listening-task/table-completion";
import MultipleChoiceSingle from "@/components/mock-tests/listening-task/multiple-choice-single";
import MultipleChoiceMany from "@/components/mock-tests/listening-task/multiple-choice-many";
import NoteCompletion from "@/components/mock-tests/listening-task/note-completion";
import Matching from "@/components/mock-tests/listening-task/matching";
import ImageLabeling from "@/components/mock-tests/listening-task/image-labeling";
import FormCompletion from "@/components/mock-tests/listening-task/form-completion";
import Flowchart from "@/components/practice-sets/listening-task/Flowchart";
import { transformBodyToTableQuestion, transformToFormCompletion, transformToImageLabeling, transformToMatching, transformToMCQ, transformToMCQMany, transformToNoteCompletion, transformToSentenceCompletion } from "../_utils/transformer";
import SentenceCompletion from "@/components/mock-tests/listening-task/sentence-completion";

interface QuestionRendererProps {
    questionRaw: any
    index: number
}

export default function QuestionRenderer({ questionRaw, index }: QuestionRendererProps) {
    switch (questionRaw.type) {
        case "input-table": {
            const tableQuestion = transformBodyToTableQuestion(
                questionRaw.body,
                index + 1,
                questionRaw.desc?.constraint ?? "ONE WORD OR A NUMBER",
                questionRaw.start ?? 1,
                questionRaw.end ?? 1
            );
            return <TableCompletion key={index} {...tableQuestion} />;
        }

        case "option-abc": {
            const mcqSection = transformToMCQ(
                questionRaw.body,
                questionRaw.start,
                questionRaw.end,
                questionRaw.type,
                questionRaw.desc
            );
            return <MultipleChoiceSingle key={index} {...mcqSection} />;
        }

        case "checkbox": {
            const mcqManySection = transformToMCQMany(
                questionRaw.body,
                questionRaw.start,
                questionRaw.end,
                questionRaw.type,
                questionRaw.desc
            )
            return <MultipleChoiceMany key={index} {...mcqManySection} />
        }

        case "input-note": {
            const noteSection = transformToNoteCompletion(
                questionRaw.body,
                questionRaw.start,
                questionRaw.end,
                questionRaw.type,
                questionRaw.desc
            )
            return <NoteCompletion key={index} {...noteSection} />
        }

        case "select-given-list": {
            const matchingSection = transformToMatching(
                questionRaw.body,
                questionRaw.start,
                questionRaw.end,
                questionRaw.type
            )
            return <Matching key={index} {...matchingSection} />
        }

        case "select-given-diagram": {
            const imageSection = transformToImageLabeling(
                questionRaw.body,
                questionRaw.start,
                questionRaw.end,
                questionRaw.type,
                questionRaw.desc
            )
            return <ImageLabeling key={index} {...imageSection} />
        }

        case "input-form": {
            const formSection = transformToFormCompletion(
                questionRaw.body,
                questionRaw.start,
                questionRaw.end,
                questionRaw.type,
                questionRaw.desc
            );
            return <FormCompletion key={index} {...formSection} />;
        }


        case "select-flowchart-given-list":
        case "input-flowchart": {
            return (
                <Flowchart
                    key={index}
                    body={questionRaw.body}
                    start={questionRaw.start}
                    end={questionRaw.end}
                    desc={questionRaw.desc}
                />
            )
        }


        case "input-sentence": {
            const sentenceSection = transformToSentenceCompletion(
                questionRaw.body,
                questionRaw.start,
                questionRaw.end,
                questionRaw.type,
                questionRaw.desc
            )
            return <SentenceCompletion key={index} {...sentenceSection} />
        }


        default:
            return (
                <div key={index}>
                    Unsupported question type: {questionRaw.type}
                </div>
            );
    }
}