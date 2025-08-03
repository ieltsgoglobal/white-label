// https://www.youtube.com/watch?v=3Qjzsk9QGUg
export const listening_section_1 = {
    audio: "https://www.dropbox.com/scl/fi/97one38w02b1appi5nh96/part1.mp4?rlkey=1zlzv6klhg5vougn00ftnkx4l&st=2w5v4xbu&raw=1",
    questions: [
        {
            questionType: "form-completion",
            formData: {
                title: "",
                sections: [
                    {
                        title: "",
                        fields: [
                            {
                                label: "Customer's name:",
                                content: "(1) _______",
                                id: 1,
                            },
                            {
                                label: "Maximum class size:",
                                content: "(2) _______",
                                id: 2,
                            },
                            {
                                label: "Hours of study per day (weekdays):",
                                content: "(3) _______",
                                id: 3,
                            },
                            {
                                label: "Most expensive accommodation:",
                                content: "bed and (4) _______",
                                id: 4,
                            },
                            {
                                label: "First Berlin course begins:",
                                content: "(5) _______",
                                id: 5,
                            },
                        ],
                    },
                ],
            },
        },
        {
            questionType: "multiple-choice-many",
            questions: [
                {
                    id: [6, 7],
                    question: "Which TWO things does he need to buy for the course?",
                    options: [
                        "computer",
                        "computer disks",
                        "dictionary",
                        "translation exercises",
                        "textbooks"
                    ]
                }
            ]
        },
        {
            questionType: "sentence-completion",
            questions: [
                {
                    id: 8,
                    sentence: "Without the student discount, the course costs (8) _____ euros."
                },
                {
                    id: 9,
                    sentence: "Payment can be made by credit card or by (9) _____ transfer."
                },
                {
                    id: 10,
                    sentence: "To get a free course, you need to find (10) _____ other people."
                }
            ]
        }
    ],
}

export const listening_section_2 = {
    audio: "https://www.dropbox.com/scl/fi/ra5nbhgvn9ju03my7hc92/part2.mp4?rlkey=dl167v13mkp37iqfahydg451q&st=fy4qjwdn&raw=1",
    questions: [
        {
            questionType: "table-completion",
            tableData: {
                headers: ["Data", "Event", "Important for art"],
                rows: [
                    {
                        cells: [
                            { content: "3000 BC" },
                            { content: "rice farmers from (11)_______", id: 11 },
                            { content: "Built temples with wood and stone carving settled in Bali" }
                        ]
                    },
                    {
                        cells: [
                            { content: "14th century" },
                            { content: "introduction of Hinduism" },
                            { content: "artists employed by the (12)_______ and focused in epic narratives", id: 12 }
                        ]
                    },
                    {
                        cells: [
                            { content: "1906" },
                            { content: "Dutch East Indies Company established" },
                            { content: "art became expression of opposition to (13)_______", id: 13 }
                        ]
                    },
                    {
                        cells: [
                            { content: "1905" },
                            { content: "Beginning of (14)_______", id: 14 },
                            { content: "encouraged use of new materials,techniques and subjects" }
                        ]
                    },
                    {
                        cells: [
                            { content: "1945" },
                            { content: "independence" },
                            { content: "new art with scenes of (15)_______ (e.g. harvests) reflecting national identity", id: 15 }
                        ]
                    }
                ]
            }
        },
        {
            questionType: "note-completion",
            topic: "Characteristics of Balinese art today",
            sections: [
                {
                    title: "",
                    bulletPoints: [
                        {
                            id: 16,
                            text: "production or discussion of art does not require any (16) _______."
                        },
                        {
                            id: 17,
                            text: "able to develop because of the (17) _______ of the island."
                        },
                        {
                            id: 18,
                            text: "constantly practised because closely related to (18) _______."
                        },
                        {
                            id: 19,
                            text: "production of art is a (19) _______ process."
                        },
                        {
                            id: 20,
                            text: "art is not expected to be (20) _______."
                        }
                    ]
                }
            ]
        }
    ]
}

