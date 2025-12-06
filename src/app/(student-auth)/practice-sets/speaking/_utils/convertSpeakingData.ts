interface SpeakingQuestion {
    id: number
    transcript: string
    audioUrl: string
    displayQuestions?: string[]   // NEW — for Part 2 cue-card bullet points
}

export interface SpeakingPart {
    part: number
    questions: SpeakingQuestion[]
}

export function convertSpeakingData(raw: any): SpeakingPart[] {

    const result: SpeakingPart[] = [];


    // -------------------------------------------------
    // --- 🟦 PART 1 — Normal multiple Q&A questions ---
    // -------------------------------------------------
    const part1Items =
        raw.part_1.data.test_text.topics.flatMap((t: any) => t.items);
    const part1Questions = part1Items.map((item: any, index: number) => ({
        id: index + 1,
        transcript: item.question,
        audioUrl: item.audioUrl,
    }));
    result.push({ part: 1, questions: part1Questions });

    // ------------------------------------------------------------------------
    // -- 🟨 PART 2 — Cue Card + Display Bullet Points (always audioUrl: "") --
    // ------------------------------------------------------------------------
    const part2Topics = raw.part_2.data.test_text.topics;

    const part2MainTitle =
        part2Topics.find((t: any) => t.title && t.items.length === 0)?.title || "";

    const cueCardBulletPoints =
        part2Topics.find((t: any) => t.items.length > 0)?.items || [];

    const finalLine =
        part2Topics.filter((t: any) => t.items.length === 0)[1]?.title ?? "";

    const displayQuestions = [
        ...cueCardBulletPoints,
        finalLine,
    ].filter(Boolean);

    result.push({
        part: 2,
        questions: [
            {
                id: part1Questions.length + 1,
                transcript: part2MainTitle,
                audioUrl:
                    "https://www.dropbox.com/scl/fi/kfxzbxcu1h5yxrnc5ii9l/part2.mp3?rlkey=fp5n48br5yco5xtyx30ckl60j&st=wosk9u5b&raw=1", // <— intentionally left blank, jumptinto didnt have any audioUrl for part2
                displayQuestions,
            },
        ],
    });

    // ------------------------------------------------
    // ------- 🟥 PART 3 — Follow-up discussion -------
    // ------------------------------------------------
    const part3Items = raw.part_3.data.test_text.topics.flatMap(
        (t: any) => t.items
    );
    const part3Questions = part3Items.map((item: any, index: number) => ({
        id: part1Questions.length + 1 + index + 1, // continue id numbering
        transcript: item.question,
        audioUrl: item.audioUrl,
    }));
    result.push({ part: 3, questions: part3Questions });

    return result;
}



// -------------------------------------
// ------ TAKES INPUT LIKE THIS --------
// -------------------------------------


