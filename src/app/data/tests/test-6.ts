// https://www.youtube.com/watch?v=okuUeij4aTM
export const listening_section_1 = {
    audio: "https://www.dropbox.com/scl/fi/96xr5lpliwz422jv70ofq/t6-l1.mp4?rlkey=v4dxcmaq9kw7o9cgjklljg5ha&st=xxzadnal&raw=1",
    questions: [
        {
            questionType: "form-completion",
            formData: {
                title: "EXPENSES CLAIM INFORMATION - GB AIRLINES !",
                address: "",
                sections: [
                    {
                        title: "",
                        fields: [
                            {
                                label: "Customer name:",
                                content: "Mr (1) _______",
                                id: 1,
                            },
                            {
                                label: "Date of Departure:",
                                content: "(2) _______ 2016",
                                id: 2,
                            },
                            {
                                label: "Flight:",
                                content: "From (3) _______ to London Heathrow, UK",
                                id: 3,
                            },
                            {
                                label: "Departure Time:",
                                content: "(4) _______ p.m.",
                                id: 4,
                            },
                            {
                                label: "Hotel Expenditure:",
                                content: "(5) _______ Hotel, 73 euros",
                                id: 5,
                            },
                            {
                                label: "Taxis Expenditure:",
                                content: "(6) _______",
                                id: 6,
                            },
                        ],
                    },
                ],
            },
        },
        {
            questionType: "sentence-completion",
            questions: [
                {
                    id: 7,
                    sentence: "The customer had the (7) _____ option for his previous flight."
                },
                {
                    id: 8,
                    sentence: "There are three meal options without meat: vegetarian, vegan, and (8) _____."
                },
                {
                    id: 9,
                    sentence: "The vegan option doesn't contain any (9) _____ eggs, fowl, or honey."
                },
                {
                    id: 10,
                    sentence: "The customer's flight to Kiev must be changed (10) _____ before the departure time."
                }
            ]
        }
    ],
}

export const listening_section_2 = {
    audio: "https://www.dropbox.com/scl/fi/d95dj3w137im78ctqh2np/t6-l2.mp4?rlkey=kybvy32t9j4otdh4j2iu1lm73&st=h0e22dou&raw=1",
    questions: [
        {
            questionType: "multiple-choice-single",
            questions: [
                {
                    id: 11,
                    question: "What is one of the new advantages in the dining facilities?",
                    options: [
                        "more students",
                        "more variety",
                        "more service"
                    ]
                },
                {
                    id: 12,
                    question: "What was one problem with the dining options last year?",
                    options: [
                        "Students did not have enough to eat.",
                        "Students had to pay too much money.",
                        "Students had to eat whatever was served."
                    ]
                }
            ]
        },
        {
            // maybe question type is wrong
            questionType: "summary-completion",
            multiWord: true,
            question: {
                id: [13, 14],
                title: "Types of Food",
                passageTemplate: `
Pizza and pasta are an example of <13> food.

American food consists of hamburgers and <14>.
    `
            }
        },
        {
            questionType: "multiple-choice-single",
            questions: [
                {
                    id: 15,
                    question: "Why does the school say the food will be better?",
                    options: [
                        "They hired real chefs.",
                        "The food is more expensive.",
                        "They will make more kinds."
                    ]
                },
                {
                    id: 16,
                    question: "When will the dining facilities open and close?",
                    options: [
                        "6 am and 12 pm",
                        "6 am and 12 am",
                        "12 pm and 6 pm"
                    ]
                },
                {
                    id: 17,
                    question: "What can students do if they are hungry in the afternoon?",
                    options: [
                        "go out and buy food on the street",
                        "wait till dinner time",
                        "go to the student store for snacks"
                    ]
                },
                {
                    id: 18,
                    question: "What must you do to eat in the dining facilities if you are not a student?",
                    options: [
                        "purchase a dining facility card",
                        "purchase meals at the door",
                        "purchase meals from other students"
                    ]
                }
            ]
        },
        {
            questionType: "multiple-choice-many",
            questions: [
                {
                    id: [19, 20],
                    question: "Which of the following are rules of the dining facilities?",
                    options: [
                        "Do not waste food.",
                        "You may bring friends in to eat.",
                        "Bring your own plates and trays.",
                        "Clean your own plates and trays.",
                        "Don't litter."
                    ]
                }
            ]
        }
    ]
}

