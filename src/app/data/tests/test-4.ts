// https://practicepteonline.com/ielts-listening-test-80
export const listening_section_1 = {
    audio: "https://www.dropbox.com/scl/fi/q4kgsr9atlefnltyq395d/t4-l1.mp4?rlkey=7j75y340ctbps3pxeovf71a8u&st=6fwetjnh&raw=1",
    questions: [
        {
            questionType: "note-completion",
            topic: "Costwise Car Hire",
            sections: [
                {
                    title: "Details",
                    bulletPoints: [
                        {
                            text: "Number of offices in sydney - 3",
                        },
                        {
                            id: 1,
                            text: "Booking reference number – (1) _______",
                        },
                        {
                            id: 2,
                            text: "Office just by (2) _______ terminal",
                        },
                        {
                            id: 3,
                            text: "Opening hours 6.45 am to (3) _______",
                        },
                        {
                            id: 4,
                            text: "After hours charges – $ (4) _______ ",
                        },
                        {
                            id: 5,
                            text: "Cheapest model of car available – (5) _______",
                        },
                        {
                            id: 6,
                            text: "Information needed when booking – (6) _______ number",
                        },
                        {
                            id: 7,
                            text: "Length of hire period (7) _______",
                        },
                        {
                            id: 8,
                            text: "Reduce cost by driving under (8) _______ km per week",
                        },
                        {
                            id: 9,
                            text: "Insurance does not cover (9) _______",
                        },
                        {
                            id: 10,
                            text: "After hours put keys in box near the office on the (10) _______",
                        },
                    ],
                },
            ],
        },
    ],
}

export const listening_section_2 = {
    audio: "https://www.dropbox.com/scl/fi/qzmju727kywxrd446nflp/t4-l2.mp4?rlkey=g0htzwcvi96ta08ximukmf97x&st=mpxdrxew&raw=1",
    questions: [
        {
            questionType: "matching",
            question: {
                question: "The following are essential requirements for which job?",
                statements_title: "Jobs",
                statements: [
                    { id: 11, text: "conference organizer" },
                    { id: 12, text: "catering manager" },
                    { id: 13, text: "housekeeper" },
                    { id: 14, text: "fitness centre staff" },
                    { id: 15, text: "reservations assistant" },
                ],
                features_title: "Essential requirements",
                features: [
                    { letter: "A", description: "foreign languages" },
                    { letter: "B", description: "willingness to travel abroad" },
                    { letter: "C", description: "professional qualification" },
                ],
            }
        },
        {
            questionType: "matching",
            question: {
                statements_title: "International Finest Group – Recruitment procedures",
                statements: [
                    { text: "Register interest in working for International Finest Group" },
                    { id: 16, text: "Receive personal code and check" },
                    { id: 17, text: "Send in form and attach" },
                    { id: 18, text: "Receive reply and confirm" },
                    { text: "Download application form" },
                    { id: 19, text: "Send in" },
                    { id: 20, text: "Attend" },
                ],
                features_title: "Options",
                features: [
                    { letter: "A", description: "CV" },
                    { letter: "B", description: "names of referees" },
                    { letter: "C", description: "work permit" },
                    { letter: "D", description: "recruitment seminar" },
                    { letter: "E", description: "evidence of qualifications" },
                    { letter: "F", description: "conditions of employment" },
                    { letter: "G", description: "initial interview" },
                ],
            }
        }
    ],
}

export const listening_section_3 = {
    audio: "https://www.dropbox.com/scl/fi/7jb5rehk3y35bvy93gthx/t4-l3.mp4?rlkey=4mkaf2qk6h6yifpi5jrzbfo22&st=yc2ld1vo&raw=1",
    questions: [
        {
            questionType: "multiple-choice-many",
            questions: [
                {
                    id: [21, 22],
                    question: "Which TWO possible objections to a roof garden are discussed?",
                    options: [
                        "problems of access",
                        "the cost of construction",
                        "the time needed to install it",
                        "who will look after it",
                        "how to support the weight of it"
                    ]
                },
                {
                    id: [23, 24],
                    question: "Which TWO recent developments in roof garden building are mentioned?",
                    options: [
                        "waterproof barrier materials",
                        "drainage systems",
                        "tank designs",
                        "lightweight construction materials",
                        "watering systems"
                    ]
                }
            ]
        },
        {
            questionType: "image-labeling",
            image_url: "https://practicepteonline.com/wp-content/uploads/2024/09/lis-test80-1.png",
            instructions: "Label the diagram below. Write the correct letter A-H next to questions 25-30",
            questions: [
                {
                    id: 25,
                    location: "wall",
                },
                {
                    id: 26,
                    location: "electric wire",
                },
                {
                    id: 27,
                    location: "fibre optic cable",
                },
                {
                    id: 28,
                    location: "wooden post",
                },
                {
                    id: 29,
                    location: "glass cap",
                },
                {
                    id: 30,
                    location: "acrylic rod",
                }
            ]
        }
    ]
}