export const listening_section_3 = {
    audio: "https://www.dropbox.com/scl/fi/i65lulp04ij34wqcws929/part3.mp4?rlkey=1iczxmcxch20xtxbr8yj9j836&st=6ui6jzbp&raw=1",
    questions: [
        {
            questionType: "multiple-choice-many",
            questions: [
                {
                    id: [21, 22],
                    question: "What TWO suggestions does Gloria give to Paul?",
                    options: [
                        "talk with past graduates",
                        "choose from Science, maths or English",
                        "study subjects that he naturally likes",
                        "consult the university handbook",
                        "go to the office of Academic Affairs"
                    ]
                }
            ]
        },
        {
            questionType: "table-completion",
            tableData: {
                headers: ["Title", "Author", "Year Published", "Publisher"],
                rows: [
                    {
                        cells: [
                            { content: "What should I do?" },
                            { content: "Smith, P" },
                            { content: "2000" },
                            { content: "(23)_______", id: 23 }
                        ]
                    },
                    {
                        cells: [
                            { content: "Choosing (24)_______", id: 24 },
                            { content: "Newton, J" },
                            { content: "2000" },
                            { content: "Printers (25)_______", id: 25 }
                        ]
                    },
                    {
                        cells: [
                            { content: "(26)_______", id: 26 },
                            { content: "White, I" },
                            { content: "(27)_______", id: 27 },
                            { content: "Brown and Tate" }
                        ]
                    }
                ]
            }
        },
        {
            questionType: "multiple-choice-many",
            questions: [
                {
                    id: [28, 29, 30],
                    question: "Which THREE points helped Gloria to choose her course?",
                    options: [
                        "she spoke with her parents",
                        "she talked with friends",
                        "she looked at jobs that were available",
                        "she researched typical working hours",
                        "she liked mathematics",
                        "she liked working with people"
                    ]
                }
            ]
        }
    ]
}

export const listening_section_4 = {
    audio: "https://www.dropbox.com/scl/fi/r2g8ihm2im6lc3eixqalb/part4.mp4?rlkey=4i757pj5w0vy9zoahcaf4qoat&st=j6g7noua&raw=1",
    questions: [
        {
            questionType: "table-completion",
            tableData: {
                headers: ["", "New Features", "Size", "Problems"],
                rows: [
                    {
                        cells: [
                            { content: "transport" },
                            { content: "individual transportation" },
                            { content: "Roads will be narrower" },
                            { content: "levels of investment" }
                        ]
                    },
                    {
                        cells: [
                            { content: "Commercial areas" },
                            { content: "roofs will have (31)_______", id: 31 },
                            { content: "(32)_______ of current area", id: 32 },
                            { content: "(33)_______ will be limited to outskirts", id: 33 }
                        ]
                    },
                    {
                        cells: [
                            { content: "residential areas" },
                            { content: "home made of (34)_______", id: 34 },
                            { content: "will be limited to 15,000" },
                            { content: "providing enough housing for (35)_______", id: 35 }
                        ]
                    },
                    {
                        cells: [
                            { content: "energy sources" },
                            { content: "(36)_______ will be an energy source", id: 36 },
                            { content: "energy plants will be smaller" },
                            { content: "Noise and congestion caused by (37)_______", id: 37 }
                        ]
                    }
                ]
            }
        },
        {
            questionType: "short-answer",
            topic: "Which three types of accommodation does the speaker say will increase in city centres?",
            questions: [
                {
                    id: 38,
                    sentence: "(38) _______"
                },
                {
                    id: 39,
                    sentence: "(39) _______"
                },
                {
                    id: 40,
                    sentence: "(40) _______"
                }
            ]
        }
    ],
}


