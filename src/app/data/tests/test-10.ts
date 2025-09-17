// https://www.youtube.com/watch?v=lJ9OTAuZdTo
export const listening_section_1 = {
    audio: "https://www.dropbox.com/scl/fi/i1dqw19x9ro9f0yy5alrq/part1.mp4?rlkey=eq5c8ewxo6wxush1mryvcxbhn&st=ub0x5yb0&raw=1",
    questions: [
        {
            questionType: "multiple-choice-single",
            questions: [
                {
                    id: 1,
                    question: "Why did you buy Pestaway?",
                    options: [
                        "Cockroaches",
                        "Fleas",
                        "Ants"
                    ]
                },
                {
                    id: 2,
                    question: "How did you first hear about Pestaway?",
                    options: [
                        "Friend",
                        "Advertisement",
                        "Radio advertisement"
                    ]
                },
                {
                    id: 3,
                    question: "Where they use Pestaway?",
                    options: [
                        "Kitchen",
                        "Bathroom",
                        "Bedroom"
                    ]
                }
            ]
        },
        {
            questionType: "short-answer",
            instructions: "Complete the sentences below. Write ON MORE THAN TWO WORDS for each answer.",
            questions: [
                {
                    id: 4,
                    sentence: "How long has the woman been using Pestaway? (4) _______"
                },
                {
                    id: 5,
                    sentence: "How often does she use it? (5) _______"
                }
            ]
        },
        {
            questionType: "multiple-choice-single",
            questions: [
                {
                    id: 6,
                    question: "Where did you buy it?",
                    options: [
                        "A. Supermarket",
                        "B. Department",
                        "C. Corner shop"
                    ]
                }
            ]
        },
        {
            questionType: "form-completion",
            formData: {
                title: "Pestaway User Information",
                sections: [
                    {
                        title: "Details:",
                        fields: [
                            {
                                label: "Name:",
                                content: "Mary (7) _______",
                                id: 7
                            },
                            {
                                label: "Address:",
                                content: "(8) _______ holly Peterford",
                                id: 8
                            },
                            {
                                label: "Age:",
                                content: "(9) _______",
                                id: 9
                            },
                            {
                                label: "Occupation:",
                                content: "(10) _______",
                                id: 10
                            }
                        ]
                    }
                ]
            }
        }
    ],
}

export const listening_section_2 = {
    audio: "https://www.dropbox.com/scl/fi/b6ozo7h411jymek70a5vt/part2.mp4?rlkey=4schpqe8st1yz5gnnzxifgc0g&st=iud5h0mm&raw=1",
    questions: [
        {
            questionType: "multiple-choice-single",
            questions: [
                {
                    id: 11,
                    question: "The Treloar Valley passenger ferry",
                    options: [
                        "A. usually starts services in April",
                        "B. departs at the same time each day",
                        "C. is the main means of transport for local villagers"
                    ]
                },
                {
                    id: 12,
                    question: "What does speaker say about the river cruise?",
                    options: [
                        "A. It can be combined with a train journey",
                        "B. It's unsuitable for people who have walking difficulties",
                        "C. The return journey takes up to four hours"
                    ]
                },
                {
                    id: 13,
                    question: "What information is given about train services in the area?",
                    options: [
                        "A. Train run nonstop between Calton and Plymouth",
                        "B. One section of the rail track is raised",
                        "C. Booking can be made by telephone or the internet"
                    ]
                },
                {
                    id: 14,
                    question: "The 'River' bus ticket",
                    options: [
                        "A. Can be used for up to five journeys a day",
                        "B. Is valid for weekend travel only",
                        "C. Has recently gone down in price"
                    ]
                }
            ]
        },
        {
            questionType: "image-labeling",
            image_url: "https://www.dropbox.com/scl/fi/ejx3l6ew1aw39ft6f354r/part2_q15-20.png?rlkey=7xvsnajdrdiqq965frz7pmdub&st=jrg3dk9q&raw=1",
            instructions: "Complete the map below. Choose the correct letter from A–H.",
            questions: [
                {
                    id: 15,
                    location: "Bus stop"
                },
                {
                    id: 16,
                    location: "Car park"
                },
                {
                    id: 17,
                    location: "Museum"
                },
                {
                    id: 18,
                    location: "Mill"
                },
                {
                    id: 19,
                    location: "Potter's studio"
                },
                {
                    id: 20,
                    location: "Cafe"
                }
            ]
        }
    ]
}

