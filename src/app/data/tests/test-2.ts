// https://practicepteonline.com/ielts-listening-test-1
export const listening_section_1 = {
    audio: "https://www.dropbox.com/scl/fi/kubyox7skkbjmi41ktkys/part1.mp4?rlkey=mmeyomwxrsz7023chb15dpv03&st=db0maygy&raw=1",
    questions: [
        {
            questionType: "table-completion",
            tableData: {
                headers: ["Apartments", "Facilities", "Other Information", "Cost"],
                rows: [
                    {
                        cells: [
                            { content: "Rose Garden Apartments" },
                            { content: "Studio Flat" },
                            { content: "Entertainment programme: Greek dancing" },
                            { content: "£ 219" },
                        ],
                    },
                    {
                        cells: [
                            { content: "Blue Bay Apartments" },
                            { content: "Large salt water swimming pool" },
                            { content: "– Just (1)_______ meters from beach\n– Near shops", id: 1 },
                            { content: "£ 275" },
                        ],
                    },
                    {
                        cells: [
                            { content: "(2)_______ Apartments", id: 2 },
                            { content: "Terrace" },
                            { content: "Watersports" },
                            { content: "£ 490" },
                        ],
                    },
                    {
                        cells: [
                            { content: "The Grand" },
                            { content: "Greek paintings and (3)_______", id: 3 },
                            { content: "– Overlooking (4)_______\n– Near a supermarket and a disco", id: 4 },
                            { content: " £(5)_______.", id: 5 },
                        ],
                    },
                ],
            },
        },
        {
            questionType: "form-completion",
            formData: {
                title: "GREEK ISLAND HOLIDAYS",
                address: "",
                sections: [
                    {
                        title: "Insurance Benefits:",
                        fields: [
                            {
                                label: "Cancellation",
                                content: "£(6) _______",
                                id: 6,
                            },
                            {
                                label: "Hospital",
                                content: "£600 additional benefit allows a (7) _______ to travel to resort",
                                id: 7,
                            },
                            {
                                label: "(8) ________ departure",
                                content: "departure: Up to £1000 depends on reason",
                                id: 8,
                            },
                            {
                                label: "Personal belongings",
                                content: "Up to £3000 £500 for one (9) _______",
                                id: 9,
                            },
                            {
                                label: "Name of assistant manager",
                                content: "Ben (10) _______",
                                id: 10,
                            },
                        ],
                    },
                ],
            },
        },
    ],
}

export const listening_section_2 = {
    // 7 minute audio   
    audio: "https://www.dropbox.com/scl/fi/yu6yg4l7qlcq29ndr307p/part2.mp3?rlkey=g3s4xyu9tfsfjtxbe7jjj5n92&st=bxpo8tlr&raw=1",
    questions: [
        {
            questionType: "multiple-choice",
            questions: [
                {
                    id: 11,
                    question: "Simon’s idea for a theme park came from",
                    options: [
                        "his childhood hobby",
                        "his interest in landscape design",
                        "his visit to another park"
                    ]
                },
                {
                    id: 12,
                    question: "When they started, the family decided to open the park only when",
                    options: [
                        "the weather was expected to be good",
                        "the children weren’t at school",
                        "there were fewer farming commitments"
                    ]
                },
                {
                    id: 13,
                    question: "Since opening, the park has had",
                    options: [
                        "50,000 visitors",
                        "1,000,000 visitors",
                        "1,500,000 visitors"
                    ]
                }
            ]
        },
        {
            questionType: "matching-features",
            question: {
                question: "What is currently the main area of work of each of the following people?",
                statements: [
                    { id: 14, text: "Simon" },
                    { id: 15, text: "Liz" },
                    { id: 16, text: "Sarah" },
                    { id: 17, text: "Duncan" },
                    { id: 18, text: "Judith" },
                ],
                features: [
                    { letter: "A", description: "advertising" },
                    { letter: "B", description: "animal care" },
                    { letter: "C", description: "building" },
                    { letter: "D", description: "educational links" },
                    { letter: "E", description: "engine maintenance" },
                    { letter: "F", description: "food and drink" },
                    { letter: "G", description: "sales" },
                    { letter: "H", description: "staffing" },
                ],
            }
        },
        {
            questionType: "table-completion",
            tableData: {
                headers: ["Feature", "Size", "Biggest Challenge", "Target Age Group"],
                rows: [
                    {
                        cells: [
                            { content: "Railway" },
                            { content: "1.2 km" },
                            { content: "Making tunnels" },
                            { content: "" },
                        ],
                    },
                    {
                        cells: [
                            { content: "Go-kart arena" },
                            { content: "(19)_______ sq mt", id: 19 },
                            { content: "Removing mounds on track" },
                            { content: "(20)_______ year olds", id: 20 },
                        ],
                    },
                ],
            },
        }
    ],
}

