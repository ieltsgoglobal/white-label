// https://www.youtube.com/watch?v=RazbWB4gu9I  
export const listening_section_1 = {
    audio: "https://www.dropbox.com/scl/fi/yine8hgzsyzdszwjm2c75/test6-l1.mp4?rlkey=ti98dpw8cjgiuubs7qf4laczh&st=rshasrbv&raw=1",
    questions: [
        {
            questionType: "form-completion",
            formData: {
                title: "REQUEST FOR SPECIAL LEAVE",
                sections: [
                    {
                        // below title is extra, convert it into title?: string maybe
                        // dates of leaves are converted to starting and ending date making it two seperate blanks
                        title: "",
                        fields: [
                            {
                                label: "Address:",
                                content: "(1) _______ Street Tamworth, 2340",
                                id: 1
                            },
                            {
                                label: "Telephone number:",
                                content: "8106745",
                            },
                            {
                                label: "Course:",
                                content: "(2) _______",
                                id: 2
                            },
                            {
                                label: "Teacher's name:",
                                content: "(3) _______",
                                id: 3
                            },
                            {
                                label: "Students visa expiry date:",
                                content: "(4) _______",
                                id: 4
                            },
                            {
                                label: "I wish to request leave in Term:",
                                content: "(5) _______",
                                id: 5
                            },
                            {
                                label: "Start date of leave:",
                                content: "(6) _______",
                                id: 6
                            },
                            {
                                label: "End date of leave:",
                                content: "(7) _______",
                                id: 7
                            },
                            {
                                label: "Number of working days missed:",
                                content: "(8) _______",
                                id: 8
                            }
                        ]
                    }
                ]
            }
        },
        {
            questionType: "multiple-choice-single",
            questions: [
                {
                    id: 9,
                    question: "Why does Angela want to take leave?",
                    options: [
                        "to visit her aunt and uncle",
                        "to see the National Gallery",
                        "to see the Southern Highlands"
                    ]
                },
                {
                    id: 10,
                    question: "When will Angela go home to her own country?",
                    options: [
                        "in few years",
                        "in twelve months",
                        "in two months"
                    ]
                }
            ]
        }
    ],
}

export const listening_section_2 = {
    audio: "https://www.dropbox.com/scl/fi/hueup3d419a24w9bsoq8a/test6-l2.mp4?rlkey=b99ju4cay9ky8ynnj267tq9yg&st=dy77ye8o&raw=1",
    questions: [
        {
            questionType: "multiple-choice-single",
            questions: [
                {
                    id: 11,
                    question: "Joanne says that visitors to Darwin are often surprised by",
                    options: [
                        "the number of young people",
                        "the casual atmosphere",
                        "the range of cultures"
                    ]
                },
                {
                    id: 12,
                    question: "To enjoy cultural activities, the people of Darwin tend to",
                    options: [
                        "travel to southern Australia",
                        "bring in artists from other areas",
                        "involve themselves in production"
                    ]
                },
                {
                    id: 13,
                    question: "The Chinese temple in Darwin",
                    options: [
                        "is no longer used for its original purpose",
                        "was rebuilt after its destruction in a storm",
                        "was demolished room for new buildings"
                    ]
                },
                {
                    id: 14,
                    question: "The main problem with travelling by bicycle is",
                    options: [
                        "the climate",
                        "the traffic",
                        "the hills"
                    ]
                },
                {
                    id: 15,
                    question: "What does Joanne say about swimming in the sea?",
                    options: [
                        "It is essential to wear a protective suit",
                        "Swimming is only safe during the winter",
                        "You should stay in certain restricted areas"
                    ]
                }
            ]
        },
        {
            questionType: "matching",
            question: {
                statements: [
                    { id: 16, text: "'Aquascene'" },
                    { id: 17, text: "Smith Street Mall" },
                    { id: 18, text: "Cullen Bay Marina" },
                    { id: 19, text: "Fannie Bay" },
                    { id: 20, text: "Mitchell Street" }
                ],
                features: [
                    { letter: "A", description: "a flower market" },
                    { letter: "B", description: "a chance to feed the fish" },
                    { letter: "C", description: "good nightlife" },
                    { letter: "D", description: "international arts and crafts" },
                    { letter: "E", description: "good cheap international food" },
                    { letter: "F", description: "a trip to catch fish" },
                    { letter: "G", description: "shops and seafood restaurants" },
                    { letter: "H", description: "a wide range of different plants" }
                ]
            }
        }
    ]
}