export const listening_section_3 = {
    audio: "https://www.dropbox.com/scl/fi/fjllt15ccdf7frzm52p9k/part3.mp4?rlkey=jj4al2jsi0ebjuec1vxutc1uj&st=h84kk0az&raw=1",
    questions: [
        {
            questionType: "table-completion",
            tableData: {
                headers: ["STUDENT NAME", "BUSINESS", "DAY AM/PM", "STARTING DATE", "ANSWER"],
                rows: [
                    {
                        cells: [
                            { content: "Theresa" },
                            { content: "University Book Shop" },
                            { content: "Friday Mornings" },
                            { content: "23/3" },
                            { content: "No Change" }
                        ]
                    },
                    {
                        cells: [
                            { content: "Manuel" },
                            { content: "Mainly Music" },
                            { content: "Tuesday Mornings" },
                            { content: "7/3" },
                            { content: "(21)_______ afternoons", id: 21 }
                        ]
                    },
                    {
                        cells: [
                            { content: "Henry" },
                            { content: "The (22)_______", id: 22 },
                            { content: "Thursday Mornings" },
                            { content: "22/3" },
                            { content: "No Change" }
                        ]
                    },
                    {
                        cells: [
                            { content: "JO" },
                            { content: "Highway Hotels" },
                            { content: "Monday Mornings" },
                            { content: "5/3" },
                            { content: "Monday 12th (23)_______", id: 23 }
                        ]
                    },
                    {
                        cells: [
                            { content: "Nancy" },
                            { content: "Explore Travel Service" },
                            { content: "Wednesday Mornings" },
                            { content: "14/3" },
                            { content: "(Wednesday) (24)_______", id: 24 }
                        ]
                    },
                    {
                        cells: [
                            { content: "Chris" },
                            { content: "(25)_______", id: 25 },
                            { content: "Wednesday Mornings" },
                            { content: "14/3" },
                            { content: "No Change" }
                        ]
                    },
                    {
                        cells: [
                            { content: "Gordon" },
                            { content: "Games to GO!" },
                            { content: "Tuesday Mornings" },
                            { content: "20/3" },
                            { content: "(26)_______ 21st March", id: 26 }
                        ]
                    }
                ]
            }
        },
        {
            questionType: "note-completion",
            topic: "",
            oneWord: true,
            sections: [
                {
                    title: "Work Experience Placement",
                    bulletPoints: [
                        {
                            id: 27,
                            text: "Starting times (27) _______ a.m. and 1 pm"
                        },
                        {
                            id: 28,
                            text: "If ill, phone Company first then (28) _______"
                        }
                    ]
                },
                {
                    title: "Presentation:",
                    bulletPoints: [
                        {
                            id: 29,
                            text: "Worth (29) _______ of assessment"
                        },
                        {
                            id: 30,
                            text: "Include visuals e.g. (30) _______ and flow chart"
                        }
                    ]
                }
            ]
        }
    ]
}

export const listening_section_4 = {
    audio: "https://www.dropbox.com/scl/fi/y0y8s9c9lwxu9t5x0hnjs/part4.mp4?rlkey=5q42pp548cxt535uowaxx6aj9&st=tyly5918&raw=1",
    questions: [
        {
            questionType: "short-answer",
            topic: "Can babies remember any",
            instructions: "Complete the sentences below. Write NO MORE THAN TWO WORDS for each answer.",
            questions: [
                {
                    id: 31,
                    sentence: "(31) _______ ?"
                },

            ]
        },
        {
            questionType: "note-completion",
            topic: "Experiment with babies",
            sections: [
                {
                    title: "Experiments List",
                    bulletPoints: [
                        {
                            text: "Apparatus: Baby in cot"
                        },
                        {
                            text: "Colurful mobile"
                        },
                        {
                            id: 32,
                            text: "some (32) _______"
                        },
                        {
                            text: "Re-introduce"
                        },
                        {
                            id: 33,
                            text: "Mobile between one and (33) _______ later."
                        }
                    ]
                }
            ]
        },
        {
            questionType: "table-completion",
            multiWord: true,
            tableData: {
                headers: ["Baby's age", "Maximum memory span"],
                rows: [
                    {
                        cells: [
                            { content: "2 months" },
                            { content: "2 days" }
                        ]
                    },
                    {
                        cells: [
                            { content: "3 months" },
                            { content: "(34)_______", id: 34 }
                        ]
                    },
                    {
                        cells: [
                            { content: "21 months" },
                            { content: "several weeks" }
                        ]
                    },
                    {
                        cells: [
                            { content: "2 years" },
                            { content: "(35)_______", id: 35 }
                        ]
                    }
                ]
            }
        },
        {
            questionType: "sentence-completion",
            oneWord: true,
            questions: [
                {
                    id: 36,
                    sentence: "Research questions: is memory linked to (36) _____ development?"
                },
                {
                    id: 37,
                    sentence: "Can babies (37) _____ their memories?"
                }
            ]
        },
        {
            questionType: "note-completion",
            topic: "Experiment with older children",
            sections: [
                {
                    title: "Stages in incident",
                    bulletPoints: [
                        {
                            text: "<<subpoint>> (a) lecture taking place"
                        },
                        {
                            text: "<<subpoint>> (b) object falls over"
                        },
                        {
                            id: 38,
                            text: "<<subpoint>> (c) (38) _______"
                        }
                    ]
                }
            ]
        },
        {
            questionType: "table-completion",
            tableData: {
                headers: ["Age", "% remembered next day", "% remembered after 5 months"],
                rows: [
                    {
                        cells: [
                            { content: "Adults" },
                            { content: "70%" },
                            { content: "(39)_______", id: 39 }
                        ]
                    },
                    {
                        cells: [
                            { content: "9-years-olds" },
                            { content: "70%" },
                            { content: "Less than 60%" }
                        ]
                    },
                    {
                        cells: [
                            { content: "6-years-olds" },
                            { content: "just under 70%" },
                            { content: "(40)_______", id: 40 }
                        ]
                    }
                ]
            }
        }
    ],
}