export const listening_section_3 = {
    audio: "https://www.dropbox.com/scl/fi/f3n291n3o260f7mcto4dk/t6-l3.mp4?rlkey=nwr4uhyv5j7tsnyj5zdz5aag2&st=js8d6xmh&raw=1",
    questions: [
        {
            questionType: "sentence-completion",
            oneWord: true,
            questions: [
                {
                    id: 21,
                    sentence: "Jeena and Marco must complete their project by (21) _____."
                },
                {
                    id: 22,
                    sentence: "The project will be a study of the increase in order (22) _____."
                },
                {
                    id: 23,
                    sentence: "The project will be assessed by senior (23) _____."
                },
                {
                    id: 24,
                    sentence: "Jeena and Marco agree they need a (24) _____ for the project."
                }
            ]
        },
        {
            questionType: "multiple-choice-many",
            questions: [
                {
                    id: [25, 26, 27],
                    question: "What THREE things do Marco and Jenna have to do now for the project?",
                    options: [
                        "interview some people",
                        "hand out questionnaire",
                        "Choose their subjects",
                        "take photographs",
                        "use statistical software",
                        "do some work in the library",
                        "contact some local companies"
                    ]
                }
            ]
        },
        {
            questionType: "multiple-choice-single",
            questions: [
                {
                    id: 28,
                    question: "Why did Jenna and Marco agree to work together?",
                    options: [
                        "because they both wanted to work with someone else",
                        "because they each have different skills",
                        "because they have worked together before"
                    ]
                },
                {
                    id: 29,
                    question: "Why does Marco suggest he writes the analysis?",
                    options: [
                        "He needs more practice with this kind of writing",
                        "He is better at English than Jenna",
                        "He has more experience of this than Jenna"
                    ]
                },
                {
                    id: 30,
                    question: "Why does Jenna offer to do the presentation?",
                    options: [
                        "Her tutor wants her to do presentation",
                        "Marco is very nervous about giving presentation",
                        "She wants to divide the work on the project fairly"
                    ]
                }
            ]
        }
    ]
}

export const listening_section_4 = {
    audio: "https://www.dropbox.com/scl/fi/6q3u71mb0wvtbcv08wkeh/t6-l4.mp4?rlkey=1zk2cj4e1q1ry9unwtsv6nak9&st=35bi1iun&raw=1",
    questions: [
        {
            // maybe 2-3 blanks are supposed to be merged but I seperated them
            questionType: "note-completion",
            topic: "Pygmy Blue Whale Research",
            sections: [
                {
                    title: "Pygmy blue whales",
                    bulletPoints: [
                        {
                            id: 31,
                            text: "Before 1966 it is likely they were (31) _______ with the Antarctic blue whales.",
                        },
                    ],
                },
                {
                    title: "Aim of study",
                    bulletPoints: [
                        {
                            id: 32,
                            text: "To find out more about their (32) _______ and movements.",
                        },
                    ],
                },
                {
                    title: "Method",
                    bulletPoints: [
                        {
                            id: 33,
                            text: "Whales are tagged with an antenna. When the antenna communicates with a number of satellites, the whale’s (33) _______ can be identified.",
                        },
                        {
                            id: 34,
                            text: "Researchers access the results using the project (34) _______.",
                        },
                    ],
                },
                {
                    title: "Findings",
                    bulletPoints: [
                        {
                            id: 35,
                            text: "The whales travel from the (35) _______ coast of Australia to breeding in Indonesia during March and April.",
                        },
                        {
                            id: 36,
                            text: "They return to Australian waters in (36) _______.",
                        },
                        {
                            id: 37,
                            text: "Pygmy whales do not go without (37) _______ whilst they are in their breeding grounds.",
                        },
                    ],
                },
                {
                    title: "Conservation issues",
                    bulletPoints: [
                        {
                            id: 38,
                            text: "The effect of (38) _______ routes on communication whales.",
                        },
                    ],
                },
                {
                    title: "Conservation efforts",
                    bulletPoints: [
                        {
                            id: 39,
                            text: "Conservation efforts can take place over a (n) (39) _______ area now there is evidence that they migrate out to Australian waters.",
                        },
                    ],
                },
                {
                    title: "Future studies",
                    bulletPoints: [
                        {
                            id: 40,
                            text: "To explore whether pygmy whales off the southern coast of Australia follow the same northerly migratory routes as those studied or whether they travel to a (n) (40) _______ region to south of Australia.",
                        },
                    ],
                },
            ],
        }
    ],
}


