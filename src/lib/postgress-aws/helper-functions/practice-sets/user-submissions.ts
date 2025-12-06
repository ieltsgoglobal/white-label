"use server"

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


export async function insertReadingSubmission({
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
        `INSERT INTO reading_submissions 
         (user_id, test_path, answers, started_at, metadata) 
         VALUES ($1, $2, $3, $4, $5)
         RETURNING attempt_id`,
        [userId, testPath, answers, startedAt, metadata]
    );
}

export async function insertWritingSubmission({
    userId,
    testPath,
    user_responses_with_scores,
    startedAt,
    metadata = {},
}: {
    userId: string;
    testPath: string;
    user_responses_with_scores: any;
    startedAt: string;
    metadata?: any;
}) {
    return await postgresQuery(
        `INSERT INTO writing_submissions 
         (user_id, test_path, user_responses_with_scores, started_at, metadata)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id`,
        [userId, testPath, user_responses_with_scores, startedAt, metadata]
    );
}

export async function insertSpeakingSubmission({
    userId,
    testPath,
    user_responses,
    user_scores = null,
    startedAt,
    metadata = {},
}: {
    userId: string;
    testPath: string;
    user_responses: any;
    user_scores?: any;
    startedAt: string;
    metadata?: any;
}) {
    return await postgresQuery(
        `INSERT INTO speaking_submissions 
         (user_id, test_path, user_responses, user_scores, started_at, metadata)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id`,
        [userId, testPath, user_responses, user_scores, startedAt, metadata]
    );
}