export const listening_section_4 = {
    audio: "https://www.dropbox.com/scl/fi/usdzhokzlu9xbryetv9xk/t4-l4.mp4?rlkey=e3cx18dts91pr5xoitnuumkn0&st=ox2rxw8d&raw=1",
    questions: [
        {
            //question 31-36 is same set of questions
            questionType: "summary-completion",
            question: {
                id: [31, 32, 33],
                title: "The Argus System",
                passageTemplate: `
      Developed by Rob Holman in North Carolina with other researchers. Research is vital for understanding <31> Matches information from under the water with information from a <32> According to S. Jeffress Williams, useful because can make observations during <33>.
    `,
            },
        },
        {
            questionType: "note-completion",
            topic: "The Argus System and Dr Holman’s Sand Collection",
            sections: [
                {
                    title: "Dr Holman’s sand collection",
                    bulletPoints: [
                        {
                            id: 34,
                            text: "Dr. H. has samples from every (34) _______",
                        },
                        {
                            id: 35,
                            text: "Used in teaching students of (35) _______",
                        },
                        {
                            id: 36,
                            text: "E.g. US East Coast display – grains from south are small, light colored and (36) _______ in shape <<subpoint>>",
                        },
                    ],
                },
            ],
        },
        {
            questionType: "flow-chart-completion",
            question: {
                image_url: "https://practicepteonline.com/wp-content/uploads/2024/09/lis-test80-2.png",
                id: [37, 38, 39, 40],
            },
        }
    ],
}