// https://bayanebartar.org/file-dl/library/IELTS11/IELTS-Practice-Tests-with-Answer-Key/Thomson-IELTS-Practice-Tests.pdf  - Test1 - RC 1
export const reading_section_1 = {
    reading_passage: {
        title: "The Dollar-a-Year Man",
        subtitle: "How John Lomax set out to record American folk music",
        passage: `
In the early 1930s, folklorist, platform lecturer, college professor and former banker John Avery Lomax was trying to recapture a sense of direction for his life. For two decades he had enjoyed a national reputation for his pioneering work in collecting and studying American folk songs; no less a figure than President Theodore Roosevelt had admired his work, and had written a letter of support for him as he sought grants for his research. He had always dreamed of finding a way of making a living by doing the thing he loved best, collecting folk songs, but he was now beginning to wonder if he would ever realise that dream
Lomax wanted to embark on a nationwide collecting project, resulting in as many as four volumes, and 'complete the rehabilitation of the American folk-song'. Eventually this was modified to where he envisioned a single book tentatively called American Ballads and Folk Songs, designed to survey the whole field. It called for firsthand field collecting, and would especially focus on the neglected area of black folk music.
In 1932, Lomax travelled to New York, and stopped in to see a man named H.S. Latham of the Macmillan Company. He informally outlined his plan to Latham, and read him the text of an earthy African American blues ballad called 'Ida Red'. Latham was impressed, and two days later Lomax had a contract, a small check to bind it, and an agreement to deliver the manuscript about one year later. The spring of 1932 began to look more green, lush and full of promise.
Lomax immediately set to work. Hе travelled to libraries at Harvard, the Library of Congress, Brown University and elsewhere in order to explore unpublished song collections and to canvas the folk song books published over the past ten years. During his stay in Washington, D.C., Lomax became friendly with Carl Engel, Music Division chief of the Library of Congress. Engel felt that Lomax had the necessary background and energy to someday direct the Archive of Folk Song. Through funds provided by the Council of Learned Societies and the Library of Congress, Lomax ordered a state-of-the-art portable recording machine. More importantly, the Library of Congress agreed to furnish blank records and to lend their name to his collecting; Lomax simply had to agree to deposit the completed records at the Library of Congress. He did so without hesitation. On July 15, 1933, Lomax was appointed an 'honorary consultant' for a dollar a year.
Together with his eighteen-year-old son Alan, he began a great adventure to collect songs for American Ballads and Folk Songs, a task that was to last for many months. Lomax's library research had reinforced his belief that a dearth of black folk song material existed in printed collections. This fact, along with his early appreciation of African American folk culture, led Lomax to decide that black folk music from rural areas should be the primary focus. This bold determination resulted in the first major trip in the United States to capture black folk music in the field. In order to fulfill their quest, the two men concentrated on sections of the South with a high percentage of blacks. They also pinpointed laboring camps, particularly lumber camps, which employed blacks almost exclusively. But as they went along, prisons and penitentiaries also emerged as a focal point for research.
The recordings made by the Lomaxes had historical significance. The whole idea of using a phonograph to preserve authentic folk music was still fairly new. Most of John Lomax's peers were involved in collecting songs the classic way: taking both words and melody down by hand, asking the singer to perform the song over and over until the collector had 'caught' it on paper. John Lomax sensed at once the limitations of this kind of method, especially when getting songs from African-American singers, whose quarter tones, blue notes and complex timing often frustrated white musicians trying to transcribe them with European notation systems.
The whole concept of field recordings was, in 1933 and still is today, radically different from the popular notion of recording. Field recordings are not intended as commercial products, but as attempts at cultural preservation. There is no profit motive, nor any desire to make the singer a 'star'. As have hundreds of folk song collectors after him, John Lomax had to persuade his singers to perform, to explain to them why their songs were important, and to convince the various authorities - the wardens, the trusties, the bureaucrats - that this was serious, worthwhile work. He faced the moral problem of how to safeguard the records and the rights of the singers - a problem he solved in this instance by donating the discs to the Library of Congress. He had to overcome the technical problems involved in recording outside a studio; one always hoped for quiet, with no doors slamming or alarms going off, but it was always a risk. His new state-of-the-art recording machine sported a new microphone designed by NBC, but there were no wind baffles to help reduce the noise when recording outside. Lomax learned how to balance sound, where to place microphones, how to work echoes and walls, and soon was a skilled recordist.
        `
    },
    questions: [
        {
            questionType: "summary-completion",
            multiWord: true,
            question: {
                id: [1, 2, 3, 4, 5],
                title: "John Lomax's Project",
                passageTemplate: `
Lomax began the research for this project by looking at <1> that were not available in book form, as well as at certain books. While he was doing this research, he met someone who ran a department at the <2> in Washington. As a result of this contact, he was provided with the very latest kind of <3> for his project.

Lomax believed that the places he should concentrate on were <4> in the South of the US. While he and his son were on their trip, they added <5> as places where they could find what they were looking for.
    `
            }
        },
        {
            questionType: "match-paragraph-information",
            question: {
                information: [
                    { id: 6, text: "a reference to the speed with which Lomax responded to a demand" },
                    { id: 7, text: "a reason why Lomax doubted the effectiveness of a certain approach" },
                    { id: 8, text: "reasons why Lomax was considered suitable for a particular official post" },
                    { id: 9, text: "a reference to a change of plan on Lomax’s part" },
                    { id: 10, text: "a reference to one of Lomax’s theories being confirmed" }
                ],
                letters: ["A", "B", "C", "D", "E", "F", "G"]
            }
        },
        {
            questionType: "multiple-choice-many",
            questions: [
                {
                    id: [11, 12, 13],
                    question: "Which THREE of the following difficulties for Lomax are mentioned by the writer of the text?",
                    options: [
                        "finding a publisher for his research",
                        "deciding exactly what kind of music to collect",
                        "the scepticism of others concerning his methods",
                        "the reluctance of people to participate in his project",
                        "making sure that participants in his project were not exploited",
                        "factors resulting from his choice of locations for recording"
                    ]
                }
            ]
        }
    ]
}