// https://practicepteonline.com/ielts-reading-test-272/
export const reading_section_1 = {
    reading_passage: {
        title: "Longaeva: Ancient Bristlecone Pine",
        subtitle: "",
        passage: `
To understand more about the earth’s history, humans have often looked to the natural environment for insight into the past. The bristlecone pine (Pinus longaeva), of the White Mountains in California, has served this purpose greater than any other species of tree on the planet. Conditions here are brutal: scant precipitation and low average temperatures mean a short growing season, only intensified by ferocious wind and mal-nutritious rocky. Nevertheless, bristlecone pines have claimed these barren slopes as their permanent home. Evolving here in this harsh environment, super-adapted and without much competition, bristlecones have earned their seat on the longevity throne by becoming the oldest living trees on the planet. Results of extensive studies on bristlecone pine stands have shown that in fact such, environmental limitations are positively associated with the attainment of great age. This intriguing phenomenon will be discussed further on.
But exactly how old is old? Sprouted before the invention of Egyptian hieroglyphs and long before the teachings of Jesus of Nazareth, Methuselah is the oldest bristlecone alive at roughly 4,700 years. Although specimens of this age do not represent the species’ average, there are 200 trees more than 3,000 years old, and two dozen more than 4,000. Considering that these high ages are obtained in the face of such remarkable environmental adversity, the bristlecone pines have become the focus of much scientific examination over the past half-century.
Perhaps most interested in the bristlecone pine are dendrochronologists or tree-ring daters. With every strenuous year that passes in the While Mountains, each bristlecone grows and forms a new outer layer of cambium that reflects a season’s particular ease or hardship. So while growing seasons may expand or shrink, the trees carry on, their growth rings faithfully recording the bad years alongside the goods. Through examining the annual growth rings of both living and dead specimens, taking thousands of core samples, and by processes of cross-dating between trees and other qualitative records, scientists have compiled a continuous tree-ring record that dates back to the last Ice Age between eight and ten thousand years ago. Among other linked accomplishments, this record has enhanced the dating process, helping to double-check and correct the radiocarbon-14 method to more accurately estimate the age of organic material.
Now more than ever the importance of monitoring the bristlecone is being realized. As our global climate continues to undergo its most recent and abrupt atmospheric change, these ancient scribes continue to respond. Since, the rings of wood formed each year reveal the trees’ response to climatic conditions during a particular growing season, in their persistence they have left us natural recordings of the past, markers of the present, and clues to the future.
The species’ name originates from the appearance of its unusual cones and needles. The bristlecone’s short, pale needles are also trademarks, bunching together to form foxtail-like bundles. As is the case of most conifer needles, these specialized leaves cluster together to shelter the stomata so very little moisture is lost through them. This adaptation helps the bristlecone photosynthesize during particularly brutal months. Saving the energy of constant needle replacement and providing a stable supply of chlorophyll. For a plant trying to store so much energy, bristlecone seeds are relatively large in size. They are first reproduced when trees reach ages between thirty and seventy-five years old. Germination rates are generally high, in part because seeds require little to no initial stratification. Perhaps the most intriguing physical characteristic of a mature bristlecone, however, is its ratio of living to deadwood on harsh sites and how this relates to old age. In older trees, however, especially in individuals over 1,500 years, a strip-bark trait is adaptive. This condition occurs as a result of cambium dieback, which erodes and thereby exposes certain areas of the bole, leaving only narrow bands of bark intact.
The technique of cambial edge retreat has helped promote old age in bristlecone pine, but that certainly is no the only reason. Most crucial to these trees’ longevity is their compact size and slow rates of growth. By remaining in most cases under ten meters tall, bristlecones stay close to the limited water supply and can hence support more branches and photosynthesizing. Combined with the dry, windy, and often freezing mountain air, slow growth guarantees the bristlecones tight, fibrous rings with a high resin content and structural strength. The absence of natural disaster has also safeguarded the bristlecone’s lengthy lifespan. Due to a lack of ground cover vegetation and an evenly spaced layout, bristlecone stands on the White Mountain peaks have been practically unaffected by the fire. This lack of vegetation also means a lack of competition for the bristlecones.
Bristlecone pines restricted to numerous, rather isolated stands at higher altitudes in the southwestern United States. Stands occur from the Rocky Mountains, through the Colorado Plateau, to the western margin of the Great Basin. Within this natural range, the oldest and most widely researched stands of bristlecones occur in California’s the White Mountains. Even just 200 miles away from the Pacific Ocean, the White Mountains are home to one of this country’s few high-elevation deserts. Located in the extreme eastern rain shadow of the Sierra Nevada, this region receives only 12.54 inches of precipitation per year and experiences temperatures between -20F and +50F. The peaks south of the Owens Valley, are higher up than they might appear from a distance. Although most summits exist somewhere around 11,000 feet, snow-capped White Mountain Peak, for which the range is named, stands at 14,246 feet above sea level. That said, to reach areas of a pure bristlecone is an intense journey all to itself.
With seemingly endless areas of wonder and interest, the bristlecone pines have become subject to much research over the past half-century. Since the annual growth of these ancient organisms directly reflects the climatic conditions of a particular time period, bristlecones are of greatest significance to dendrochronologists or tree-ring specialists. Dating any tree is simple and can be done within reasonable accuracy just by counting out the rings made each year by the plant’s natural means of growth. By carefully compiling a nearly 10,000-year-old bristlecone pine record, these patient scientists have accurately corrected the carbon-14 dating method and estimated ages of past periods of global climate change. What makes this record so special to dendrochronologists, too, is that, nowhere, throughout time, is precisely the same long-term sequence of wide and narrow rings repeated, because year-to-year variations in climate are never exactly the same.
Historically the bristlecone’s remote location and gnarled wood have deterred commercial extraction, but nothing on earth will go unaffected by global warming. If temperatures rise by only 6 degrees F, which many experts say is likely this century, about two-thirds of the bristlecones’ ideal habitat in the White Mountains effectively will be gone. Almost 30,000 acres of National Forest now preserves the ancient bristlecone, but paved roads, campsites, and self-guided trails have led only to more human impact. In 1966, the U.S.F.S reported over 20,000 visitors to the Ancient Bristlecone Pine Forest, a figure which could exceed 40,000 today. Over the past hundreds of thousands of years, this species has endured in one of the earth’s most trying environments; they deserve our respect and reverence. As global climate change slowly alters their environment, we as humans must do our part to raise awareness and lower our impact.
        `
    },
    questions: [
        {
            questionType: "match-paragraph-information",
            question: {
                information: [
                    { id: 1, text: "Human activity threats bristlecone pines habitat" },
                    { id: 2, text: "Explanations for a ring of bristlecone pines" },
                    { id: 3, text: "An accountable recording provided from the past until now" },
                    { id: 4, text: "Survived in a hostile environment" }
                ],
                letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
            }
        },
        {
            questionType: "multiple-choice-single",
            questions: [
                {
                    id: 5,
                    question: "According to passage A, what aspect of bristlecone pines attracts author’s attention?",
                    options: [
                        "Brutal environment they live",
                        "Remarkable long age",
                        "They only live in California",
                        "Outstanding height"
                    ]
                },
                {
                    id: 6,
                    question: "Why do we investigate Bristlecone pines in higher altitudes of California’s the White Mountains?",
                    options: [
                        "Because of the oldest ones researched in this region",
                        "Because most bizarre ones are in this region",
                        "Because precipitation is rich in this region",
                        "Because sea level is comparatively high in this region"
                    ]
                },
                {
                    id: 7,
                    question: "Why there are repeated patterns of wide and narrow rings?",
                    options: [
                        "Because sea level rises which affect tree ring",
                        "Because tree ring pattern is completely random",
                        "Because ancient organisms affect their growth",
                        "Because the variation of climate change is different"
                    ]
                }
            ]
        },
        {
            questionType: "summary-completion",
            question: {
                id: [8, 9, 10, 11, 12, 13],
                title: "",
                passageTemplate: `
The bristlecone’s special adaptation is a benefit for photosynthesizing, and reserving the <8> of leave replacement and providing sufficient chlorophyll. Probably because seeds do not rely on primary <9>, Germination rate is high. Because of cambium dieback, only narrow <10> remain complete. Due to multiple factors such as windy, cold climate and <11>, bristlecones’ rings have a tight and solid structure full of resin. Moreover, bristlecone stands are safe from the fire because of little <12> plants spread in this place. The summits of Owens Valley is higher than they emerge if you observe from a <13>.
                `
            }
        }
    ]
}