export const listening_section_3 = {
    audio: "https://www.dropbox.com/scl/fi/zibhjv7hi18psgyp4r4u6/part3.mp3?rlkey=5e6x63k6khcwlqw620m14rlcf&st=c18hr7sj&raw=1",
    questions: [
        {
            questionType: "note-completion",
            topic: "Study Skills Tutorial – Caroline Benning",
            sections: [
                {
                    title: "Study",
                    bulletPoints: [
                        {
                            id: 21,
                            text: "Dissertation topic: the (21) _______",
                        },
                        {
                            id: 22,
                            text: "Strengths: (22) _______",
                        },
                        {
                            id: 23,
                            text: "Poor (23) _______ skills",
                        },
                    ],
                },
            ],
        },
        {
            questionType: "table-completion",
            blanksCount: 5,
            tableData: {
                headers: ["Possible strategy", "Benefits", "Problems"],
                rows: [
                    {
                        cells: [
                            { content: "Peer group discussion" },
                            { content: "Increase (24)_______", id: 24 },
                            { content: "Dissertations tend to contain the same (25)_______", id: 25 },
                        ],
                    },
                    {
                        cells: [
                            { content: "Use the (26)_______ service", id: 26 },
                            { content: "Provides structured programme" },
                            { content: "Limited (27)_______", id: 27 },
                        ],
                    },
                    {
                        cells: [
                            { content: "Consult study skill books" },
                            { content: "Are a good source of reference" },
                            { content: "Can be too (28)_______", id: 28 },
                        ],
                    },
                ],
            },
        }
    ]
}

export const listening_section_4 = {
    audio: "https://www.dropbox.com/scl/fi/34x2cd8sww20401skj5zh/part-4.mp3?rlkey=wwb14thanztu9wcln9f8g26i6&st=vs3bu8px&raw=1",
    questions: [
        {
            questionType: "multiple-choice",
            questions: [
                {
                    id: 31,
                    question: "The owners of the underground house",
                    options: [
                        "had no experience of living in a rural area",
                        "were interested in environmental issues",
                        "wanted a professional project manager",
                    ],
                },
                {
                    id: 32,
                    question: "What does the speaker say about the site of the house?",
                    options: [
                        "The land was quite cheap",
                        "Stone was being extracted nearby",
                        "It was in a completely unspoilt area",
                    ],
                },
            ],
        },
        {
            questionType: "note-completion",
            topic: "The Underground House",
            sections: [
                {
                    title: "Design",
                    bulletPoints: [
                        {
                            id: 33,
                            text: "The south-facing side was constructed of two layers of (33) _______",
                        },
                        {
                            id: 34,
                            text: "A layer of foam was used to improve the (34) _______ of the building",
                        },
                    ],
                },
                {
                    title: "Special features",
                    bulletPoints: [
                        {
                            id: 35,
                            text: "To increase the light, the building has many internal mirrors and (35) _______",
                        },
                        {
                            id: 36,
                            text: "In future, the house may produce more (36) _______ than it needs",
                        },
                        {
                            id: 37,
                            text: "Recycled wood was used for the (37) _______ of the house",
                        },
                        {
                            id: 38,
                            text: "The system for processing domestic (38) _______ is organic",
                        },
                    ],
                },
                {
                    title: "Environmental issues",
                    bulletPoints: [
                        {
                            id: 39,
                            text: "The use of large quantities of (39) _______ in construction was environmentally harmful",
                        },
                        {
                            id: 40,
                            text: "But the house will have paid its ‘environmental debt’ within (40) _______",
                        },
                    ],
                },
            ],
        }
    ],
}