// https://practicepteonline.com/ielts-reading-test-176/
export const reading_section_1 = {
    reading_passage: {
        title: "family names",
        subtitle: "",
        passage: `
        Any specific study of words and language almost invariably has an obscure name, and that includes the study of people’s names themselves. This science is called anthroponomastics (anthropos being man, and onoma being name) but do not expect that word to be useful in your life. Yet all people possess names, and most possess several. With respect to the apparently random family name, if one traces back far enough in time, there is inevitably a formative logic that warrants some reflection. After all, that is the name people will carry their whole lives (name changes aside), and pass on to their descendants.
Considering early Britain, populations at that time lived in small farming hamlets, where they generally stayed their whole lives, and people had one name only. Being the only person named ‘John’ in the village allowed that single name to sufficiently distinguish that person from all others. If another John did exist, one could simply add some description to the name: ‘John the carpenter’ versus ‘John near the hill’, and a third could be ‘John, Peter’s son’. Such additions were mostly short-lived and not passed down to descendants. But of course, life was not destined to remain that simple.
With townships increasing in population, people becoming more mobile, and invading armies flowing to and fro, complications set in. In England, the process of adopting family names (or ‘surnames’ or ‘second names’) did not happen suddenly, but if one had to pick a fixed date, 1379 would be a good start. This was when the government introduced a poll tax, the administration of which required a list of the names of every adult in the kingdom. Suddenly, there were too many Johns to deal with. To resolve this issue, the later Additions Statute (1413) insisted that all names also come with the bearers’ occupation and place of residence. With such increasing bureaucracy, fixed and heritable family names would eventually become a necessity.
There were many methods by which these names were decided. The most obvious was to use that place of residence, although this method did come with the obvious problem that all residents of, say, Wickham, could not take the family name ‘Wickham’ without causing obvious confusion. Still, jumping to Italy, this did not prevent Leonardo da Vinci (from Vinci) becoming the town’s most famous export. Moving back to England, family names could also derive from personal beliefs (resulting in Mope, Christian, Godley, and others) or physical attributes, giving us Armstrong, Short, Brown, and others. Such names are often disguised by their original Gaelic derivation. Guilfoyle means ‘follower of (Saint) Paul’; Kennedy means ‘ugly head’.
Quite common also was to be named from the trade or profession carried out, resulting in names such as Smith, Butcher, and Carpenter. Many of these refer to professions long made redundant, such as Fletcher (arrow maker), Cooper (barrel maker), or Heyward (fence maintainer). Also common was to be named from geographic features, often ones near where the name-bearer lived. And so there is Hill, Bush, Underwood (‘under the wood’), Eastlake, Bridges, and many others. Finally, names often showed the relationships among families, where ‘son of Peter’ became ‘Peter’s son’, in turn becoming ‘Peterson’. Similarly, there is Johnson, Harrison, and Robertson. In Scots, ‘Mac’ was used, giving MacDonald, MacPherson, and others.
With the mixing of populations from different countries (especially in America), the original foreign names often suffered. This was either due to mispronunciation, which saw names such as Pfoersching become Pershing, or deliberate modifications to accommodate English pronunciation and spelling. Thus, Krankheit became Cronkite, and Wistinghausen became Westinghouse. Yet even the most English of family names is often historically knocked around a fair bit in terms of spelling and pronunciation before settling into its final form. Old English spellings, for example, were often lost in favour of phonetic intelligibility, making the determination of exact meaning difficult. .
All this study of family names might lead one to believe that using them is universal. Far from it, and the technical word for a single name only is a mononym. Parts of Africa, India, Central Asia, and Indonesia, as well as many indigenous or aboriginal groups use single names only. In the developed world, such names are usually stage names, reserved for celebrities, artists, singers, or film stars. The entertainment industry in Japan is replete with examples: Mana, Ayaka, and Ichiro, while Korea, China, and Hong Kong, have followed suit. Moving to the West, some will invent names (Bono, Sting, Prince), or just use family names (Liberace, Morrisey), or their first names (Shakira, Cher). Contrasting this, the musician Bjork uses a mononym in accordance with her own culture. As with all Icelanders, she has no family name.
A final point of interest is that in European and Western cultures, the family name is usually given after the first name (in both speaking and writing) — hence the terms ‘first’ and ‘last’ name. Contrasting this, in Asian cultures it is the other way round, reflecting the greater emphasis placed on family relationships. Since many of these cultures have vertical writing, what to the West is a ‘last name’ is in the East, an ‘upper name’.
`
    },
    questions: [
        {
            questionType: "short-answer",
            instructions: "Answer the questions. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
            questions: [
                {
                    id: 1,
                    sentence: "What aspect of family names should make us think more about them? (1) _______"
                },
                {
                    id: 2,
                    sentence: "Originally, what was needed to distinguish two same first names? (2) _______"
                },
                {
                    id: 3,
                    sentence: "What legislation began the process of using family names? (3) _______"
                },
                {
                    id: 4,
                    sentence: "What made family names, in time, necessary? (4) _______"
                }
            ]
        },
        {
            questionType: "matching-features",
            question: {
                question_statement: "What system was used for the formation of the following names?",
                statements_title: "Names",
                statements: [
                    { id: 5, text: "Bono" },
                    { id: 6, text: "da Vinci" },
                    { id: 7, text: "Pershing" },
                    { id: 8, text: "Heyward" },
                    { id: 9, text: "Guilfoyle" },
                ],
                features_title: "Options",
                features: [
                    { letter: "A", description: "Personal belief" },
                    { letter: "B", description: "Place of residence" },
                    { letter: "C", description: "Mistake" },
                    { letter: "D", description: "Mononym" },
                    { letter: "E", description: "Profession" },
                    { letter: "F", description: "Geographic feature" },
                ],
            }
        },
        {
            questionType: "sentence-completion",
            questions: [
                {
                    id: 10,
                    sentence: "‘Mac’ in Scottish means (10) _____."
                },
                {
                    id: 11,
                    sentence: "In order to be easier to write, foreign names often had (11) _____."
                },
                {
                    id: 12,
                    sentence: "Spelling changes in names can make it hard to know their (12) _____."
                },
                {
                    id: 13,
                    sentence: "The term ‘upper name’ is used because of Asia’s (13) _____."
                }
            ]
        }
    ]
}

