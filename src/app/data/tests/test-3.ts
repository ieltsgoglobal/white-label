// https://practicepteonline.com/ielts-listening-test-200
export const listening_section_1 = {
    audio: "https://www.dropbox.com/scl/fi/dr2impfhl5zn9mma7vrga/part1.mp4?rlkey=2dv0mn4pprpd4a0aafjlyo59h&st=uem1k599&raw=1",
    questions: [
        {
            questionType: "note-completion",
            topic: "First day at work",
            sections: [
                {
                    title: "Instructions",
                    bulletPoints: [
                        {
                            id: 1,
                            text: "Name of supervisor: (1) _______",
                        },
                        {
                            id: 2,
                            text: "Where to leave coat and bag: use (2) _______ in staffroom",
                        },
                        {
                            id: 3,
                            text: "See Tiffany in HR: to give (3) _______ number",
                        },
                        {
                            id: 4,
                            text: "To collect (4) _______",
                        },
                        {
                            id: 5,
                            text: "Location of HR office: on (5) _______ floor",
                        },
                        {
                            id: 6,
                            text: "Supervisor’s mobile number: (6) _______",
                        },
                    ],
                },
            ],
        },
        {
            questionType: "table-completion",
            tableData: {
                headers: ["Responsibilities", "Task 1", "Task 2", "Notes"],
                rows: [
                    {
                        cells: [
                            { content: "Bakery section" },
                            { content: "Check sell-by dates" },
                            { content: "Change price labels" },
                            { content: "Use (7)_______ labels", id: 7 },
                        ],
                    },
                    {
                        cells: [
                            { content: "Sushi takeaway counter" },
                            { content: "Re-stock with (8)_______ boxes if needed", id: 8 },
                            { content: "Wide preparation area and clean the sink" },
                            { content: "Do not clean any knives" },
                        ],
                    },
                    {
                        cells: [
                            { content: "Meat and fish counters" },
                            { content: "Clean the serving area including the weighing scales" },
                            { content: "Collect (9)_______ for the fish from the cold room", id: 9 },
                            { content: "Must wear special (10)_______", id: 10 },
                        ],
                    },
                ],
            },
        },
    ],
}

export const listening_section_2 = {
    // 7 minute audio   
    audio: "https://www.dropbox.com/scl/fi/vef1z71w1lvd8uwju02wg/part2.mp4?rlkey=nwody98j099s0q4z52k7usza7&st=8jd703bf&raw=1",
    questions: [
        {
            questionType: "multiple-choice-many",
            questions: [
                {
                    id: [11, 12],
                    question: "Which TWO problems with some training programmes for new runners does Liz mention?",
                    options: [
                        "There is a risk of serious injury.",
                        "They are unsuitable for certain age groups.",
                        "They are unsuitable for people with health issues.",
                        "It is difficult to stay motivated.",
                        "There is a lack of individual support."
                    ]
                },
                {
                    id: [13, 14],
                    question: "Which TWO tips does Liz recommend for new runners?",
                    options: [
                        "doing two runs a week",
                        "running in the evening",
                        "going on runs with a friend",
                        "listening to music during runs",
                        "running very slowly"
                    ]
                },
            ]
        },
        {
            questionType: "matching",
            question: {
                question_statement: "What reason prevented each of the following members of the Compton Park Runners Club from joining until recently?",
                statements_title: "Club Members",
                statements: [
                    { id: 15, text: "Ceri" },
                    { id: 16, text: "James" },
                    { id: 17, text: "Leo" },
                    { id: 18, text: "Mark" },
                ],
                features_title: "Reasons",
                features: [
                    { letter: "A", description: "a lack of confidence" },
                    { letter: "B", description: "a dislike of running" },
                    { letter: "C", description: "a lack of time" },
                ],
            }
        },
        {
            questionType: "multiple-choice-single",
            questions: [
                {
                    id: 19,
                    question: "What does Liz say about running her first marathon?",
                    options: [
                        "It had always been her ambition.",
                        "Her husband persuaded her to do it.",
                        "She nearly gave up before the end.",
                    ]
                },
                {
                    id: 20,
                    question: "Liz says new runners should sign up for a race",
                    options: [
                        "every six months.",
                        "within a few weeks of taking up running.",
                        "after completing several practice runs.",
                    ]
                }
            ]
        }
    ],
}