//https://mocktestielts.com/ielts-mock-test-reading-academic-practice-test-36/
//sax
export const reading_section_1 = {
    reading_passage: {
        title: "Raising the Mary Rose",
        subtitle: "How a sixteenth-century warship was recovered from the seabed",
        passage: `
On 19 July 1545, English and French fleets were engaged in a sea battle off the coast of southern England in the area of water called the Solent, between Portsmouth and the Isle of Wight. Among the English vessels was a warship by the name of Mary Rose. Built in Portsmouth some 35 years earlier, she had had a long and successful fighting career, and was a favourite of King Henry VIII. Accounts of what happened to the ship vary: while witnesses agree that she was not hit by the French, some maintain that she was outdated, overladen and sailing too low in the water, others that she was mishandled by undisciplined crew. What is undisputed, however, is that the Mary Rose sank into the Solent that day, taking at least 500 men with her. After the battle, attempts were made to recover the ship, but these failed.
The Mary Rose came to rest on the seabed, lying on her starboard (right) side at an angle of approximately 60 degrees. The hull (the body of the ship) acted as a trap for the sand and mud carried by Solent currents. As a result, the starboard side filled rapidly, leaving the exposed port (left) side to be eroded by marine organisms and mechanical degradation. Because of the way the ship sank, nearly all of the starboard half survived intact. During the seventeenth and eighteenth centuries, the entire site became covered with a layer of hard grey clay, which minimised further erosion.
Then, on 16 June 1836, some fishermen in the Solent found that their equipment was caught on an underwater obstruction, which turned out to be the Mary Rose. Diver John Deane happened to be exploring another sunken ship nearby, and the fishermen approached him, asking him to free their gear. Deane dived down, and found the equipment caught on a timber protruding slightly from the seabed. Exploring further, he uncovered several other timbers and a bronze gun. Deane continued diving on the site intermittently until 1840, recovering several more guns, two bows, various timbers, part of a pump and various other small finds.
The Mary Rose then faded into obscurity for another hundred years. But in 1965, military historian and amateur diver Alexander McKee, in conjunction with the British Sub-Aqua Club, initiated a project called ‘Solent Ships’. While on paper this was a plan to examine a number of known wrecks in the Solent, what McKee really hoped for was to find the Mary Rose. Ordinary search techniques proved unsatisfactory, so McKee entered into collaboration with Harold E. Edgerton, professor of electrical engineering at the Massachusetts Institute of Technology. In 1967, Edgerton’s side-scan sonar systems revealed a large, unusually shaped object, which McKee believed was the Mary Rose.
Further excavations revealed stray pieces of timber and an iron gun. But the climax to the operation came when, on 5 May 1971, part of the ship’s frame was uncovered. McKee and his team now knew for certain that they had found the wreck, but were as yet unaware that it also housed a treasure trove of beautifully preserved artefacts. Interest ^ in the project grew, and in 1979, The Mary Rose Trust was formed, with Prince Charles as its President and Dr Margaret Rule its Archaeological Director. The decision whether or not to salvage the wreck was not an easy one, although an excavation in 1978 had shown that it might be possible to raise the hull. While the original aim was to raise the hull if at all feasible, the operation was not given the go-ahead until January 1982, when all the necessary information was available.
An important factor in trying to salvage the Mary Rose was that the remaining hull was an open shell. This led to an important decision being taken: namely to carry out the lifting operation in three very distinct stages. The hull was attached to a lifting frame via a network of bolts and lifting wires. The problem of the hull being sucked back downwards into the mud was overcome by using 12 hydraulic jacks. These raised it a few centimetres over a period of several days, as the lifting frame rose slowly up its four legs. It was only when the hull was hanging freely from the lifting frame, clear of the seabed and the suction effect of the surrounding mud, that the salvage operation progressed to the second stage. In this stage, the lifting frame was fixed to a hook attached to a crane, and the hull was lifted completely clear of the seabed and transferred underwater into the lifting cradle. This required precise positioning to locate the legs into the stabbing guides’ of the lifting cradle. The lifting cradle was designed to fit the hull using archaeological survey drawings, and was fitted with air bags to provide additional cushioning for the hull’s delicate timber framework. The third and final stage was to lift the entire structure into the air, by which time the hull was also supported from below. Finally, on 11 October 1982, millions of people around the world held their breath as the timber skeleton of the Mary Rose was lifted clear of the water, ready to be returned home to Portsmouth.
    `
    },
    questions: [
        {
            questionType: "true-false-notgiven",
            questions: [
                {
                    id: 1,
                    statement: "There is some doubt about what caused the Mary Rose to sink."
                },
                {
                    id: 2,
                    statement: "The Mary Rose was the only ship to sink in the battle of 19 July 1545."
                },
                {
                    id: 3,
                    statement: "Most of one side of the Mary Rose lay undamaged under the sea."
                },
                {
                    id: 4,
                    statement: "Alexander McKee knew that the wreck would contain many valuable historical objects."
                }
            ]
        },
        {
            questionType: "matching-features",
            question: {
                question_statement: "Match each statement with the correct date related to the Mary Rose.",
                statements_title: "Statements",
                statements: [
                    { id: 5, text: "A search for the Mary Rose was launched." },
                    { id: 6, text: "One person’s exploration of the Mary Rose site stopped." },
                    { id: 7, text: "It was agreed that the hull of the Mary Rose should be raised." },
                    { id: 8, text: "The site of the Mary Rose was found by chance." }
                ],
                features_title: "List of Dates",
                features: [
                    { letter: "A", description: "1836" },
                    { letter: "B", description: "1840" },
                    { letter: "C", description: "1965" },
                    { letter: "D", description: "1967" },
                    { letter: "E", description: "1971" },
                    { letter: "F", description: "1979" },
                    { letter: "G", description: "1982" }
                ]
            }
        },
        {
            questionType: "image-labeling",
            mapTitle: "Raising the hull of the Mary Rose: Stages one and two",
            image_url: "https://mocktestielts.com/wp-content/uploads/2023/08/ielts-mock-test-36.jpg",
            questions: [
                {
                    id: 9,
                    location: "________ attached to hull by wires"
                },
                {
                    id: 10,
                    location: "________ to prevent hull being sucked into mud"
                },
                {
                    id: 11,
                    location: "legs are placed into ________"
                },
                {
                    id: 12,
                    location: "hull is lowered into ________"
                },
                {
                    id: 13,
                    location: "________ used as extra protection for the hull"
                }
            ]
        },
    ]
}