//     Expected JSON Format
//     {
//     "part_1": {
//         "code": 2000,
//         "data": {
//             "test_text": {
//                 "title": "",
//                 "topics": [
//                     {
//                         "items": [
//                             {
//                                 "question": "How much walking do you do in your daily life?",
//                                 "audioUrl": "https://ielts-practice-sets-speaking-questions-audio-mp3-6f3825312bd5.s3.ap-south-1.amazonaws.com/a10t1s1-0-0-en_male_hades_moon_bigtts.mp3"
//                             },
//                             {
//                                 "question": "Did you walk more when you were at school than now?",
//                                 "audioUrl": "https://ielts-practice-sets-speaking-questions-audio-mp3-6f3825312bd5.s3.ap-south-1.amazonaws.com/a20t1s1-0-1-en_male_hades_moon_bigtts.mp3"
//                             },
//                             {
//                                 "question": "What places are there to go for a walk near where you live?",
//                                 "audioUrl": "https://ielts-practice-sets-speaking-questions-audio-mp3-6f3825312bd5.s3.ap-south-1.amazonaws.com/a20t1s1-0-2-en_male_hades_moon_bigtts.mp3"
//                             },
//                             {
//                                 "question": "Would you ever like to go on a walking holiday?",
//                                 "audioUrl": "https://ielts-practice-sets-speaking-questions-audio-mp3-6f3825312bd5.s3.ap-south-1.amazonaws.com/a20t1s1-0-3-en_male_hades_moon_bigtts.mp3"
//                             }
//                         ]
//                     }
//                 ]
//             }
//         },
//         "msg": "OK"
//     },
//     "part_2": {
//         "code": 2000,
//         "data": {
//             "test_text": {
//                 "title": "",
//                 "topics": [
//                     {
//                         "items": [],
//                         "title": "Describe a play or a film you have seen that you would like to see again with friends.",
//                         "audioUrl": "https://ielts-practice-sets-speaking-questions-audio-mp3-6f3825312bd5.s3.ap-south-1.amazonaws.com/a20t1s2-0-0-en_male_hades_moon_bigtts.mp3"
//                     },
//                     {
//                         "items": [
//                             "what play or film you’d like to go to see again",
//                             "who you would go with",
//                             "what other people have said about this play or film"
//                         ],
//                         "title": "You should say:"
//                     },
//                     {
//                         "items": [],
//                         "title": "and explain why you would like to see this play or film again with friends."
//                     }
//                 ]
//             }
//         },
//         "msg": "OK"
//     },
//     "part_3": {
//         "code": 2000,
//         "data": {
//             "test_text": {
//                 "title": "",
//                 "topics": [
//                     {
//                         "items": [
//                             {
//                                 "question": "What are the most popular kinds of plays or shows at theatres in your country?",
//                                 "audioUrl": "https://ielts-practice-sets-speaking-questions-audio-mp3-6f3825312bd5.s3.ap-south-1.amazonaws.com/a20t1s3-0-0-en_male_hades_moon_bigtts.mp3"
//                             },
//                             {
//                                 "question": "How easy is it to get tickets to the theatre?",
//                                 "audioUrl": "https://ielts-practice-sets-speaking-questions-audio-mp3-6f3825312bd5.s3.ap-south-1.amazonaws.com/a20t1s3-0-1-en_male_hades_moon_bigtts.mp3"
//                             },
//                             {
//                                 "question": "Do you think theatres need to do more to attract younger audiences?",
//                                 "audioUrl": "https://ielts-practice-sets-speaking-questions-audio-mp3-6f3825312bd5.s3.ap-south-1.amazonaws.com/a20t1s3-0-2-en_male_hades_moon_bigtts.mp3"
//                             }
//                         ]
//                     },
//                     {
//                         "items": [
//                             {
//                                 "question": "What do you think attracts people to working as an actor?",
//                                 "audioUrl": "https://ielts-practice-sets-speaking-questions-audio-mp3-6f3825312bd5.s3.ap-south-1.amazonaws.com/a20t1s3-1-0-en_male_hades_moon_bigtts.mp3"
//                             },
//                             {
//                                 "question": "What are some of the qualities that a person needs to have if they want to become an actor?",
//                                 "audioUrl": "https://ielts-practice-sets-speaking-questions-audio-mp3-6f3825312bd5.s3.ap-south-1.amazonaws.com/a20t1s3-1-1-en_male_hades_moon_bigtts.mp3"
//                             },
//                             {
//                                 "question": "Can you think of any disadvantages of working as an actor?",
//                                 "audioUrl": "https://ielts-practice-sets-speaking-questions-audio-mp3-6f3825312bd5.s3.ap-south-1.amazonaws.com/a20t1s3-1-2-en_male_hades_moon_bigtts.mp3"
//                             }
//                         ]
//                     }
//                 ]
//             }
//         },
//         "msg": "OK"
//     }
// }




// -------------------------------------
// ------ RETURNS DATA LIKE THIS -------
// -------------------------------------


// export const speaking_transcripts = [
//     {
//         part: 1,
//         questions: [
//             { id: 1, transcript: "Now, in this part of the test, I will ask you some questions about yourself. After each question, there will be a beep sound. You will have 20 seconds to speak after the beep. So, Do you live in a house or an apartment?", audioUrl: "https://www.dropbox.com/scl/fi/lavenjfp9ytt2zjaakdp8/part1_q1.mp3?rlkey=zz72y2kgpyqvhuoxzxpggbp2j&st=ihrhvftw&raw=1" },
//             { id: 2, transcript: "What do you like about your home? What makes it a nice place to live?", audioUrl: "https://www.dropbox.com/scl/fi/ioz0dboc6qtqs1iljfzj4/part1_q2.mp3?rlkey=fats4apx4cflwmeinov66b9rw&st=vafatnpf&raw=1" },
//             { id: 3, transcript: "Is there anything you would like to change about it? Why?", audioUrl: "https://www.dropbox.com/scl/fi/hd3bod49ulbl4kbm2rkqi/part1_q3.mp3?rlkey=z4ocv6e7dzs4c85o58uz73fb3&st=2r3pbcvv&raw=1" },
//             { id: 4, transcript: "What kind of home would you like to live in, in the future?", audioUrl: "https://www.dropbox.com/scl/fi/d5eyuh9los2hu0hewashw/part1_q4.mp3?rlkey=1f72y532060cs76ojj6oioyqo&st=yguhjpq3&raw=1" },