// https://leapscholar.com/exams/ielts/practice-test/reading/neuroaesthetics-reading-answers
export const reading_section_1 = {
    reading_passage: {
        title: "Neuroaesthetics",
        subtitle: "",
        passage: `
Neuroaesthetics is an emerging discipline seeking to bring scientific objectivity to the study of art, and has already given us a better understanding of many masterpieces. For instance the brain's amygdala seems to be stimulated by the blurred imagery of impressionist paintings. That finding might explain why many people find these pieces so moving since the amygdala plays a crucial role in our feelings. 
Could the same approach also shed light on abstract 20th century pieces, from Pollock's seemingly haphazard arrangements of splashed paint on canvas to Mondrian's geometrical blocks of colour? Sceptics believe that because they are famous people claim to like such works. We always have an inclination to follow the crowd. When asked to make simple perceptual decisions, for example matching a shape to its rotated image, people often choose the wrong answer if they see others choosing it. It is easy to imagine that this behaviour would have even more effect on a fuzzy concept where there is no right or wrong answer, like art appreciation.
Angelina Hawley-Dolan, of Boston College, Massachusetts, asked volunteers to view pairs of paintings - either the doodles of chimps, infants and elephants or the creations of famous abstract artists. They then had to tell which they liked. No captions were given to one-third of the paintings, while many were labelled incorrectly. Volunteers were actually seeing an acclaimed masterpiece but they thought they were seeing a chimp's messy brush strokes. In each set of trials, even when they believed it was by an animal or a child, volunteers generally preferred the work of renowned artists. Even if they can't explain why, it seems that the viewer can sense the artist's vision in paintings.
Artist Robert Pepperell from Cardiff University creates ambiguous works that are neither clearly representational nor entirely abstract. Pepperell and his collaborators in a study asked volunteers to tell how authoritative they felt an artwork to be, and whether they viewed anything familiar in the work. The longer they took to answer these questions, the greater their neural activity and the more highly they rated the piece under scrutiny. It looked like the brain sees these images as puzzles. The harder it is to decipher the meaning, the more rewarding the moment of recognition.
And what about artists such as Mondrian, whose paintings are created exclusively of vertical and horizontal lines enclosing blocks of colour? Mondrian's works are deceptively simple, but eye-tracking studies confirm that they are carefully composed, and that simply rotating a piece radically changes the way we see it. With the altered versions they would flit across a piece more rapidly but with the originals, volunteers' eyes stayed longer on certain places in the image. As a result, when they later rated the work, the volunteers considered the altered versions less pleasurable.
Oshin Vartanian of Toronto University in a similar study, asked volunteers to compare original paintings with ones which he had altered by moving objects around within the frame. Whether it was a Van Gogh still life or an abstract by Miro, he found that almost everyone preferred the original work. Vartanian also found that when the composition of the paintings changed it reduced activation in those brain areas linked with meaning and interpretation.
Analysing the visual intricacy of different pieces of art, Alex Forsythe of the University of Liverpool, suggested that many artists use a key level of detail to please the brain. Too much detail makes it kind of a 'perceptual overload' but too little detail is boring, according to Forsythe. Appealing pieces both representational and abstract, show signs of 'fractals' - repeated motifs keep repeating in different scales, fractals are common throughout nature, for example in the branches of trees or shapes of mountain peaks. It is possible that our visual system finds it easier to process such patterns, which evolved in the great outdoors. 
Like replaying the writer's moment of creation, the brain appears to process movement when we see a handwritten letter. Because the brain reconstructs the energetic actions the artist used as he painted it led some to wonder whether Pollock's works feel so dynamic. This may be because of our brain's 'mirror neurons', which mimic others' actions. It might even be the case that we could use neuroaesthetic studies to understand the longevity of some pieces of artwork, however the hypothesis will need to be tested thoroughly. Works best suited to our visual system may be the most likely to linger once the trends of previous generations have been forgotten while the fashions of the time might shape what is currently popular.
These studies are probably only a taste of what is to come and is still early days for the field of neuroaesthetics. However it would be stupid to reduce art appreciation to a set of scientific laws. We shouldn't underestimate the importance of the artistic environment, the style of a particular artist, and their place in history. Abstract art offers both the freedom and a challenge to play with different interpretations. Like science in some ways, we keep decoding meaning and looking for systems so that we can view and appreciate the world in a new way. 
        `
    },
    questions: [
        {
            questionType: "flow-chart-completion",
            question: {
                image_url: "https://websitecmscdn.s3.ap-south-1.amazonaws.com/neuroaesthetics_flow_chart_completion_4edad96d06.png",
                id: [1, 2, 3, 4, 5, 6],
            }
        },
        {
            questionType: "matching-features",
            question: {
                statements: [
                    { id: 7, text: "Made volunteers see pairs of paintings - either the doodles of chimps, infants and elephants or the creations of famous abstract artists." },
                    { id: 8, text: "Created ambiguous works that are neither clearly representational nor entirely abstract." },
                    { id: 9, text: "Asked volunteers to compare original paintings with ones which he had altered by moving objects around within the frame." },
                    { id: 10, text: "Suggested that many artists use a key level of detail to please the brain." }
                ],
                features: [
                    { letter: "A", description: "Angelina Hawley-Dolan" },
                    { letter: "B", description: "Oshin Vartanian" },
                    { letter: "C", description: "Robert Pepperell" },
                    { letter: "D", description: "Mondrian" },
                    { letter: "E", description: "Alex Forsythe" }
                ]
            }
        },
        {
            questionType: "sentence-completion",
            questions: [
                {
                    id: 11,
                    sentence: "Neuroaesthetics is an emerging discipline seeking to bring scientific objectivity to the study of art and has already given us a better understanding of many (11) _____."
                },
                {
                    id: 12,
                    sentence: "Mondrian's works are deceptively simple, but (12) _____ studies confirm that they are carefully composed and that simply rotating a piece radically changes the way we see it."
                },
                {
                    id: 13,
                    sentence: "Like replaying the writer's moment of creation, the brain appears to process movement when we see a (13) _____."
                },
                {
                    id: 14,
                    sentence: "We shouldn't underestimate the importance of the (14) _____, the style of a particular artist, and their place in history."
                }
            ]
        }
    ]
}
// https://ieltsmaterial.com/frogwatch-ielts-reading-answers
export const reading_section_2 = {
    reading_passage: {
        title: "Frogwatch",
        subtitle: "",
        passage: `
Frogwatch, a remarkable success story started in Western Australia, is the brainchild of Dr. Ken Aplin. His work, as the curator of reptiles and frogs in the Western Australian Museum, invoked long field trips and he wondered if a community-based frog-rmonitoring network could help him keep track of frogs. Through such a network, ordinary untrained members of the community could learn about frog habitats, observe the numbers and kinds of frogs in their local area, and report this information to the museum.
'Launched in 1995, Frogwatch recently gained its 3221st member, and many people say that this is the best thing the museum has ever done. Each participant receives a ‘Frogwatch Kit’ - a regular newsletter, an audio tape of frog calls and identification sheets. Recently, Frogwatch membership increased dramatically when a mysterious parasitic fungus disease began attacking frogs nationwide. Although research is yet incomplete, scientists suspect the fungus originated overseas, perhaps in South America, where frogs have died in catastrophic numbers from a fungus disease genetically similar to the Australian organism.
Researchers in Western Australia needed to know how widespread the infection was in the state’s frog populations. So Aplin sent an ‘F-file’ (frog fungus facts) alert to Frogwatch members, requesting their help. He asked them to deliver him dead or dying frogs. More than 2,000 frogs have now been examined, half from the museum’s existing collection. Aplin once thought the fungus had arrived in Western Australia in only the past year or two, but tests now suggest it has been there since the late 1980s.
Frogwatch has proved to be Abe perfect link to the public and Aplin has become a total convert to community participation. He’s now aiming for a network of 15,000 Frogwatch members as the museum can’t afford to use professional resources to monitor frog populations. Much of the frog habitat is on private land, and without community support, monitoring the frogs would be impossible.
Not everyone is convinced by the ‘feelgood' popularity of Frogwatch. While Aplin believes even tiny backyard ponds can help to significantly improve frog numbers, Dr. Dale Roberts isn’t so sure, A senior zoology lecturer at the University of WA, Roberts agrees the program has: tapped into the public’s enthusiasm for frogs, but he warns that strong public awareness does not amount to sound science.
He argues that getting the public to send in pages of observations is a good thing, but giving these reports credibility may not be valid scientifically. In addition, he’s not convinced that Frogwatch’s alarmist message about the danger of fungal infection is valid either. In Western Australia, for example, there was a long summer and very, late drenching rains, that year, following two equally dry years. So, he argues, there are other things that might have precipitated the deaths. He questions what could be done about it anyway. If it’s already widespread, it may not be worth the cost and effort of doing anything about it. Even if it’s causing high death rates, he says he can still find every frog species found over the past ten years in the south-west of Australia.
Roberts argues that Western Australia is different. Unlike most other states, species are still being discovered there; the disappearances of frog types in Queensland and New South Wales, are not occurring in Western Australia, although three south-west species are on the endangered list. Roberts believes that no amount of garden ponds in Perth will help those species, which live in isolated habitats targeted for development.
Aplin’s response is that increasing the number of frog-friendly habitats is important for the very reason that many Western Australian frog species are found in small, highly restricted locations. He argues that pesticide-free gardens and ponds can offer a greater chance of survival to animals battling habitat disturbance, environmental pollutants, climatic variations, and now fungal disease. Aplin’s opinion is that they should use the precautionary principle in cases where they don’t yet know enough about the situation. Usually diseases sort themselves out naturally and some frog fauna will co-evolve with the fungus. Given time some balance may be restored, but in the shorter term, they are seeing negative impacts.
The nationwide spread of the chytrid fungus is being mapped by Dr. Rick Speare, a specialist in amphibian disease at James Cook University. Speare also tests the accuracy of' Aplin’s fungus diagnoses and says Frogwatch is ‘an amazing and under-acknowledged system ... the best program in Australia for harnessing public interest in frog biology... There are a lot of eyes out there looking for dead or sick frogs, beyond the power of any biologist to collect.’
Aplin argues that they should never underestimate the importance of' having a community base, especially when governments want to cut research funds, ‘People can protest in ways that a handful of scientists hiding in a laboratory can’t do. For just about every environmental problem, community involvement is fundamental.’ Furthermore, Frogwatch is proving to be a social phenomenon as much as anything else. It seems ordinary people know that frogs are a measure of the environment’s health.
    `
    },
    questions: [
        {
            questionType: "yes-no-notgiven",
            questions: [
                {
                    id: 15,
                    statement: "Frogwatch members need a basic level of scientific training."
                },
                {
                    id: 16,
                    statement: "All Frogwatch members live in Western Australia."
                },
                {
                    id: 17,
                    statement: "Frogwatch has proved that frogs are disappearing because of a fungus."
                },
                {
                    id: 18,
                    statement: "Scientists in WA have examined about two thousand frogs collected by Frogwatch."
                },
                {
                    id: 19,
                    statement: "The frog fungus disease has been in Western Australia for more than ten years."
                },
                {
                    id: 20,
                    statement: "New species of frogs have been found in Western Australia recently."
                }
            ]
        },
        {
            questionType: "matching-features",
            question: {
                question_statement: "The reading passage describes the opinions of Dr. Ken Aplin, Dr. Dale Roberts and Dr. Rick Speare in relation to strategies for frog conservation. Match one of the researchers A–C to each of the statements below. There may be more than one correct answer.",
                statements: [
                    {
                        id: 21,
                        text: "Although the involvement of large numbers of people is encouraging, this does not guarantee scientifically valid data."
                    },
                    {
                        id: 22,
                        text: "The development of frog-friendly backyards will help to conserve frog species."
                    },
                    {
                        id: 23,
                        text: "Although it is possible that frogs will adapt to fungal and other problems in the long term, we should take precautions in case this does not occur."
                    },
                    {
                        id: 24,
                        text: "As there may be many other explanations for recent frog deaths, it is not worth spending a great deal of time and money studying this fungus."
                    },
                    {
                        id: 25,
                        text: "Because of the unique geography of Western Australia, most frog species in this State are not in danger of extinction."
                    },
                    {
                        id: 26,
                        text: "Frogwatch has greater potential for frog observation than is possible by the scientific community."
                    }
                ],
                features_title: "Options",
                features: [
                    { letter: "A", description: "Dr. Aplin" },
                    { letter: "B", description: "Dr. Roberts" },
                    { letter: "C", description: "Dr. Speare" }
                ]
            }
        }
    ]
}

