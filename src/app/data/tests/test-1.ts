// https://www.youtube.com/watch?v=h0V71Of7VPk
export const listening_section_1 = {
    audio: "https://www.dropbox.com/scl/fi/qqzmc692gj3gmmpnp7smo/part1.mp4?rlkey=e1qn7xfz2jdoo9nu8fimced18&st=glthp4z5&raw=1",
    questions: [
        {
            questionType: "form-completion",
            formData: {
                title: "End of Year Report",
                address: "",
                sections: [
                    {
                        title: "Student Information",
                        fields: [
                            {
                                label: "Name:",
                                content: "Stephen Jarmeson",
                            },
                            {
                                label: "Class:",
                                content: "(1) _______",
                                id: 1,
                            },
                            {
                                label: "Age:",
                                content: "14",
                            },
                        ],
                    },
                ],
            },
        },
        {
            questionType: "table-completion",
            tableData: {
                headers: ["Subject", "Exam Result", "Comment"],
                rows: [
                    {
                        cells: [
                            { content: "Mathematics" },
                            { content: "(2)_______", id: 2 },
                            { content: "A satisfactory year's work." },
                        ],
                    },
                    {
                        cells: [
                            { content: "(3)_______", id: 3 },
                            { content: "48%" },
                            { content: "- Stephen needs to concentrate more in class.\n- He seems to have a very poor (4)_______.", id: 4 },
                        ],
                    },
                    {
                        cells: [
                            { content: "Music" },
                            { content: "40%" },
                            { content: "He is not taking his (5)_______ lessons seriously\n- Stephen tends to (6)_______ a lot in class", id: [5, 6] },
                        ],
                    },
                ],
            },
        },
        {
            questionType: "table-completion",
            tableData: {
                headers: ["Subject", "Exam Result", "Comment"],
                rows: [
                    {
                        cells: [
                            { content: "Geography" },
                            { content: "64%" },
                            { content: "He has improved a lot this year and his project on (7)_______ was excellent.", id: 7 },
                        ],
                    },
                    {
                        cells: [
                            { content: "(8)_______", id: 8 },
                            { content: "58%" },
                            { content: "He seemed to become very interested after our visit to the local (9)_______.", id: 9 },
                        ],
                    },
                    {
                        cells: [
                            { content: "French" },
                            { content: "(10)_______", id: 10 },
                            { content: "Well done! An excellent year's work." },
                        ],
                    },
                ],
            },
        }
    ],
}

export const listening_section_2 = {
    // 7 minute audio   
    audio: "https://www.dropbox.com/scl/fi/74cqsr6egypclqbuc1088/part2.mp4?rlkey=l0i2fsutekqxfbsoivjicvi88&st=7sjsh0rm&raw=1",
    questions: [
        {
            questionType: "image-labeling",
            image_url: "https://www.dropbox.com/scl/fi/m11lvq588wnvucs9l3tjj/part2_q11-17.png?rlkey=65iix7pz77m2oz8v7wn4lbp9b&st=4hgrw51p&raw=1",
            instructions: "Label the map with the correct locations. Write NO MORE THAN THREE WORDS for each answer.",
            questions: [
                {
                    id: 11,
                    location: "Administration office",
                },
                {
                    id: 12,
                    location: "Sports medicine clinic",
                },
                {
                    id: 13,
                    location: "Bike racks",
                },
                {
                    id: 14,
                    location: "Cafe",
                },
                {
                    id: 15,
                    location: "Conference room",
                },
                {
                    id: 16,
                    location: "Men's locker room",
                },
                {
                    id: 17,
                    location: "Pool shop",
                },
            ],
        },
        {
            questionType: "multiple-choice-single",
            questions: [
                {
                    id: 18,
                    question: "The sports centre is open on public holidays from",
                    options: [
                        "7 a.m. to 5 p.m.",
                        "5 a.m. to 7 p.m.",
                        "5 a.m. to 9 p.m.",
                    ]
                }
            ]
        },
        {
            questionType: "multiple-choice-many",
            questions: [
                {
                    id: [19, 20],
                    question: "Which TWO services are covered by the membership fee?",
                    options: [
                        "Personal training",
                        "Swim squads",
                        "Childminding",
                        "Programme design",
                        "Tennis lessons"
                    ]
                }
            ]
        }
    ],
}