export const reading_section_2 = {
    reading_passage: {
        title: "Easter Island",
        subtitle: "What destroyed the civilisation of Easter Island?",
        passage: `
Easter Island, or Rapu Nui as it is known locally, is home to several hundred ancient human statues – the moai. After this remote Pacific island was settled by the Polynesians, it remained isolated for centuries. All the energy and resources that went into the moai – some of which are ten metres tall and weigh over 7,000 kilos – came from the island itself. Yet when Dutch explorers landed in 1722, they met a Stone Age culture. The moai were carved with stone tools, then transported for many kilometres, without the use of animals or wheels, to massive stone platforms. The identity of the moai builders was in doubt until well into the twentieth century. Thor Heyerdahl, the Norwegian ethnographer and adventurer, thought the statues had been created by pre-Inca peoples from Peru. Bestselling Swiss author Erich von Daniken believed they were built by stranded extraterrestrials. Modern science – linguistic, archaeological and genetic evidence – has definitively proved the moai builders were Polynesians, but not how they moved their creations. Local folklore maintains that the statues walked, while researchers have tended to assume the ancestors dragged the statues somehow, using ropes and logs.
When the Europeans arrived, Rapa Nui was grassland, with only a few scrawny trees. In the 1970s and 1980s, though, researchers found pollen preserved in lake sediments, which proved the island had been covered in lush palm forests for thousands of years. Only after the Polynesians arrived did those forests disappear. US scientist Jared Diamond believes that the Rapanui people – descendants of Polynesian settlers – wrecked their own environment. They had unfortunately settled on an extremely fragile island – dry, cool, and too remote to be properly fertilised by windblown volcanic ash. When the islanders cleared the forests for firewood and farming, the forests didn’t grow back. As trees became scarce and they could no longer construct wooden canoes for fishing, they ate birds. Soil erosion decreased their crop yields. Before Europeans arrived, the Rapanui had descended into civil war and cannibalism, he maintains. The collapse of their isolated civilisation, Diamond writes, is a ’worst-case scenario for what may lie ahead of us in our own future’.
The moai, he thinks, accelerated the self-destruction. Diamond interprets them as power displays by rival chieftains who, trapped on a remote little island, lacked other ways of asserting their dominance. They competed by building ever bigger figures. Diamond thinks they laid the moai on wooden sledges, hauled over log rails, but that required both a lot of wood and a lot of people. To feed the people, even more land had to be cleared. When the wood was gone and civil war began, the islanders began toppling the moai. By the nineteenth century none were standing.
Archaeologists Terry Hunt of the University of Hawaii and Carl Lipo of California State University agree that Easter Island lost its lush forests and that it was an ‘ecological catastrophe’ – but they believe the islanders themselves weren’t to blame. And the moai certainly weren’t. Archaeological excavations indicate that the Rapanui went to heroic efforts to protect the resources of their wind-lashed, infertile fields. They built thousands of circular stone windbreaks and gardened inside them, and used broken volcanic rocks to keep the soil moist. In short, Hunt and Lipo argue, the prehistoric Rapanui were pioneers of sustainable farming.
Hunt and Lipo contend that moai-building was an activity that helped keep the peace between islanders. They also believe that moving the moai required few people and no wood, because they were walked upright. On that issue, Hunt and Lipo say, archaeological evidence backs up Rapanui folklore. Recent experiments indicate that as few as 18 people could, with three strong ropes and a bit of practice, easily manoeuvre a 1,000 kg moai replica a few hundred metres. The figures’ fat bellies tilted them forward, and a D-shaped base allowed handlers to roll and rock them side to side.
Moreover, Hunt and Lipo are convinced that the settlers were not wholly responsible for the loss of the island’s trees. Archaeological finds of nuts from the extinct Easter Island palm show tiny grooves, made by the teeth of Polynesian rats. The rats arrived along with the settlers, and in just a few years, Hunt and Lipo calculate, they would have overrun the island. They would have prevented the reseeding of the slow-growing palm trees and thereby doomed Rapa Nui’s forest, even without the settlers’ campaign of deforestation. No doubt the rats ate birds’ eggs too. Hunt and Lipo also see no evidence that Rapanui civilisation collapsed when the palm forest did. They think its population grew rapidly and then remained more or less stable until the arrival of the Europeans, who introduced deadly diseases to which islanders had no immunity. Then in the nineteenth century slave traders decimated the population, which shrivelled to 111 people by 1877.
Hunt and Lipo’s vision, therefore, is one of an island populated by peaceful and ingenious moai builders and careful stewards of the land, rather than by reckless destroyers ruining their own environment and society. ‘Rather than a case of abject failure, Rapu Nui is an unlikely story of success’, they claim. Whichever is the case, there are surely some valuable lessons which the world at large can learn from the story of Rapa Nui.
    `
    },
    questions: [
        {
            questionType: "match-headings",
            question: {
                headings: [
                    { number: "i", text: "Evidence of innovative environment management practices" },
                    { number: "ii", text: "An undisputed answer to a question about the moai" },
                    { number: "iii", text: "The future of the moai statues" },
                    { number: "iv", text: "A theory which supports a local belief" },
                    { number: "v", text: "The future of Easter Island" },
                    { number: "vi", text: "Two opposing views about the Rapanui people" },
                    { number: "vii", text: "Destruction outside the inhabitants’ control" },
                    { number: "viii", text: "How the statues made a situation worse" },
                    { number: "ix", text: "Diminishing food resources" }
                ],
                id: [14, 15, 16, 17, 18, 19, 20]
            }
        },
        {
            questionType: "summary-completion",
            question: {
                id: [21, 22, 23, 24],
                title: "Jared Diamond’s View",
                passageTemplate: `
Diamond believes that the Polynesian settlers on Rapa Nui destroyed its forests, cutting down its trees for fuel and clearing land for <21>. 
Twentieth-century discoveries of pollen prove that Rapu Nui had once been covered in palm forests, which had turned into grassland by the time the 
Europeans arrived on the island. When the islanders were no longer able to build the <22> they needed to go fishing, they began using the island’s 
<23> as a food source, according to Diamond. Diamond also claims that the moai were built to show the power of the island’s chieftains, and that the 
methods of transporting the statues needed not only a great number of people, but also a great deal of <24>.
    `
            }
        },
        {
            questionType: "multiple-choice-many",
            questions: [
                {
                    id: [25, 26],
                    question: "On what points do Hunt and Lipo disagree with Diamond?",
                    options: [
                        {
                            letter: "A",
                            text: "the period when the moai were created"
                        },
                        {
                            letter: "B",
                            text: "how the moai were transported"
                        },
                        {
                            letter: "C",
                            text: "the impact of the moai on Rapanui society"
                        },
                        {
                            letter: "D",
                            text: "how the moai were carved"
                        },
                        {
                            letter: "E",
                            text: "the origins of the people who made the moai"
                        }
                    ]
                }
            ]
        }
    ]
}