export const reading_section_2 = {
    reading_passage: {
        title: "The Beginning of Football",
        subtitle: "",
        passage: `
Football as we now know it developed in Britain in the 19th century, but the game is far older than this. In fact, the term has historically been applied to games played on foot, as opposed to those played on horseback, so ‘football’ hasn’t always involved kicking a ball. It has generally been played by men, though at the end of the 17th century, games were played between married and single women in a town in Scotland. The married women regularly won.
The very earliest form of football for which we have evidence is the ‘tsu’chu’, which was played in China and may date back 3,000 years. It was performed in front of the Emperor during festivities to mark his birthday. It involved kicking a leather ball through a 30-40 cm opening into a small net fixed onto long bamboo canes – a feat that demanded great skill and excellent technique.
Another form of the game, also originating from the Far East, was the Japanese ‘kemari’ which dates from about the fifth century and is still played today. This is a type of circular football game, a more dignified and ceremonious experience requiring certain skills, but not competitive in the way the Chinese game was, nor is there the slightest sign of struggle for possession of the ball. The players had to pass the ball to each other, in a relatively small space, trying not to let it touch the ground.
The Romans had a much livelier game, ‘harpastum’. Each team member had his own specific tactical assignment took a noisy interest in the proceedings and the score. The role of the feet was so small as scarcely to be of consequence. The game remained popular for 700 or 800 years, but, although it was taken to England, it is doubtful whether it can be considered as a forerunner of contemporary football.
The game that flourished in Britain from the 8th to the 19th centuries was substantially different from all the previously known forms – more disorganised, more violent, more spontaneous and usually played by an indefinite number of players. Frequently, the games took the form of a heated contest between whole villages. Kicking opponents were allowed, as in fact was almost everything else.
There was tremendous enthusiasm for football, even though the authorities repeatedly intervened to restrict it, as a public nuisance. In the 14th and 15th centuries, England, Scotland and France all made football punishable by law, because of the disorder that commonly accompanied it, or because the well-loved recreation prevented subjects from practicing more useful military disciplines. None of these efforts had much effect.
The English passion for football was particularly strong in the 16th century, influenced by the popularity of the rather better organised Italian game of ‘calcio’. English football was as rough as ever, but it found a prominent supporter in the school headmaster Richard Mulcaster. He pointed out that it had positive educational value and promoted health and strength. Mulcaster claimed that all that was needed was to refine it a little, limit the number of participants in each team and, more importantly, have a referee to oversee the game.
The game persisted in a disorganised form until the early 19th century, when a number of influential English schools developed their own adaptations. In some, including Rugby School, the ball could be touched with the hands or carried; opponents could be tripped up and even kicked. It was recognised in educational circles that, as a team game, football helped to develop such fine qualities as loyalty, selflessness, cooperation, subordination and deference to the team spirit. A ‘games cult’ developed in schools and some form of football became an obligatory part of the curriculum.
In 1863, developments reached a climax. At Cambridge University, an initiative began to establish some uniform standards and rules that would be accepted by everyone, but there were essentially two camps: the minority – Rugby School and some others – wished to continue with their own form of the game, in particular allowing players to carry the ball. In October of the same year, eleven London clubs and schools sent representatives to establish a set of fundamental rules to govern the matches played amongst them. This meeting marked the birth of the Football Association.
The dispute concerning kicking and tripping opponents and carrying the ball was discussed thoroughly at this and subsequent meetings, until eventually, on 8 December, the die-hard exponents of the Rugby style withdrew, marking a final split between rugby and football. Within eight years, the Football Association already had 50 member clubs, and the first football competition in the world was started – the FA Cup.
        `
    },
    questions: [
        {
            questionType: "match-headings",
            question: {
                headings: [
                    { number: "i", text: "Limited success in suppressing the game" },
                    { number: "ii", text: "Opposition to the role of football in schools" },
                    { number: "iii", text: "A way of developing moral values" },
                    { number: "iv", text: "Football matches between countries" },
                    { number: "v", text: "A game that has survived" },
                    { number: "vi", text: "Separation into two sports" },
                    { number: "vii", text: "Proposals for minor improvements" },
                    { number: "viii", text: "Attempts to standardize the game" },
                    { number: "ix", text: "Probably not an early version of football" }
                ],
                id: [14, 15, 16, 17, 18, 19, 20]
            }
        },
        {
            questionType: "matching-sentence-endings",
            question: {
                starting: [
                    { id: 21, text: "Tsu’chu" },
                    { id: 22, text: "Kemari" },
                    { id: 23, text: "Harpastum" },
                    { id: 24, text: "From the 8th centuries, football in the British Isles" },
                    { id: 25, text: "In the past, the authorities legitimately despised the football and acted on the belief that football." },
                    { id: 26, text: "When it was accepted in academic settings, football." }
                ],
                endings: [
                    { letter: "A", text: "was seen as something to be encouraged in the young." },
                    { letter: "B", text: "involved individual players having different responsibilities." },
                    { letter: "C", text: "was influenced by a game from another country." },
                    { letter: "D", text: "was a cooperative effort by all the players." },
                    { letter: "E", text: "distracted people from more important activities." },
                    { letter: "F", text: "was played by teams of a fixed size." },
                    { letter: "G", text: "was less popular than it later became." },
                    { letter: "H", text: "was often played by one community against another." },
                    { letter: "I", text: "formed part of a celebration." }
                ]
            }
        }
    ]
}

