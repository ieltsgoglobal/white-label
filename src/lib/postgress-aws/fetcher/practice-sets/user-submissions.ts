export async function submitListeningAnswers({
    testPath,
    answers,
    startedAt,
    metadata = {},
}: {
    testPath: string;
    answers: any;
    startedAt: string;
    metadata?: any;
}) {
    const res = await fetch("/api/aws-postgres/practice-sets/user-submissions/listening", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            testPath,
            answers,
            startedAt,
            metadata,
        }),
    });

    if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
    }

    return res.json();
}

export async function submitReadingAnswers({
    testPath,
    answers,
    startedAt,
    metadata = {},
}: {
    testPath: string;
    answers: any;
    startedAt: string;
    metadata?: any;
}) {
    const res = await fetch("/api/aws-postgres/practice-sets/user-submissions/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            testPath,
            answers,
            startedAt,
            metadata,
        }),
    });

    if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
    }

    return res.json();
}

export async function submitWritingAnswers({
    testPath,
    user_responses_with_scores,
    startedAt,
    metadata = {},
}: {
    testPath: string;
    user_responses_with_scores: any;
    startedAt: string;
    metadata?: any;
}) {
    const res = await fetch("/api/aws-postgres/practice-sets/user-submissions/writing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            testPath,
            user_responses_with_scores,
            startedAt,
            metadata,
        }),
    });

    if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
    }

    return res.json();
}

export async function submitSpeakingAnswers({
    testPath,
    user_responses,
    user_scores = null,
    startedAt,
    metadata = {},
}: {
    testPath: string;
    user_responses: any;
    user_scores?: any;
    startedAt: string;
    metadata?: any;
}) {
    const res = await fetch("/api/aws-postgres/practice-sets/user-submissions/speaking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            testPath,
            user_responses,
            user_scores,
            startedAt,
            metadata,
        }),
    });

    if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
    }

    return res.json();
}