export const listening_section_3 = {
    audio: "https://www.dropbox.com/scl/fi/3lqfb4dhl7qru9tkmcj0x/part3.mp4?rlkey=0uei0873t4v4mxvvt7rqu6r5x&st=u0mq82xk&raw=1",
    questions: [
        {
            questionType: "summary-completion",
            question: {
                id: [21, 22, 23, 24, 25, 26],
                title: "Advertisement for a Job",
                passageTemplate: `
An international <21> import firm seeks a young junior Sales manager. Excellent basic salary with opportunities to increase income through high sales <22>. A company <23> is provided. Excellent prospects for ambitious young <24> who have drive and enthusiasm. The applicant must be prepared to <25> and must be able to work well in a <26>.
    `
            }
        },
        {
            questionType: "multiple-choice-single",
            questions: [
                {
                    id: 27,
                    question: "Directed dreamers are people who",
                    options: [
                        "wake up in the middle of a dream.",
                        "can go back to sleep after dreaming.",
                        "can control what they are dreaming.",
                    ]
                },
                {
                    id: 28,
                    question: "Dr. Border is trying to find out if people can",
                    options: [
                        "dream the same dream regularly.",
                        "talk in their sleep.",
                        "meet each other in their dreams.",
                    ]
                },
                {
                    id: 29,
                    question: "What did the experiment require the people to do?",
                    options: [
                        "To go to a river",
                        "To sleep in the same room",
                        "To dream about a particular situation",
                    ]
                },
                {
                    id: 30,
                    question: "What did the interviewer find interesting about the experiment?",
                    options: [
                        "Neither of the men dreamt about the woman.",
                        "The woman only dreamt about one of the men.",
                        "Both the men had an odd dream.",
                    ]
                }
            ]
        }
    ]
}

export const listening_section_4 = {
    audio: "https://www.dropbox.com/scl/fi/qoxbxupilr85c0gehpo18/part4.mp4?rlkey=habn3dps6z9sxrh3smi5evn90&st=ojl5yg1g&raw=1",
    questions: [
        {
            questionType: "table-completion",
            tableData: {
                headers: ["Time Zone", "Outlook", "Feature & Consequences"],
                rows: [
                    {
                        cells: [
                            { content: "* Past" },
                            { content: "Positive" },
                            { content: "Remember good times, e.g. birthdays.\nKeep family records, photo albums, etc." },
                        ],
                    },
                    {
                        cells: [
                            { content: "" },
                            { content: "(31)_______", id: 31 },
                            { content: "Focus on disappointments, failures,\nbad decisions." },
                        ],
                    },
                    {
                        cells: [
                            { content: "* Present" },
                            { content: "Hedonistic" },
                            { content: "Live for (32)_______ ; seek sensation;\navoid pain.", id: 32 },
                        ],
                    },
                    {
                        cells: [
                            { content: "" },
                            { content: "Fatalistic" },
                            { content: "Life is governed by (33)_______ ,\nreligious beliefs, social conditions.\nLife's path can't be changed.", id: 33 },
                        ],
                    },
                    {
                        cells: [
                            { content: "* Future" },
                            { content: "(34)_______", id: 34 },
                            { content: "Prefer work to play. Don't give in to\ntemptation." },
                        ],
                    },
                    {
                        cells: [
                            { content: "" },
                            { content: "Fatalistic" },
                            { content: "Have a strong belief in life after death\nand importance of (35)_______ in life.", id: 35 },
                        ],
                    },
                ],
            },
        },
        {
            questionType: "multiple-choice-single",
            questions: [
                {
                    id: 36,
                    question: "We are all present hedonists",
                    options: [
                        "at school",
                        "at birth",
                        "while eating and drinking",
                    ]
                },
                {
                    id: 37,
                    question: "American boys drop out of school at a higher rate than girls because",
                    options: [
                        "they need to be in control of the way they learn",
                        "they play video games instead of doing school work",
                        "they are not as intelligent as girls",
                    ]
                },
                {
                    id: 38,
                    question: "Present-orientated children",
                    options: [
                        "do not realise present actions can have negative future effects",
                        "are unable to learn lessons from past mistakes",
                        "know what could happen if they do something bad, but do it anyway",
                    ]
                },
                {
                    id: 39,
                    question: "If Americans had an extra day per week, they would spend it",
                    options: [
                        "working harder",
                        "building relationships",
                        "sharing family meals",
                    ]
                },
                {
                    id: 40,
                    question: "Understanding how people think about time can help us",
                    options: [
                        "become more virtuous",
                        "work together better",
                        "identify careless or ambitious people",
                    ]
                }
            ]
        }
    ],
}