export const reading_section_3 = {
    reading_passage: {
        title: "Art in Iron and Steel",
        subtitle: "",
        passage: `
Works of engineering and technology are sometimes viewed as the antitheses of art and humanity. Think of the connotations of assembly lines, robots, and computers. Any positive values there might be in such creations of the mind and human industry can be overwhelmed by the associated negative images of repetitive, stressful, and threatened jobs. Such images fuel the arguments of critics of technology even as they may drive powerful cars and use the Internet to protest what they see as the artless and dehumanizing aspects of living in an industrialized and digitized society. At the same time, landmark megastructures such as the Brooklyn and Golden Gate bridges are almost universally hailed as majestic human achievements as well as great engineering monuments that have come to embody the spirits of their respective cities. The relationship between art and engineering has seldom been easy or consistent.
The human worker may have appeared to be but a cog in the wheel of industry, yet photographers could reveal the beauty of line and composition in a worker doing something as common as using a wrench to turn a bolt. When Henry Ford’s enormous River Rouge plant opened in 1927 to produce the Model A, the painter/photographer Charles Sheeler was chosen to photograph it. The world’s largest car factory captured the imagination of Sheeler, who described it as the most thrilling subject he ever had to work with. The artist also composed oil paintings of the plant, giving them titles such as American Landscape and Classic Landscape.
Long before Sheeler, other artists, too, had seen the beauty and humanity in works of engineering and technology. This is perhaps no more evident than in Coalbrookdale, England, where iron, which was so important to the industrial revolution, was worked for centuries. Here, in the late eighteenth century, Abraham Darby III cast on the banks of the Severn River the large ribs that formed the world’s first iron bridge, a dramatic departure from the classic stone and timber bridges that dotted the countryside and were captured in numerous serene landscape paintings. The metal structure, simply but appropriately called Iron Bridge, still spans the river and still beckons engineers, artists, and tourists to gaze upon and walk across it, as if on a pilgrimage to a revered place.
At Coalbrookdale, the reflection of the ironwork in the water completes the semicircular structure to form a wide-open eye into the future that is now the past. One artist’s bucolic depiction shows pedestrians and horsemen on the bridge, as if on a woodland trail. On one shore, a pair of well-dressed onlookers interrupts their stroll along the riverbank, perhaps to admire the bridge. On the other side of the gently flowing river, a lone man leads two mules beneath an arch that lets the towpath pass through the bridge’s abutment. A single boatman paddles across the river in a tiny tub boat. He is in no rush because there is no towline to carry from one side of the bridge to the other. This is how Michael Rooker was Iron Bridge in his 1792 painting. A colored engraving of the scene hangs in the nearby Coalbrookdale museum, along with countless other contemporary renderings of the bridge in its full glory and in its context, showing the iron structure not as a blight on the landscape but at the center of it. The surrounding area at the same time radiates out from the bridge and pales behind it.
In the nineteenth century, the railroads captured the imagination of artists, and the steam engine in the distance of a landscape became as much a part of it as the herd of cows in the foreground. The Impressionist Claude Monet painted man-made structures like railway stations and cathedrals as well as water lilies. Portrait painters such as Christian Schussele found subjects in engineers and inventors – and their inventions – as well as in the American founding fathers. By the twentieth century, engineering, technology, and industry were very well established as subjects for artists.
American-born Joseph Pennell illustrated many European travel articles and books. Pennell, who early in his career made drawings of buildings under construction and shrouded in scaffolding, returned to America late in life and recorded industrial activities during World War I. He is perhaps best known among engineers for his depiction of the Panama Canal as it neared completion and his etchings of the partially completed Hell Gate and Delaware River bridges.
Pennell has often been quoted as saying, “Great engineering is great art,” a sentiment that he expressed repeatedly. He wrote of his contemporaries, “I understand nothing of engineering, but I know that engineers are the greatest architects and the most pictorial builders since the Greeks.” Where some observers saw only utility, Pennell saw also beauty, if not in form then at least in scale. He felt he was not only rendering a concrete subject but also conveying through his drawings the impression that it made on him. Pennell called the sensation that he felt before a great construction project ‘The Wonder of Work”. He saw engineering as a process. That process is memorialized in every completed dam, skyscraper, bridge, or other great achievement of engineering.
If Pennell experienced the wonder of work in the aggregate, Lewis Hine focused on the individuals who engaged in the work. Hine was trained as a sociologist but became best known as a photographer who exposed the exploitation of children. His early work documented immigrants passing through Ellis Island, along with the conditions in the New York tenements where they lived and the sweatshops where they worked. Upon returning to New York, he was given the opportunity to record the construction of the Empire State Building, which resulted in the striking photographs that have become such familiar images of daring and insouciance. He put his own life at risk to capture workers suspended on cables hundreds of feet in the air and sitting on a high girder eating lunch. To engineers today, one of the most striking features of these photos, published in 1932 in Men at Work, is the absence of safety lines and hard hats. However, perhaps more than anything, the photos evoke Pennell’s “The Wonder of Work” and inspire admiration for the bravery and skill that bring a great engineering project to completion.
        `
    },
    questions: [
        {
            questionType: "match-paragraph-information",
            question: {
                information: [
                    { id: 27, text: "Art connected with architecture for the first time." },
                    { id: 28, text: "Small artistic object and constructions built are put together" },
                    { id: 29, text: "The working condition were recorded by the artist as an exciting subject." },
                    { id: 30, text: "Mention of one engineers’ artistic work on an unfinished engineering project" },
                    { id: 31, text: "Two examples of famous bridges which became the iconic symbols of those cities" }
                ],
                letters: ["A", "B", "C", "D", "E", "F", "G", "H"]
            }
        },
        {
            questionType: "matching-features",
            question: {
                question_statement: "Use the information in the passage to match the people (listed A-F) with opinions or deeds below.",
                statements_title: "People and their opinions or deeds",
                statements: [
                    { id: 32, text: "who made a comment that concrete constructions have a beauty just as artistic processes created by engineers the architects" },
                    { id: 33, text: "who made a romantic depiction of an old bridge in one painting" },
                    { id: 34, text: "who produced art pieces demonstrating the courage of workers in the site" },
                    { id: 35, text: "who produced portraits involving subjects in engineers and inventions and historical human heroes" },
                    { id: 36, text: "who produced a painting of factories and named them ambitiously" }
                ],
                features_title: "List of people",
                features: [
                    { letter: "A", description: "Charles Sheeler" },
                    { letter: "B", description: "Michael Rooker" },
                    { letter: "C", description: "Claude Monet" },
                    { letter: "D", description: "Christian Schussele" },
                    { letter: "E", description: "Joseph Pennell" },
                    { letter: "F", description: "Lewis Hine" }
                ]
            }
        },
        {
            questionType: "summary-completion",
            question: {
                id: [37, 38, 39, 40],
                title: "Iron bridge Coalbrookdale, England",
                passageTemplate: `
In the late eighteenth century, as artists began to capture the artistic attractiveness incorporated into architecture via engineering and technology were captured in numerous serene landscape paintings. One good example, the engineer called <37> had designed the first iron bridge in the world and changed to using irons yet earlier bridges in the countryside were constructed using materials such as <38> and wood. This first Iron bridge which across the <39> was much significant in the industrial revolution period and it functioned for centuries. Numerous spectacular paintings and sculpture of Iron Bridge are collected and exhibited locally in <40>, showing the iron structure as a theme on the landscape.
    `
            }
        }
    ]
}


