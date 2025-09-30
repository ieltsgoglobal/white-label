import { postgresQuery } from "../../postgres-query";

export async function insertListeningSubmission({
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
    return await postgresQuery(
        `INSERT INTO listening_submissions 
     (user_id, test_path, answers, started_at, metadata) 
     VALUES ($1, $2, $3, $4, $5)
     RETURNING attempt_id`,
        [userId, testPath, answers, startedAt, metadata]
    );
}