export const listening_section_3 = {
    audio: "https://www.dropbox.com/scl/fi/2geu8g4y5b4yy6ze9m1ib/test6-l3.mp4?rlkey=fe9az3zf1jz4y6h5k9b6fdaqp&st=fmg8dlfd&raw=1",
    questions: [
        {
            questionType: "multiple-choice-many",
            questions: [
                {
                    id: [21, 22],
                    question: "The administration of Britain was divided into two regions in 200 AD. What were their capitals?",
                    options: [
                        "York",
                        "Britannia Superior",
                        "Britannia Inferior",
                        "London"
                    ]
                }
            ]
        },
        {
            questionType: "multiple-choice-single",
            questions: [
                {
                    id: 23,
                    question: "According to the first speaker, the focus of the lecture is on",
                    options: [
                        "organizing work and study",
                        "staying healthy",
                        "maintaining a social life"
                    ]
                },
                {
                    id: 24,
                    question: "The lecture will be given by",
                    options: [
                        "the president of the union",
                        "the campus doctor",
                        "a health professional"
                    ]
                },
                {
                    id: 25,
                    question: "According to the second speaker, this week's lecture is on",
                    options: [
                        "team sports",
                        "time management",
                        "the emotional and physical benefits of exercise"
                    ]
                }
            ]
        },
        {
            questionType: "summary-completion",
            multiWord: true,
            question: {
                id: [26, 27, 28],
                title: "",
                passageTemplate: `
The facilities available cater for all the students' needs, and for those who are interested in sports not available at the university, they can contact their Students' Union representative or the <26> Manager to organize future activities.
The emotional benefits of exercise are just as important as the physical benefits. Women are prone to osteoporosis as they get older, so by building up your muscles, you also <27> your bones. Exercise releases endorphins, chemicals which make your brain work at <28> and make you more aware. In other words, exercise sharpens your mind.
    `
            }
        },
        {
            questionType: "multiple-choice-single",
            questions: [
                {
                    id: 29,
                    question: "How many hours a day does average student spend sitting?",
                    options: [
                        "two",
                        "six",
                        "eight"
                    ]
                },
                {
                    id: 30,
                    question: "How much time does Mary Kirk suggest should be devoted to exercise?",
                    options: [
                        "two hours a day",
                        "an hour a day",
                        "half an hour every second day"
                    ]
                }
            ]
        }
    ]
}

export const listening_section_4 = {
    audio: "https://www.dropbox.com/scl/fi/k98gz1oee75s0b50b1fwy/test6-l4.mp4?rlkey=gf6b24cojdd8s3370tf8yv4sz&st=0g0rk7gh&raw=1",
    questions: [
        {
            questionType: "multiple-choice-single",
            questions: [
                {
                    id: 31,
                    question: "The speaker compares a solar eclipse today to a",
                    options: [
                        "religious experience",
                        "scientific event",
                        "popular spectacle"
                    ]
                },
                {
                    id: 32,
                    question: "The speaker says that the dark spot of an eclipse is",
                    options: [
                        "simple to predict",
                        "easy to explain",
                        "randomly occurring"
                    ]
                },
                {
                    id: 33,
                    question: "Concerning an eclipse, the ancient Chinese were",
                    options: [
                        "fascinated",
                        "rational",
                        "terrified"
                    ]
                },
                {
                    id: 34,
                    question: "The most impressive aspect of an eclipse is the",
                    options: [
                        "exceptional beauty of the sky",
                        "chance for scientific study",
                        "effect of the moon on the sun"
                    ]
                },
                {
                    id: 35,
                    question: "Eclipses occur rarely because of the size of the",
                    options: [
                        "moon",
                        "sun",
                        "earth"
                    ]
                },
                {
                    id: 36,
                    question: "In predicting eclipses, the Babylonians were restricted by their",
                    options: [
                        "religious attitudes",
                        "inaccurate observations",
                        "limited ability to calculate"
                    ]
                }
            ]
        },
        {
            questionType: "table-completion",
            multiWord: true,
            tableData: {
                headers: ["Date of eclipse", "Scientists", "Observation"],
                rows: [
                    {
                        cells: [
                            { content: "1715" },
                            { content: "Halley" },
                            { content: "(37)_______ who accurately predicted an eclipse", id: 37 }
                        ]
                    },
                    {
                        cells: [
                            { content: "1868" },
                            { content: "Janssen and Lockyer" },
                            { content: "discovered a (38)_______ helium", id: 38 }
                        ]
                    },
                    {
                        cells: [
                            { content: "1878" },
                            { content: "Watson" },
                            { content: "believed he had found the lost (39)_______", id: 39 }
                        ]
                    },
                    {
                        cells: [
                            { content: "1919" },
                            { content: "Einstein" },
                            { content: "realised astronomers had misunderstood (40)_______", id: 40 }
                        ]
                    }
                ]
            }
        }
    ],
}