// https://practicepteonline.com/ielts-writing-test-104/
export const writingTasks = [
    {
        id: 1,
        timeLimit: "You should spend about 20 minutes on this task.",
        wordLimit: "Write at least 150 words.",
        prompt: [
            "The plans below show a public park when it first opened in 1920 and the same park today.",
            "Summarise the information by selecting and reporting the main features, and make comparisons where relevant."
        ],
        image_url: "https://www.dropbox.com/scl/fi/24az13wfeq2pa1g9olk57/test9-task1.png?rlkey=3pm9iwppem51ewo2ww3zy9yse&st=pthkcjtj&raw=1"
    },
    {
        id: 2,
        timeLimit: "You should spend about 40 minutes on this task.",
        wordLimit: "Write at least 250 words.",
        prompt: [
            "Nowadays many people choose to be self-employed, rather than to work for a company or organisation.",
            "Why might this be the case? What could be the disadvantages of being self-employed?"
        ],
    }
]


// CHATGPT GENERATED
export const speaking_transcripts = [
    {
        part: 1,
        questions: [
            { id: 1, transcript: "Now, in this part of the test, I will ask you some questions about yourself. After each question, there will be a beep sound. You will have 20 seconds to speak after the beep. So, What do you usually do on weekends?", audioUrl: "https://www.dropbox.com/scl/fi/0pojo1dvaoei0doifa6y9/part1_q1.mp3?rlkey=a1b4yn8xlusb93e56lf0fzj6w&st=x8l7t0tr&raw=1" },
            { id: 2, transcript: "Do you prefer to spend your weekends indoors or outdoors?", audioUrl: "https://www.dropbox.com/scl/fi/w66y8wfwjmuj1qa2sqpbk/part1_q2.mp3?rlkey=wxdqp2erpw45m2v07sbpgksnh&st=uz08g1vs&raw=1" },
            { id: 3, transcript: "Have your weekend activities changed since you were younger?", audioUrl: "https://www.dropbox.com/scl/fi/0nk2x999scnuttt0k2na5/part1_q3.mp3?rlkey=nkdwmixh99kfc00aoy1ai19yg&st=zq45vw65&raw=1" },
            { id: 4, transcript: "Is there a weekend you remember particularly well? Why?", audioUrl: "https://www.dropbox.com/scl/fi/yyk3hovnb6nw6urra8rh0/part1_q4.mp3?rlkey=mh3bkiw9rtslecx52umix2s7k&st=tydnpmpm&raw=1" },

            { id: 5, transcript: "I’d like to move on and ask you some questions about technology. How often do you use a computer?", audioUrl: "https://www.dropbox.com/scl/fi/syrwuvpmhk70ye1qj66m2/part1_q5.mp3?rlkey=ps0qyus5oxgobpsvocfmafyel&st=c0y3whgo&raw=1" },
            { id: 6, transcript: "What do you usually use your phone or computer for?", audioUrl: "https://www.dropbox.com/scl/fi/6q82e22s9g5movry87v70/part1_q6.mp3?rlkey=u9ojsulk7cx241jux86n8mtba&st=o9780l2e&raw=1" },
            { id: 7, transcript: "Do you think people spend too much time on their devices? Why?", audioUrl: "https://www.dropbox.com/scl/fi/0szr1eycr2nr2zmncwzcx/part1_q7.mp3?rlkey=43x8ik43zl4l3mdytxtwsc9fw&st=t4u2c7z1&raw=1" },
            { id: 8, transcript: "How has technology affected the way you study or work?", audioUrl: "https://www.dropbox.com/scl/fi/dkdpz5zy9erskl7eumb4s/part1_q8.mp3?rlkey=z5zjhw0hb1j0f0s92csr5l7rg&st=xrx6rxqb&raw=1" }
        ]
    },
    {
        part: 2,
        questions: [
            {
                id: 9,
                transcript: "Describe a time when you learned something new.",
                audioUrl: "https://www.dropbox.com/scl/fi/toux34arsy23gi9x1kajm/part2.mp3?rlkey=8udzpiivailb4vsq2452m4q5s&st=hxnnyiwa&raw=1"
            }
        ]
    },
    {
        part: 3,
        questions: [
            { id: 10, transcript: "You’ve just spoken about a time you learned something new. Let’s talk more about learning. Do you think learning should stop after school?", audioUrl: "https://www.dropbox.com/scl/fi/vmcx5892vyq0qdlbld3vu/part3_q1.mp3?rlkey=ygpejqqxuwgxl72fj3akslyyn&st=trohdiyk&raw=1" },
            { id: 11, transcript: "What are the advantages of learning in a classroom compared to learning online?", audioUrl: "https://www.dropbox.com/scl/fi/r3stmyty3kqpya5rylbho/part3_q2.mp3?rlkey=2jz4nt06hp4ny7lt7pd2eso83&st=pqri87fx&raw=1" },

            { id: 12, transcript: "Should adults continue to learn new skills throughout their lives?", audioUrl: "https://www.dropbox.com/scl/fi/3k27sklb48inpfdzkj0qh/part3_q3.mp3?rlkey=15eftpnw7i2u8o0otvv6gx3d2&st=7vumm73m&raw=1" },
            { id: 13, transcript: "What role does curiosity play in learning?", audioUrl: "https://www.dropbox.com/scl/fi/8i8xsb3vytu9ftm7jrsut/part3_q4.mp3?rlkey=tygkje2laqtgi7xjnho1h1xs0&st=2ezjq3is&raw=1" }
        ]
    }
]