export const reading_section_2 = {
    reading_passage: {
        title: "sampling bias",
        subtitle: "",
        passage: `
Our primitive ancestors left many paintings on the walls inside caves. Additionally, inside and near these places there is evidence of fire pits, and refuse and burial sites. However, one could equally imagine this same evidence of daily life on exposed cliffs or hillsides, on trees or animals skins, and beside rivers and coastlines. Such evidence, if it existed, would have long been washed, eroded, or rotted away. Thus, prehistoric people are characterised as ‘cavemen’, presumed to have a predilection for dwelling in these places only because that is where most evidence is taken. This ‘caveman effect’ is an example of what is known as ‘sampling bias’ — one of the biggest problems when conducting any form of statistical data gathering.
Surveys, for example, are popular because they are easy to administer and relatively cost-effective, particularly if conducted remotely through technical means, such as telephone, mail, email, or the Internet. Surveys also lend themselves to obtaining particularly large numbers of respondents, which, in theory, allows a greater chance of sampling all the variations of the target population. They can also be standardised with fixed questions and responses (such as ‘tick the box’ or ‘closed-ended’ questions). This allows easy collation, analysis, and presentation of results, all with the air of precision that mathematics brings. Such surveys, however, have proven notoriously unreliable because of the difficulty in obtaining representative samples. In other words, the sampling is biased, or skewed in favour of certain outcomes.
Let us look at some examples. If one calls people on cellphones, it immediately excludes those who favour landlines, and thus the sample of respondents may be those who are more technically-conversant, skewing data based on, say, technical issues (‘How often do you use the Internet?’). If one rings domestic homes during the daytime, most of those who work during the day will be excluded. Those that answer will more likely be the unemployed, disabled, elderly, and retired, skewing data based on, say, work-related issues (‘How important is work in your life?’). No matter how large the sampling size is, sampling bias can immediately invalidate the results.
One of the more subtle of sampling biases is known as self-selection. No matter how rigorously the respondents are chosen to be random and characteristic of the target population, those who choose to respond will be different to those who do not. Generally, respondents who are willing to invest time in giving answers obviously want to say something, whereas those who choose not to answer probably do not. Thus, any survey in which many respondents do not answer, do not give clear answers, or only give cursory or unthinking answers, is immediately invalidated, since opinionated perspectives are disproportionately represented.
The latter is such an immediate and obvious problem that it has given rise to techniques to maximise the possibility of garnering responses. One of the more effective is to give the respondents advanced warning (often through the mail), highlighting the time, the nature of the survey, and the mode of delivery, as well as expressing appreciation for the assistance. The interviewers themselves must be sufficiently trained in correct question-asking techniques, and, with cranks, salespeople, and scam-artists abounding, interviewers must provide introductions about themselves, their company, and the nature of the interview, fully and with evident sincerity, in order to gain the trust of those they are talking to.
Even with this, sampling bias can easily arise due to the number of variables in place, since it only takes one to skew the data. If taking samples from a specific location — say, a street corner—then it may be that this location is in the business district, excluding ordinary workers from the sample. It may be that it is near a restaurant district, excluding those who cook more often for themselves. If there is a health club nearby, the majority of respondents may be much healthier than the average of the population. If it is on a university campus, designed to poll university students, is it near the engineering or the arts faculty? The part-time or full-time schools? Are they rich or poor? Male or female? What about race, colour, gender, religion, socio-economic background, and first language? The list goes on and on.
One method to deal with this is to make sure all targeted groups are represented, if only a little, and make mathematical extrapolations to correct the bias. For this to work, the degree of underrepresentation needs to be quantified exactly, and one needs to assume the under-represented respondents are indeed typical of their kind. If, for example, one aims to find the opinion of the population regarding the outcome of an election, but could only, for whatever reasons, interview one woman for every four men, the responses of the women could be multiplied by four, and thus, one can assume (guardedly and with many provisos), that the sampling bias from gender has been corrected. But that does assume all the other variables which introduce bias have been excluded — often a very problematic assumption to make.
        `
    },
    questions: [
        {
            questionType: "true-false-notgiven",
            questions: [
                {
                    id: 14,
                    statement: "Cavemen were often very good artists."
                },
                {
                    id: 15,
                    statement: "Surveys can be done cheaply by telephone."
                },
                {
                    id: 16,
                    statement: "Surveys can usually give reliable information."
                },
                {
                    id: 17,
                    statement: "The elderly and disabled people are often at home during the day."
                },
                {
                    id: 18,
                    statement: "Larger survey samples can reduce sampling bias."
                }
            ]
        },
        {
            questionType: "flow-chart-completion",
            question: {
                image_url: "https://www.dropbox.com/scl/fi/4hgu01hw0o7gjk20eof7t/test10_q19-24.png?rlkey=jt10fa0j62ynay9p9q86n3wgj&st=8oitdec8&raw=1",
                id: [19, 20, 21, 22, 23, 24],
            },
        },
        {
            questionType: "multiple-choice-single",
            questions: [
                {
                    id: 25,
                    question: "The number of sampling variables",
                    options: [
                        "is usually not so large.",
                        "can result in important input being lost.",
                        "means many locations need to be used.",
                        "can result in lists being necessary."
                    ]
                },
                {
                    id: 26,
                    question: "Mathematical extrapolation",
                    options: [
                        "can yield confident results.",
                        "requires responses from both men and women.",
                        "needs exact ratios.",
                        "needs many respondents."
                    ]
                }
            ]
        }
    ]
}