// https://www.avayeshahir.com/wp-content/uploads/2024/01/McGraw_Hill_Education_IELTS_6_Practice_Tests_General_Academic_Avaye_Shahir.pdf - TEST 1
export const reading_section_1 = {
    reading_passage: {
        title: "THE STRESS OF RELOCATION",
        subtitle: "",
        passage: `
For some people, there is little in life more stressful than moving house; for others, there is a definite excitement in relocation since the belief that the grass is greener on the other side holds sway.
However, for Dr Jill Molveldt, a psychotherapist in Durban, South Africa, Relocation Stress Syndrome, or RSS, which she has been researching for a decade, is a matter of professional concern. Dr Molveldt began her career as a medical doctor in 1999, but turned to therapy when she doubted the efficacy of some medication. Time and again, patients presented at her surgery who – to all intents and purposes – had little physically wrong, but were not functioning optimally. Usually, such people with anxietyrelated disorders are prescribed drugs, but Dr Molveldt observed that many seemed to improve just as readily through talking to her. Therefore, from 2006-2008, she underwent extensive training in the United States in a number of techniques used in therapy
On return to South Africa, Dr Molveldt moved her family and her burgeoning practice – now devoted entirely to therapy – from Pietermaritzburg, a small city, to Durban, a larger, more cosmopolitan one. Immediately following this move, Dr Molveldt herself fell ill. Medical testing for vague symptoms like headaches, skin rashes, and insomnia brought neither relief nor diagnosis. At the time, she could not possibly have imagined that she, herself, had any psychological problems. Her only recent difficulty had been relocating to Durban due to her children’s maladjustment to their third school in three years, and to the irritation caused by a protracted renovation. All the same, she far preferred the beachside lifestyle of Durban to that of conservative inland Pietermaritzburg.
Quite by chance, in the summer of 2010, Dr Molveldt ran into a neighbour from her old city who had also moved to Durban. This woman seemed uncharacteristically depressed, and had experienced mood swings and weight gain since her arrival. As the neighbour recounted her complicated tale of moving, Dr Molveldt suddenly realised that her acquaintance – like herself – was suffering from RSS.
Upon this discovery, Dr Molveldt began sifting through medical and psychological literature to learn more about her syndrome, only to find precious little written about it. Conferences she attended in Greece and Argentina in which stress featured as a topic for keynote speakers did little to enlighten her. Therefore, Dr Molveldt felt she had no option but to collect her own patient data from medical practice and Emergency Room records in Durban and Cape Town in order to ascertain the extent of the problem. Over four years, she surveyed people with non-specific health problems as well as those who had had minor accidents.
In Durban and Cape Town, it might be expected in the general population that 1% of people have moved within a month, and 5% within six months. Yet nearly 3% of patients seen by GPs in Dr Molveldt’s study had moved within one month, and 9% within six. Minor accident patients had also moved recently, and some of them had had more than two residential addresses in one year.
Dr Molveldt then examined records of more serious accidents from a nationwide database, and, with the aid of a research grant, conducted interviews with 600 people. Admittedly, alcohol played a part in serious accident rates, but many interviewees said they had been drinking in response to circumstances – one of which was moving house. People who had had serious accidents, however, had not moved more frequently than those with non-specific ailments.
So just how stressful is moving? After all, stress is part of life – think about exams, a new job, marriage, having a child, divorce, illness, or the death of a loved one. Where does RSS fit in relation to these? Dr Molveldt puts it above exams (including for medical school), and somewhere between being newly married and bearing a child. (Newlyweds and young mothers also visit doctors’ surgeries and Emergency Rooms more than they should statistically.) Interestingly, subjects in several of Dr Molveldt’s tests rated moving less highly than she did, putting it about equal to sitting a tough exam.
As a side issue, Dr Molveldt found that the number of relationships that broke down around the time of moving was elevated. She considers the link between breakdown and RSS to be tenuous, suggesting instead that couples who are already struggling move house in the hope of resuscitating their relationship. Invariably, this does not happen. Moreover, it is the children in these cases who suffer most: not only has upheaval meant the loss of their old school and friends, but it also signals adjustment to occupation of their new home while one absent parent resides in another.
If Dr Molveldt’s research is anything to go by, next time you yearn to live elsewhere, think twice. Moving may be more stressful than you imagine, and the only papers you get to say you’ve done it are a fee from your doctor and a heap of mail from the previous inhabitants of your dwelling.
    `
    },
    questions: [
        {
            questionType: "multiple-choice-single",
            questions: [
                {
                    id: 1,
                    question: "RSS stands for",
                    options: [
                        "Relationship Stress Syndrome",
                        "Relocation Sickness Syndrome",
                        "Relocation Stress Symptoms",
                        "Relocation Stress Syndrome"
                    ]
                },
                {
                    id: 2,
                    question: "When Dr Molveldt fell ill in 2009,",
                    options: [
                        "she was worried she had psychological problems.",
                        "no one could work out what was wrong with her.",
                        "she thought she missed Pietermaritzburg.",
                        "she realised she had RSS."
                    ]
                },
                {
                    id: 3,
                    question: "As part of her RSS, Dr Molveldt’s old neighbour",
                    options: [
                        "had backache.",
                        "had headaches.",
                        "had skin problems.",
                        "was happy one day but sad the next."
                    ]
                },
                {
                    id: 4,
                    question: "Initially, Dr Molveldt’s data came from",
                    options: [
                        "patients of medical practices and hospital emergency departments.",
                        "hospital emergency department patients only.",
                        "patients of medical practices only.",
                        "other research."
                    ]
                },
                {
                    id: 5,
                    question: "In Dr Molveldt’s study, the relationship between the number of people who move house in the general population and those who also visit a doctor within one month of relocation is",
                    options: [
                        "twice as many.",
                        "three times as many.",
                        "half as many.",
                        "two-thirds as many."
                    ]
                },
                {
                    id: 6,
                    question: "Some of Dr Molveldt’s data on serious accidents came from",
                    options: [
                        "a Pietermaritzburg database.",
                        "Durban and Cape Town databases.",
                        "a database for all South Africa.",
                        "international databases."
                    ]
                }
            ]
        },
        {
            questionType: "matching-sentence-endings",
            question: {
                starting: [
                    { id: 7, text: "Some people who had had accidents due to alcohol" },
                    { id: 8, text: "Serious accident rates and relocation rates" },
                    { id: 9, text: "Dr Molveldt thinks moving house is more stressful" },
                    { id: 10, text: "Test subjects and Dr Molveldt" },
                    { id: 11, text: "According to Dr Molveldt, relationship breakdown" },
                    { id: 12, text: "Children suffer most when moving if" },
                    { id: 13, text: "Both the writer and Dr Molveldt suggest" }
                ],
                endings: [
                    { letter: "A", text: "was one result of relocation." },
                    { letter: "B", text: "had also recently moved house." },
                    { letter: "C", text: "was unlikely to be caused by moving." },
                    { letter: "D", text: "than having a baby." },
                    { letter: "E", text: "their family is also split up at the same time." },
                    { letter: "F", text: "disagreed about the stress caused by moving." },
                    { letter: "G", text: "than getting married." },
                    { letter: "H", text: "were no higher than other categories." },
                    { letter: "I", text: "they go to new schools." },
                    { letter: "J", text: "people should consider moving very carefully." }
                ]
            }
        }
    ]
}