export const listening_section_3 = {
    audio: "https://www.dropbox.com/scl/fi/q4iq1wrm2kso3c37jesht/part3.mp4?rlkey=ti09cksf5ia209n6vktl6gt4j&st=ojeuph26&raw=1",
    questions: [
        {
            questionType: "multiple-choice-single",
            questions: [
                {
                    id: 21,
                    question: "Kieran thinks the packing advice given by Jane’s grandfather is",
                    options: [
                        "common sense.",
                        "hard to follow.",
                        "over-protective.",
                    ]
                },
                {
                    id: 22,
                    question: "How does Jane feel about the books her grandfather has given her?",
                    options: [
                        "They are not worth keeping.",
                        "They should go to a collector.",
                        "They have sentimental value for her.",
                    ]
                },
                {
                    id: 23,
                    question: "Jane and Kieran agree that hardback books should be",
                    options: [
                        "put out on display.",
                        "given as gifts to visitors.",
                        "more attractively designed.",
                    ]
                },
                {
                    id: 24,
                    question: "While talking about taking a book from a shelf, Jane",
                    options: [
                        "describes the mistakes other people make doing it.",
                        "reflects on a significant childhood experience.",
                        "explains why some books are easier to remove than others.",
                    ]
                },
                {
                    id: 25,
                    question: "What do Jane and Kieran suggest about new books?",
                    options: [
                        "Their parents liked buying them as presents.",
                        "They would like to buy more of them.",
                        "Not everyone can afford them.",
                    ]
                }
            ]
        },
        {
            questionType: "matching",
            question: {
                question_statement: "Where does Jane’s grandfather keep each of the following types of books in his shop?",
                statements_title: "Types of books",
                statements: [
                    { id: 26, text: "rare books" },
                    { id: 27, text: "children’s books" },
                    { id: 28, text: "unwanted books" },
                    { id: 29, text: "requested books" },
                    { id: 30, text: "coursebooks" },
                ],
                features_title: "Location of books",
                features: [
                    { letter: "A", description: "near the entrance" },
                    { letter: "B", description: "in the attic" },
                    { letter: "C", description: "at the back of the shop" },
                    { letter: "D", description: "on a high shelf" },
                    { letter: "E", description: "near the stairs" },
                    { letter: "F", description: "in a specially designed space" },
                    { letter: "G", description: "within the cafe" },
                ],
            }
        }
    ]
}

export const listening_section_4 = {
    audio: "https://www.dropbox.com/scl/fi/q5fby8ml5l4m5978ns4vb/part4.mp4?rlkey=xktr9prgs88caw2zy85evlqdz&st=fcoldm6s&raw=1",
    questions: [
        {
            questionType: "note-completion",
            topic: "Tree planting",
            sections: [
                {
                    title: "Reforestation projects should:",
                    bulletPoints: [
                        {
                            text: "include a range of tree species"
                        },
                        {
                            id: 31,
                            text: "not include invasive species because of possible (31) _______ with native species",
                        },
                        {
                            id: 32,
                            text: "aim to capture carbon, protect the environment and provide sustainable sources of (32) _______ for local people",
                        },
                        {
                            id: 33,
                            text: "use tree seeds with a high genetic diversity to increase resistance to (33) _______ and climate change",
                        },
                        {
                            id: 34,
                            text: "plant trees on previously forested land which is in a bad condition, not select land which is being used for (34) _______",
                        },
                    ],
                },
                {
                    title: "Large-scale reforestation projects",
                    bulletPoints: [
                        {
                            id: 35,
                            text: "Base planning decisions on information from accurate (35) _______",
                        },
                        {
                            id: 36,
                            text: "Drones are useful for identifying areas in Brazil which are endangered by keeping (36) _______ and illegal logging",
                        },
                    ],
                },
                {
                    title: "Lampang Province, Northern Thailand",
                    bulletPoints: [
                        {
                            text: "A forest was restored in a area damaged by mining."
                        },
                        {
                            text: "A variety of native fig trees were planted which are important for"
                        },
                        {
                            text: "<<subpoint>> supporting many wildlife spicies."
                        },
                        //37 and 38 are supposed to be in one statement
                        {
                            id: 37,
                            text: "<<subpoint>> increasing the (37) _______ of recovery by attracting animals and birds",
                        },
                        {
                            id: 38,
                            text: "<<subpoint>> e.g., (38) _______ were soon attracted to the area",
                        },
                    ],
                },
                {
                    title: "Involving local communities",
                    bulletPoints: [
                        {
                            id: 39,
                            text: "Destruction of mangrove forests in Madagascar made it difficult for people to make a living from (39) _______",
                        },
                        {
                            text: "The mangrove reforestation project:",
                        },
                        {
                            text: "<<subpoint>> Provided employment to local people",
                        },
                        {
                            text: "<<subpoint>> Restored a healthy ecosystem.",
                        },
                        {
                            id: 40,
                            text: "<<subpoint>> Protect against the higher risks of (40) _______.",
                        },

                    ],
                },
            ],
        }
    ],
}

