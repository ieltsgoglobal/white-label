import TableCompletion from "@/components/mock-tests/listening-task/table-completion";
import MultipleChoiceSingle from "@/components/mock-tests/listening-task/multiple-choice-single";
import MultipleChoiceMany from "@/components/mock-tests/listening-task/multiple-choice-many";
import NoteCompletion from "@/components/mock-tests/listening-task/note-completion";
import Matching from "@/components/mock-tests/listening-task/matching";
import ImageLabeling from "@/components/mock-tests/listening-task/image-labeling";
import FormCompletion from "@/components/mock-tests/listening-task/form-completion";
import Flowchart from "@/components/practice-sets/listening-task/Flowchart";
import { transformBodyToTableQuestion, transformToFormCompletion, transformToImageLabeling, transformToMatching, transformToMatchParagraphInformation, transformToMCQ, transformToMCQMany, transformToNoteCompletion, transformToSentenceCompletion, transformToSummaryCompletion, transformToTrueFalseNotGiven, transformToYesNoNotGiven } from "../_utils/transformer";
import SentenceCompletion from "@/components/mock-tests/listening-task/sentence-completion";
import TrueFalseNotGiven from "@/components/mock-tests/reading-task/true-false-notgiven";
import MatchSentenceEndings from "@/components/mock-tests/reading-task/match-paragraph-information";
import SummaryCompletion from "@/components/mock-tests/listening-task/summary-completion";
import YesNoNotGiven from "@/components/mock-tests/reading-task/yes-no-notgiven";

interface QuestionRendererProps {
    questionRaw: any
    index: number
}

// this file includes all the question types supported in listening test and reading test

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

        case "option-true-false": {
            const tfngSection = transformToTrueFalseNotGiven(
                questionRaw.body,
                questionRaw.start,
                questionRaw.end
            );
            return <TrueFalseNotGiven key={index} {...tfngSection} />;
        }

        case "select-section": {
            const matchInfoSection = transformToMatchParagraphInformation(
                questionRaw,
                questionRaw.start,
                questionRaw.end,
                questionRaw.desc
            )
            return <MatchSentenceEndings key={index} {...matchInfoSection} />
        }

        case "input-summary":
        case "select-summary-given-list": {
            const summarySection = transformToSummaryCompletion(
                questionRaw,
                questionRaw.start,
                questionRaw.end,
                questionRaw.desc
            )
            return <SummaryCompletion key={index} {...summarySection} />
        }

        case "option-yes-no": {
            const yesNoSection = transformToYesNoNotGiven(
                questionRaw,
                questionRaw.start,
                questionRaw.end
            )
            return <YesNoNotGiven key={index} {...yesNoSection} />
        }




        default:
            return (
                <div key={index}>
                    Unsupported question type: {questionRaw.type}
                </div>
            );
    }
}