export const reading_section_2 = {
    reading_passage: {
        title: "Tupperware’s Global Makeover",
        subtitle: "From post-war kitchens to modern China, Tupperware evolves through shifting cultures and sales models.",
        passage: `
Throw open anyone’s kitchen cupboards from Andorra to Zimbabwe, and you’ll find colourful plastic products for the preparation, serving, and storage of food. Chances are, some of these are Tupperware
For many people in developed countries, Tupperware is redolent of the 1950s when grandma and her friends bought and sold it at ‘Tupperware parties’. Some would even say Tupperware became a cultural icon in that decade. However, these days, while parties are still popular, online sales are challenging the model. Indeed, since 2000, more Tupperware franchises have opened in China than anywhere else.
Take the Hundred Benefits shop in Hangzhou, one of China’s fastest-growing cities. Located in a chic part of town, it’s full of twenty-somethings who haven’t yet had a child but are building a nest. They’ve got plenty of expendable income, and they’re picking out items to reflect their new-found optimism. China is undergoing a homedecorating revolution after years of dull, unreliable products. Furthermore, the average size of living space for urban Chinese has almost doubled recently, so there’s room for lots of stuff. But why choose Tupperware? It’s functional as well as fun. It’s sealable, stackable, durable, microwaveand-freezable, dishwasher-friendly, and culturally sensitive: four-layer traditional Chinese lunch-boxes, revamped in bright sexy colours, grace the shelves of the Hundred Benefits shop.
What is the Tupperware story? The special plastic used in it was invented in 1938 by an American called Earl Tupper. The famous seals, which keep the air out and freshness in, came later. Tupper’s company was established in 1946, and for more than 40 years boasted every success, but, recently, Tupperware Brands Corporation has been sold several times, and its parent company, Illinois Tool Works, has announced that declining American prospects may mean resale.
Until the 1990s, Tupperware relied totally on a pyramid sales model. In this, a person buys products from a person above him or her, rather than from a wholesale company or retail shop, and after sale of the new product to a third party, gives a small percentage of the money to the person from whom he or she originally bought. In turn, when the person on the lowest level recruits more vendors, those people return percentages to the person above. Initially, Tupperware operated like this because it was not available in shops. A more direct line between the manufacturer and the buyer results in cheaper products, and, as Tupperware is largely sold in the home, women suddenly have an independent income. A disadvantage might be that since people typically buy from and sell to friends, there are pressures at ordinary social gatherings to do deals, which some people may consider unethical. This raises the question: am I going for a pleasant dinner at Alison’s; or am I expected to buy a set of measuring cups from her as I leave? This pyramid model is prohibited in China, and has lost favour in many countries like Britain, Germany, Australia, and New Zealand, where once it was allpervasive. At present, most US sales are still on the party plan, but online and franchise sales are catching up.
Tupperware became fashionable after World War II. During the war, large numbers of women were in paid employment outside the home while their men were away fighting. When the men returned, the women mostly resumed their household duties. There are widely divergent views about Tupperware’s role at this time. Some feminists propose that the company promulgated an image of women confined to the kitchen, making the female pursuit of a career less likely. Others say that the pyramid sales model allowed women to earn, promoting autonomy and prosperity. In particular, those who were pregnant and at home could enjoy some extra cash.
Effective rebranding of Tupperware has taken place in the East, but what about in America? Well, the Tupperware website there has developed a ‘Chain of Confidence’ programme to improve sales. In this, women reinforce the notion of female solidarity by purchasing Tupperware and swapping true stories. Over a million dollars from this programme has also been donated to a girls’ charity.
What the future holds for the pretty plastic product is uncertain. Will Tupperware become a relic of the past like cane baskets and wooden tea chests, or will online social programmes and avid Chinese consumers save the company?
        `
    },
    questions: [
        {
            questionType: "match-paragraph-information",
            question: {
                information: [
                    { id: 14, text: "The benefits of Tupperware in the kitchen." },
                    { id: 15, text: "Opposing views on Tupperware and the position of women." },
                    { id: 16, text: "A sales model which might spoil friendship." },
                    { id: 17, text: "Worldwide availability of Tupperware." }
                ],
                letters: ["A", "B", "C", "D", "E", "F", "G", "H"]
            }
        },
        {
            questionType: "matching-features",
            question: {
                question_statement: "Match each statement with a country.",
                statements_title: "Statements",
                statements: [
                    { id: 18, text: "Consumers here are now less keen on the pyramid sales model" },
                    { id: 19, text: "Tupperware buyers in this country give money to help others" },
                    { id: 20, text: "Young women here lead the way in the purchase of Tupperware" },
                    { id: 21, text: "The writer uses this to represent many countries" },
                    { id: 22, text: "Just after World War II, Tupperware was established here" }
                ],
                features_title: "List of countries",
                features: [
                    { letter: "A", description: "Andorra" },
                    { letter: "B", description: "China" },
                    { letter: "C", description: "Germany" },
                    { letter: "D", description: "US" }
                ]
            }
        },
        {
            questionType: "yes-no-notgiven",
            questions: [
                {
                    id: 23,
                    statement: "Keeping food fresh is something Tupperware does well."
                },
                {
                    id: 24,
                    statement: "Tupperware was responsible for a negative image of women in the 1950s."
                },
                {
                    id: 25,
                    statement: "Rebranding in China has been unsuccessful."
                },
                {
                    id: 26,
                    statement: "Tupperware containers are good for the environment."
                },
                {
                    id: 27,
                    statement: "The future of Tupperware Brands Corporation is assured."
                }
            ]
        }
    ]
}