// https://practicepteonline.com/ielts-reading-test-307/
export const reading_section_1 = {
    reading_passage: {
        title: "THE BAOBAB TREE",
        subtitle: "",
        passage: `
The baobab tree is an icon of the African continent. It can live for over a thousand years and is a vital source of food, water and shelter for indigenous peoples and wildlife alike. Given the tree’s many practical uses, it is not surprising that the baobab features so prominently in traditional African folklore.
The baobab is a prehistoric species which predates both mankind and the splitting of the continents over 200 million years ago. It belongs to the genus Adansonia, which contains nine species. These are found in the drier parts of Africa, Madagascar, India, Sri Lanka and Australia. Of the nine species, six are native to Madagascar, two to mainland Africa and one to Australia. The African and Australian baobabs look very similar, even though they are not the same species. Baobabs grow in 32 African countries. In West Africa, the baobab’s presence is often an indication of a human settlement nearby. The tree is most frequently found in dry, hot savannahs of sub-Saharan Africa, where the climate is extremely arid and rainfall is seasonal.
The baobab is a deciduous tree, which means that it loses its leaves during the dry season. It is a succulent, which means that during the rainy season it absorbs and stores water in its vast trunk. This water enables it to produce a nutrient-dense fruit in the dry season when all around is dry and arid. The trunk has a diameter of 10-14 metres and the tree has a height of 18-25 metres. The baobab tree is a strange looking tree that grows in low-lying areas in Africa. Its trunk is very wide and it has large white flowers that bloom at night. Its leaves are finger-like in shape. The baobab is a very versatile tree. Its leaves, bark, fruit and trunk are all useful to humans and animals.
The baobab’s fruit is large and oval-shaped and it contains a mass of seeds. It is a rich source of vitamin C and its pulp can be used to make a refreshing drink. The pulp can also be used to treat fever, diarrhoea and malaria. The pulp can be stored until it is needed. The seeds of the fruit can be used to produce oil. This oil is used to protect the skin and it is also used in the cosmetic industry. The leaves of the baobab are also useful. They can be eaten fresh or they can be dried and stored. They are rich in iron and can be used as a medicine. The leaves can be used to treat asthma, insect bites and several other ailments. The leaves can also be used as a sauce for food. The bark of the baobab is also useful. It can be used to make cloth and rope. The bark can also be used to make musical instruments, waterproof hats and fishing lines. The bark has also been used to protect young plants from animals. The bark of the baobab is also used to treat fever. The trunk of the baobab is very wide and it can be used as a shelter. It is also used for storage and it can also be used as a source of water in dry periods. The baobab can also be used to make a variety of things such as musical instruments, handcrafts, pots to grow plants in, and many other useful items. The tree also provides shade for animals and humans. The tree is also a source of fuel and is used as a firebreak as well.
The baobab is also known as the ‘tree of life’ because it can provide shelter, clothing, food, and water for the animal and human inhabitants of the African savannah regions. The tree is also an important source of food for many different creatures such as insects and animals. The flowers provide food for fruit bats, which play an important role in pollinating the flowers. The seeds are eaten by various mammals such as baboons, monkeys and warthogs. Elephants and eland eat the bark of the baobab tree. The flowers provide food for birds, bees and other insects. The baobab tree is home to snakes and tree frogs. The tree is also home to bush babies, which feed on the flowers. The tree is also home to birds such as the mottled spinetail, the grey-headed parrot and the mottled swift. The tree is also host to the African honey bee.
The baobab tree is under threat because of the increasing human population. The trees are being cut down for their bark, which is used to make rope, mats and baskets. The trees are also being cut down to make way for farmland. The baobab is also under threat from climate change.
    `
    },
    questions: [
        {
            questionType: "true-false-notgiven",
            questions: [
                {
                    id: 1,
                    statement: "The baobab tree has been a part of African folklore because of its symbolic representation in ancient myths.",
                },
                {
                    id: 2,
                    statement: "Baobab trees are only found on the African continent.",
                },
                {
                    id: 3,
                    statement: "In West Africa, the presence of a baobab tree often indicates nearby human settlements.",
                },
                {
                    id: 4,
                    statement: "Baobab trees are commonly found in humid tropical rainforests.",
                },
                {
                    id: 5,
                    statement: "The baobab stores water in its trunk during the rainy season to survive dry periods.",
                },
                {
                    id: 6,
                    statement: "The leaves of the baobab tree can be used to make a medicinal sauce.",
                },
                {
                    id: 7,
                    statement: "Baobab trees are pollinated exclusively by fruit bats.",
                }
            ]
        },
        {
            questionType: "note-completion",
            topic: "Uses of the Baobab Tree",
            sections: [
                {
                    title: "Fruit",
                    bulletPoints: [
                        {
                            text: "contains a lot of vitamin C",
                        },
                        {
                            text: "can be used to treat illness",
                        },
                        {
                            text: "can be stored for a long time",
                        },
                        {
                            text: "seeds can be used to produce oil",
                        },
                    ],
                },
                {
                    title: "Leaves",
                    bulletPoints: [
                        {
                            text: "can be used fresh or dried",
                        },
                        {
                            text: "can be used to treat illness",
                        },
                        {
                            id: 8,
                            text: "can be used to make a (8) _______",
                        },
                    ],
                },
                {
                    title: "Bark",
                    bulletPoints: [
                        {
                            text: "can be used to make cloth and musical instruments",
                        },
                        {
                            id: 9,
                            text: "can be used to protect (9) _______ and to treat fever",
                        },
                    ],
                },
                {
                    title: "Trunk",
                    bulletPoints: [
                        {
                            id: 10,
                            text: "can provide (10) _______ and water",
                        },
                        {
                            id: 11,
                            text: "can be used to make (11) _______",
                        },
                    ],
                },
                {
                    title: "General",
                    bulletPoints: [
                        {
                            id: 12,
                            text: "provides (12) _______ for animals and humans",
                        },
                        {
                            id: 13,
                            text: "can be used to make (13) _______ to burn",
                        },
                    ],
                },
            ],
        },
    ]
}