// https://bayanebartar.org/file-dl/library/IELTS11/IELTS-Practice-Tests-with-Answer-Key/Thomson-IELTS-Practice-Tests.pdf  - Test2 - RC 2
export const reading_section_2 = {
    reading_passage: {
        title: "How bugs hitch-hike across the galaxy",
        subtitle: "Mankind's search for alien life could be jeopardised by ultra-resilient bacteria from Earth. David Derbyshire",
        passage: `
What was the most important discovery of the Apollo programme? Some have argued that it was the rocks that explained how the Moon was formed. Others believe it was the technological spin-offs. But according to Captain Peter Conrad, who led the 1969 Apollo 12 mission, it was life.
On the apparently dead lunar surface, a colony of bacteria was thriving. The organisms were not native to the Moon, but were visitors from Earth who had hitch-hiked a ride on board one of Nasa's five Surveyor probes from the 1960s. To the astonishment of biologists, between 50 and 100 Streptococcus bacteria survived the journey across space, at an average temperature 20 degrees above absolute zero with no source of energy or water, and stayed alive on the Moon in a camera for three years. Captain Conrad, who returned the bacteria to Earth, was later to confess: 'l always thought the most significant thing we ever found on the whole Moon was the little bacteria that came back and lived.
The ability of life to survive, adapt and evolve never fails to astonish. Over the past three decades, bacteria and archaea have been found in some of the most inhospitable places on Earth. Known as extremophiles, these organisms have coped with life in a vacuum, pressure as high as 70 tons per square inch, depths of four miles beneath the surface and scorching waters around deep-sea volcanic vents. They have also survived 25 million years inside a bee preserved in resin. Their resilience has renewed enthusiasm for the search for alien life - a quest that many had assumed had been banished to fantasy fiction. Mars and the moons Titan, Europa and Callisto are once again plausible candidates for extraterrestrials.
As interest in alien life has grown, so have concerns that mankind could spread its own microscopic bugs, contaminating the places we want to explore. In 2003, Nasa ended the Galileo probe's mission by smashing it into Jupiter. The fear was that it could be carrying bacteria that might contaminate Europa's oceans.
The team behind Beagle 2 - the British probe that went to search for life on Mars in 2003 was forced to take contamination particularly seriously. If Beagle carried to Mars life or dead spores picked up during the manufacture of the spacecraft, its science would be jeopardised. Prof Colin Pillinger, the Open University scientist who headed the Beagle project, said: 'What we've learnt since the Apollo missions and the Viking Mars missions of the 1970s is that bugs are far more tenacious than we ever imagined. They seem to be very tolerant of high temperatures, they lie dormant at low temperatures for long periods, they are immune to salt, acid and alkali, they seem to survive on substrate that are not what people expect. Extremophiles are extremely adapted to hanging on to life.'
Beagle had to be assembled in a 'clean room'- and one was specially put together in a converted BBC outside broadcast van garage in Milton Keynes. It had enough room to include an enormous set of fans that circulated and filtered the air 500 times an hour. Only a handful of trained researchers were allowed inside. 'I wasn't allowed in, says Prof Pillinger.There was special training for people going in there and special conditions. There was a ban on beards and a limit of four people at any one time. The team kept samples of everything that could have contaminated the craft and monitored every stage of assembly.
To reduce the workload, the idea was to build as much as possible before sterilising it and banishing it to the difficult working conditions inside the clean room. The easy stuff was heated to 115C for 52 hours, more than enough to kill off bugs. Electronic equipment can't cope with those sorts of temperatures, so the team used a hydrogen peroxide plasma, created in a microwave, to kill off bugs at low temperatures. Parachutes and gas bags were zapped with gamma radiatión. It wasn't just facial hair that was banned. 'You've heard of the paperless office, says Prof Pillinger. 'We had the paperless assembly line. The guys normally go in armed with loads of papers and diagrams, but we didn't allow any of that. They were given information through a glass wall, over mikes and monitors. And sometimes on a piece of paper stuck to the glass with sticky tape.
Beagle's heat shield doubled as its biological shield. So once the instruments were encased and sealed, the craft could be brought back into the real world. The shield heated up to 1,700 degrees on its descent through the Martian atmosphere, so bugs on the casing were not a worry. Mars Express - the craft carrying Beagle - did not need sterilising. Its trajectory was designed so that if something went wrong, the craft would not simply crash into the planet. Its course could be corrected en route.
Eventually, space scientists hope to return samples of Mars to Earth.While the risks of alien bacteria proving hazardous on Earth may be remote, the rocks will still need to be quarantined. Moon rocks from Apollo were analysed in vacuum glove boxes for the first two missions. Later, researchers stored rocks in nitrogen. Prof Pillinger believed the first Mars rocks should be sterilised before they are studied on Earth.'For security purposes it would be the most sensible thing to do. You don't have to sterilise it all, you can contain some of it and then sterilise the sample you want to look at, but it would lower the risk and make it easier to analyse.
        `
    },
    questions: [
        {
            questionType: "matching-features",
            question: {
                question_statement: "Match each statement with the spacecraft it applies to.",
                statements_title: "Statements",
                statements: [
                    { id: 14, text: "provided transport from Earth for bacteria" },
                    { id: 15, text: "led to realisation of how tenacious bacteria are" },
                    { id: 16, text: "was created so that there could be no bacteria on the outer structure" },
                    { id: 17, text: "was capable of changing direction in the event of a problem" },
                    { id: 18, text: "brought material which was kept in more than one kind of container" },
                    { id: 19, text: "required action because of the possibility of the introduction of harmful bacteria" },
                    { id: 20, text: "resulted in disagreement as to the relative value of what was found" }
                ],
                features_title: "List of Spacecraft",
                features: [
                    { letter: "A", description: "Apollo craft" },
                    { letter: "B", description: "Surveyor probe" },
                    { letter: "C", description: "Galileo probe" },
                    { letter: "D", description: "Beagle 2" },
                    { letter: "E", description: "Mars Express" }
                ]
            }
        },
        {
            questionType: "image-labeling",
            image_url: "https://www.dropbox.com/scl/fi/igektspcuyjzvsyl0ez2q/image-labeling-q21-26.png?rlkey=uwstoyn3fnpm9tvabaketpo5t&st=i5gs2x00&raw=1",
            instructions: "Label the diagram below. Choose NO MORE THAN THREE WORDS from the reading passage for each answer.",
            questions: [
                {
                    id: 21,
                },
                {
                    id: 22,
                },
                {
                    id: 23,
                },
                {
                    id: 24,
                },
                {
                    id: 25,
                },
                {
                    id: 26,
                }
            ]
        }
    ]
}

