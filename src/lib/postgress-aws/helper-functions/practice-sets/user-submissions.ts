"use server"

import { getSubmitterIdServerSide } from "@/lib/auth/session/check-auth";
import { postgresQuery } from "../../postgres-query";

export async function insertListeningSubmission({
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

    const userId = await getSubmitterIdServerSide()

    return await postgresQuery(
        `INSERT INTO listening_submissions 
     (user_id, test_path, answers, started_at, metadata) 
     VALUES ($1, $2, $3, $4, $5)
     RETURNING attempt_id`,
        [userId, testPath, answers, startedAt, metadata]
    );
}

export async function insertReadingSubmission({
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

    const userId = await getSubmitterIdServerSide()

    return await postgresQuery(
        `INSERT INTO reading_submissions 
         (user_id, test_path, answers, started_at, metadata) 
         VALUES ($1, $2, $3, $4, $5)
         RETURNING attempt_id`,
        [userId, testPath, answers, startedAt, metadata]
    );
}

export async function insertWritingSubmission({
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

    const userId = await getSubmitterIdServerSide()

    return await postgresQuery(
        `INSERT INTO writing_submissions 
         (user_id, test_path, user_responses_with_scores, started_at, metadata)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id`,
        [userId, testPath, user_responses_with_scores, startedAt, metadata]
    );
}

export async function insertSpeakingSubmission({
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

    const userId = await getSubmitterIdServerSide()

    return await postgresQuery(
        `INSERT INTO speaking_submissions 
         (user_id, test_path, user_responses, user_scores, started_at, metadata)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id`,
        [userId, testPath, user_responses, user_scores, startedAt, metadata]
    );
}


export async function getPracticeSetsSpeakingSubmissions({ returnOnlyTestPaths = false }: { returnOnlyTestPaths?: boolean }) {
    const userId = await getSubmitterIdServerSide()

    const query = `
        SELECT ${returnOnlyTestPaths ? "test_path" : "*"}
        FROM speaking_submissions
        WHERE user_id = $1
        ORDER BY submitted_at DESC
    `;

    const { rows } = await postgresQuery(query, [userId]);
    return rows;
}

export async function getPracticeSetsListeningSubmissions({ returnOnlyTestPaths = false }: { returnOnlyTestPaths?: boolean }) {
    const userId = await getSubmitterIdServerSide()

    return (await postgresQuery(`
        SELECT ${returnOnlyTestPaths ? "test_path" : "*"}
        FROM listening_submissions
        WHERE user_id = $1
        ORDER BY submitted_at DESC
    `, [userId])).rows;
}

export async function getPracticeSetsReadingSubmissions({ returnOnlyTestPaths = false }: { returnOnlyTestPaths?: boolean }) {
    const userId = await getSubmitterIdServerSide()

    return (await postgresQuery(`
        SELECT ${returnOnlyTestPaths ? "test_path" : "*"}
        FROM reading_submissions
        WHERE user_id = $1
        ORDER BY submitted_at DESC
    `, [userId])).rows;
}

export async function getPracticeSetsWritingSubmissions({ returnOnlyTestPaths = false }: { returnOnlyTestPaths?: boolean }) {
    const userId = await getSubmitterIdServerSide()

    return (await postgresQuery(`
        SELECT ${returnOnlyTestPaths ? "test_path" : "*"}
        FROM writing_submissions
        WHERE user_id = $1
        ORDER BY submitted_at DESC
    `, [userId])).rows;
}