export const reading_section_2 = {
    reading_passage: {
        title: "THE BIRTH OF THE 10,000-HOUR RULE",
        subtitle: "A study on violinists in the early 1990s inspired the idea that 10,000 hours of practice is the key to success",
        passage: `
The so-called 10,000-hour rule can be traced back to a 1993 paper, ‘The Role of Deliberate Practice in the Acquisition of Expert Performance’, co-authored by a Swedish psychologist and a US psychological scientist. The paper is one of the most cited in its field. Its most striking claim is that the difference between expert performers and normal adults is not due to innate talent, but rather is a reflection of the amount of deliberate practice they have undergone. ‘Many characteristics once believed to reflect innate talent are actually the result of intense practice extended for a minimum of 10 years,’ the authors wrote. They concluded: ‘The maximal level of performance for individuals in a given domain is not attained automatically as a function of extended experience, but the level of performance can be increased even by highly experienced individuals as a result of deliberate efforts to improve.’
The study looked at three groups of violinists at the Music Academy of West Berlin, in Germany. The authors set out to find out what had caused the ‘best’ violinists to be better than the merely ‘good’ ones, who were in turn better than the ‘least accomplished’ ones. All of the violinists were asked how much they had practised, alone, with a teacher, and with others, every week, ever since they had first picked up a violin. What they found was that by the age of 20, the best violinists had practised an average of 10,000 hours, the good ones had practised 8,000 hours, and the least skilled had practised 4,000 hours. The psychologists concluded that what mattered was not the time spent obtaining any old experience, but the amount of time spent on ‘deliberate practice’, which they defined as an effortful activity designed to improve individual target performance. The authors also noted that the most accomplished individuals in their study had each followed the same learning structure, and had all acquired their skills in a similar way: ‘All of the expert violinists had started playing at approximately five years of age, and had selected a music teacher who was a violinist. All of them had been admitted to a music academy by eight years of age, where they had been taught by skillful violin teachers. All of them had started solo practice at around the age of eight. All of them had been rated very highly by their violin teachers at the music academy, and had given their first public performance at around the age of eight.’
The theory of deliberate practice was popularised by the writer Malcolm Gladwell, who argued that talent is irrelevant to performance in his book Outliers, published in 2008. ‘The striking thing about Ericsson’s study is that he and his colleagues couldn’t find any “naturals”, musicians who floated effortlessly to the top while practising a fraction of the time their peers did. Nor could they find any “grinds”, people who worked harder than everyone else, yet just didn’t have what it takes to break the top ranks,’ he wrote. ‘Their research suggests that once a musician has enough ability to get into a top music school, the thing that distinguishes one performer from another is how hard he or she works. That’s it. And what’s more, the people at the very top don’t work just harder or even much harder than everyone else. They work much, much harder.’
But while Ericsson and his colleagues had found a correlation between the number of hours spent on deliberate practice and the level of expertise achieved, their research didn’t determine whether practice was the cause of that expertise. The idea that 10,000 hours of practice will make you an expert is appealing, not least because it suggests that anyone can achieve anything if they just work hard enough. But while practice is undeniably important, it is not the only factor that contributes to performance. In 2014, a group of psychologists led by Brooke Macnamara of Princeton University re-analysed data from all of the studies they could find on the relationship between deliberate practice and performance in various domains, including music, sports and education, and estimated that the average amount that practice contributes to mastery of these is just 12 percent. That leaves a lot of the variance in expert performance unexplained, which means factors other than practice must be involved.
In a rejoinder, Ericsson argues that Macnamara’s analysis actually showed the opposite of what she claimed. In each of the domains she looked at, he says, practice was the single most important factor in predicting a person’s level of expertise. The problem, he argues, is that Macnamara’s analysis looked at the total number of hours of practice undertaken by the participants in the studies she reviewed, rather than the number of hours of deliberate practice. ‘The paper is important because it shows that the amount of time with relevant experience is not a good predictor of attained performance,’ he says. ‘But it does not invalidate the body of research on deliberate practice, nor its utility as the most important predictor of expertise.’
        `
    },
    questions: [
        {
            questionType: "match-paragraph-information",
            question: {
                information: [
                    { id: 14, text: "Tipping was originally met with hostility in the US" },
                    { id: 15, text: "Laws were created that made tipping illegal," },
                    { id: 16, text: "Congress passed legislation in 1966 that made it legal to" },
                    { id: 17, text: "Some restaurants force large groups of customers to" },
                    { id: 18, text: "The main benefit of the gig economy is that it" },
                ],
                letters: [
                    "A", "B", "C", "D", "E"
                ],
            }
        },
        {
            questionType: "matching-features",
            question: {
                question_statement: "Look at the following statements the list of researchers below. You may use any letter more than once.",
                statements_title: "Statements",
                statements: [
                    { id: 19, text: "Their research involved innovative methods of measuring practice among participants.", },
                    { id: 20, text: "They made claims about the significance of practice which were not justified.", },
                    { id: 21, text: "They devised a sophisticated way of measuring the development of expertise.", },
                    { id: 22, text: "Their research generated an unexpected result.", },
                ],
                features_title: "List of Researchers",
                features: [
                    { letter: "A", description: "Ericsson and colleagues", },
                    { letter: "B", description: "Malcolm Gladwell", },
                    { letter: "C", description: "Brooke Macnamara and colleagues", },
                ],
            },
        },
        {
            questionType: "multiple-choice-many",
            questions: [
                {
                    id: [23, 24],
                    question: "Which TWO of the following statements does the writer make about the study of violinists undertaken by Ericsson and his colleagues?",
                    options: [
                        "It was widely regarded as original.",
                        "Its aims were innovative.",
                        "It produced some unexpected findings.",
                        "It called into question the methods of other researchers.",
                        "Its scope was very limited."
                    ]
                },
                {
                    id: [25, 26],
                    question: "Which TWO of the following statements does the writer make about the theory of deliberate practice?",
                    options: [
                        "It was developed by combining data from several studies.",
                        "It is the only theory to attempt to calculate the number of hours required for expertise.",
                        "It is the first theory to link the acquisition of expertise with the number of hours spent practising.",
                        "It fails to take account of individual differences.",
                        "It has been challenged by some researchers."
                    ]
                }
            ]
        },
    ]
}