// https://bayanebartar.org/file-dl/library/IELTS11/IELTS-Practice-Tests-with-Answer-Key/Thomson-IELTS-Practice-Tests.pdf  - Test3 - RC 3
export const reading_section_3 = {
    reading_passage: {
        title: "THE CLOUD MESSENGER",
        subtitle: "At six o'clock one evening in December 1802, in a dank and cavernous laboratory in London, an unknoun young amateur meteorologist gave the lecture that was to make him famous",
        passage: `
Luke Howard had been speaking for nearly an hour, during which time his audience had found itself in a state of gradually mounting excitement. By the time that he reached the concluding words of his address, the Plough Court laboratory was in an uproar. Everyone in the audience had recognized the importance of what they had just heard, and all were in a mood to have it confirmed aloud by their friends and neighbours in the room. Over the course of the past hour, they had been introduced not only to new explanations of the formation and lifespan of clouds, but also to a poetic new terminology: 'Cirrus', 'Stratus', 'Cumulus', 'Nimbus', and the other names, too, the names of intermediate compounds and modified forms, whose differences were based on altitude, air temperature and the shaping powers of upward radiation. There was much that needed to be taken on board.
Clouds, as everyone in the room would already have known, were staging posts in the rise and fall of water as it made its way on endless compensating journeys between the earth and the fruitful sky. Yet the nature of the means of their exact construction remained a mystery to most observers who, on the whole, were still in thrall to the vesicular or 'bubble' theory that had dominated meteorological thinking for the better part of a century. The earlier speculations, in all their strangeness, had mostly been forgotten or were treated as istorical curiosities to be glanced at, derided and then abandoned. Howard, however, was adamant that clouds were formed from actual solid drops of water and ice, condensed from their vaporous forms by the fall in temperature which they encountered as they ascended through the rapidly cooling lower atmosphere. Balloon pioneers during the 1780s had confirmed just how cold it could get up in the realm of the clouds: the temperature fell some 6.5°C for every thousand metres they ascended. By the time the middle of a major cumulus cloud had been reached, the temperature would have dropped to below freezing, while the oxygen concentration of the air would be starting to thin quite dangerously. That was what the balloonists meant by 'dizzy heights'.
Howard was not, of course, the first to insist that clouds were best understood as entities with physical properties of their own, obeying the same essential laws which governed the rest ofthe natural world (with one or two interesting anomalies: water, after all, is a very strange material). It had long been accepted by many of the more scientifically minded that clouds, despite their distance and their seeming intangibility, should be studied and apprehended like any other objects in creation.
There was more, however, and better. Luke Howard also claimed thatthere was a fixed and constant number of basic cloud types, and this number was not (as the audience might have anticipated) in the hundreds or the thousands, like the teeming clouds themselves, with each as individual as a thumbprint. Had this been the case, it would render them both unclassifiable and unaccountable; just so many stains upon the sky. Howard's claim, on the contrary, was that there were just three basic families of cloud, into which every one of the thousands of ambiguous forms could be categorized with certainty. The clouds obeyed a system and, once recognized in outline, their basic forms would be 'as distinguishable from each other as a tree from a hill, or the latter from a lake', for each displayed the simplest possible visual characteristics.
The names which Howard devised for them were designed to convey a descriptive sense of each cloud type's outward characteristics (a practice derived from the usual procedures of natural history classification), and were taken from the Latin, for ease of adoption 'by the learned of different nations': Cirrus (from the Latin for fibre or hair), Cumulus (from the Latin for heap or pile) and Stratus (from the Latin for layer or sheet). Clouds were thus divided into tendrils, heaps and layers: the three formations at the heart of their design. Howard then went on to name four other cloud types, all of which were either modifications or aggregates of the three major families of formation. Clouds continually unite, pass into one another and disperse, but always in recognizable stages. The rain cloud Nimbus, for example (from the Latin for cloud), was, according to Howard, a rainy combination of all three types, although Nimbus was reclassified as nimbostratus by meteorologists in 1932, by which time the science of rain had developed beyond all recognition.
The modification of clouds was a major new idea, and what struck the audience most vividly about it was its elegant and powerful fittingness. All of what they had just heard seemed so clear and so self-evident. Some must have wondered how it was that no onenot even in antiquity - had named or graded the clouds before, or if they had, why their efforts had left no trace in the language. How could it be that the task had been waiting for Howard, who had succeeded in wringing a kind of exactitude from out of the vaporous clouds? Their forms, though shapeless and unresolved, had at last, it seemed, been securely grasped. Howard had given a set of names to a radical fluidity and impermanence that seemed every bit as magical, to that first audience, as the Eskimo's fabled vocabulary of snow.
        `
    },
    questions: [
        {
            questionType: "match-headings",
            question: {
                headings: [
                    { number: "i", text: "An easily understood system" },
                    { number: "ii", text: "Doubts dismissed" },
                    { number: "iii", text: "Not a totally unconventional view" },
                    { number: "iv", text: "Theories compared" },
                    { number: "v", text: "A momentous occasion" },
                    { number: "vi", text: "A controversial use of terminology" },
                    { number: "vii", text: "Initial confusion" },
                    { number: "viii", text: "Previous beliefs replaced" },
                    { number: "ix", text: "More straightforward than expected" },
                    { number: "x", text: "An obvious thing to do" }
                ],
                id: [27, 28, 29, 30, 31, 32]
            }
        },
        {
            questionType: "image-labeling",
            image_url: "https://www.dropbox.com/scl/fi/s5a7qtszbb01am3f5yqdf/image-labeling-q33-36.jpg?rlkey=j03e8qm08tubrcdnc12qtuuty&st=ygjd65zz&raw=1",
            instructions: "Label the diagram below. Choose NO MORE THAN THREE WORDS AND/OR A NUMBER from the passage for each answer.",
            questions: [
                {
                    id: 33,
                },
                {
                    id: 34,
                },
                {
                    id: 35,
                },
                {
                    id: 36,
                }
            ]
        },
        {
            questionType: "match-paragraph-information",
            question: {
                information: [
                    { id: 37, text: "an example of a modification made to work done by Howard" },
                    { id: 38, text: "a comparison between Howard's work and another classification system" },
                    { id: 39, text: "a reference to the fact that Howard presented a very large amount of information" },
                    { id: 40, text: "an assumption that the audience asked themselves a question" }
                ],
                letters: ["A", "B", "C", "D", "E", "F"]
            }
        }
    ]
}