// https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-english-practice-tests/reading-academic/section-2  - QUESTION 14 to 27 
export const reading_section_3 = {
    reading_passage: {
        title: "Fair games?",
        subtitle: "",
        passage: `
For seventeen days every four years the world is briefly arrested by the captivating, dizzying spectacle of athleticism, ambition, pride and celebration on display at the Summer Olympic Games. After the last weary spectators and competitors have returned home, however, host cities are often left awash in high debts and costly infrastructure maintenance. The staggering expenses involved in a successful Olympic bid are often assumed to be easily mitigated by tourist revenues and an increase in local employment, but more often than not host cities are short changed and their taxpayers for generations to come are left settling the debt.
Olympic extravagances begin with the application process. Bidding alone will set most cities back about $20 million, and while officially bidding only takes two years (for cities that make the shortlist), most cities can expect to exhaust a decade working on their bid from the moment it is initiated to the announcement of voting results from International Olympic Committee members. Aside from the financial costs of the bid alone, the process ties up real estate in prized urban locations until the outcome is known. This can cost local economies millions of dollars of lost revenue from private developers who could have made use of the land, and can also mean that particular urban quarters lose their vitality due to the vacant lots. All of this can be for nothing if a bidding city does not appease the whims of IOC members – private connections and opinions on government conduct often hold sway (Chicago’s 2012 bid is thought to have been undercut by tensions over U.S. foreign policy).   
Bidding costs do not compare, however, to the exorbitant bills that come with hosting the Olympic Games themselves. As is typical with large-scale, one-off projects, budgeting for the Olympics is a notoriously formidable task. Los Angelinos have only recently finished paying off their budget-breaking 1984 Olympics; Montreal is still in debt for its 1976 Games (to add insult to injury, Canada is the only host country to have failed to win a single gold medal during its own Olympics). The tradition of runaway expenses has persisted in recent years. London Olympics managers have admitted that their 2012 costs may increase ten times over their initial projections, leaving tax payers 20 billion pounds in the red.  
Hosting the Olympics is often understood to be an excellent way to update a city’s sporting infrastructure. The extensive demands of Olympic sports include aquatic complexes, equestrian circuits, shooting ranges, beach volleyball courts, and, of course, an 80,000 seat athletic stadium. Yet these demands are typically only necessary to accommodate a brief influx of athletes from around the world. Despite the enthusiasm many populations initially have for the development of world-class sporting complexes in their home towns, these complexes typically fall into disuse after the Olympic fervour has waned. Even Australia, home to one of the world’s most sportive populations, has left its taxpayers footing a $32 million-a-year bill for the maintenance of vacant facilities.
Another major concern is that when civic infrastructure developments are undertaken in preparation for hosting the Olympics, these benefits accrue to a single metropolitan centre (with the exception of some outlying areas that may get some revamped sports facilities). In countries with an expansive land mass, this means vast swathes of the population miss out entirely. Furthermore, since the International Olympic Committee favours prosperous “global” centres (the United Kingdom was told, after three failed bids from its provincial cities, that only London stood any real chance at winning), the improvement of public transport, roads and communication links tends to concentrate in places already well-equipped with world-class infrastructures. Perpetually by-passing minor cities creates a cycle of disenfranchisement: these cities never get an injection of capital, they fail to become first-rate candidates, and they are constantly passed over in favour of more secure choices.  
Finally, there is no guarantee that an Olympics will be a popular success. The “feel good” factor that most proponents of Olympic bids extol (and that was no doubt driving the 90 to 100 per cent approval rates of Parisians and Londoners for their cities’ respective 2012 bids) can be an elusive phenomenon, and one that is tied to that nation’s standing on the medal tables. This ephemeral thrill cannot compare to the years of disruptive construction projects and security fears that go into preparing for an Olympic Games, nor the decades of debt repayment that follow (Greece’s preparation for Athens 2004 famously deterred tourists from visiting the country due to widespread unease about congestion and disruption). 
There are feasible alternatives to the bloat, extravagance and wasteful spending that comes with a modern Olympic Games. One option is to designate a permanent host city that would be re-designed or built from scratch especially for the task. Another is to extend the duration of the Olympics so that it becomes a festival of several months. Local businesses would enjoy the extra spending and congestion would ease substantially as competitors and spectators come and go according to their specific interests. Neither the “Olympic City” nor the extended length options really get to the heart of the issue, however. Stripping away ritual and decorum in favour of concentrating on athletic rivalry would be preferable.
Failing that, the Olympics could simply be scrapped altogether. International competition could still be maintained through world championships in each discipline. Most of these events are already held on non-Olympic years anyway – the International Association of Athletics Federations, for example, has run a biennial World Athletics Championship since 1983 after members decided that using the Olympics for their championship was no longer sufficient. Events of this nature keep world-class competition alive without requiring Olympic-sized expenses. 
        `
    },
    questions: [
        {
            questionType: "matching-sentence-endings",
            question: {
                starting: [
                    { id: 27, text: "Bids to become a host city" },
                    { id: 28, text: "Personal relationships and political tensions" },
                    { id: 29, text: "Cost estimates for the Olympic Games" },
                    { id: 30, text: "Purpose-built sporting venues" },
                    { id: 31, text: "Urban developments associated with the Olympics" }
                ],
                endings: [
                    { letter: "A", text: "often help smaller cities to develop basic infrastructure." },
                    { letter: "B", text: "tend to occur in areas where they are least needed." },
                    { letter: "C", text: "require profitable companies to be put out of business." },
                    { letter: "D", text: "are often never used again once the Games are over." },
                    { letter: "E", text: "can take up to ten years to complete." },
                    { letter: "F", text: "also satisfy needs of local citizens for first-rate sports facilities." },
                    { letter: "G", text: "is usually only successful when it is from a capital city." },
                    { letter: "H", text: "are closely related to how people feel emotionally about the Olympics." },
                    { letter: "I", text: "are known for being very inaccurate." },
                    { letter: "J", text: "often underlie the decisions of International Olympic Committee members." },
                    { letter: "K", text: "are holding back efforts to reform the Olympics." }
                ]
            }
        },
        {
            questionType: "true-false-notgiven",
            questions: [
                {
                    id: 32,
                    statement: "Residents of host cities have little use for the full range of Olympic facilities."
                },
                {
                    id: 33,
                    statement: "Australians have still not paid for the construction of Olympic sports facilities."
                },
                {
                    id: 34,
                    statement: "People far beyond the host city can expect to benefit from improved infrastructure."
                },
                {
                    id: 35,
                    statement: "It is difficult for small cities to win an Olympic bid."
                },
                {
                    id: 36,
                    statement: "When a city makes an Olympic bid, a majority of its citizens usually want it to win."
                },
                {
                    id: 37,
                    statement: "Whether or not people enjoy hosting the Olympics in their city depends on how athletes from their country perform in Olympic events."
                },
                {
                    id: 38,
                    statement: "Fewer people than normal visited Greece during the run up to the Athens Olympics."
                }
            ]
        },
        {
            questionType: "multiple-choice-many",
            questions: [
                {
                    id: [39, 40],
                    question: "Which TWO of the following does the author propose as alternatives to the current Olympics?",
                    options: [
                        "The Olympics should be cancelled in favour of individual competitions for each sport.",
                        "The Olympics should focus on ceremony rather than competition.",
                        "The Olympics should be held in the same city every time.",
                        "The Olympics should be held over a month rather than seventeen days.",
                        "The Olympics should be made smaller by getting rid of unnecessary and unpopular sports."
                    ]
                }
            ]
        }
    ]
}