// https://bayanebartar.org/file-dl/library/IELTS11/IELTS-Practice-Tests-with-Answer-Key/Thomson-IELTS-Practice-Tests.pdf - Test 4 -  RC 1
export const reading_section_1 = {
    reading_passage: {
        title: "Groucho Marx Arthur Sheekman",
        subtitle: "",
        passage: `
In a show-business career that spanned over seventy years, Groucho Marx successfully conquered every entertainment medium, becoming a star of the vaudeville stage, Broadway, motion pictures, radio and television. But, as the author of seven books, a play, two film screenplays and over one hundred magazine articles and essays, Groucho quietly conquered another medium, one in which he was as proud to work as any of the others. His writing is often overlooked in studies of his career, perhaps due to the quantity and variety of his other work.
Throughout his literary career, Groucho was dogged by the incorrect and unfair assumption by many critics and even by his biographer that he used a ghost writer. Most Hollywood celebrities who wrote books had professional writers do the actual work. The fact that Groucho publicly stated on many occasions that he abhorred ghost writers is clouded by his relationship with Arthur Sheekman. Friends for many years, Groucho and Sheekman had an unusual literary relationship. They worked in collaboration and each offered the other editorial help. For a brief time in the early 1940s, Groucho fronted for Sheekman, who was having trouble selling his work. By thus lending his name to another writer's work, Groucho subjected allof his literary endeavors to suspicion from critics who simply refused to believe that an entertainer could write.
That some of Sheekman's magazine pieces got into print under Groucho's byline becomes apparent from reading the unedited correspondence between the two of them. The letters indicate that Groucho's essays from this period fall into three categories: first, pieces written by Groucho with no input from Sheekman at all. In a July 1, 1940, letter to Sheekman, Groucho asked, 'Did you see that little piece I wrote for Reader's Digest?' On March 17, 1941, he wrote, 'My drool is coming out in next week's issue of This Week so cancel your subscription now.' Clearly Sheekman could not have had anything to do with a piece that he was told to look for.
The second and probably largest category of Groucho's essays of this period consists of those written by Groucho and sent to Sheekman for editorial assistance. On July 20, 1940, Groucho wrote: I'm enclosing a copy of the piece I wrote. Probably another page or so is needed to complete it, but our starting date [for filming Go West ] came and I just haven't had time to finish it. Let me know what you think of it and be honest because any other kind of opinion would be of no value to me. I won't attempt to influence you by telling you the reactions I've already had, so for the love of God tell me the truth.' Shortly thereafter, on October 10, Groucho wrote: 'l received your suggestions on my piece - I'm glad you liked it, if you did - you're probably right about the beginning. I'll do it over again.' By the time Groucho wrote to Sheekman on July 25, 1942, it appears that some sort of financial arrangement had been made regarding Sheekman's suggestions. On that date Groucho also wrote: 'I'm writing an unfunny piece on insomnia and I'll send it in a week or so, I hope, for you to read - I'd like your opinion, proofread - correcting all the glaring illiteracies and, otherwise, do a fine polishing job.
The remainder of Groucho's essays from this period comprise the third category, Sheekman compositions with varying degrees of input from Groucho. The level of Groucho's contributions to the articles in the third category ranges from actually suggesting the topic and drawing up an outline to simply rewriting a few paragraphs for the purpose of injecting his own style into the piece. In a July 10, 1940, letter Groucho wrote: 'I think you ought to try another political piece - a campaign thing - for This Week or some other magazine. This will be an extremely hot topic for the next few months and I think you should take advantage of it. If you'll write to me, I'll try to jot down a few items that you could complain about.' Presumably, the chain of events would continue with Sheekman sending an essay to Groucho for his approval and whatever rewrites were needed. On May 29, 1940, Groucho wrote, 'Received your piece and looked it over.' In these letters to Sheekman, Groucho always referred to a piece as either 'my piece' or 'your piece'.The letter continued,'I thought the piece was good... and I'll send it to Bye and see if he can sell it ... I'll just rewrite a couple of paragraphs in your piece - not that I can improve them, but perhaps they'll sound a little more like me.' Groucho was concerned enough about this arrangement to take the care to at least make the piece somewhat his own.
Groucho really had no need for this entire enterprise. He gave the money to Sheekman and had no trouble getting his own work published. The principal reason for him submitting Sheekman's work to magazines as his own was that it made Sheekman's material easily marketable based on Groucho's celebrity. Sheekman couldn't have been altogether happy with the arrangement, but the reality was that he was periodically unemployed and the use of Groucho's name brought in occasional paychecks. So it is not quite fair to call Sheekman Groucho's ghost writer. A more apt description of their literary relationship at this time is that Groucho occasionally fronted for Sheekman and offered him the services of his literary agent, while each offered the other editorial advice. The reasons for some of their collaborative efforts not being credited as such remain unexplained, but Groucho was never shy about crediting his collaborators, and in every other case he did so.
        `
    },
    questions: [
        {
            questionType: "yes-no-notgiven",
            questions: [
                {
                    id: 1,
                    statement: "Groucho’s work as a writer was sometimes better than his work in other media."
                },
                {
                    id: 2,
                    statement: "Groucho’s relationship with Sheekman cast doubt on his own abilities as a writer."
                },
                {
                    id: 3,
                    statement: "Money was occasionally a source of disagreement between Groucho and Sheekman."
                },
                {
                    id: 4,
                    statement: "Groucho occasionally regretted his involvement with Sheekman."
                }
            ]
        },
        {
            questionType: "table-completion",
            multiWord: true,
            tableData: {
                headers: ["Category 1", "Category 2", "Category 3"],
                rows: [
                    {
                        cells: [
                            { content: "Sheekman had (5)_______", id: 5 },
                            { content: "Sheekman provided (6)_______", id: 6 },
                            { content: "- mostly (7)_______\n- Groucho added (8)_______", id: [7, 8] }
                        ]
                    }
                ]
            }
        },
        {
            questionType: "matching-features",
            question: {
                question_statement: "Match each statement with the letter it relates to from the list of letters sent by Groucho to Sheekman.",
                statements_title: "Statements",
                statements: [
                    { id: 9, text: "Groucho referred to his own inadequacy with regard to use of language." },
                    { id: 10, text: "Groucho explained his reason for amending an essay." },
                    { id: 11, text: "Groucho agreed that part of an essay needed revising." },
                    { id: 12, text: "Groucho drew Sheekman’s attention to an essay soon to be published." },
                    { id: 13, text: "Groucho suggested that an essay should adopt a negative point of view." }
                ],
                features_title: "List of Letters Sent by Groucho to Sheekman",
                features: [
                    { letter: "A", description: "July 1, 1940" },
                    { letter: "B", description: "March 17, 1941" },
                    { letter: "C", description: "July 20, 1940" },
                    { letter: "D", description: "October 10, 1940" },
                    { letter: "E", description: "July 25, 1942" },
                    { letter: "F", description: "July 10, 1940" },
                    { letter: "G", description: "May 29, 1940" }
                ]
            }
        },
    ]
}