// https://bayanebartar.org/file-dl/library/IELTS11/IELTS-Practice-Tests-with-Answer-Key/Thomson-IELTS-Practice-Tests.pdf - Test 1 - QUESTION 1
export const writingTasks = [
    {
        id: 1,
        timeLimit: "You should spend about 20 minutes on this task.",
        wordLimit: "Write at least 150 words.",
        prompt: [
            "The charts below show the number of French adults whose parents spoke a French regional language to them when they were children and the number who speak a French regional language to their own children.",
            "Write a report for a university lecturer describing the information below."
        ],
        image_url: "https://www.dropbox.com/scl/fi/ojs5h35ggmgxg0jsz7uro/t6-q1.png?rlkey=fvpgf1fg0julpk49g5i4d7oj6&st=qkauc2l5&raw=1",
    },
    {
        id: 2,
        timeLimit: "You should spend about 40 minutes on this task.",
        wordLimit: "Write at least 250 words.",
        prompt: [
            "Present a written argument or case to an educated reader with no specialist knowledge of the following topic.",
            "In some societies, stress is now regarded as a major problem, and it is thought that people suffer from more stress than they did in the past.",
            "However, others feel that the amount of stress people have today is exaggerated. They say that previous generations were under more pressure, but the idea of suffering from stress did not exist.",
            "Discuss both these views and give your own opinion."
        ],
    }
]