export const reading_answers = {
    1: "A",
    2: "C",
    3: "D",
    4: "A",
    5: "B",
    6: "A",
    7: "D",
    8: "Energy",
    9: "Stratification",
    10: "Bark",
    11: "Air",
    12: "Ground cover",
    13: "Distance",
    14: "ix",
    15: "x",
    16: "i",
    17: "vii",
    18: "iii",
    19: "viii",
    20: "vi",
    21: "I",
    22: "D",
    23: "B",
    24: "H",
    25: "E",
    26: "A",
    27: "C",
    28: "E",
    29: "B",
    30: "F",
    31: "A",
    32: "E",
    33: "B",
    34: "F",
    35: "D",
    36: "A",
    37: "Abraham Darby III",
    38: "Stone",
    39: "River",
    40: "Coalbrookdale Museum"
};

export const listening_answers = {
    1: "John Pettersson",
    2: "12/twelve",
    3: "5/five",
    4: "breakfast",
    5: "8th june/8 june",

    6: "C",
    7: "E",
    8: "550",
    9: "bank",
    10: "5/five",

    11: "China",
    12: "ruling families",
    13: "colonisation",
    14: "tourism",
    15: "everyday life",
    16: "formal training",
    17: "rich soil",
    18: "the religion",
    19: "group",
    20: "permanent",

    21: "C",
    22: "D",
    23: "Smith brothers",
    24: "University courses",
    25: "Ltd or Limited",
    26: "Surviving University",
    27: "2004",

    28: "B",
    29: "E",
    30: "F",

    31: "gardens",
    32: "one fifth",
    33: "superstores",
    34: "glass",
    35: "older residents",
    36: "waste",
    37: "wind farms",
    38: "co-operative/cooperative",
    39: "retirement homes",
    40: "social housing"
};