export const reading_section_3 = {
    reading_passage: {
        title: "Neuroaesthetics",
        subtitle: "",
        passage: `
        An emerging discipline called neuroaesthetics is seeking to bring scientific objectivity to the study of art, and has already given us a better understanding of many masterpieces. The blurred imagery of Impressionist paintings seems to stimulate the brain’s amygdala, for instance. Since the amygdala plays a crucial role in our feelings, that finding might explain why many people find these pieces so moving.
Could the same approach also shed light on abstract twentieth-century pieces, from Mondrian’s geometrical blocks of colour, to Pollock’s seemingly haphazard arrangements of splashed paint on canvas? Sceptics believe that people claim to like such works simply because they are famous. We certainly do have an inclination to follow the crowd. When asked to make simple perceptual decisions such as matching a shape to its rotated image, for example, people often choose a definitively wrong answer if they see others doing the same. It is easy to imagine that this mentality would have even more impact on a fuzzy concept like art appreciation, where there is no right or wrong answer.
Angelina Hawley-Dolan, of Boston College, Massachusetts, responded to this debate by asking volunteers to view pairs of paintings – either the creations of famous abstract artists or the doodles of infants, chimps and elephants. They then had to judge which they preferred. A third of the paintings were given no captions, while many were labelled incorrectly -volunteers might think they were viewing a chimp’s messy brushstrokes when they were actually seeing an acclaimed masterpiece. In each set of trials, volunteers generally preferred the work of renowned artists, even when they believed it was by an animal or a child. It seems that the viewer can sense the artist’s vision in paintings, even if they can’t explain why.
Robert Pepperell, an artist based at Cardiff University, creates ambiguous works that are neither entirely abstract nor clearly representational. In one study, Pepperell and his collaborators asked volunteers to decide how’powerful’they considered an artwork to be, and whether they saw anything familiar in the piece. The longer they took to answer these questions, the more highly they rated the piece under scrutiny, and the greater their neural activity. It would seem that the brain sees these images as puzzles, and the harder it is to decipher the meaning, the more rewarding is the moment of recognition.
And what about artists such as Mondrian, whose paintings consist exclusively of horizontal and vertical lines encasing blocks of colour? Mondrian’s works are deceptively simple, but eye-tracking studies confirm that they are meticulously composed, and that simpiy rotating a piece radically changes the way we view it. With the originals, volunteers’eyes tended to stay longer on certain places in the image, but with the altered versions they would flit across a piece more rapidly. As a result, the volunteers considered the altered versions less pleasurable when they later rated the work.
In a similar study, Oshin Vartanian of Toronto University asked volunteers to compare original paintings with ones which he had altered by moving objects around within the frame. He found that almost everyone preferred the original, whether it was a Van Gogh still life or an abstract by Miro. Vartanian also found that changing the composition of the paintings reduced activation in those brain areas linked with meaning and interpretation.
In another experiment, Alex Forsythe of the University of Liverpool analysed the visual intricacy of different pieces of art, and her results suggest that many artists use a key level of detail to please the brain. Too little and the work is boring, but too much results in a kind of ‘perceptual overload’, according to Forsythe. What’s more, appealing pieces both abstract and representational, show signs of ‘fractals’ – repeated motifs recurring in different scales, fractals are common throughout nature, for example in the shapes of mountain peaks or the branches of trees. It is possible that our visual system, which evolved in the great outdoors, finds it easier to process such patterns.
It is also intriguing that the brain appears to process movement when we see a handwritten letter, as if we are replaying the writer’s moment of creation. This has led some to wonder whether Pollock’s works feel so dynamic because the brain reconstructs the energetic actions the artist used as he painted. This may be down to our brain’s ‘mirror neurons’, which are known to mimic others’ actions. The hypothesis will need to be thoroughly tested, however. It might even be the case that we could use neuroaesthetic studies to understand the longevity of some pieces of artwork. While the fashions of the time might shape what is currently popular, works that are best adapted to our visual system may be the most likely to linger once the trends of previous generations have been forgotten.
It’s still early days for the field of neuroaesthetics – and these studies are probably only a taste of what is to come. It would, however, be foolish to reduce art appreciation to a set of scientific laws. We shouldn’t underestimate the importance of the style of a particular artist, their place in history and the artistic environment of their time. Abstract art offers both a challenge and the freedom to play with different interpretations. In some ways, it’s not so different to science, where we are constantly looking for systems and decoding meaning so that we can view and appreciate the world in a new way.
    `
    },
    questions: [
        {
            questionType: "multiple-choice-single",
            questions: [
                {
                    id: 27,
                    question: "In the second paragraph, the writer refers to a shape-matching test in order to illustrate",
                    options: [
                        "the subjective nature of art appreciation.",
                        "the reliance of modern art on abstract forms.",
                        "our tendency to be influenced by the opinions of others.",
                        "a common problem encountered when processing visual data."
                    ]
                },
                {
                    id: 28,
                    question: "Angelina Hawley-Dolan’s findings indicate that people",
                    options: [
                        "mostly favour works of art which they know well.",
                        "hold fixed ideas about what makes a good work of art.",
                        "are often misled by their initial expectations of a work of art.",
                        "have the ability to perceive the intention behind works of art."
                    ]
                },
                {
                    id: 29,
                    question: "Results of studies involving Robert Pepperell’s pieces suggest that people",
                    options: [
                        "can appreciate a painting without fully understanding it.",
                        "find it satisfying to work out what a painting represents.",
                        "vary widely in the time they spend looking at paintings.",
                        "generally prefer representational art to abstract art."
                    ]
                },
                {
                    id: 30,
                    question: "What do the experiments described in the fifth paragraph suggest about the paintings of Mondrian?",
                    options: [
                        "They are more carefully put together than they appear.",
                        "They can be interpreted in a number of different ways.",
                        "They challenge our assumptions about shape and colour.",
                        "They are easier to appreciate than many other abstract works."
                    ]
                }
            ]
        },
        {
            questionType: "summary-completion",
            question: {
                id: [31, 32, 33],
                title: "Art and the Brain",
                passageTemplate: `
The discipline of neuroaesthetics aims to bring scientific objectivity to the study of art. Neurological studies of the brain, for example, demonstrate 
the impact which Impressionist paintings have on our <31>. Alex Forsythe of the University of Liverpool believes many artists give their works the 
precise degree of <32> which most appeals to the viewer’s brain. She also observes that pleasing works of art often contain certain repeated 
<33> which occur frequently in the natural world.
    `
            }
        },
        {
            questionType: "yes-no-notgiven",
            questions: [
                {
                    id: 34,
                    statement: "Forsythe’s findings contradicted previous beliefs on the function of ‘fractals’ in art."
                },
                {
                    id: 35,
                    statement: "Certain ideas regarding the link between ‘mirror neurons’ and art appreciation require further verification."
                },
                {
                    id: 36,
                    statement: "People’s taste in paintings depends entirely on the current artistic trends of the period."
                },
                {
                    id: 37,
                    statement: "Scientists should seek to define the precise rules which govern people’s reactions to works of art."
                },
                {
                    id: 38,
                    statement: "Art appreciation should always involve taking into consideration the cultural context in which an artist worked."
                },
                {
                    id: 39,
                    statement: "It is easier to find meaning in the field of science than in that of art."
                }
            ]
        },
        {
            questionType: "multiple-choice-single",
            questions: [
                {
                    id: 40,
                    question: "What would be the most appropriate subtitle for the article?",
                    options: [
                        "Some scientific insights into how the brain responds to abstract art",
                        "Recent studies focusing on the neural activity of abstract artists",
                        "A comparison of the neurological bases of abstract and representational art",
                        "How brain research has altered public opinion about abstract art"
                    ]
                }
            ]
        }
    ]
}