// https://www.hiradenglish.com/wp-content/uploads/2021/06/Barrons-IELTS-practice-exams.pdf - Test 1 Speaking
export const speaking_transcripts = [
    {
        part: 1,
        questions: [
            { id: 1, transcript: "Now, in this part of the test, I will ask you some questions about yourself. After each question, there will be a beep sound. You will have 20 seconds to speak after the beep. So, Describe the neighborhood where you live.", audioUrl: "https://www.dropbox.com/scl/fi/uei3z09s5tr9mjycjihk1/part1_q1.mp3?rlkey=efufvgyicau9ybrycrofy20ni&st=ac9pqwzu&raw=1" },
            { id: 2, transcript: "What do you like about living there?", audioUrl: "https://www.dropbox.com/scl/fi/r8y0jcti7q2h397s1zyox/part1_q2.mp3?rlkey=xxskt5w8cl9d7c7eqaow8y9sk&st=24kway8b&raw=1" },
            { id: 3, transcript: "What do you dislike about your neighborhood?", audioUrl: "https://www.dropbox.com/scl/fi/f5nt0r9x6g5mdgdvphzzr/part1_q3.mp3?rlkey=kf8zp4j2se43srlwq0pln1ddb&st=g7egn152&raw=1" },
            { id: 4, transcript: "What kind of neighbourhood would you like to live in?", audioUrl: "https://www.dropbox.com/scl/fi/edv038d3h623y05ojsqhs/part1_q4.mp3?rlkey=pkc4bzjszeawi8t27ymewqjfn&st=k9pv71eu&raw=1" },

            { id: 5, transcript: "I’d like to move on and ask you some questions about fitness. Do you like walking? Why or why not?", audioUrl: "https://www.dropbox.com/scl/fi/o2eucbgqygszp2y91hqdm/part1_q5.mp3?rlkey=30r7yqyjssyjki5595vws903y&st=zdzu4s0z&raw=1" },
            { id: 6, transcript: "Are there places you can walk near your house?", audioUrl: "https://www.dropbox.com/scl/fi/2yu9sk21gi6fu35jgqg23/part1_q6.mp3?rlkey=jd6fj5cyciwln1rkqcn6gzdul&st=n5yx6d0l&raw=1" },
            { id: 7, transcript: "Do people in your country like walking? Why or why not?", audioUrl: "https://www.dropbox.com/scl/fi/iyofqybh6wk27yt9a6cq3/part1_q7.mp3?rlkey=31h9dg9lohd3f59tt6e7m7d10&st=iudm53yx&raw=1" },
            { id: 8, transcript: "What other kinds of exercise do you enjoy?", audioUrl: "https://www.dropbox.com/scl/fi/m1xjyfk6ue8a3wadfutts/part1_q8.mp3?rlkey=59y2egi6k8zv48wcia2pu2z49&st=r4a9a5sc&raw=1" },
        ]
    },
    {
        part: 2,
        questions: [
            {
                id: 9,
                transcript: "I'd like you to describe a friend who is important to you.",
                audioUrl: "https://www.dropbox.com/scl/fi/fre59usd5n85roywb3bts/part2.mp3?rlkey=2i1js4gufvyp5mmcup1jm84cj&st=k24j5cel&raw=1"
            }
        ]
    },
    {
        part: 3,
        questions: [
            { id: 10, transcript: "Thank you. Now, you've just spoken about a friend who is important to you. I’d like to explore this topic a little further and ask you some general questions about friendship. Let’s start with making friends. In your opinion, is it easier to make friends when we're young, or when we're older? Why do you think that is?", audioUrl: "https://www.dropbox.com/scl/fi/6lefhggqobg094ef2em4s/part3_q1.mp3?rlkey=lvfi2uj7eq2ej23r64zs373b1&st=fksg1m8g&raw=1" },
            { id: 11, transcript: "Where do people usually make friends these days? Can you give some examples?", audioUrl: "https://www.dropbox.com/scl/fi/gdbsbt94yihvdiciv4ket/part3_q2.mp3?rlkey=q9q90dk4yt4g7rq72wno1irdc&st=tifp9ee0&raw=1" },
            { id: 12, transcript: "Some friendships seem to last a lifetime. Why do you think that happens?", audioUrl: "https://www.dropbox.com/scl/fi/xcw4cr9061gic1v5129qo/part3_q3.mp3?rlkey=e4rlfz52ol0xj2mtqpsd5pzah&st=htsd260w&raw=1" },

            { id: 13, transcript: "Now let’s compare friends and family. What do you think friends can offer that family members sometimes can't?", audioUrl: "https://www.dropbox.com/scl/fi/88pl4a0nxqy7yhxfgepgo/part3_q4.mp3?rlkey=6awms1t6v4stwgpne1lkj0qzh&st=jtzeoxgm&raw=1" },
            { id: 14, transcript: "Would you say there are situations where friends become more important than family? Why or why not?", audioUrl: "https://www.dropbox.com/scl/fi/mgg22tk8r55ig0oteh3vs/part3_q5.mp3?rlkey=ri7k5ioypb0a73anyk49mkqk8&st=q8pkludn&raw=1" },
            { id: 15, transcript: "Do you spend more time with your friends or with your family? Why?", audioUrl: "https://www.dropbox.com/scl/fi/o2wf53ecs3p4f4noo5f3g/part3_q6.mp3?rlkey=fxul3e5uy9xpdhjcz6f5a2s0z&st=sr85ybu3&raw=1" },

            { id: 16, transcript: "Let’s move on to talk about how friendships change over time. How has modern technology — like cell phones and the internet — affected your friendships?", audioUrl: "https://www.dropbox.com/scl/fi/qrlylkvzulrh76qwdnbyk/part3_q7.mp3?rlkey=jxnlpi548a0ckuzyx7i2rtl0o&st=poqhra0m&raw=1" },
            { id: 17, transcript: "Do you think friendships change as we grow older? In what ways?", audioUrl: "https://www.dropbox.com/scl/fi/q00hotkgvlk7t66j83d79/part3_q8.mp3?rlkey=wp4k0k0mx7ax0gl4m1x1dxj21&st=5kh68wyp&raw=1" }
        ]
    }
]