export const reading_section_3 = {
    reading_passage: {
        title: "MARVELLOUS MONTICELLO",
        subtitle: "",
        passage: `
Thomas Jefferson is renowned for many accomplishments, among which he was the principal author of the American Declaration of Independence and the third president of the United States, during which time America grew significantly in size and stature.
Jefferson also designed his own three-storeyed, 33-roomed mansion, called Monticello, familiar to every American from the nickel, or 5-cent coin, on which can be seen a simple domed building with a four-columned portico.
Influenced by classical European design, and emulated across the land, Monticello took more than 40 years to build. Numerous labour-saving devices inside, invented by Jefferson himself, and gardens the envy of agronomists represent the scientific spirit of a new age.
Modelled on Andrea Palladio’s 16th-century Italian villas, Monticello is a tribute to the man and style that Jefferson idolised. As Palladio considered the position of a building to be of the utmost importance, Jefferson had Monticello built on a mountain with splendid views. According to Palladio, a building should be symmetrical since mathematical order bestows harmony upon its inhabitants. Thus Monticello boasts a colonnaded entrance and a central room with a dome.
But who was the man who created Monticello? Thomas Jefferson was born at Shadwell, Virginia, on the east coast of America in 1743. On his father’s death, he inherited a large property where Monticello was subsequently constructed. Jefferson, both a lawyer and politician, was elected to the House of Burgesses in 1768, and in 1775 to the Continental Congress, where he revised the laws of Virginia. Two of his famous pieces of legislation include: the Virginia Statute for Religious Freedom; and the Bill for the More General Diffusion of Knowledge.
Throughout Jefferson’s early adulthood, America had been fighting Britain in the War of Independence. In 1776, Jefferson, who was never a combatant, wrote the Declaration of Independence, and although the conflict did not end until 1783, Americans consider the birth of their nation came with that declaration. As well as proclaiming America’s freedom, the declaration outlines universal human rights, stating that all men are equal regardless of birth, wealth, or status, and, furthermore, that government is the servant, not the master, of the people. Although Jefferson’s work was based on the ideas of John Locke, an Englishman, and on a body of French philosophy, it remains a uniquely American document.
After the war, Jefferson took up the post of Governor of Virginia, before returning to Congress. He then served five years in France as a US trade representative and minister. He was American Vice-President between 1797-1801 and President for the following eight years. As president, he organised the purchase of a vast tract of land from the French, who were embattled in Europe and strapped for cash. This land, called the Louisiana Territory, doubled the size of America. Jefferson was also responsible for financing Lewis and Clark – two explorers who undertook a momentous journey along the Ohio River to survey nature and appraise land for settlement.
In retirement, Jefferson remained active. His huge library, donated to the nation, and known as the Library of Congress, is still one of the world’s most reputable. He founded the University of Virginia, designed most of its early buildings, defined its curriculum, and became its first rector or chancellor. When he died, on the fourth of July 1826, America had lost a truly great man.
Monticello, his home for most of his life, is on the UNESCO World Heritage List partly because Jefferson lived there, but mainly because it brought classicism – the style of Palladio – to the New World. It was Jefferson’s belief that if America were to assume the mantle of a powerful nation, it needed to draw on the best of the European past as well as creating its own style.
Monticello is not a very large building: it is 1022 square metres (11,000 square feet) – these days, a football player or film star has a house as big.
Monticello was not all built at once since Jefferson’s finances were seldom secure. Furthermore, his ideas about building changed during his sojourn in France. In 1768, the mountaintop where Monticello would sit was leveled. Bricks were manufactured over a two-year period by Jefferson’s slaves – he owned about 200. Wood was sourced from trees on Jefferson’s land; stone and limestone were quarried on his property; and – in keeping with his concept of elegance – the window glass and furniture were imported from Europe. Jefferson moved into the South Pavilion in 1770. Around 1772, the Dining Room in the north wing was built. The first house was mostly complete in 1782, the year Jefferson’s wife died. On return from France in 1796, Jefferson had the upper storey demolished, and the whole structure remodelled, which took eleven years. In 1800, the dome was fitted. A North Pavilion was added from 1806-8. Extensive gardens – both ornamental and productive – were created since Jefferson believed in pursuing agriculture in a scientific manner.
As mentioned previously, Jefferson was an inventor. Since Virginian summers can be hot, he designed special fans and blinds. Blocks of ice were stored in the cellar all year round – a rarity at the time. For the cold winters, Monticello has numerous fireplaces and stoves. In the late 1790s, Jefferson altered the fireplaces to apply some modern fuel-saving principles. He introduced skylights – another unusual feature – and he designed tables that could be turned easily and doors that opened automatically. He even had a shaftand-pulley system between floors for hoisting food. However, not until 1822, was the roof covered with durable material. Just four years later, Jefferson died.
Jefferson is remembered as a statesman, philosopher, educationalist, and architect. Fiercely American, he drew on a European heritage. He was optimistic, far-sighted, and creative, and Monticello remains a monument to the man as much as his age.
    `
    },
    questions: [
        {
            questionType: "true-false-notgiven",
            questions: [
                {
                    id: 28,
                    statement: "Monticello was inspired by Italian architecture."
                },
                {
                    id: 29,
                    statement: "Jefferson fought in the War of Independence."
                },
                {
                    id: 30,
                    statement: "During Jefferson’s presidency, the French bought some American land, greatly reducing the size of the country."
                },
                {
                    id: 31,
                    statement: "Jefferson taught at the University of Virginia."
                },
                {
                    id: 32,
                    statement: "By today’s standards, Monticello appears quite a small house for a famous person."
                }
            ]
        },
        {
            questionType: "table-completion",
            tableData: {
                headers: ["Time or period", "Important event(s)"],
                rows: [
                    {
                        cells: [
                            { content: "1768" },
                            { content: "The mountaintop (33)_______ to prepare for the building of Monticello.", id: 33 }
                        ]
                    },
                    {
                        cells: [
                            { content: "1768–1770" },
                            { content: "(34)_______ were made by Jefferson’s slaves. Wood and stone also came from Jefferson’s land.", id: 34 }
                        ]
                    },
                    {
                        cells: [
                            { content: "1770" },
                            { content: "Jefferson began to live in the (35)_______ .", id: 35 }
                        ]
                    },
                    {
                        cells: [
                            { content: "(36)_______\n–1807", id: 36 },
                            { content: "- Monticello was remodelled.\n- Some of Jefferson’s own inventions include: fans, blinds, special fireplaces, skylights, automatic (37)_______ , and delivery systems.", id: 37 }
                        ]
                    },
                    {
                        cells: [
                            { content: "1822" },
                            { content: "The (38)_______ was covered with long-lasting material.", id: 38 }
                        ]
                    },
                    {
                        cells: [
                            { content: "(39)_______", id: 39 },
                            { content: "The death of Jefferson." }
                        ]
                    }
                ]
            }
        },
        {
            questionType: "image-labeling",
            image_url: "https://www.dropbox.com/scl/fi/kcpxj767bstze8kzumwfx/test1_q40.png?rlkey=ywyp8lt5pt6l3afzazlr5oqz4&st=1wj2afx1&raw=1",
            instructions: "Look at the three plans, A–C. Which plan shows the stages in which Monticello was built? Write the correct letter, A, B, or C, in box 40 on your answer sheet.",
            questions: [
                {
                    id: 40,
                },
            ]
        }
    ]
}