export const reading_section_3 = {
    reading_passage: {
        title: "The Biggest Impact",
        subtitle: "",
        passage: `
In 1980 a team of researchers were analysing soil samples at what was then known as the KT boundary. The K is misleading, as it actually refers to the cretaceous era, while the T refers to the tertiary era. What made geologists originally place a division in that distant time, some 65 million years ago, was the mass extinction which then occurred, seeing over two thirds of all land and sea life disappear, including the dinosaurs — or more strictly, all non-birdlike dinosaurs (since birds are now considered dinosaurs’ descendants). Whilst this was not the biggest extinction of all, it is definitely the most famous. But what caused it?
The researchers discovered that sedimentary layers at the KT boundary contained a concentration of iridium many times higher than what normally occurs — up to 120 times. Most iridium disappeared when the Earth was molten, sinking into its metallic core. However, this element is abundant in asteroids and comets, which led to an intriguing hypothesis — that an asteroid or comet had struck the Earth, causing the mass extinction. The object would have vaporised almost immediately upon impact, throwing its iridium-rich contents into the atmosphere, from where it eventually settled across the entire planet. The problem was, an asteroid large enough to do this would have left traces of its impact in the Earth’s crust, and at that time there were no known signs. Or were there?
In actual feet, in the 1960s, a contractor named Baltosser working for a Mexican state-owned oil company had looked at a gravity map of the Yucatán Peninsula, near the Gulf of Mexico. He noticed a large arc-shape, showing a symmetry that was impossible to naturally occur. Company policy forbade him from releasing his findings, and so the secret lay until 1978, when two geophysicists, Camargo and Penfield, working for the same company, discovered it again. In the search for possible oil-drilling sites, they had been examining magnetic surveys in the Gulf of Mexico, which revealed an underwater arc. The two arcs, sea-based and land-based, matched perfectly, showing a circle 180 kilometers wide, centred on the coastal village of Chicxulub, and so it became known as the Chicxulub Crater.
In 1981, Camargo and Penfield released their findings, but the world was not listening. It took over ten years, and much more evidence (rock samples, drilling cores, and dating of the seabed rocks to the magic figure of 65 million years), before scientists began to accept the findings, although widespread skepticism existed, and still remains, to some extent, today. It is occasionally argued that the impact was not the sole reason for the mass extinction, or that there were other contemporaneous impacts, or that extensive volcanism or climate and sea-level change were the real causes. It was perhaps this that led, in 2010, to an international panel of over 40 scientists being convened in order to specifically address the evidence. They concluded that an asteroid impact, as evidenced by the Chicxulub Crater, was indeed the cause of the mass extinction.
Trying to picture that event, the most powerful ever in the Earth’s history, strains the imagination. It begins with a 10-15 kilometer wide rock appearing from nowhere, almost instantaneously vaporising, and releasing over two million times the energy of an atomic bomb. The most immediate effect is a cloud of super-heated dust, ash, and steam expanding outwards, igniting fires, and broiling everything in its path. A split second later follows a series of shock waves, traveling across the surface of the globe, triggering earthquakes and volcanic eruptions. Next there is a ‘mega-tsunami’, thousands of meters high, ripping coastlines apart and stirring up the oceans. Then, in the next few weeks, the huge amounts of carbon dioxide from the vaporisation of carbonate rock heats the Earth, but with the atmosphere choked with dust for years, sunlight is blocked, killing off plants, ultimately plunging the Earth into winter and the entire biosphere into absolute chaos.
The surprising fact is not that so many creatures became extinct, but that so many survived! With global disruption to plant communities, the herbivorous dinosaurs died quickly, and their predators soon followed. Sea-based life suffered disastrously, and all giant marine reptiles disappeared, yet the ancestors of the crocodile survived. It is theorised that, like modern crocodiles, they were semi-aquatic and thus were able to shelter in the water from fires and blast damage, and yet could scavenge on land amongst the abundance of dead animals for years afterwards. Similarly, insects, worms, and molluscs could all feed on dead plant and animal matter, allowing those that fed on these creatures to survive. Consequently, insectivores, scavengers, or those with omnivorous eating habits, including mammals and smaller bird-like reptiles, were preserved.
Thus, the dinosaurs as we know them, after 135 million years as the dominant land animal, were all but gone. This allowed mammals, then only small burrowing cat-like creatures (attributes which had also helped ensure their survival throughout the disaster), to emerge from the undergrowth, diversity, and eventually rule the land. In an ironic consequence, that class of animal ultimately led to species Homo sapiens, or human beings. So, were it not for that disastrous extinction 65 million years ago, we would not be here today.
        `
    },
    questions: [
        {
            questionType: "match-headings",
            question: {
                headings: [
                    { number: "i", text: "The situation in the sea" },
                    { number: "ii", text: "The first piece of evidence" },
                    { number: "iii", text: "A fortunate consequence" },
                    { number: "iv", text: "Preservation strategies" },
                    { number: "v", text: "Company procedures" },
                    { number: "vi", text: "The mystery of the border" },
                    { number: "vii", text: "A first-hand view" },
                    { number: "viii", text: "An unexpected element" },
                    { number: "ix", text: "A final decision" },
                    { number: "x", text: "Heated debate" }
                ],
                id: [27, 28, 29, 30, 31, 32]
            }
        },
        {
            questionType: "summary-completion",
            multiWord: true,
            question: {
                id: [33, 34, 35, 36, 37],
                title: "Baltosser’s Discovery",
                passageTemplate: `
Baltosser, a contractor, was the first to identify the <33>, but could not reveal this information because of <34>. Years later, the discovery of <35> at the KT boundary added further evidence, after which Camargo and Penfield finally showed the world Baltosser’s discovery. Nevertheless, they had to overcome <36> until an international commission confirmed this event as the real reason for the <37> which followed.
        `,
            }
        },
        {
            questionType: "multiple-choice-single",
            questions: [
                {
                    id: 38,
                    question: "After the asteroid struck the Earth:",
                    options: [
                        "A. the shock wave was followed by the object’s vaporisation.",
                        "B. the Earth warmed before going cold.",
                        "C. the tsunami caused earthquakes and volcanic eruptions.",
                        "D. the eruptions plunged the atmosphere into chaos."
                    ]
                },
                {
                    id: 39,
                    question: "In the aftermath of the asteroid strike",
                    options: [
                        "A. all the dinosaurs died.",
                        "B. all reptiles died.",
                        "C. the dead animals were important.",
                        "D. the water allowed shelter for mammals."
                    ]
                },
                {
                    id: 40,
                    question: "Mammals of that time survived because they",
                    options: [
                        "A. consumed dead animals and plant.",
                        "B. were large and strong.",
                        "C. lived in the shadows of trees.",
                        "D. were a special class of animals."
                    ]
                }
            ]
        }
    ]
}