// https://bayanebartar.org/file-dl/library/IELTS11/IELTS-Practice-Tests-with-Answer-Key/Thomson-IELTS-Practice-Tests.pdf - Test 4 -  RC 2
export const reading_section_2 = {
    reading_passage: {
        title: "An earth-shaking discovery",
        subtitle: "The discovery of sea floor spreading is earth-shaking, yet those responsible are forgotten, says Anna Grayson",
        passage: `
In 1963, a paper appeared in the journal Nature that radically changed the way we view this planet and its resources. Its authors, Fred Vine and Drummond Matthews, did for the Earth sciences what Crick and Watson did for biology and Einstein did for physics, and new areas of scientific development are still emerging as a result.
Yet both men are largely forgotten and unrecognised. What Vine and Matthews did was to provide proof that continents really do drift across the surface of the globe. This understanding profoundly affects the way we use the planet today - it directs the way we prospect for resources such as oil and minerals; it has enabled us to predict most volcanic eruptions and to understand patterns of earthquakes. Incredibly perhaps, an understanding of the mobile dynamic nature of the Earth is helping an understanding of long-term global climate changes. Despite the significance of their work, neither man received great honour or fame.
The idea of continental drift was first proposed in a serious way by the German meteorologist Alfred Wegener in 1915. People had noticed the neat jigsaw-like fit between South America and Africa, but Wegener found actual fossil evidence that the two continents were once joined. No one took him seriously; in fact he was ridiculed by most of the geological community. This was partly because, not being a geologist, he was perceived as an outsider. But the main reason for the hostility according to Vine, was that Wegener was unable to come up with an explanation as to how whole continents could possibly move even an inch, let alone dance to the music of time around the globe.
In the 1920s, the Scottish geologist Arthur Holmes hypothesised that convection currents within the Earth 'could become sufficiently vigorous to drag the two halves of the original continent apart: In the late 1950s, an American, Harry Hess, came up with the hypothesis that new sea floor is constantly being generated at the midocean ridges by hot material rising in a convection current. But neither man could find evidence to prove it. It was no more than just a hunch that it had to be right, and a hunch is not enough for science.
Vine had been fascinated by the apparent fit of the continents since the age of 14, and as a graduate student at Cambridge was assigned a project analysing one of the new magnetic surveys of the ocean floor. He found what he describes as 'parallel zebra stripes of normal and reversed magnetism' around the mid-ocean ridge. Most significantly these stripes were symmetrical either side of the ridge crests. There had to be a reason for this. The young Vine and his supervisor Matthews proposed that the magnetic stripes were caused by new ocean floor being formed as molten rock rose at the mid-ocean ridges and spread each side of the ridge.
As the molten rock solidified, it became weakly magnetised parallel to the Earth's magnetic field. It was just becoming recognised in the early 1960s that the Earth's magnetic field flips every so often, so magnetic north becomes a magnetic south pole and visa versa. These flips in magnetic field were being recorded in the new sea floor. It was like a giant tape recording of the ocean floor's history. As new sea floor was made, it pushed the last lot aside, widening the ocean and in turn pushing the continents either side further apart. In other words, they had discovered the mechanism driving drifting continents that was missing from Wegener's work. The science of the Earth was never the same again.
By the end of the 1960s, confirmation of global sea floor spreading led to plate tectonics - the view of the outside of the Earth comprising just a few rigid plates which are shunted about by growing sea floor. There was a realisation that mountains are formed when two plates collide, and that most volcanoes and earthquakes occur on the edges of these plates. All this was accepted as fact by all but a few diehard dinosaurs in the geological world.
It is now in the impact of shifting continents on the global environment that Vine feels the most exciting and significant research lies: 'The distribution of continents and the opening and closing of ocean gates between continents has had a profound effect on climates and has caused flips from Ice house Earth to Green-house Earth.' The recognition that the Earth's hydrosphere, atmosphere and biosphere are all intimately linked with the drifting continents and the goingson deep within the Earth has spawned the term 'Earth Systems Science'. It is a great oak tree of science that has grown from the acorn of truth supplied by Vine and Matthews. The holistic approach of earth systems science is very much welcomed by Vine: I'm rather pleased that this has come together.' He feels that the future for understanding the planet lies in an integrated approach to the sciences, rather than the isolated stance the geologists took throughout the 20th century: There was an incredible polarisation of science and I was caught between the boundaries. It was anathema to me the whole of environmental science should be integrated.'
        `
    },
    questions: [
        {
            questionType: "matching-sentence-endings",
            question: {
                starting: [
                    { id: 14, text: "The work done by Vine and Matthews has had implications concerning" },
                    { id: 15, text: "Wegener attempted to provide an explanation of" },
                    { id: 16, text: "Wegener’s conclusions were greeted as" },
                    { id: 17, text: "The theories presented by both Holmes and Hess concerned" }
                ],
                endings: [
                    { letter: "A", text: "matters that had not received much attention for some time." },
                    { letter: "B", text: "something which could not possibly be true." },
                    { letter: "C", text: "something misunderstood at first but later seen as a breakthrough." },
                    { letter: "D", text: "matters beyond simply the movement of continents." },
                    { letter: "E", text: "something that had already been observed." },
                    { letter: "F", text: "something arrived at by intuition that could not be demonstrated." },
                    { letter: "G", text: "matters requiring different research techniques." }
                ]
            }
        },
        {
            questionType: "image-labeling",
            image_url: "https://www.dropbox.com/scl/fi/nadsky3pqylvhf95vrct5/test6-q18-22.png?rlkey=vej2ld7j2px8bh3uvuy1eqrha&st=7xe0u6o4&raw=1",
            instructions: "Label the diagram below. Choose NO MORE THAN THREE WORDS from the passage for each answer.",
            questions: [
                {
                    id: 18,
                },
                {
                    id: 19,
                },
                {
                    id: 20,
                },
                {
                    id: 21,
                },
                {
                    id: 22,
                }
            ]
        },
        {
            questionType: "short-answer",
            instructions: "Answer the questions below using NO MORE THAN THREE WORDS for each answer.",
            questions: [
                {
                    id: 23,
                    sentence: "What is the name of the theory concerning the structure of the Earth that developed from the demonstration of sea floor spreading? (23) _______"
                },
                {
                    id: 24,
                    sentence: "According to Vine, what has the movement of continents had a big influence on? (24) _______"
                },
                {
                    id: 25,
                    sentence: "What branch of science has emerged as a result of the work done by Vine and Matthews? (25) _______"
                },
                {
                    id: 26,
                    sentence: "Which word does Vine use to describe the way in which he believes study of the Earth should be conducted? (26) _______"
                }
            ]
        }
    ]
}

