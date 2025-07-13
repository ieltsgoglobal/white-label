import { Groq } from 'groq-sdk';
import { NextRequest } from 'next/server';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const { transcription, question, partNumber } = await req.json();

        if (!transcription || !question) {
            return new Response(JSON.stringify({ error: 'Missing transcription or question' }), { status: 400 });
        }

        const prompt = `
You are an IELTS Speaking band evaluator.

Evaluate the candidate's answer on the following 3 IELTS criteria:
1. **Coherence and Cohesion**  
   - just evaluate how clearly and logically the response flows.  

2. **Lexical Resource**
    - heavily Reward idiom usages

3. **Grammatical Range and Accuracy**  
   - ignore minor mistakes like punctuation errors, missing capitalization, and filler words.

IMPORTANT:
This is **IELTS Part ${partNumber}**, which means:
- Part 1 and 3 answers are expected to be ~20 seconds long (1–3 sentences)
- Part 2 answers are expected to be ~2 minutes long (structured and extended)


${partNumber === 1 || partNumber === 3
                ? `Evaluate fairly based on the expected length.
Do NOT penalize short answers in Part 1 or 3 for not having complex vocabulary or grammar.
Do NOT expect detailed structure in short responses.`
                : `Evaluate extended answers. Expect structure, development of ideas, and range in grammar and vocabulary.`
            }



IELTS Part ${partNumber} Question:
"${question}"

Candidate's answer:
"${transcription}"

Only return JSON with band scores (integers 0 to 9). Do NOT include any explanation or description. Your output must match this format:
{
  "coherence_and_cohesion": number,
  "lexical_resource": number,
  "grammatical_range_and_accuracy": number
}
`;

        const completion = await groq.chat.completions.create({
            model: 'meta-llama/llama-4-maverick-17b-128e-instruct',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0,
            max_completion_tokens: 300,
            top_p: 1,
            stream: false,
            response_format: { type: 'json_object' },
            stop: null,
        });

        const content = completion.choices[0].message.content;
        const parsed = typeof content === 'string' ? JSON.parse(content) : content;
        return Response.json(parsed);
    } catch (err) {
        console.error('Error in evaluate-response route:', err);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}