// https://practicepteonline.com/ielts-writing-test-103/
export const writingTasks = [
    {
        id: 1,
        timeLimit: "You should spend about 20 minutes on this task.",
        wordLimit: "Write at least 150 words.",
        prompt: [
            "The diagram below shows how electricity is generated in a hydroelectric power station.",
            "Summarise the information by selecting and reporting the main features, and make comparisons where relevant."
        ],
        image_url: "https://www.dropbox.com/scl/fi/wusno1giwtg7ztvryj2yh/test4_task1.png?rlkey=h6q1nkj3nvad20w42evm1ky17&st=lqfbrz67&raw=1",
    },
    {
        id: 2,
        timeLimit: "You should spend about 40 minutes on this task.",
        wordLimit: "Write at least 250 words.",
        prompt: [
            "Some people say that music is a good way of bringing people of different cultures and ages together. To what extent do you agree or disagree with this opinion?",
            "Give reasons for your answer and include any relevant examples from your own knowledge or experience."
        ],
    }
]

// CHATGPT GENERATED
export const speaking_transcripts = [
    {
        part: 1,
        questions: [
            { id: 1, transcript: "Now, in this part of the test, I will ask you some questions about yourself. After each question, there will be a beep sound. You will have 20 seconds to speak after the beep. So, What time of day do you usually wake up? Why?", audioUrl: "https://www.dropbox.com/scl/fi/xpne2wgxm2e5v6a25jtha/part1_q1.mp3?rlkey=vcia4aqk2xbw78z74xn966zps&st=pd328iro&raw=1" },
            { id: 2, transcript: "Do you enjoy mornings or evenings more? Why?", audioUrl: "https://www.dropbox.com/scl/fi/u6wx0r7nbhdah6jbsvsfb/part1_q2.mp3?rlkey=wl8m76v78eyq7vfpjdbln5vog&st=s93l2ip9&raw=1" },
            { id: 3, transcript: "How do you usually spend your evenings?", audioUrl: "https://www.dropbox.com/scl/fi/5458fue3k788gbebsllb6/part1_q3.mp3?rlkey=t7p9xoxgbnv712a9ntssi1sk4&st=rjd2qxvb&raw=1" },
            { id: 4, transcript: "Do you think your daily routine is healthy?", audioUrl: "https://www.dropbox.com/scl/fi/l2ngngllmh0cbudk7u7z3/part1_q4.mp3?rlkey=7u7t8ivcfdrm46cwpffl1gjmo&st=frekezre&raw=1" },

            { id: 5, transcript: "I’d like to move on and ask you some questions about art. Are you interested in art?", audioUrl: "https://www.dropbox.com/scl/fi/oif6mk5rxo653v0j732ha/part1_q5.mp3?rlkey=g2f6ok62bzcvzot75augn76rc&st=m4ccx87a&raw=1" },
            { id: 6, transcript: "Did you learn any form of art in school?", audioUrl: "https://www.dropbox.com/scl/fi/txhjwel0sqq9dpxc7piuu/part1_q6.mp3?rlkey=981ffe2x5dx8a1t2ngoppqk8g&st=c0kqp57l&raw=1" },
            { id: 7, transcript: "Have you ever visited an art gallery or museum?", audioUrl: "https://www.dropbox.com/scl/fi/4e6s72h5utnc7n3qpotqh/part1_q7.mp3?rlkey=ssjyrg8u917hnjll16vuhdqtv&st=2uclwpns&raw=1" },
            { id: 8, transcript: "Do you think art is important in society? Why or why not?", audioUrl: "https://www.dropbox.com/scl/fi/hl3t7t7l8feyzjb469ph1/part1_q8.mp3?rlkey=kp8zkgmm0jwtlzyq6o7b9p651&st=sgiqcz7j&raw=1" },
        ]
    },
    {
        part: 2,
        questions: [
            {
                id: 9,
                transcript: "Describe a useful skill you learned when you were a teenager.",
                audioUrl: "https://www.dropbox.com/scl/fi/th26lqp2aj9v6vqaw3rwy/part2.mp3?rlkey=isj43ji5ljjrcultljd1idimo&st=1pbr16dr&raw=1"
            }
        ]
    },
    {
        part: 3,
        questions: [
            { id: 10, transcript: "You’ve just spoken about a skill you learned. Let’s talk more about skills. What are the most important skills children should learn?", audioUrl: "https://www.dropbox.com/scl/fi/p60yl7e1z58mo90dy4cst/part3_q1.mp3?rlkey=7zvetcsvq8uboiq5r0q9x8ym0&st=7kct9bja&raw=1" },
            { id: 11, transcript: "Do you think schools focus more on academic knowledge or practical skills?", audioUrl: "https://www.dropbox.com/scl/fi/1y56gcy0zcw2x5qa7q59r/part3_q2.mp3?rlkey=6694j6ck1vbloirqh5h4ieblg&st=2bdeov8k&raw=1" },
            { id: 12, transcript: "Should parents play a role in teaching life skills? Why or why not?", audioUrl: "https://www.dropbox.com/scl/fi/a4rj7gx81kgc6j48jnshm/part3_q3.mp3?rlkey=yi52igfnageaq8zexnejcldy3&st=c5fzp661&raw=1" },

            { id: 13, transcript: "Let’s move on and talk about learning in adulthood. Do adults still need to learn new skills?", audioUrl: "https://www.dropbox.com/scl/fi/p9oag45126argvl34sr1y/part3_q4.mp3?rlkey=9xf9n66onq87vj9103551d6te&st=inzltxkd&raw=1" },
            { id: 14, transcript: "What challenges do adults face when trying to learn something new?", audioUrl: "" },
            { id: 15, transcript: "How has technology changed the way people learn new skills?", audioUrl: "https://www.dropbox.com/scl/fi/ywlq0jgtknb3bj4dl46i3/part3_q6.mp3?rlkey=gru6qqtai6arof0hm4a509z5w&st=1w5q7f58&raw=1" },
        ]
    }
];