// https://bayanebartar.org/file-dl/library/IELTS11/IELTS-Practice-Tests-with-Answer-Key/Thomson-IELTS-Practice-Tests.pdf - Test 5 -  RC 3
export const reading_section_3 = {
    reading_passage: {
        title: "TITAN of technology",
        subtitle: "Gordon Moore is one of the people who gave the world personal computers. Peter Richards spoke to him in 2003",
        passage: `
Gordon Moore is the scientific brain behind Intel, the world's biggest maker computer chips. Both funny and self-deprecating, he's a shrewd businessman too, but admits to being an 'accidental entrepreneur', happier in the back room trading ideas with techies than out selling the product or chatting up the stockholders. When he applied for a job at Dow Chemical after gaining his PhD, the company psychologist ruled that 'I was okay technically, but that I'd never manage anything'. This year Intel is set to turn over $28 billion.
When Moore co-founded Intel (short for Integrated Electronics) to develop integrated circuits thirty-five years ago, he provided the motive force in R&D (Research & Development) while his more extrovert partner Robert Noyce became the public face of the company. Intel's ethos was distinctively Californian: laidback, democratic, polo shirt and chinos. Moore worked in a cubicle like everyone else, never had a designated parking space and flew Economy. None of this implied lack of ambition. Moore and Noyce shared a vision, recognising that success depended just as much on intellectual pizazz as on Intel's ability to deliver a product. Noyce himself received the first patent for an integrated circuit in 1961, while both partners were learning the business of electronics at Fairchild Semiconductor.
Fairchild's success put money in Moore and Noyce's pockets, but they were starved of R&D money. They resigned, frustrated, to found Intel in 1968. 'It was one of those rare periods when money was available,' says Moore. They put in $250,000 each and drummed up another $2.5m of venture capital 'on the strength of a one-page business plan that said essentially nothing'. Ownership was divided 50:50 between founders and backers. Three years later, Intel's first microprocessor was released: the 4004, carrying 2,250 transistors. Progress after that was rapid. By the time the competition realised what was happening, Intel had amassed a seven-year R&D lead that it was never to relinquish.
By the year 2000, Intel's Pentium 4 chip was carrying 42 million transistors. 'Now,' says Moore, 'we put a quarter of a billion transistors on a chip and are looking forward to a billion in the near future.' The performance gains have been phenomenal. The 4004 ran at 108 kilohertz (108,000 hertz), the Pentium 4 at three gigahertz (3 billion hertz). It's calculated that if automobile speed had increased similarly over the same period, you could now drive from New York to San Francisco in six seconds.
Moore's prescience in forecasting this revolution is legendary. In 1965, while still head of the R&D laboratory at Fairchild, he wrote a piece for Electronics magazine observing 'that over the first few years we had essentially doubled the complexity of integrated circuits every year. I blindly extrapolated for the next ten years and said we'd go from about 60 to about 60,000 transistors on a chip. It proved a much more spot-on prediction than I could ever have imagined. Up until then, integrated circuits had been expensive and had had principally military applications. But I could see that the economics were going to switch dramatically. This was going to become the cheapest way to make electronics.
The prediction that a chip's transistor-count - and thus its performance - would keep doubling every year soon proved so accurate that Carver Mead, a friend from Caltech, dubbed it 'Moore's Law'. The name has stuck. 'Moore's Law' has become the yardstick by which the exponential growth of the computer industry has been measured ever since. When, in 1975, Moore looked around him again and saw transistor-counts slowing, he predicted that in future chip-performance would double only every two years. But that proved pessimistic. Actual growth since then has split the difference between his two predictions, with performance doubling every 18 months.
And there's a corollary, says Moore. 'If the cost of a given amount of computer power drops 50 per cent every 18 months, each time that happens the market explodes with new applications that hadn't been economical before.' He sees the microprocessor as 'almost infinitely elastic'. As prices fall, new applications keep emerging: smart light bulbs, flashing trainers or greetings cards that sing 'Happy Birthday'. Where will it all stop? Well, it's true, he says, 'that in a few more generations [of chips], the fact that materials are made of atoms starts to be a real problem. Essentially, you can't make things any smaller.' But in practice, the day of reckoning is endlessly postponed as engineers find endlessly more ingenious ways of loading more transistors on a chip. 'I suspect I shared the feelings of everybody else that when we got to the dimensions of a micron [about 1986], we wouldn't be able to continue because we were fouching the wavelength of light. But as we got closer, the barriers just melted away.
When conventional chips finally reach their limits, nanotechnology beckons. Researchers are already working on sci-fi sounding alternatives such as molecular computers, built atom by atom, that theoretically could process hundreds of thousands times more information than today's processors. Quantum computers using the state of electrons as the basis for calculation could operate still faster. On any measure, there looks to be plenty of life left in Moore's Law yet.
        `
    },
    questions: [
        {
            questionType: "multiple-choice-single",
            questions: [
                {
                    id: 27,
                    question: "What do we learn about Gordon Moore’s personality in the first two paragraphs?",
                    options: [
                        "It has changed noticeably as his career has developed.",
                        "It was once considered unsuitable for the particular type of business he was in.",
                        "It made him more suited to producing things than to selling them.",
                        "It is less complicated than it may at first appear."
                    ]
                },
                {
                    id: 28,
                    question: "What do we learn about Intel when it was first established?",
                    options: [
                        "It was unlike any other company in its field at the time.",
                        "It combined a relaxed atmosphere with serious intent.",
                        "It attracted attention because of the unconventional way in which it was run.",
                        "It placed more emphasis on ingenuity than on any other aspect."
                    ]
                },
                {
                    id: 29,
                    question: "What is stated about the setting up of Intel in the third paragraph?",
                    options: [
                        "It was primarily motivated by the existence of funds that made it possible.",
                        "It involved keeping certain sensitive information secret.",
                        "It resulted from the founders’ desire to launch a particular product.",
                        "It was caused by the founders’ dissatisfaction with their employer’s priorities."
                    ]
                }
            ]
        },
        {
            questionType: "true-false-notgiven",
            questions: [
                {
                    id: 30,
                    statement: "Competitors soon came close to catching up with Intel’s progress."
                },
                {
                    id: 31,
                    statement: "Intel’s Pentium®4 chip was more successful than Moore had anticipated."
                },
                {
                    id: 32,
                    statement: "Moore’s prediction in 1975 was based on too little evidence."
                },
                {
                    id: 33,
                    statement: "Flashing trainers are an example of Moore’s theory about the relationship between cost and applications."
                },
                {
                    id: 34,
                    statement: "Moore has always been confident that problems concerning the size of components will be overcome."
                }
            ]
        },
        {
            questionType: "summary-completion",
            question: {
                id: [35, 36, 37, 38, 39, 40],
                title: "MOORE'S LAW",
                passageTemplate: `
Gordon Moore’s ability to foresee developments is well-known. In 1965, he referred to the increase in the <35> of integrated circuits and guessed that the number of transistors would go on rising for a decade. The <36> of his prediction surprised him. Previously, the <37> and main <38> of integrated circuits had been the major <39> with regard to their development. But Moore observed that the <40> of integrated circuits was going to improve dramatically. His resulting forecasts concerning chips led to the creation of the term ‘Moore’s Law’.
    `,
                optionList: [
                    { letter: "A", text: "design" },
                    { letter: "B", text: "use" },
                    { letter: "C", text: "opinion" },
                    { letter: "D", text: "invention" },
                    { letter: "E", text: "cost-effectiveness" },
                    { letter: "F", text: "failure" },
                    { letter: "G", text: "sophistication" },
                    { letter: "H", text: "proposition" },
                    { letter: "I", text: "production" },
                    { letter: "J", text: "influence" },
                    { letter: "K", text: "understanding" },
                    { letter: "L", text: "cost" },
                    { letter: "M", text: "accuracy" },
                    { letter: "N", text: "demand" },
                    { letter: "O", text: "theory" },
                    { letter: "P", text: "inter-dependence" },
                    { letter: "Q", text: "familiarity" },
                    { letter: "R", text: "reception" },
                    { letter: "S", text: "appearance" },
                    { letter: "T", text: "reference" }
                ]
            }
        }
    ]
}