// https://practicepteonline.com/ielts-writing-test-48/
export const writingTasks = [
    {
        id: 1,
        timeLimit: "You should spend about 20 minutes on this task.",
        wordLimit: "Write at least 150 words.",
        prompt: [
            "The chart below shows the number of men and women in further education in Britain in three periods and whether they were studying fulltime or part-time.",
            "Summarise the information by selecting and reporting the main features, and make comparisons where relevant."
        ],
        image_url: "https://www.dropbox.com/scl/fi/c8ggx4wepyenchps9nrri/test1_task1.png?rlkey=12hxg6g86c92vlvm35n7cb7ew&st=6i51z8zl&raw=1",
    },
    {
        id: 2,
        timeLimit: "You should spend about 40 minutes on this task.",
        wordLimit: "Write at least 250 words.",
        prompt: [
            "Write about the following topic",
            "Some people spend a lot of money on sports and cultural events. Do you think this is this good or bad?",
        ],
    }
]


// CHATGPT GENERATED
export const speaking_transcripts = [
    {
        part: 1,
        questions: [
            { id: 1, transcript: "Now, in this part of the test, I will ask you some questions about yourself. After each question, there will be a beep sound. You will have 20 seconds to speak after the beep. So, Do you live in a house or an apartment?", audioUrl: "https://www.dropbox.com/scl/fi/lavenjfp9ytt2zjaakdp8/part1_q1.mp3?rlkey=zz72y2kgpyqvhuoxzxpggbp2j&st=ihrhvftw&raw=1" },
            { id: 2, transcript: "What do you like about your home? What makes it a nice place to live?", audioUrl: "https://www.dropbox.com/scl/fi/ioz0dboc6qtqs1iljfzj4/part1_q2.mp3?rlkey=fats4apx4cflwmeinov66b9rw&st=vafatnpf&raw=1" },
            { id: 3, transcript: "Is there anything you would like to change about it? Why?", audioUrl: "https://www.dropbox.com/scl/fi/hd3bod49ulbl4kbm2rkqi/part1_q3.mp3?rlkey=z4ocv6e7dzs4c85o58uz73fb3&st=2r3pbcvv&raw=1" },
            { id: 4, transcript: "What kind of home would you like to live in, in the future?", audioUrl: "https://www.dropbox.com/scl/fi/d5eyuh9los2hu0hewashw/part1_q4.mp3?rlkey=1f72y532060cs76ojj6oioyqo&st=yguhjpq3&raw=1" },

            { id: 5, transcript: "I’d like to move on and ask you some questions about travelling. Do you like travelling to new places?", audioUrl: "https://www.dropbox.com/scl/fi/vq5qgrr6umuenv2o8j8th/part1_q5.mp3?rlkey=1ppz0rg5393xl3pp94ks3jw7t&st=9xg9cyd6&raw=1" },
            { id: 6, transcript: "What kind of places do you prefer to visit—cities, beaches, or mountains?", audioUrl: "https://www.dropbox.com/scl/fi/ftd7exuweq2pz61ifhvy7/part1_q6.mp3?rlkey=23yjzwg9a7fdqz1c0lr3iuijm&st=x0he9dax&raw=1" },
            { id: 7, transcript: "Do you usually travel alone or with others? Why?", audioUrl: "https://www.dropbox.com/scl/fi/gjvg7w0c9vdtne0r97sr0/part1_q7.mp3?rlkey=x81ybt9eeihdwc91h43khlt7c&st=0t2gykoj&raw=1" },
            { id: 8, transcript: "Have your travel preferences changed over the years? And In what way?", audioUrl: "https://www.dropbox.com/scl/fi/nbync3ccisk7d346oaasy/part1_q8.mp3?rlkey=5pr7p8vsachozv5c4v9js8ssn&st=te8extf8&raw=1" },
        ]
    },
    {
        part: 2,
        questions: [
            {
                id: 9,
                transcript: "Describe a time when you had to make a difficult decision.",
                audioUrl: "https://www.dropbox.com/scl/fi/kfxzbxcu1h5yxrnc5ii9l/part2.mp3?rlkey=fp5n48br5yco5xtyx30ckl60j&st=wosk9u5b&raw=1"
            }
        ]
    },
    {
        part: 3,
        questions: [
            { id: 10, transcript: "You’ve just spoken about a difficult decision. Let’s explore this topic a bit more. Why do you think some decisions are harder to make than others?", audioUrl: "https://www.dropbox.com/scl/fi/f8pz78qdsaw27vs7vy16y/part3_q1.mp3?rlkey=0fb43uggv4vzpa9dmalmjn3jn&st=toxde7hc&raw=1" },
            { id: 11, transcript: "What qualities are important when making important decisions?", audioUrl: "https://www.dropbox.com/scl/fi/oiguh3z2b9xooyyeddp5y/part3_q2.mp3?rlkey=im02g1m7arv92kpxiiy09i86y&st=bwnkrnql&raw=1" },
            { id: 12, transcript: "Do you think people today face more difficult choices than in the past? Why or why not?", audioUrl: "https://www.dropbox.com/scl/fi/y811up06q83esy11ac0mz/part3_q3.mp3?rlkey=vlz07d7hadcn8op4us6l2i596&st=njn0i0yo&raw=1" },

            { id: 13, transcript: "Let’s move on and talk about decision-making in society. How do governments make decisions that affect the public?", audioUrl: "https://www.dropbox.com/scl/fi/ucxh702eqove8flcmihln/part3_q4.mp3?rlkey=0xh00151paiafc49s9d6ccidp&st=9gbqe44l&raw=1" },
            { id: 14, transcript: "Do you believe individuals should be more involved in public decision-making? Why or why not?", audioUrl: "https://www.dropbox.com/scl/fi/6xofetzxyvuyelq8b8kin/part3_q5.mp3?rlkey=ms9ssdecmbxdp6gr6eu4e5hap&st=arl8w9ud&raw=1" },
            { id: 15, transcript: "How can technology help or hinder the decision-making process?", audioUrl: "https://www.dropbox.com/scl/fi/9yoa8fqf6qbwv8qvspif5/part3_q6.mp3?rlkey=16fpf8uarbig23g68jijfvz55&st=610vt465&raw=1" },
        ]
    }
]