export const listening_answers = {
    1: "743002",
    2: "international",
    3: "6.15 pm",
    4: "30",
    5: "echo",
    6: "credit card",
    7: "7 / 7 days",
    8: "1000",
    9: "luggage",
    10: "pavement",
    11: "A",
    12: "C",
    13: "B",
    14: "C",
    15: "A",
    16: "F",
    17: "A",
    18: "G",
    19: "E",
    20: "D",
    21: "B",
    22: "D",
    23: "A",
    24: "E",
    25: "F",
    26: "H",
    27: "C",
    28: "D",
    29: "B",
    30: "A",
    31: "beach erosion",
    32: "(fixed) camera",
    33: "storm",
    34: "continent",
    35: "geology",
    36: "round",
    37: "spoon",
    38: "permanent marker",
    39: "newspaper",
    40: "(identification) label"
};

export const reading_answers = {
    1: "art",
    2: "Psychology",
    3: "emotional influence",
    4: "art appreciation",
    5: "paintings",
    6: "paintings",

    7: "A",
    8: "C",
    9: "B",
    10: "E",
    11: "Masterpieces",
    12: "Eye-tracking/Eye tracking",
    13: "handwritten letter",
    14: "artistic environment",

    15: "No",
    16: "Not Given",
    17: "No",
    18: "No",
    19: "Yes",
    20: "Yes",
    21: "B",
    22: "A",
    23: "A",
    24: "B",
    25: "B",
    26: "C",

    27: "E",
    28: "J",
    29: "I",
    30: "D",
    31: "B",
    32: "TRUE",
    33: "Not given",
    34: "false",
    35: "true",
    36: "not given",
    37: "true",
    38: "true",
    39: "A",
    40: "C"
};