export const reading_answers = {
    1: "song collections",
    2: "Library of Congress",
    3: "portable recording machine",
    4: "rural areas",
    5: "prisons and penitentiaries",

    6: "D",
    7: "F",
    8: "D",
    9: "B",
    10: "E",

    11: "D",
    12: "E",
    13: "F",

    14: "B",
    15: "A",
    16: "D",
    17: "E",
    18: "A",
    19: "C",
    20: "A",

    21: "clean room",
    22: "glass wall",
    23: "electronic equipment",
    24: "gamma radiation",
    25: "beards/facial hair",
    26: "fans",

    27: "v",
    28: "vii",
    29: "iii",
    30: "ix",
    31: "i",
    32: "x",

    33: "dizzy heights",
    34: "major cumulus cloud",
    35: "oxygen",
    36: "6.5",

    37: "E",
    38: "F",
    39: "A",
    40: "F"
};

export const listening_answers = {
    1: "John Sparrow",
    2: "24 January",
    3: "Athens, Greece",
    4: "9.45",
    5: "Hypnos",
    6: "95 euros",
    7: "light meal",
    8: "Asian vegetarian",
    9: "dairy products",
    10: "24 hours",

    11: "B",
    12: "C",
    13: "Italian",
    14: "hot dogs",
    15: "A",
    16: "B",
    17: "C",
    18: "B",

    19: "A",
    20: "D",

    21: "March",
    22: "workers",
    23: "lecturer",
    24: "timetable",

    25: "B",
    26: "D",
    27: "G",

    28: "B",
    29: "C",
    30: "A",

    31: "confused",
    32: "population(s)",
    33: "location",
    34: "website",
    35: "west",
    36: "September",
    37: "food/feeding",
    38: "shipping",
    39: "wider",
    40: "sub-tropical/ subtropical/ sub tropical"
};