export const reading_section_3 = {
    reading_passage: {
        title: "NUCLEAR FUSION: THE KEY TO LIMITLESS CLEAN ENERGY?",
        subtitle: "",
        passage: `
A In December 2022, scientists at a laboratory in California announced a major breakthrough in nuclear fusion research. For the first time ever, scientists had managed to produce a nuclear fusion reaction that generated more energy than it consumed. The result was hailed as a major step forward in the development of nuclear fusion as a new source of energy. But what is nuclear fusion, and why is it so important?
B When we think of nuclear power, we usually think of nuclear fission, the process of splitting the nucleus of an atom into two or more smaller nuclei. This is the reaction that occurs in nuclear power stations today. However, nuclear fission has a number of disadvantages. The fuel used is radioactive, and there is always a risk of nuclear accidents, such as the one that occurred at the Chernobyl nuclear power plant in 1986. In addition, nuclear fission produces radioactive waste, which remains dangerous for thousands of years and is difficult to dispose of safely. Nuclear fusion, on the other hand, is the process of fusing two atomic nuclei together to form a single heavier nucleus. This is the process that occurs in the sun and other stars. The reaction releases a huge amount of energy, and the fuel used is not radioactive. This makes nuclear fusion a potentially limitless source of clean energy.
C The potential benefits of nuclear fusion are enormous. It could provide a virtually limitless supply of clean energy, with none of the problems associated with nuclear fission. It could help to reduce our reliance on fossil fuels, and therefore help to combat climate change. It could also provide energy security, as the fuel used in nuclear fusion is abundant and widely available. However, there are significant challenges to be overcome before nuclear fusion can become a viable source of energy.
D One of the biggest challenges is the high temperature and pressure required to achieve nuclear fusion. In order to fuse atomic nuclei together, they must be heated to temperatures of millions of degrees Celsius. This requires a huge amount of energy, and it is difficult to find materials that can withstand such high temperatures. In addition, the nuclei must be held together at high pressure for a long enough time to allow the fusion reaction to occur. This is difficult to achieve, as the high temperature and pressure tend to cause the nuclei to fly apart.
E Another challenge is the cost of nuclear fusion research. The equipment and research required to achieve nuclear fusion are extremely expensive, and the cost of research and development is high. This has led to concerns that nuclear fusion may not be economically viable, and that the money spent on research could be better spent on other forms of clean energy.
F Despite these challenges, there has been significant progress in nuclear fusion research in recent years. Scientists have developed a number of different approaches to achieving nuclear fusion, and have made significant advances in understanding the physics of the process. The recent breakthrough in California is just one example of the progress that has been made.
G One of the most promising approaches to achieving nuclear fusion is the use of magnetic confinement. In this approach, a plasma of hydrogen nuclei is confined within a magnetic field and heated to the required temperature. The magnetic field helps to keep the nuclei close together, increasing the chances of fusion occurring. This approach has been used in a number of experimental fusion reactors, and has shown promise in achieving the conditions required for nuclear fusion.
H Another approach is inertial confinement, in which a small pellet of hydrogen fuel is compressed and heated using lasers or other forms of energy. The compression and heating cause the nuclei to fuse together, releasing energy. This approach has also shown promise, and has been used in a number of experimental fusion reactors.
I Despite the progress that has been made, there is still a long way to go before nuclear fusion can become a viable source of energy. Scientists need to find ways to achieve the required temperature and pressure more efficiently, and to develop materials that can withstand the extreme conditions. They also need to find ways to reduce the cost of nuclear fusion research, such as by having cheaper, more durable materials for some components like the first wall and divertors.
J In conclusion, nuclear fusion has the potential to be a virtually limitless source of clean energy, with none of the problems associated with nuclear fission. However, there are significant challenges to be overcome before it can become a viable source of energy. Scientists need to find ways to achieve the required conditions more efficiently, and to reduce the cost of research. Despite these challenges, there has been significant progress in nuclear fusion research in recent years, and the recent breakthrough in California is just one example of this progress. With continued research and development, nuclear fusion could become a major source of energy in the future.
        `
    },
    questions: [
        {
            questionType: "match-paragraph-information",
            question: {
                information: [
                    {
                        id: 27,
                        text: "a description of the method used by stars to generate energy"
                    },
                    {
                        id: 28,
                        text: "a description of the process used to produce energy in nuclear power plants today"
                    },
                    {
                        id: 29,
                        text: "an explanation of the advantages of nuclear fusion over nuclear fission"
                    },
                    {
                        id: 30,
                        text: "a reference to the difficulty of achieving the conditions required for nuclear fusion"
                    },
                    {
                        id: 31,
                        text: "a reference to a nuclear fusion experiment that has been successful"
                    },
                    {
                        id: 32,
                        text: "a mention of the need to find a way of making nuclear fusion research more affordable"
                    }
                ],
                letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
            }
        },
        {
            //there are 2 separate paragpahs with 2 titles
            questionType: "summary-completion",
            question: {
                id: [33, 34, 35],
                title: "Magnetic and Inertial Confinement",
                passageTemplate: `
In the magnetic confinement approach, a <33> is placed inside a magnetic field and heated. This method has been employed in various experimental <34> showing potential for generating fusion energy.
In the inertial confinement approach, a small pellet of hydrogen fuel is compressed and heated using lasers or other forms of energy. This extreme compression and heat triggers a nuclear reaction during which the <35> are fused together, releasing a significant amount of energy.
    `,
                optionList: [
                    { letter: "A", text: "plasma" },
                    { letter: "B", text: "nuclei" },
                    { letter: "C", text: "energy" },
                    { letter: "D", text: "reactors" },
                    { letter: "E", text: "fusion" },
                    { letter: "F", text: "reaction" },
                    { letter: "G", text: "hydrogen" },
                    { letter: "H", text: "atoms" },
                    { letter: "I", text: "nuclear fission" },
                    { letter: "J", text: "nuclear fusion" },
                    { letter: "K", text: "temperature" }
                ]
            }
        },
        {
            questionType: "true-false-notgiven",
            questions: [
                {
                    id: 36,
                    statement: "The California experiment was the first time nuclear fusion had ever been achieved."
                },
                {
                    id: 37,
                    statement: "Nuclear fusion could help to reduce the world’s dependence on fossil fuels."
                },
                {
                    id: 38,
                    statement: "The fuel used in nuclear fusion is rare and hard to find."
                },
                {
                    id: 39,
                    statement: "The high cost of nuclear fusion is solely attributed to its equipment."
                },
                {
                    id: 40,
                    statement: "The basic physics behind nuclear fusion is more advanced than scientists once thought."
                }
            ]
        }
    ]
}