// https://practicepteonline.com/ielts-writing-test-79/
export const writingTasks = [
    {
        id: 1,
        timeLimit: "You should spend about 20 minutes on this task.",
        wordLimit: "Write at least 150 words.",
        prompt: [
            "The line graph below shows the number of annual visits to Australia by overseas residents. The table below gives information on the country of origin where the visitors came from.",
            "Write a report for a university lecturer describing the information given"
        ],
        image_url: "https://www.dropbox.com/scl/fi/m00xnkrqc3m357mb15f88/test10_q1.png?rlkey=mkpee5fc3eyxhuig2xsg7ib41&st=m0fselv0&raw=1"
    },
    {
        id: 2,
        timeLimit: "You should spend about 40 minutes on this task.",
        wordLimit: "Write at least 250 words.",
        prompt: [
            "Some countries encourage teenagers to have part-time job and see it as a good thing, while others disagree.",
            "Give your opinion and explain both views."
        ],
    }
]



// CHATGPT GENERATED
export const speaking_transcripts = [
    {
        part: 1,
        questions: [
            { id: 1, transcript: "Now, in this part of the test, I will ask you some questions about yourself. After each question, there will be a beep sound. You will have 20 seconds to speak after the beep. So, How do you usually spend your mornings on weekdays?", audioUrl: "https://www.dropbox.com/scl/fi/yrjqvzz29r1n5re8zo6sg/part1_q1.mp3?rlkey=be9pmzahboperz7aqqp7a0cw9&st=nmd6gd8a&raw=1" },
            { id: 2, transcript: "Do you prefer a busy schedule or a relaxed one? Why?", audioUrl: "https://www.dropbox.com/scl/fi/wyae8as2xswmlcej3b5jr/part1_q2.mp3?rlkey=iwwmbpzjfonvvlx0dbudhdcw8&st=prbufmyf&raw=1" },
            { id: 3, transcript: "Has the way you organize your day changed in recent years?", audioUrl: "https://www.dropbox.com/scl/fi/tvnpxvtl6m000kc6a9tqd/part1_q3.mp3?rlkey=ww1q6wrqk35zokir97c8lvigh&st=xjbw4qip&raw=1" },
            { id: 4, transcript: "Is there a day you remember that went perfectly well? Why?", audioUrl: "https://www.dropbox.com/scl/fi/6a1957c1ljcawkf4ipj8y/part1_q4.mp3?rlkey=s9p6nweyhlwso9naocepa536v&st=4x74r489&raw=1" },

            { id: 5, transcript: "I’d like to move on and ask you some questions about hobbies. What hobbies do you enjoy in your free time?", audioUrl: "https://www.dropbox.com/scl/fi/pve04kyhu3pf9onchgek9/part1_q5.mp3?rlkey=eqre377x2wlc2d51jsebrqqhc&st=k4msyhsl&raw=1" },
            { id: 6, transcript: "Have you tried any new hobbies recently?", audioUrl: "https://www.dropbox.com/scl/fi/25q2cllho3q0rfro5dlz3/part1_q6.mp3?rlkey=1h6m1bozk41103ar6ao4vmch5&st=0rwspeky&raw=1" },
            { id: 7, transcript: "Do you think hobbies are important for people’s lives? Why?", audioUrl: "https://www.dropbox.com/scl/fi/gfsz2553e8kxa9h5o3cwr/part1_q7.mp3?rlkey=nzkwob2j40mroxe0hao3eo3j5&st=s4e5h5j6&raw=1" },
            { id: 8, transcript: "How do hobbies help people relax or develop skills?", audioUrl: "https://www.dropbox.com/scl/fi/trkty8f4ly0i48g7x5d2z/part1_q8.mp3?rlkey=23emzemqa865k4fwt7ge9xqyl&st=aevlezu8&raw=1" }
        ]
    },
    {
        part: 2,
        questions: [
            {
                id: 9,
                transcript: "Describe a place in nature that you found beautiful.",
                audioUrl: "https://www.dropbox.com/scl/fi/m2xcgz4u19jm5z0cqbjx1/part2.mp3?rlkey=owb4vef2e8v3l3z790vqrvz7b&st=tumkjzph&raw=1"
            }
        ]
    },
    {
        part: 3,
        questions: [
            { id: 10, transcript: "You’ve just spoken about a place in nature. Let’s talk more about the environment. Do you think people spend enough time in nature today?", audioUrl: "https://www.dropbox.com/scl/fi/4dm1d0rso36dedfwyyvj5/part3_q1.mp3?rlkey=193ymwaer6kqbbto68vlkpyz3&st=ey6yiv19&raw=1" },
            { id: 11, transcript: "What are the benefits of protecting natural areas?", audioUrl: "https://www.dropbox.com/scl/fi/2sjaz60p8n276h7wtngaj/part3_q2.mp3?rlkey=z3c6p0m3bgndweoj9c112641m&st=364nq9tb&raw=1" },

            { id: 12, transcript: "Should schools teach children more about the environment? Why?", audioUrl: "https://www.dropbox.com/scl/fi/5v5i924n5chdnevwruu06/part3_q3.mp3?rlkey=kaupcuvs8mecnxf42ys1z2024&st=w33y41bl&raw=1" },
            { id: 13, transcript: "What role do governments play in protecting the environment?", audioUrl: "https://www.dropbox.com/scl/fi/pzrhk1vwyw8qjxp36rmt5/part3_q4.mp3?rlkey=h111wjzawsga37y1jcz9h25tc&st=h8pan5ft&raw=1" }
        ]
    }
]