export const reading_answers = {
    1: "D",
    2: "B",
    3: "D",
    4: "A",
    5: "B",
    6: "C",
    7: "B",
    8: "H",
    9: "G",
    10: "F",
    11: "C",
    12: "E",
    13: "J",
    14: "C",
    15: "F",
    16: "E",
    17: "A",
    18: "C",
    19: "D",
    20: "B",
    21: "A",
    22: "D",
    23: "Y",
    24: "NOT GIVEN",
    25: "NO",
    26: "NOT GIVEN",
    27: "NO",
    28: "TRUE",
    29: "FALSE",
    30: "FALSE",
    31: "NOT GIVEN",
    32: "TRUE",
    33: "was levelled",
    34: "bricks",
    35: "South Pavilion",
    36: "1796",
    37: "doors",
    38: "roof",
    39: "1826",
    40: "A"
};

export const listening_answers = {
    1: "4A",
    2: "60%",
    3: "History",
    4: "Memory",
    5: "Guitar",
    6: "Talk",
    7: "China",
    8: "Art",
    9: "art gallery",
    10: "80%",
    11: "H",
    12: "C",
    13: "J",
    14: "F",
    15: "B",
    16: "I",
    17: "A",
    18: "A",
    19: "D",
    20: "E",
    21: "textile",
    22: "commission",
    23: "car",
    24: "graduates",
    25: "travel",
    26: "team",
    27: "C",
    28: "C",
    29: "C",
    30: "A",
    31: "negative",
    32: "pleasure",
    33: "poverty",
    34: "active",
    35: "success",
    36: "B",
    37: "A",
    38: "C",
    39: "A",
    40: "B"
};