// https://www.hiradenglish.com/wp-content/uploads/2021/06/Barrons-IELTS-practice-exams.pdf - ACADEMIC TEST 1 - Writing Task 1 & 2
export const writingTasks = [
    {
        id: 1,
        timeLimit: "You should spend about 20 minutes on this task.",
        wordLimit: "Write at least 150 words.",
        prompt: [
            "The following diagrams show how a pellet stove and a pellet boiler work to heat a house. ",
            "Summarize the information by selecting and reporting the main features, and make comparisons where relevant"
        ],
        image_url: "https://www.dropbox.com/scl/fi/ja2kjflsnltn6o4rv9g39/test7-q1-new.png?rlkey=p5umg6knbu9utofqmmfi3pz2d&st=nlc2zon7&raw=1",
    },
    {
        id: 2,
        timeLimit: "You should spend about 40 minutes on this task.",
        wordLimit: "Write at least 250 words.",
        prompt: [
            "Everybody should be allowed admission to university or college programs regardless of their level of academic ability. ",
            "To what extent do you agree or disagree with this statement? Give reasons for your answer and include any relevant examples from your own knowledge or experience. "
        ],
    }
]

// https://www.hiradenglish.com/wp-content/uploads/2021/06/Barrons-IELTS-practice-exams.pdf - ACADEMIC TEST 2 - SPEAKING
export const speaking_transcripts = [
    {
        part: 1,
        questions: [
            { id: 1, transcript: "Now, in this part of the test, I will ask you some questions about yourself. After each question, there will be a beep sound. You will have 20 seconds to speak after the beep. So, When and how much leisure time do you generally have in a week?.", audioUrl: "https://www.dropbox.com/scl/fi/qqrk5j8o7pf2kck9h1af2/part1_q1.mp3?rlkey=3vl16ow9cq8z2tvcthjx5ruwa&st=0abheprf&raw=1" },
            { id: 2, transcript: "Who do you generally spend your leisure time with?", audioUrl: "https://www.dropbox.com/scl/fi/dw0kjkfozew07lql9pfj0/part1_q2.mp3?rlkey=ecx4ws69ofgg8rri5h4nwpalv&st=yvh7e484&raw=1" },
            { id: 3, transcript: "What are some activities you enjoy in your leisure time?", audioUrl: "https://www.dropbox.com/scl/fi/zmlnyfwd4c99blrgu7nxu/part1_q3.mp3?rlkey=tqygijk4d2qdh1j34pjgqfz3v&st=ko3y9uoa&raw=1" },
            { id: 4, transcript: "What do you like about these activities?", audioUrl: "https://www.dropbox.com/scl/fi/4ugutaugjs14bqbvww2wx/part1_q4.mp3?rlkey=6za5m3v111x2xqebddof7csjk&st=lfkjxiwh&raw=1" },

            { id: 5, transcript: "I’d like to move on and ask you some questions about Music. What kinds of music do you like listening to?", audioUrl: "https://www.dropbox.com/scl/fi/9lcvxoe3es9ytna6amlij/part1_q5.mp3?rlkey=d7vkw275fntowacmgfoqtigbc&st=46e77szm&raw=1" },
            { id: 6, transcript: "Have you learned to play a musical instrument? Why or why not?", audioUrl: "https://www.dropbox.com/scl/fi/ti8j3dv6317sznuh0qcrx/part1_q6.mp3?rlkey=04m4agdtlvd4jxcit5a8mg6wu&st=kjh4ymwx&raw=1" },
            { id: 7, transcript: "Tell me about any traditional music in your country.", audioUrl: "https://www.dropbox.com/scl/fi/1omvifbzsrdfd0o3l3k7p/part1_q7.mp3?rlkey=4yy7vp49w1lfy5fxpow7exjkb&st=aotqjsou&raw=1" },
            { id: 8, transcript: "Do you think that traditional music will be popular in the future? Why or why not?", audioUrl: "https://www.dropbox.com/scl/fi/wi5crqzsl827k1kwy9q9s/part1_q8.mp3?rlkey=nmuh1xym7j5iyj8rztgm90vhq&st=y0nx9eud&raw=1" },
        ]
    },
    {
        part: 2,
        questions: [
            {
                id: 9,
                transcript: "Describe a movie that you saw recently.",
                audioUrl: "https://www.dropbox.com/scl/fi/a1euxbc06b5yqhecxvr87/part2.mp3?rlkey=guqzt7vef3qf0pjjwmp6yu48n&st=m8qozzq1&raw=1"
            }
        ]
    },
    {
        part: 3,
        questions: [
            { id: 10, transcript: "You’ve just spoken about a movie you saw recently. Let’s explore this topic a bit more. What types of movies are popular in your culture? Why do you think people enjoy those types of movies?", audioUrl: "https://www.dropbox.com/scl/fi/7ryae579mhgijk41xyito/part3_q1.mp3?rlkey=z2b2hrfxggbdch408nlhd3jni&st=7ts8bnj8&raw=1" },
            { id: 11, transcript: "Why do people often prefer to go to movie theaters rather than watch movies on their TV or computer?", audioUrl: "https://www.dropbox.com/scl/fi/ez75lbjjlr6opeel9efg6/part3_q2.mp3?rlkey=d9nstgxx8cn47eaxpo2o0qg2y&st=1lotvhnr&raw=1" },

            { id: 12, transcript: "Let’s talk about how movies have changed over time. How are movies different now than they were in the past?", audioUrl: "https://www.dropbox.com/scl/fi/siak9946ljz9y80fuv5ny/part3_q3.mp3?rlkey=kvsy2d9qw9560r241q5d3a6g9&st=kmcdffvy&raw=1" },
            { id: 13, transcript: "In your opinion, what impact has technology had on the film industry?", audioUrl: "https://www.dropbox.com/scl/fi/2lon5fgwj94yvq0akut2g/part3_q4.mp3?rlkey=rvmao1o6388dkdi359xgn47s0&st=7nt639so&raw=1" },
        ]
    }
]