// https://practicepteonline.com/ielts-writing-test-60/
export const writingTasks = [
    {
        id: 1,
        timeLimit: "You should spend about 20 minutes on this task.",
        wordLimit: "Write at least 150 words.",
        prompt: [
            "The graph below shows the total value of exports and the value of fuel, food and manufactured goods exported by one country from 2000 to 2005.",
            "Summarize the information by selecting and reporting the main features, and make comparisons where relevant."
        ],
        image_url: "https://www.dropbox.com/scl/fi/0m0c8iz9ilnevay2u3pot/test1_task1.png?rlkey=gkb7jiipnzpmqzq07j3413hlq&st=b394ih57&raw=1",
    },
    {
        id: 2,
        timeLimit: "You should spend about 40 minutes on this task.",
        wordLimit: "Write at least 250 words.",
        prompt: [
            "Pollution and other environmental damages are caused by a country developing and becoming richer. This problem cannot be avoided. To what extent do you agree?",
            "Give reasons for your answer, and include any relevant examples from your own knowledge or experience."
        ],
    }
]


// CHATGPT GENERATED
export const speaking_transcripts = [
    {
        part: 1,
        questions: [
            { id: 1, transcript: "Now, in this part of the test, I will ask you some questions about yourself. After each question, there will be a beep sound. You will have 20 seconds to speak after the beep. So, Do you enjoy spending time outdoors? Why or why not?", audioUrl: "https://www.dropbox.com/scl/fi/cbbjdzh67fkeegc8aiexc/part1_q1.mp3?rlkey=wxflor6ncb4ee5wpw8z1z8nea&st=rxbw7wgy&raw=1" },
            { id: 2, transcript: "What kind of outdoor activities do you usually do?", audioUrl: "https://www.dropbox.com/scl/fi/c8zqkopwkh91qm5eywhjv/part1_q2.mp3?rlkey=4p9gr90j92hbolv94djphqe8n&st=scqe700v&raw=1" },
            { id: 3, transcript: "Is there a popular outdoor space near where you live?", audioUrl: "https://www.dropbox.com/scl/fi/r30br8j3r0ho00vovc7c2/part1_q3.mp3?rlkey=ams8xmy6xn3p9ik6ki812gf6s&st=ibae7vkh&raw=1" },
            { id: 4, transcript: "Do you think people spend enough time outdoors nowadays?", audioUrl: "https://www.dropbox.com/scl/fi/6bgsqczs4fdvn3bv93m4s/part1_q4.mp3?rlkey=5mud4z4yzp6zwj7uz0p1om261&st=v5s08wt9&raw=1" },

            { id: 5, transcript: "I’d like to move on and ask you some questions about shopping. Do you enjoy shopping for clothes? Why or why not?", audioUrl: "https://www.dropbox.com/scl/fi/qt7i0m30dh0255o91tp73/part1_q5.mp3?rlkey=yb8szbqone0d0tsot1ohnoyeb&st=219otfz3&raw=1" },
            { id: 6, transcript: "How often do you buy new clothes?", audioUrl: "https://www.dropbox.com/scl/fi/aq3pwxvazmpt4pdknlxev/part1_q6.mp3?rlkey=5gz2x8l9xvnz4c51ix49k7vgx&st=8ut44oka&raw=1" },
            { id: 7, transcript: "Do you prefer shopping online or in physical stores? Why?", audioUrl: "https://www.dropbox.com/scl/fi/oamoc5whf6s2fx90isjqb/part1_q7.mp3?rlkey=rtjst4ft2vnrfj5dx39yq1ch1&st=6dt7lmhu&raw=1" },
            { id: 8, transcript: "Has your shopping behavior changed in recent years?", audioUrl: "https://www.dropbox.com/scl/fi/54aa01xkbl6lq4jpv5gqs/part1_q8.mp3?rlkey=fg23tmacn0f5k4mtk8rsf64bf&st=d5kar76u&raw=1" },
        ]
    },
    {
        part: 2,
        questions: [
            {
                id: 9,
                transcript: "Describe a person who has inspired you to achieve something.",
                audioUrl: "https://www.dropbox.com/scl/fi/w7v0ypanfebpaqmiw2itp/part2.mp3?rlkey=a9f1joxudb0pnmb64rf9sk47j&st=gelxzxp6&raw=1"
            }
        ]
    },
    {
        part: 3,
        questions: [
            { id: 10, transcript: "You’ve just spoken about someone who inspired you. Let’s talk more about role models. What qualities do you think a good role model should have?", audioUrl: "https://www.dropbox.com/scl/fi/if7j1w8epkzqu952v2h10/part3_q1.mp3?rlkey=uykylwgxkg35so79nwnihwplu&st=xhpsuafh&raw=1" },
            { id: 11, transcript: "Do you think celebrities are good role models for young people?", audioUrl: "https://www.dropbox.com/scl/fi/duipwu2odujqs9i0jglj2/part3_q2.mp3?rlkey=i9t9tcta9ammk34sqi5bslb6o&st=mx6yemtk&raw=1" },
            { id: 12, transcript: "Are role models important in education and career development?", audioUrl: "https://www.dropbox.com/scl/fi/pymz2vlwewtwoppx2tnum/part3_q3.mp3?rlkey=1lwlewsn7p7ve8ux7g7szjubp&st=rxqw2nty&raw=1" },

            { id: 13, transcript: "Let’s move on and talk about goals and motivation. Why do people set goals in life?", audioUrl: "https://www.dropbox.com/scl/fi/k1s15qhwjvkesdusssmtt/part3_q4.mp3?rlkey=rzxtow67eopo786ve3mzez2ed&st=23y2kz96&raw=1" },
            { id: 14, transcript: "Do you think it’s better to set long-term goals or short-term goals? Why?", audioUrl: "https://www.dropbox.com/scl/fi/shq4ohzs088kxwkm57fvm/part3_q5.mp3?rlkey=9vuktjaeptm9ubjlmfchz2ar6&st=dym194eu&raw=1" },
            { id: 15, transcript: "What challenges do people face when trying to stay motivated?", audioUrl: "https://www.dropbox.com/scl/fi/p0p0p7gueu39rabbs3276/part3_q6.mp3?rlkey=uk3md0l4u9qklubrma0eabc3v&st=mpc8yoiu&raw=1" },
        ]
    }
];