export const reading_answers = {
    1: "formative logic",
    2: "(some) description",
    3: "poll tax",
    4: "increasing bureaucracy",

    5: "D",
    6: "B",
    7: "C",
    8: "E",
    9: "A",

    10: "son (of)",
    11: "deliberate modifications",
    12: "exact meaning",
    13: "vertical writing",

    14: "NOT GIVEN",
    15: "True",
    16: "False",
    17: "True",
    18: "False",

    19: "Self selection",
    20: "Opinionated perspectives",
    21: "maximise (the)",
    22: "sufficiently trained",
    23: "introductions",
    24: "trust",

    25: "B",
    26: "C",

    27: "viii",
    28: "ii",
    29: "ix",
    30: "vii",
    31: "iv",
    32: "iii",

    33: "Chicxulub Crater",
    34: "company policy",
    35: "iridium",
    36: "widespread skepticism",
    37: "mass extinction",

    38: "B",
    39: "C",
    40: "A"
};

export const listening_answers = {
    1: "A",
    2: "C",
    3: "A",

    4: "Two Years",
    5: "Six weeks",

    6: "C",

    7: "Egerton",
    8: "12",
    9: "Over 50",
    10: "House Wife",

    11: "A",
    12: "A",
    13: "B",
    14: "C",

    15: "H",
    16: "F",
    17: "E",
    18: "A",
    19: "B",
    20: "D",

    21: "Friday",
    22: "beauty",
    23: "March",
    24: "afternoons",
    25: "fashion",
    26: "Wednesday",

    27: "9",
    28: "college",
    29: "30%",
    30: "diagrams",

    31: "particular events",

    32: "string",
    33: "14 days",

    34: "fortnight",
    35: "six months",

    36: "language",
    37: "recall / retrieve",

    38: "(an) argument",

    39: "70%",
    40: "40%"
};