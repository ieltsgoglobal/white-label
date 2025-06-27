// https://practicepteonline.com/ielts-listening-test-8
// sax
export const listening_section_1 = {
    audio: "https://www.dropbox.com/scl/fi/hzwhq941ji9uhkde7x4f3/part1.mp3?rlkey=htu72w6e29b918xu3q6rltyps&st=9vnm9euy&raw=1",
    questions: [
        {
            questionType: "note-completion",
            topic: "Costwise Car Hire",
            sections: [
                {
                    title: "Details",
                    bulletPoints: [
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
    // 7 minute audio   
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
                question_statement: "noob",
                statements_title: "International Finest Group – Recruitment procedures",
                statements: [
                    { id: 16, text: "Receive personal code and check" },
                    { id: 17, text: "Send in form and attach" },
                    { id: 18, text: "Receive reply and confirm" },
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
            mapTitle: "Light Installation",
            image_url: "https://practicepteonline.com/wp-content/uploads/2024/09/lis-test80-1.png",
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
            questionType: "summary-completion",
            question: {
                id: [31, 32, 33],
                title: "The Argus System",
                passageTemplate: `
      Developed by Rob Holman in North Carolina with other researchers. Research is vital for understanding <31> Matches information from under the water with information from a <32> According to S. Jeffress Williams, useful because can make observations during <33>
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


//in progress
export const reading_section_1 = {
    reading_passage: {
        title: "Citicorp Center Crisis",
        subtitle: "What would you do if a building you designed had a fatal flaw?",
        passage: `
    When banking giant Citicorp purchased the city block at 601 Lexington Avenue in New York City to build its new headquarters, the Citicorp Center, there was one problem. Part of the lot was occupied by St. Peter's Evangelical Church, and the congregation had no intention of relocating. Architect Hugh Stubbins came up with a novel design that would satisfy everyone involved. The new building would have a square foundation and rest on four nine-story tall towers located, not at the corners of the square, but at the centre of each side of the square. This had never been attempted on such a scale, but it would allow the church to continue to exist under a corner of the tower. The church members agreed to the plan as long as Citicorp replaced their old, crumbling church with a new structure that was not directly connected to the tower. The company agreed and contracted structural engineering firm LeMessurier Associates to make their unique building a reality.
    Normally, the massive weight of a skyscraper is supported at its corners, but William LeMessurier devised an ingenious system of diagonal bracing girders that would transfer the building's weight from the corners to the side columns. The completed tower would be remarkably light, even at 279 metres tall, which meant that it would sway much more than usual in the wind. To compensate for this effect, LeMessurier decided to install a tuned-mass damper at the top of the structure. This was a 372 tonne concrete block that floated on pressurised oil bearings and was operated by electronic systems. With this damper in place, LeMessurier's calculations and wind tunnel tests indicated that the building would be structurally sound in strong perpendicular winds; winds that strike only one side of a building. However, there was an unexpected flaw in his design that would be compounded by decisions made during construction.
    The problem was first noticed by Princeton University engineering student Diane Hartley when she was writing her undergraduate thesis about the Citicorp Center. She spoke with Joel S. Weinstein, a junior engineer with LeMessurier, who provided her with architectural plans and engineering calculations for the structure. According to her calculations, the stress caused by quartering winds (winds that hit a corner of the building and so affect two sides at the same time) would be significantly stronger than perpendicular winds. Due to its innovative design, she assumed that the firm must have done similar calculations. She asked Weinstein for his calculations on the effects of quartering winds, but he never sent them. When she expressed her concerns, Weinstein assured her that the building design was safe and was actually more efficient than conventional designs. As she was still a student, Hartley deferred to his judgement, but she noted their conversation in her thesis nonetheless.
    In May of 1978, Stubbins and LeMessurier attended a meeting about skyscrapers that they had designed in Pittsburgh that incorporated the same bracing system. U.S. Steel thought that welded joints might make the project too expensive, so its representative asked if they could substitute bolts. LeMessurier called his firm's New York City office to reassure him that the welded joints were the right way to go, but was informed that the same substitution had been made there without consulting him. Although surprised, he was not alarmed. He thought the decision was technically sound, and he couldn't expect them to contact him about every on-site decision.
    In June, freshman engineering student Lee DeCarolis was writing his own paper about Citicorp Center and its seemingly unstable design. He spoke to LeMessurier, who assured him that the building was quite stable, and that its unique geometry and his diagonal-brace system made it particularly resistant to quartering winds. However, since the New York building code did not require those calculations, he had not done them initially. Thinking that it would make an interesting topic for his students at Harvard, LeMessurier did the calculations, and discovered that quartering winds would increase the stress in certain parts of the building by 40%. That was well within the limitations of his original design, but the original design had specified welded joints, not the bolts that had been used instead. He redid the calculations taking bolts into account, and 40% increased to 160%.
    Then, he went to New York and learned that his team had defined the braces as trusses instead of columns. Therefore, they thought they were exempt from a safety standard, and had used fewer bolts. After running more wind tunnel tests, he determined that the weakest joint was located on the 30th floor, and its failure would cause a catastrophic collapse of the entire building. After examining historical weather records, he found that a storm capable of causing that failure occurred on average about once every 16 years, also known as a 16-year storm. That frequency was frighteningly high, and after consulting other experts and colleagues, he confronted his firm's insurance company with the grim news.
    LeMessurier and Stubbins met with Citicorp's management and outlined the problem and a possible solution. They could weld five-centimetre-thick steel plates over weak joints like bandages. The company explained the situation to the city's Building Commission, which gave a carefully written press release stating that the structural work was 'only a prudent response to new meteorological data.' Repairs began almost immediately and progressed rapidly. Then on September 1st, Hurricane Ella was reported to be on a collision course with the city. Fortunately, the storm veered off eastward, and repairs were completed in October.
    The aftermath of the crisis was noteworthy because it produced no villains. Everyone was honest and forthcoming, the people involved in the repairs cooperated to achieve a common goal and there was no finger-pointing or accusations of blame. The exact cost of the repairs remains undisclosed, but LeMessurier Associates and its insurers reimbursed Citicorp for an agreed two million dollars, and the courts were never involved. LeMessurier had expected to be ruined by the crisis, but due to his actions, his reputation was actually enhanced. The public was not informed about what had transpired until a thorough article was published in The New Yorker in 1995. Since then, the crisis has become a case study used in architectural ethics classes.
    `
    },
    questions: [
        {
            questionType: "multiple-choice-single",
            questions: [
                {
                    id: 1,
                    question: "What does the author suggest about Diane Hartley's research in the third paragraph?",
                    options: [
                        { label: "A", text: "Hartley was reluctant to question an architect as famous as LeMessurier." },
                        { label: "B", text: "No one had found any issues with the Citicorp building's design before her." },
                        { label: "C", text: "She received all of the data that she requested from LeMessurier Associates." },
                        { label: "D", text: "Her calculations were ignored by Weinstein because she was only a student." },
                    ],
                },
                {
                    id: 2,
                    question: "What unexpected news did LeMessurier receive at the meeting mentioned in the fourth paragraph?",
                    options: [
                        { label: "A", text: "The building's foundation was not strong enough to support the structure." },
                        { label: "B", text: "The church had decided to relocate after all." },
                        { label: "C", text: "There were problems with the building's wind resistance calculations." },
                        { label: "D", text: "The city had rejected the building's design plans." },
                    ],
                },
                {
                    id: 3,
                    question: "According to the author, LeMessurier had not done calculations on quartering winds because",
                    options: [
                        { label: "A", text: "he believed they would not affect the building significantly." },
                        { label: "B", text: "the building codes did not require such calculations at the time." },
                        { label: "C", text: "he was focused on perpendicular winds which seemed more dangerous." },
                        { label: "D", text: "the technology to measure quartering winds did not exist then." },
                    ],
                },
                {
                    id: 4,
                    question: "Why does the writer mention the joint on the 30th floor in the sixth paragraph?",
                    options: [
                        { label: "A", text: "To argue that the repairs may have actually been unnecessary" },
                        { label: "B", text: "To provide an explanation of how welds are superior to bolts" },
                        { label: "C", text: "To illustrate the worst case scenario for the building" },
                        { label: "D", text: "To describe how the building's joints should be repaired" },
                    ],
                },
            ]
        },
        {
            questionType: "true-false-notgiven",
            questions: [
                {
                    id: 5,
                    statement: "The site for the Citicorp Center was purchased from St. Peter's Evangelical Church.",
                },
                {
                    id: 6,
                    statement: "The congregation approved Hugh Stubbins' design on the condition that they received a new building that was separate from the skyscraper.",
                },
                {
                    id: 7,
                    statement: "Citicorp hired LeMessurier to be the structural engineer of the project on Hugh Stubbins' recommendation.",
                },
                {
                    id: 8,
                    statement: "LeMessurier created a custom support structure for the building that used slanted beams to transfer weight away from the corners.",
                },
                {
                    id: 9,
                    statement: "The building's unique support structure caused it to be much lighter than others of similar height.",
                }
            ]
        },
        {
            questionType: "sentence-completion",
            questions: [
                {
                    id: 10,
                    sentence: "LeMessurier studied historical (10) _____ to determine how often a storm that could cause the building to collapse might occur.",
                    type: "sentence-completion"
                },
                {
                    id: 11,
                    sentence: "The solution they proposed was to reinforce weak joints by welding steel plates over them like (11) _____.",
                    type: "sentence-completion"
                },
                {
                    id: 12,
                    sentence: "The official explanation for the repair work was that it was an upgrade done as a (12) _____ to new meteorological data.",
                    type: "sentence-completion"
                },
                {
                    id: 13,
                    sentence: "After the repairs were completed, Citicorp agreed that LeMessurier Associates and (13) _____ would reimburse the company.",
                    type: "sentence-completion"
                }
            ]
        }
    ]
}

export const reading_section_2 = {
    reading_passage: {
        title: "Tsunami Stones",
        subtitle: "Monuments to oceans destructive power.",
        passage: `
    Throughout human history, settlements have been established in coastal areas. The reasons for this are quite simple: the land is relatively flat and easy to build on, the sea provides food through fishing and it provides easy transportation. However, building our settlements near the ocean also comes with inherent risks. When certain conditions are met, mountainous waves can rush inland and wash away people, homes and even entire cities. Where this kind of natural disaster is particularly common or dangerous, people have sometimes provided warnings to future generations by carving messages onto stones. In Japan, carved stones called 'tsunami stones' dot hillsides along the archipelago's coast, but people do not always heed their warnings.
    The islands of Japan lie at the convergent boundary between several tectonic plates, which make them prone to earthquakes and volcanic eruptions. When geological events such as these disturb the sea floor, they can generate massive waves called tsunamis that inundate the land. First, the water rapidly recedes from the beach as though the tide is going out very quickly, then the water returns with the full force of the ocean behind it. That is why tsunamis are sometimes referred to by the misleading term 'tidal waves.' Tsunami waves can be tens of metres high, which allows them to roll deep inland and endanger settlements far from the coast. They also tend to come in a series of waves that first flood the land and then retreat, dragging debris with them into the ocean only to bring it back on the next wave. This repeated action makes them extremely devastating and can strip away everything down to the bedrock.
    Japan has suffered through some of the most destructive and deadly tsunamis in history. When people survive these catastrophic events, they understandably want to prevent their descendants from enduring similar experiences, but people have short memories. According to Fumiko Imamura, a professor of disaster planning at Tohoku University, 'It takes about three generations for people to forget. Those that experience the disaster themselves pass it to their children and their grandchildren, but then the memory fades.' That is why some ancestors of modern Japanese people decided to carve tsunami stones. Hundreds of tsunami stones have been found around Japan, but the majority of them are concentrated in the northeastern coastal areas.
    The oldest existing stones were erected over 600 years ago, and some were later washed away by more powerful events. That, in itself, is a message as the stones range from one to three metres tall, and can weigh several tonnes. Each stone has an inscription, but some have been worn away over the centuries. Some of them function as monuments that provide death tolls and may even mark the victims' mass graves. Others advise people to seek higher ground after an earthquake, and a few have place names that carry clear messages. Namiwake means 'Wave's Edge' and it is located three miles from the coast marking the farthest reach of the 1611 tsunami. Nokoriya translates as 'Valley of Survivors' and it marks a location that has clearly provided a safe haven from the waves.
    One famous tsunami stone near the small village of Aneyoshi provides unusually clear instructions. The 1.5 metre slab of stone says, 'High dwellings are the peace and harmony of our descendants. Remember the calamity of the great tsunamis. Do not build any homes below this point.' This is the only stone that specifically tells people where to build their homes. Aneyoshi was struck by two tsunamis that nearly wiped out the village completely. The first was during the 1896 Sanriku earthquake, which killed at least 22,000 people across Japan and all but two of the villagers. The village was repopulated, and had moved back down toward the shore a few years later. Then, in 1933, another earthquake birthed a tsunami that only left four villagers alive. They moved farther uphill, and carved the stone to protect the following generations. Indeed, Aneyoshi survived tsunamis in 1960 and 2011 unscathed.
    After World War II, coastal towns and cities rapidly grew as people disregarded the warnings of the tsunami stones. For many people, the tsunami stones seemed like relics of the distant past written in archaic language that is difficult to read, so they were ignored. Residents put their faith in advanced technology to detect seismic events and warn them of approaching waves, and they built taller seawalls to protect them. Unfortunately, the 2011 Tohoku earthquake and tsunami were among the worst in Japanese history, and the waves easily swept over and shattered the sea walls. This disaster left 15,894 people dead, 6,156 injured and 2,546 missing. Some experts think that Japan needs a new version of the tsunami stones that is easier to understand. One suggestion is to preserve some of the ruined buildings from 2011 to provide permanent reminders of the destructive force of the waves.
    `
    },
    questions: [
        {
            questionType: "yes-no-notgiven",
            questions: [
                {
                    id: 14,
                    statement: "The architect’s original idea included building a new church on a different site.",
                },
                {
                    id: 15,
                    statement: "Some engineers disagreed with LeMessurier’s bracing design.",
                },
                {
                    id: 16,
                    statement: "LeMessurier believed the building could collapse in certain wind conditions.",
                },
                {
                    id: 17,
                    statement: "The modifications were carried out only during the day to avoid public attention.",
                },
                {
                    id: 18,
                    statement: "Citicorp publicly acknowledged the flaw after repairs were completed.",
                }
            ]
        },
        {
            questionType: "match-headings",
            question: {
                headings: [
                    { number: "i", text: "The price of forgetting" },
                    { number: "ii", text: "Old problems with modern solutions" },
                    { number: "iii", text: "A case in point" },
                    { number: "iv", text: "Biggest of waves" },
                    { number: "v", text: "Convenience leads to catastrophe" },
                    { number: "vi", text: "Tragedy comes twice" },
                    { number: "vii", text: "Historic destruction" },
                    { number: "viii", text: "Mechanism of tsunamis" },
                ],
                id: [19, 20, 21, 22, 23],
            },
        },
        {
            questionType: "summary-completion",
            question: {
                id: [24, 25, 26, 27],
                title: "Messages from the Past",
                passageTemplate: `
      There are many tsunami stones spread across Japan, but one of the most <23> is located near the small village of Aneyoshi.
      While many stones act as monuments that provide warnings through death tolls, this one specifically tells people not to <24>
      their homes below it. The village was struck by two tsunamis in 1896 and 1933. After the second disaster, the villagers <25>
      their stone. Unfortunately, many people <26> the stones after World War II, and they relied on advanced technology and taller
      seawalls to protect them. The Tohoku tsunami in 2011 swept over and shattered the seawalls and claimed thousands of lives.
    `,
            },
        }
    ]
}

export const reading_section_3 = {
    reading_passage: {
        title: "Tipping Point",
        subtitle: "Even Amaricans are getting tired of tipping.",
        passage: `
    The practice of giving additional money to servers at restaurants and in other service jobs is called tipping. Originating in Europe, tipping has a long history in western culture, although it is most strongly associated with the United States. Many visitors to the US find tipping to be very confusing and the most stress-inducing part of their trips. Although tipping culture has reached its most extreme form in the US, there is a growing opposition to tipping even there. This reversal is the result of many factors, and people may have reached a tipping point regarding this custom.
    The practice of tipping dates back to Tudor England (1485 - 1603), when it consisted of a master rewarding a servant with extra money for having performed their tasks exceptionally well. By the 17th century, the burden had shifted to guests who spent the night at private homes. They were expected to give gifts of money, which were referred to as vials, to their host's servants. The custom soon spread to coffeehouses and other public establishments. The etymology of the term 'tip' is not well understood, except that it began as a slang word that may have originated from thieves cant - the special vocabulary used by criminals. The earliest known use of the word as a noun was around 1600, and it was first used as a verb in a play by George Farquhar in 1707.
    The concept of tipping was introduced to the US from Europe in the 1850s and 1860s by affluent Americans who had travelled through Europe and wanted to seem aristocratic. Tipping was initially met with a fierce backlash from many Americans who thought it was inconsistent with their democratic, egalitarian society. Tipping was based on the obligations of the nobility and acted to establish and reinforce inferior social status. Several states even passed laws that banned tipping, but enforcing them was difficult. Restaurant owners and other proprietors initially also opposed tipping. They viewed it as customers bribing staff for extra food and drink or special treatment. This opposition to tipping spread into Europe along with the rise of labour movements, and customary tipping was abolished in most countries in the region. However, after Prohibition was instituted in the US in 1919, restaurants and hotels could no longer sell alcoholic beverages, and their revenue fell. It was at this point that business owners began to embrace tipping as a way to supplement their employees' wages.
    Since then tipping has spread throughout the service industry to include bartenders, hair stylists, taxi drivers and food delivery drivers. Tipping culture became further entrenched in the restaurant industry in 1966 when Congress decided that workers who regularly receive a significant amount of tips could be paid much less than the federal minimum wage as long as the combined total was the same amount or more. Due to this fact, servers in many bars and restaurants rely on tips for the bulk of their income. Some restaurants instituted mandatory tipping by adding a 10 to 15% gratuity surcharge to receipts, particularly for large groups of customers. Thus, tipping culture became the status quo in the United States, with tips paid to individuals ranging from 5 to 20% of the actual charge for food or services depending on the location and the quality of service.
    However, tipping has expanded in scope over the last five years, which has led to increasing opposition amongst the public. Analysts say that the recent expansion of tipping is due to a combination of three factors: the gig economy, technology, and the job market. In the gig economy, people work freelance or on short contracts, which provides both the employee and the employer more freedom. This business model provided an abundance of delivery drivers, which led to a massive increase in home deliveries of prepared food, groceries and nearly every other product imaginable. This in turn led to people tipping for the delivery of items they would have purchased at stores before.
    The use of touch screens and tablets in stores and restaurants also grew during this time, along with a strong preference for credit cards over cash. On many of these devices, a tipping options menu automatically pops up during the payment process and conveniently offers tip options that can range up to 30%. The calculations presented are not always accurate, but many people still feel compelled to tip because the server is right there in front of them and other people are watching. The companies that created the software also get a percentage of each payment and tip, so there is great motivation to expand tipping as much as possible. Adding to that is the current job market, in which business owners have to compete for workers and offer them higher pay without raising prices. So, they offer them the potential for more tips.
    However, the expansion of tipping culture may lead to its demise. With the gig economy now well-established, and inflation continuing to increase, many customers want tipping to return to the way it was before or to go away altogether. According to a survey by Bankrate, two-thirds of customers currently have a negative view of tipping, and tips paid to restaurant servers have dropped by 10% over the last year. Many states have also mandated higher minimum wages than the US federal standard for all workers including servers. With employees receiving living wages, tipping may disappear from most industries, but that means employers will have to actually pay their employees more. That may mean fewer job openings and higher prices.
    `
    },
    questions: [
        {
            questionType: "matching-sentence-endings",
            question: {
                starting: [
                    { id: 28, text: "Tipping was originally met with hostility in the US" },
                    { id: 29, text: "Laws were created that made tipping illegal," },
                    { id: 30, text: "Congress passed legislation in 1966 that made it legal to" },
                    { id: 31, text: "Some restaurants force large groups of customers to" },
                    { id: 32, text: "The main benefit of the gig economy is that it" },
                ],
                endings: [
                    { letter: "A", text: "but they were not effective at discouraging the behaviour." },
                    { letter: "B", text: "make a server's entire salary consist of the tips they receive." },
                    { letter: "C", text: "pay tipped workers significantly less than the federal minimum wage." },
                    { letter: "D", text: "because it reminded people of being controlled by England." },
                    { letter: "E", text: "where people thought it was undemocratic and elitist." },
                    { letter: "F", text: "provide good tips by adding an additional surcharge to their bill." },
                    { letter: "G", text: "allows both the employer and the employee to have more freedom." },
                ],
            }
        },
        {
            questionType: "multiple-choice-many",
            questions: [
                {
                    id: [33, 34],
                    question: "In which TWO ways did technology contribute to the increase in tipping?",
                    selectedAnswers: [],
                    options: [
                        {
                            letter: "A",
                            text: "Touch screens use software made by companies that get a percentage of both payment and tip.",
                        },
                        {
                            letter: "B",
                            text: "People were forced to use credit cards because businesses would not accept cash.",
                        },
                        {
                            letter: "C",
                            text: "Tipping screens automatically add the tipping percentage the restaurant owner has chosen.",
                        },
                        {
                            letter: "D",
                            text: "Using technology allows customers to make perfect tip percentage calculations.",
                        },
                        {
                            letter: "E",
                            text: "The server and other customers can watch an individual choosing their tip option.",
                        },
                    ],
                },
                {
                    id: [35, 36],
                    question: "Which TWO factors are contributing to the decline of tipping?",
                    selectedAnswers: [],
                    options: [
                        {
                            letter: "A",
                            text: "Servers are not willing to work for pay that comes mostly from tips anymore.",
                        },
                        {
                            letter: "B",
                            text: "The majority of people have developed a negative view of tipping.",
                        },
                        {
                            letter: "C",
                            text: "The tipping rate for servers has increased by 10% over the last year.",
                        },
                        {
                            letter: "D",
                            text: "Several states have created their own minimum wages that are much higher than the federal minimum and include servers.",
                        },
                        {
                            letter: "E",
                            text: "Restaurant owners have been raising their prices to keep up with inflation.",
                        },
                    ],
                },
            ],
        },
        {
            questionType: "flow-chart-completion",
            question: {
                image_url:
                    "https://toeflbank-rest-api-production.s3.amazonaws.com/content/ielts/reading_group/image/Glaciers%20-%20Flowchart_ba6efbe499cc4bbe9defdc00e207a7a2.svg",
                id: [37, 38, 39, 40],
            },
        }
    ]
}