export const reading_answers = {
    1: "False",
    2: "False",
    3: "True",
    4: "False",
    5: "True",
    6: "True",
    7: "False",
    8: "Sauce",
    9: "Plants",
    10: "Shelter",
    11: "Pots",
    12: "Shade",
    13: "Fuel",
    14: "A",
    15: "D",
    16: "C",
    17: "B",
    18: "D",
    19: "A",
    20: "B",
    21: "C",
    22: "C",
    23: "A/C",
    24: "A/C",
    25: "C/E",
    26: "C/E",
    27: "B",
    28: "B",
    29: "B",
    30: "D",
    31: "A",
    32: "I",
    33: "A",
    34: "D",
    35: "B",
    36: "False",
    37: "True",
    38: "False",
    39: "False",
    40: "Not given"
};

export const listening_answers = {
    1: "Kaeden",
    2: "Locker(s)",
    3: "Passport",
    4: "Uniform",
    5: "Third/3rd",
    6: "0412665903",
    7: "Yellow",
    8: "Plastic",
    9: "Ice",
    10: "Gloves",
    11: "C/E",
    12: "C/E",
    13: "A/D",
    14: "A/D",
    15: "A",
    16: "B",
    17: "C",
    18: "A",
    19: "C",
    20: "B",
    21: "A",
    22: "C",
    23: "A",
    24: "B",
    25: "C",
    26: "D",
    27: "F",
    28: "A",
    29: "C",
    30: "G",
    31: "Competition",
    32: "Food",
    33: "Disease",
    34: "Agriculture",
    35: "Maps",
    36: "Cattle",
    37: "Speed",
    38: "Monkeys",
    39: "Fishing",
    40: "Flooding"
};