//             { id: 5, transcript: "I’d like to move on and ask you some questions about travelling. Do you like travelling to new places?", audioUrl: "https://www.dropbox.com/scl/fi/vq5qgrr6umuenv2o8j8th/part1_q5.mp3?rlkey=1ppz0rg5393xl3pp94k.s3jw7t&st=9xg9cyd6&raw=1" },
//             { id: 6, transcript: "What kind of places do you prefer to visit—cities, beaches, or mountains?", audioUrl: "https://www.dropbox.com/scl/fi/ftd7exuweq2pz61ifhvy7/part1_q6.mp3?rlkey=23yjzwg9a7fdqz1c0lr3iuijm&st=x0he9dax&raw=1" },
//             { id: 7, transcript: "Do you usually travel alone or with others? Why?", audioUrl: "https://www.dropbox.com/scl/fi/gjvg7w0c9vdtne0r97sr0/part1_q7.mp3?rlkey=x81ybt9eeihdwc91h43khlt7c&st=0t2gykoj&raw=1" },
//             { id: 8, transcript: "Have your travel preferences changed over the years? And In what way?", audioUrl: "https://www.dropbox.com/scl/fi/nbync3ccisk7d346oaasy/part1_q8.mp3?rlkey=5pr7p8vsachozv5c4v9js8ssn&st=te8extf8&raw=1" },
//         ]
//     },
//     {
//         part: 2,
//         questions: [
//             {
//                 id: 9,
//                 transcript: "Describe a time when you had to make a difficult decision.",
//                 audioUrl: "https://www.dropbox.com/scl/fi/kfxzbxcu1h5yxrnc5ii9l/part2.mp3?rlkey=fp5n48br5yco5xtyx30ckl60j&st=wosk9u5b&raw=1"
//                 displayQuestions: [
//                    "what play or film you’d like to go to see again",
//                    "who you would go with",
//                    "what other people have said about this play or film",
//                    "and explain why you would like to see this play or film again with friends."
//                  ]
//             }
//         ]
//     },
//     {
//         part: 3,
//         questions: [
//             { id: 10, transcript: "You’ve just spoken about a difficult decision. Let’s explore this topic a bit more. Why do you think some decisions are harder to make than others?", audioUrl: "https://www.dropbox.com/scl/fi/f8pz78qdsaw27vs7vy16y/part3_q1.mp3?rlkey=0fb43uggv4vzpa9dmalmjn3jn&st=toxde7hc&raw=1" },
//             { id: 11, transcript: "What qualities are important when making important decisions?", audioUrl: "https://www.dropbox.com/scl/fi/oiguh3z2b9xooyyeddp5y/part3_q2.mp3?rlkey=im02g1m7arv92kpxiiy09i86y&st=bwnkrnql&raw=1" },
//             { id: 12, transcript: "Do you think people today face more difficult choices than in the past? Why or why not?", audioUrl: "https://www.dropbox.com/scl/fi/y811up06q83esy11ac0mz/part3_q3.mp3?rlkey=vlz07d7hadcn8op4us6l2i596&st=njn0i0yo&raw=1" },

//             { id: 13, transcript: "Let’s move on and talk about decision-making in society. How do governments make decisions that affect the public?", audioUrl: "https://www.dropbox.com/scl/fi/ucxh702eqove8flcmihln/part3_q4.mp3?rlkey=0xh00151paiafc49s9d6ccidp&st=9gbqe44l&raw=1" },
//             { id: 14, transcript: "Do you believe individuals should be more involved in public decision-making? Why or why not?", audioUrl: "https://www.dropbox.com/scl/fi/6xofetzxyvuyelq8b8kin/part3_q5.mp3?rlkey=ms9ssdecmbxdp6gr6eu4e5hap&st=arl8w9ud&raw=1" },
//             { id: 15, transcript: "How can technology help or hinder the decision-making process?", audioUrl: "https://www.dropbox.com/scl/fi/9yoa8fqf6qbwv8qvspif5/part3_q6.mp3?rlkey=16fpf8uarbig23g68jijfvz55&st=610vt465&raw=1" },
//         ]
//     }
// ]