export const reading_answers = {
    1: "NOT GIVEN",
    2: "YES",
    3: "NO",
    4: "NOT GIVEN",

    5: "no input",
    6: "editorial assistance",
    7: "Sheekman compositions",
    8: "his own style",

    9: "E",
    10: "G",
    11: "D",
    12: "B",
    13: "F",

    14: "D",
    15: "E",
    16: "B",
    17: "F",

    18: "mid-ocean ridge(s)/mid ocean ridge(s)/ ridge crest(s)",
    19: "molten rock rose",
    20: "(Earth's) magnetic field",
    21: "parallel/ symmetrical/ magnetic zebra stripes/ magnetic stripes",
    22: "pushed aside/(further) apart",

    23: "plate tectonics",
    24: "climates",
    25: "Earth Systems Science",
    26: "integrated",

    27: "C",
    28: "B",
    29: "D",
    30: "False",
    31: "Not given",
    32: "Not given",

    33: "true",
    34: "false",

    35: "sophistication/G",
    36: "accuracy/M",
    37: "cost/L",
    38: "use/B",
    39: "influence/J",
    40: "cost-effectiveness/E"
};

export const listening_answers = {
    1: "10 Bridge",
    2: "Writing/ Writing Class",
    3: "Mrs Green/Mrs. Green",
    4: "15 July",
    5: "1 / One",
    6: "31 May",
    7: "4 June",
    8: "3 days/ 3",
    9: "A",
    10: "B",

    11: "A",
    12: "C",
    13: "B",
    14: "A",
    15: "C",
    16: "B",
    17: "E",
    18: "G",
    19: "H",
    20: "C",

    21: "A",
    22: "D",

    23: "B",
    24: "C",
    25: "C",
    26: "Sports Administration",
    27: "strengthen",
    28: "capacity",
    29: "C",
    30: "B",

    31: "C",
    32: "B",
    33: "C",
    34: "B",
    35: "A",
    36: "C",
    37: "first person",
    38: "new element",
    39: "planet Vulcan",
    40: "gravity"
};