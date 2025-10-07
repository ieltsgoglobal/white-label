export async function submitListeningAnswers({
    userId,
    testPath,
    answers,
    startedAt,
    metadata = {},
}: {
    userId: string;
    testPath: string;
    answers: any;
    startedAt: string;
    metadata?: any;
}) {
    const res = await fetch("/api/aws-postgres/practice-sets/user-submissions/listening", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId,
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
    userId,
    testPath,
    answers,
    startedAt,
    metadata = {},
}: {
    userId: string;
    testPath: string;
    answers: any;
    startedAt: string;
    metadata?: any;
}) {
    const res = await fetch("/api/aws-postgres/practice-sets/user-submissions/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId,
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