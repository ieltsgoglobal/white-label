// https://www.youtube.com/watch?v=G0FKOc_Cj1w&list=PLYW3qEH4LjXl9L4oKexUZz_XFlvukIAm6&index=8
export const listening_section_1 = {
    audio: "https://www.dropbox.com/scl/fi/jz88r5oy8fx8t1212l4w0/part1.mp4?rlkey=e3xyohpzoujvdenzjxfgaoeal&st=j4arztuk&raw=1",
    questions: [
        {
            questionType: "summary-completion",
            question: {
                id: [1, 2, 3, 4, 5],
                title: "Electric Motorcycle Specifications",
                passageTemplate: `
Model Number: <1>

The motorcycle should travel <2> Km, provided that the battery is charged for <3> hours when the gauge falls below <4> volts. The battery weights <5> kg, so care needed when removing it for charging.
    `
            }
        },
        {
            questionType: "form-completion",
            formData: {
                title: "Complaint Form",
                address: "",
                sections: [
                    {
                        title: "Complaint From",
                        fields: [
                            {
                                label: "Name:",
                                content: "Jessie (6) _______",
                                id: 6,
                            },
                            {
                                label: "Type of Complaint:",
                                content: "(7) _______",
                                id: 7,
                            },
                            {
                                label: "Address:",
                                content: "No. 45 (8) _______",
                                id: 8,
                            },
                            {
                                label: "Phone No.:",
                                content: "(9) _______",
                                id: 9,
                            },
                            {
                                label: "Best Time to Ring:",
                                content: "(10) _______",
                                id: 10,
                            }
                        ]
                    }
                ]
            }
        },
    ],
}

export const listening_section_2 = {
    audio: "https://www.dropbox.com/scl/fi/6j55dx3fvfiho2inuxd9i/part2.mp4?rlkey=csak8xh70e06d1liys3gqkefp&st=bxwquoe9&raw=1",
    questions: [
        {
            questionType: "sentence-completion",
            questions: [
                {
                    id: 11,
                    sentence: "A quarter of break-ins are through the (11) _____."
                },
                {
                    id: 12,
                    sentence: "The (12) _____ of the house should also be protected."
                },
                {
                    id: 13,
                    sentence: "You should warn burglars your house is alarmed by putting a (13) _____ in the window."
                },
                {
                    id: 14,
                    sentence: "The alarms show a constant (14) _____."
                },
                {
                    id: 15,
                    sentence: "The alarms can be set off by a (15) _____."
                },
                {
                    id: 16,
                    sentence: "The alarms are connected to the (16) _____."
                }
            ]
        },
        {
            questionType: "note-completion",
            topic: "Installation",
            sections: [
                {
                    title: "Installation",
                    bulletPoints: [
                        {
                            id: 17,
                            text: "The alarms are usually installed in (17) _______"
                        },
                        {
                            id: 18,
                            text: "The security code should be kept with a (18) _______"
                        },
                        {
                            id: 19,
                            text: "The alarms can be installed in (19) _______ at an additional cost"
                        },
                        {
                            id: 20,
                            text: "Customers can pay (20) _______ of their alarm system"
                        }
                    ]
                }
            ]
        },
    ]
}

export const listening_section_3 = {
    audio: "https://www.dropbox.com/scl/fi/ssqxah55ih3t23ldpkqsl/part3.mp4?rlkey=xnrp579mjm6f3bvuagkbv00jo&st=r38ekafu&raw=1",
    questions: [
        {
            questionType: "sentence-completion",
            questions: [
                {
                    id: 21,
                    sentence: "The students Union is run by four sabbatical (21) _____."
                },
                {
                    id: 22,
                    sentence: "The president is responsible for the day-to-day running of the Union according to established policies within the (22) _____."
                },
                {
                    id: 23,
                    sentence: "A new vice-presidential post has been created to focus on (23) _____."
                }
            ]
        },
        {
            questionType: "multiple-choice-single",
            questions: [
                {
                    id: 24,
                    question: "One way to improve communications within the college will be",
                    options: [
                        "with regular meetings of the students Union",
                        "with the regular publication of the students Union magazine",
                        "with regular elections"
                    ]
                },
                {
                    id: 25,
                    question: "One possible way to see the president is",
                    options: [
                        "to fix a time with the office assistant, Pat",
                        "to call the president directly",
                        "to leave a notice for the president"
                    ]
                }
            ]
        },
        {
            questionType: "matching",
            question: {
                question: "Indicate whether the following statements are accurate or not by writing",
                statements_title: "Statements",
                statements: [
                    { id: 26, text: "The president advises students not to waste time on relaxation and enjoyment." },
                    { id: 27, text: "The student Union is a very helpful organization." },
                    { id: 28, text: "Central London is only 20 minutes away by type from Ealing." },
                    { id: 29, text: "The students Union is an organization run by the college." },
                    { id: 30, text: "The president is a third-year student at Ealing College." }
                ],
                features_title: "Answer Options",
                features: [
                    { letter: "A", description: "for an accurate statement" },
                    { letter: "I", description: "for an inaccurate statement" },
                    { letter: "N", description: "if the information is not given" }
                ]
            }
        }
    ]
}

export const listening_section_4 = {
    audio: "https://www.dropbox.com/scl/fi/he3btj3ijou5habcj3oub/part4.mp4?rlkey=ln3jf0k8gxssigpluaa5r1x8r&st=lzgrk24e&raw=1",
    questions: [
        {
            questionType: "note-completion",
            topic: "Factors for Successful Language Learning",
            sections: [
                {
                    title: "(A) Exposure",
                    bulletPoints: [
                        {
                            id: 31,
                            text: "to target language determines speed of (31) _______"
                        }
                    ]
                },
                {
                    title: "(B) Motivation",
                    bulletPoints: [
                        {
                            id: 32,
                            text: "(32) _______ motivation"
                        },
                        {
                            id: 33,
                            text: "Language is a tool to achieve partial goals, for example, getting a job or passing an (33) _______"
                        }
                    ]
                },
                {
                    title: "Integrative motivation",
                    bulletPoints: [
                        {
                            id: 34,
                            text: "Language is a tool for socialising and integrating, for example (34) _______ or people who are married to speakers of another language"
                        },
                        {
                            id: 35,
                            text: "According to research, integrative motivation produces much better (35) _______"
                        }
                    ]
                },
                {
                    title: "(C) Personality",
                    bulletPoints: [
                        {
                            id: 36,
                            text: "Good language learners are willing to take (36) _______"
                        },
                        {
                            id: 37,
                            text: "are not afraid of making mistakes and try to (37) _______ with the language"
                        }
                    ]
                },
                {
                    title: "(D) Learning Systems",
                    bulletPoints: [
                        {
                            id: 38,
                            text: "Efficient revision (38) _______"
                        },
                        {
                            text: "Ability to palm learning",
                        }
                    ]
                },
                {
                    title: "(E) Age",
                    bulletPoints: [
                        {
                            text: "are aware of how they learn",
                        },
                        {
                            id: 39,
                            text: "are independent of (39) _______"
                        },
                        {
                            id: 40,
                            text: "take (40) _______ for learning"
                        }
                    ]
                }
            ]
        }
    ],
}


// https://practicepteonline.com/ielts-reading-test-265/
export const reading_section_1 = {
    reading_passage: {
        title: "Bird Migration",
        subtitle: "",
        passage: `
Birds have many unique design features that enable them to perform such amazing feats of endurance. They are equipped with lightweight, hollow bones, intricately designed feathers providing both lift and thrust for rapid flight, navigation systems superior to any that man has developed, and an ingenious heat conserving design that, among other things, concentrates all blood circulation beneath layers of warm, waterproof plumage, leaving them fit to face life in the harshest of climates. Their respiratory systems have to perform efficiently during sustained flights at altitude, so they have a system of extracting oxygen from their lungs that far exceeds that of any other animal. During the later stages of the summer breeding season, when food is plentiful, their bodies can accumulate considerable layers of fat, to provide sufficient energy for their long migratory flights.
The fundamental reason that birds migrate is to find adequate food during the winter months when it is in short supply. This particularly applies to birds that breed in the temperate and Arctic regions of the Northern Hemisphere, where food is abundant during the short growing season. Many species can tolerate cold temperatures if food is plentiful, but when food is not available, they must migrate. However, intriguing questions remain.
One puzzling fact is that many birds journey much further than would be necessary just to find food and good weather. Nobody knows, for instance, why British swallows, which could presumably survive equally well if they spent the winter in equatorial Africa, instead of fly several thousands of miles further to their preferred winter home in South Africa’s Cape Province. Another mystery involves the huge migrations performed by arctic terns and mudflat-feeding shorebirds that breed close to Polar Regions. In general, the further north a migrant species breeds, the further south it spends the winter. For arctic terns, this necessitates an annual round trip of 25,000 miles. Yet, en route to their final destination in far-flung southern latitudes, all these individuals overfly other areas of seemingly suitable habitat spanning two hemispheres. While we may not fully understand birds’ reasons for going to particular places, we can marvel at their feats.
One of the greatest mysteries is how young birds know how to find the traditional wintering areas without parental guidance. Very few adults migrate with juveniles in tow, and youngsters may even have little or no inkling of their parents’ appearance. A familiar example is that of the cuckoo, which lays its eggs in another species’ nest and never reencounters its young. It is mind-boggling to consider that, once raised by its host species, the young cuckoo makes its way to ancestral wintering grounds in the tropics before returning single-handedly to northern Europe the next season to seek out a mate among its kind. The obvious implication is that it inherits from its parents an inbuilt route map and direction-finding capability, as well as a mental image of what another cuckoo looks like. Yet nobody has the slightest idea as to how this is possible.
Mounting evidence has confirmed that birds use the positions of the sun and stars to obtain compass directions. They also seem to be able to detect the earth’s magnetic field, probably due to having minute crystals of magnetite in the region of their brains. However, accurate navigation also requires an awareness of position and time, especially when lost. Experiments have shown that after being taken thousands of miles over an unfamiliar landmass, birds are still capable of returning rapidly to nest sites. Such phenomenal powers are the product of computing several sophisticated cues, including an inborn map of the night sky and the pull of the earth’s magnetic field. How the birds use their ‘instruments’ remains unknown, but one thing is clear: they see the world with a superior sensory perception to ours. Most small birds migrate at night and take their direction from the position of the setting sun. However, as well as seeing the sun go down, they also seem to see the plane of polarized light caused by it, which calibrates their compass. Travelling at night provides other benefits. Daytime predators are avoided and the danger of dehydration due to flying for long periods in warm, sunlit skies is reduced. Furthermore, at night the air is generally cool and less turbulent and so conducive to sustained, stable flight.
Nevertheless, all journeys involve considerable risk, and part of the skill in arriving safely is setting off at the right time. This means accurate weather forecasting and utilizing favourable winds. Birds are adept at both, and, in laboratory tests, some have been shown to detect the minute difference in barometric pressure between the floor and ceiling of a room. Often birds react to weather changes before there is any visible sign of them. Lapwings, which feed on grassland, flee west from the Netherlands to the British Isles, France, and Spain at the onset of a cold snap. When the ground surface freezes, the birds could starve. Yet they return to Holland ahead of a thaw, their arrival linked to a pressure change presaging an improvement in the weather.
In one instance a Welsh Manx shearwater carried to America and released was back in its burrow on Skokholm Island, off the Pembrokeshire coast, one day before a letter announcing its release! Conversely, each autumn a small number of North American birds are blown across the Atlantic by fast-moving westerly tailwinds. Not only do they arrive safely in Europe, but, based on ringing evidence, some make it back to North America the following spring, after probably spending the winter with European migrants in sunny African climes.
`
    },
    questions: [
        {
            questionType: "match-headings",
            question: {
                headings: [
                    { number: "i", text: "The best moment to migrate" },
                    { number: "ii", text: "The unexplained rejection of closer feeding ground" },
                    { number: "iii", text: "The influence of weather on the migration route" },
                    { number: "iv", text: "Physical characteristics that allow birds to migrate" },
                    { number: "v", text: "The main reason why birds migrate" },
                    { number: "vi", text: "The best wintering grounds for birds" },
                    { number: "vii", text: "Research findings on how birds migrate" },
                    { number: "viii", text: "Successful migration despite the trouble of wind" },
                    { number: "ix", text: "The contrast between long-distance migration and short-distance migration" },
                    { number: "x", text: "Mysterious migration despite lack of teaching" }
                ],
                id: [1, 2, 3, 4, 5, 6, 7]
            }
        },
        {
            questionType: "multiple-choice-many",
            questions: [
                {
                    id: [8, 9],
                    question: "Which TWO of the following statements are true of bird migration?",
                    options: [
                        "Birds often fly further than they need to",
                        "Birds traveling in family groups are safe",
                        "Birds flying at night need less water",
                        "Birds have much sharper eyesight than humans",
                        "Only shorebirds are resistant to strong winds"
                    ]
                }
            ]
        },
        {
            questionType: "summary-completion",
            question: {
                id: [10, 11, 12, 13],
                title: "Bird Migration Mystery",
                passageTemplate: `
It is a great mystery that young birds like cuckoos can find their wintering grounds without <10>. Evidence shows birds can tell directions like a <11> by observing the sun and the stars. One advantage for birds flying at night is that they can avoid contact with <12>. Laboratory tests show that birds can detect weather without <13> signs.
    `
            }
        }
    ]
}

export const reading_section_2 = {
    reading_passage: {
        title: "Food for thought",
        subtitle: "",
        passage: `
There are not enough classrooms at the Msekeni primary school, so half the lessons take place in the shade of yellow-blossomed acacia trees. Given this shortage, it might seem odd that one of the school’s purpose-built classrooms has been emptied of pupils and turned into a storeroom for sacks of grain. But it makes sense. Food matters more than shelter.
Msekeni is in one of the poorer parts of Malawi, a landlocked southern African country of exceptional beauty and great poverty. No war lays waste Malawi, nor is the land unusually crowed or infertile, but Malawians still have trouble finding enough to eat. Half of the children under five are underfed to the point of stunting. Hunger blights most aspects of Malawian life, so the country is as good a place as any to investigate how nutrition affects development, and vice versa.
The headmaster at Msekeni, Bernard Kumanda, has strong views on the subject. He thinks food is a priceless teaching aid. Since 1999, his pupils have received free school lunches. Donors such as the World Food Programme (WFP) provide the food: those sacks of grain (mostly mixed maize and soya bean flour, enriched with vitamin A) in that converted classroom. Local volunteers do the cooking – turning the dry ingredients into a bland but nutritious slop and spooning it out on to plastic plates. The children line up in large crowds, cheerfully singing a song called “We are getting porridge”.
When the school’s feeding programme was introduced, enrolment at Msekeni doubled. Some of the new pupils had switched from nearby schools that did not give out free porridge, but most were children whose families had previously kept them at home to work. These families were so poor that the long-term benefits of education seemed unattractive when setting against the short-term gain of sending children out to gather firewood or help in the fields. One plate of porridge a day completely altered the calculation. A child fed at school will not howl so plaintively for food at home. Girls, who are more likely than boys to be kept out of school, are given extra snacks to take home.
When a school takes in a horde of extra students from the poorest homes, you would expect standards to drop. Anywhere in the world, poor kids tend to perform worse than their better-off classmates. When the influx of new pupils is not accompanied by an increase in the number of teachers, as was the case at Msekeni, you would expect standards to fall even further. But they have not. Pass rates at Msekeni improved dramatically, from 30% to 85%. Although this was an exceptional example, the nationwide results of school feeding programmes were still pretty good. On average, after a Malawian school started handing out free food it attracted 38% more girls and 24% more boys. The pass rate for boys stayed about the same, while for girls it improved by 9.5%.
Better nutrition makes for brighter children. Most immediately, well-fed children find it easier to concentrate. It is hard to focus the mind on long division when your stomach is screaming for food. Mr Kumanda says that it used to be easy to spot the kids who were really undernourished. “They were the ones who stared into space and didn’t respond when you asked the question,” he says. More crucially, though, more and better food helps brains grow and develop. Like any other organ in the body, the brain needs nutrition and exercise. But if it is starved of the necessary calories, proteins and micronutrients, it is stunted, perhaps not as severely as a muscle would be, but stunted nonetheless. That is why feeding children at schools work so well. And the fact that the effect of feeding was more pronounced in girls than in boys gives a clue to who eats first in rural Malawian households. It isn’t the girls.
On a global scale, the good news is that people are eating better than ever before. Homo sapiens has grown 50% bigger since the industrial revolution. Three centuries ago, chronic malnutrition was more or less universal. Now, it is extremely rare in rich countries. In developing countries, where most people live, plates and rice bowls are also fuller than ever before. The proportion of children under five in the developing world who are malnourished to the point of stunting fell from 39% in 1990 to 30% in 2000, says the World Health Organisation (WHO). In other places, the battle against hunger is steadily being won. Better nutrition is making people cleverer and more energetic, which will help them grow more prosperous. And when they eventually join the ranks of the well off, they can start fretting about growing too fast.
        `
    },
    questions: [
        {
            questionType: "match-headings",
            question: {
                headings: [
                    { number: "i", text: "Why better food helps students’ learning" },
                    { number: "ii", text: "A song for getting porridge" },
                    { number: "iii", text: "Surprising use of school premises" },
                    { number: "iv", text: "Global perspective" },
                    { number: "v", text: "Brains can be starved" },
                    { number: "vi", text: "Surprising academics outcome" },
                    { number: "vii", text: "Girls are specially treated in the program" },
                    { number: "viii", text: "How food program is operated" },
                    { number: "ix", text: "How food program affects school attendance" },
                    { number: "x", text: "None of the usual reasons" },
                    { number: "xi", text: "How to maintain an academic standard" }
                ],
                id: [14, 15, 16, 17, 18, 19, 20]
            }
        },
        {
            questionType: "summary-completion",
            question: {
                id: [21, 22, 23, 24],
                title: "Feeding Programme Effects",
                passageTemplate: `
-> <21> are exclusively offered to girls in the feeding programme. Instead of going to school, many children in poverty are sent to collect <22> in the fields. The pass rate at Msekeni has risen to <23> with the help of the feeding programme. Since the industrial revolution, the size of the modern human has grown by <24>.
                `
            }
        },
        {
            questionType: "multiple-choice-many",
            questions: [
                {
                    id: [25, 26],
                    question: "Which TWO of the following statements are true?",
                    options: [
                        "Some children are taught in the open air",
                        "Malawi has trouble to feed its large population",
                        "No new staffs were recruited when attendance rose",
                        "Girls enjoy a higher status than boys in the family",
                        "Boys and girls experience the same improvement in the pass rate",
                        "WHO has cooperated with WFP to provide grain to the school at Msekeni"
                    ]
                }
            ]
        }
    ]
}

export const reading_section_3 = {
    reading_passage: {
        title: "The Persuaders",
        subtitle: "",
        passage: `
We have long lived in an age where powerful images, catchy soundbites and too-good-to miss offers to bombard us from every quarter. All around us the persuaders are at work. Occasionally their methods are unsubtle –the planting kiss on a baby’s head by a wannabe political leader, or a liquidation sale in a shop that has been “closing down” for well over a year, but generally the persuaders know what they are about and are highly capable. Be they politicians, supermarket chains, salespeople or advertisers, they know exactly what to do to sell us their images, ideas or produce. When it comes to persuasion, these giants rule supreme. They employ the most skilled image-makers and use the best psychological tricks to guarantee that even the most cautious among us are open to manipulation.
We spend more time in them than we mean to, we buy 75 percent of our food from them and end up with products that we did not realize we wanted. Right from the start, supermarkets have been ahead of the game. For example, when Sainsbury introduced shopping baskets into its 1950s stores, it was a stroke of marketing genius. Now shoppers could browse and pick up items they previously would have ignored. Soon after came trolleys, and just as new roads attract more traffic, the same applied to trolley space. Pro Merlin Stone, IBM Professor of Relationship Marketing at Bristol Business School, says aisles are laid out to maximize profits. Stores pander to our money-rich, time-poor lifestyle. Low turnover products —clothes and electrical goods—are stocked at the back while high—turnover items command position at the front.
Stone believes supermarkets work hard to “stall” us because the more time we spend in them, the more we buy. Thus, great efforts are made to make the environment pleasant. Stores play music to relax us and some even pipe air from the in-store bakery around the shop. In the USA, fake aromas are sometimes used. The smell is both the most evocative and subliminal sense. In experiments, pleasant smells are effective in increasing our spending. A casino that fragranced only half its premise saw profit soar in the aroma—filled areas. The other success story from the supermarkets’ perspective is the loyalty card. Punters may assume that they are being rewarded for their fidelity, but all the while they are trading information about their shopping habits. Loyal shoppers could be paying 30% more by sticking to their favourite shops for essential cosmetics.
Research has shown that 75 percent of profit comes from just 30 percent of customers. Ultimately, reward cards could be used to identify and better accommodate these “elite” shoppers. It could also be used to make adverts more relevant to individual consumers – rather like Spielberg’s futuristic thriller Minority Report, in which Tom Cruise’s character is bombarded with interactive personalized ads. If this sounds far-fetched, the data-gathering revolution has already seen the introduction of radio – frequency identification – away to electronically tag products to see who is buying what, FRID means they can follow the product into people homes.
No matter how savvy we think we are to their ploys, the ad industry still wins. Adverts focus on what products do or on how they make us feel. Researcher Laurette Dube, in the Journal of Advertising Research, says when attitudes are base on “cognitive foundations” (logical reasoning), advertisers use informative appeals. This works for products with a little emotional draw but high functionality, such as bleach. Where attitude is based on effect (i.e, emotions), ad teams try to tap into our feelings. Researchers at the University of Florida recently concluded that our emotional responses to adverts dominate over “cognition”.
Advertisers play on our need to be safe (commercials for insurance), to belong (make a customer feel they are in the group in fashion ads) and for self – esteem (aspirational adverts). With time and space at a premium, celebrities are often used as a quick way of meeting these needs – either because the celeb epitomizes success or because they seem familiar and so make the product seem “safe”. A survey of 4,000 campaigns found ads with celebs were 10 percent more effective than without. Humor also stimulates a rapid emotional response. Heiman Chung, writing in the International Journal of Advertising, found that funny ads were remembered for longer than straight ones. Combine humor with sexual imagery – as in Wonderbra’s “Hello Boys” ads—and you are on to a winner.
Slice-of-life ads are another tried and tested method—they paint a picture of life as you would like it, but still, one that feels familiar. Abhilasha Mehta, in the Journal of Advertising Research, noted that the more one’s self-image tallies with the brand being advertised, the stronger the commercial. Ad makers also use behaviorist theories, recognizing that the more sensation we receive from an object, the better we know it. If an advert for a chocolate bar fails to cause salivation, it has probably failed. No wonder advertisements have been dubbed the “nervous system of the business world”.
Probably all of us could make a sale if the product was something we truly believed in, but professional salespeople are in a different league—the best of them can always sell different items to suitable customers in the best time. They do this by using very basic psychological techniques. Stripped to its simplest level, selling works by heightening the buyer’s perception of how much they need a product or service. Buyers normally have certain requirements by which they will judge the suitability of a product. The seller, therefore, attempts to tease out what these conditions are and then explains how their products’ benefit can meet these requirements.
Richard Hession, author of Be a Great Salesperson says it is human nature to prefer to speak rather listen, and good salespeople pander to this. They ask punters about their needs and offer to work with them to achieve their objectives. As a result, the buyer feels they are receiving a “consultation” rather than a sales pitch. All the while, the salesperson presents with a demeanour that takes it for granted that the sale will be made. Never will the words “if you buy” be used, but rather “when you buy”.
Dr Rob Yeung, a senior consultant at business psychologists Kiddy and Partner, says most salespeople will build up a level of rapport by asking questions about hobbies, family and lifestyle. This has the double benefit of making the salesperson likeable while furnishing him or her with more information about the client’s wants. Yeung says effective salespeople try as far as possible to match their style of presenting themselves to how the buyer comes across. If the buyer cracks jokes, the salespeople will respond in kind. If the buyer wants detail, the seller provides it, if they are more interested in the feel of the product, the seller will focus on this. At its most extreme, appearing empathetic can even include the salesperson attempting to “mirror” the hobby language of the buyer.
Whatever the method used, all salespeople work towards one aim: “closing the deal”. In fact, they will be looking for “closing signals” through their dealings with potential clients. Once again the process works by assuming success. The buyer is not asked “are you interested?” as this can invite a negative response. Instead, the seller takes it for granted that the deal is effectively done: when the salesman asks you for a convenient delivery date or asks what color you want, you will probably respond accordingly. Only afterwards might you wonder why you proved such a pushover.
        `
    },
    questions: [
        {
            questionType: "multiple-choice-single",
            questions: [
                {
                    id: 27,
                    question: "What is the supermarket’s purpose of using “basket” in paragraph B?",
                    options: [
                        "Create a convenient atmosphere of supermarket",
                        "Make customers spend more time on shopping",
                        "Relieve pressure on the supermarket’s traffic",
                        "More than half items bought need to be carried"
                    ]
                },
                {
                    id: 28,
                    question: "What is the quality of the best salesman possessed according to this passage?",
                    options: [
                        "Sell the right product to the right person",
                        "Clearly state the instruction of one product",
                        "Show professional background of one product",
                        "Persuade customers to buy the product they sell"
                    ]
                },
                {
                    id: 29,
                    question: "What’s the opinion of Richard Hession?",
                    options: [
                        "Pretend to be nice instead of selling goods",
                        "Prefer to speak a lot to customers",
                        "Help buyers to conclude their demands for ideal items",
                        "Show great interpersonal skill"
                    ]
                }
            ]
        },
        {
            questionType: "match-paragraph-information",
            question: {
                information: [
                    { id: 30, text: "how do supermarkets distract consumers" },
                    { id: 31, text: "how to build a close relationship between salespeople and buyer" },
                    { id: 32, text: "people would be impressed by the humor advertisement" },
                    { id: 33, text: "methods for salespeople to get the order" },
                    { id: 34, text: "how question work for salespeople" },
                    { id: 35, text: "different customer groups bring different profits" }
                ],
                letters: [
                    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"
                ]
            }
        },
        {
            questionType: "summary-completion",
            question: {
                id: [36, 37, 38, 39, 40],
                title: "Supermarket Strategies",
                passageTemplate: `
Trolleys are born for the increasing traffic in the supermarket. The width of <36> in supermarkets is broadened in order to generate the most profits. Research from <37>, satisfying aromas can motivate people to buy more products. Except for the effort of creating a comfortable surrounding, <38> is another card that supermarkets play to reward their regular customers. For example, loyal customers spend 30% more in their loved shops for everyday necessary <39>. Clothes shops use advertisements to make the buyer think they are belonging to part of a <40>; research from 4,000 campaigns reflect that humor advertisement received more emotional respect.
                `
            }
        }
    ]
}

// https://practicepteonline.com/ielts-writing-test-55/
export const writingTasks = [
    {
        id: 1,
        timeLimit: "You should spend about 20 minutes on this task.",
        wordLimit: "Write at least 150 words.",
        prompt: [
            "The chart shows the division of household tasks by gender in Great Britain.",
            "Summarise the information by selecting and reporting the main features, and make comparisons where relevant."
        ],
        image_url: "https://www.dropbox.com/scl/fi/o1fbbc0ps3iqukechzt3g/test8-task1.png?rlkey=yvubxgvrbp1a1950ft6lktlpw&st=gbbgu5ye&raw=1"
    },
    {
        id: 2,
        timeLimit: "You should spend about 40 minutes on this task.",
        wordLimit: "Write at least 250 words.",
        prompt: [
            "In many countries, plastic shopping bags are the main type of rubbish.",
            "They cause water pollution and land pollution, so they should be banned. To what extent do you agree?"
        ],
    }
]


// CHATGPT GENERATED
export const speaking_transcripts = [
    {
        part: 1,
        questions: [
            { id: 1, transcript: "Now, in this part of the test, I will ask you some questions about yourself. After each question, there will be a beep sound. You will have 20 seconds to speak after the beep. So, What do you do on your birthday each year?", audioUrl: "https://www.dropbox.com/scl/fi/8bb8fomlv4rhxr54fox7f/part1_q1.mp3?rlkey=6b6zdnbqcjwq5xvrsd2tk9z9m&st=srdawd60&raw=1" },
            { id: 2, transcript: "Do you usually celebrate birthdays with friends or family?", audioUrl: "https://www.dropbox.com/scl/fi/l8q86jlhhnm90biigcjqq/part1_q2.mp3?rlkey=d5192ufedn71wtdvyb7iythaz&st=5osxr1w7&raw=1" },
            { id: 3, transcript: "Have your birthday celebrations changed since childhood?", audioUrl: "https://www.dropbox.com/scl/fi/3rzucyc85trfxk2uc3xcj/part1_q3.mp3?rlkey=0snh2vb1svtjyivsg7ggykqfs&st=6znyov90&raw=1" },
            { id: 4, transcript: "Is there a birthday you remember especially well? Why?", audioUrl: "https://www.dropbox.com/scl/fi/q1ai9z7ylldvvobeheyyr/part1_q4.mp3?rlkey=b8525dwb6epwhk0dy7a1a9krc&st=yvhv36of&raw=1" },

            { id: 5, transcript: "I’d like to move on and ask you some questions about books. Do you enjoy reading books in your free time?", audioUrl: "https://www.dropbox.com/scl/fi/r44inovuddxanrhgidohk/part1_q5.mp3?rlkey=1jtpgswjo4l3i5mmsohrf63vg&st=y7m45o3r&raw=1" },
            { id: 6, transcript: "What kind of books did you enjoy as a child?", audioUrl: "https://www.dropbox.com/scl/fi/igt8ypv8tuf8zbxp3k7eq/part1_q6.mp3?rlkey=1cgcuzci52y898wc90xy5e1l7&st=3paux567&raw=1" },
            { id: 7, transcript: "Do you prefer reading printed books or e-books? Why?", audioUrl: "https://www.dropbox.com/scl/fi/mkkz3zs74ldusonwx7lkq/part1_q7.mp3?rlkey=g5j3amjsbv2ae78lq1gqh4e1m&st=ddl5pmgs&raw=1" },
            { id: 8, transcript: "Have your reading habits changed in recent years?", audioUrl: "https://www.dropbox.com/scl/fi/327leimpk5pjgzxztk3ba/part1_q8.mp3?rlkey=2riejsyi0iy1wcrfnlhzhgwc0&st=njrck89b&raw=1" }
        ]
    },
    {
        part: 2,
        questions: [
            {
                id: 9,
                transcript: "Describe a time when you helped someone.",
                audioUrl: "https://www.dropbox.com/scl/fi/c3a8qwbhbykt0c3oz2caq/part2.mp3?rlkey=1ucv74ivoh6dzf3icsfqlbqhu&st=0pweuaoj&raw=1"
            }
        ]
    },
    {
        part: 3,
        questions: [
            { id: 10, transcript: "You’ve just spoken about a time you helped someone. Let’s explore this topic more. Why do people help others?", audioUrl: "https://www.dropbox.com/scl/fi/te7whiy8qoul6df3in8ut/part3_q1.mp3?rlkey=ink67pje3aflkuohfup0andz0&st=5eo1xdnp&raw=1" },
            { id: 11, transcript: "Do you think people are naturally helpful?", audioUrl: "https://www.dropbox.com/scl/fi/n5xn5yycxnkoos5g9m7tg/part3_q2.mp3?rlkey=h0ow719y4ryjbsia7aeae6dm8&st=b6pio57e&raw=1" },

            { id: 12, transcript: "How can schools encourage children to help others?", audioUrl: "https://www.dropbox.com/scl/fi/jrxagwlwijq9rccewa7k3/part3_q3.mp3?rlkey=u0tbk7yvjdabfd4fj7j8zc54h&st=ddq0lzp1&raw=1" },
            { id: 13, transcript: "Should helping others always be voluntary, or should it be required in some situations?", audioUrl: "https://www.dropbox.com/scl/fi/8li1sn98q1njic6azp3a1/part3_q4.mp3?rlkey=sc06s1fjtwhklrsv0pifudba7&st=wrvzv3ri&raw=1" }
        ]
    }
]


export const reading_answers = {
    1: "iv",
    2: "v",
    3: "ii",
    4: "x",
    5: "vii",
    6: "i",
    7: "viii",
    8: "A, C",
    9: "A, C",
    10: "Parental guidance",
    11: "Compass",
    12: "Predators",
    13: "Visible",
    14: "iii",
    15: "x",
    16: "viii",
    17: "ix",
    18: "vi",
    19: "i",
    20: "iv",
    21: "Extra snacks",
    22: "Firewood",
    23: "85%",
    24: "50%",
    25: "A, C",
    26: "A, C",
    27: "B",
    28: "A",
    29: "D",
    30: "C",
    31: "J",
    32: "F",
    33: "K",
    34: "K",
    35: "D",
    36: "Aisles",
    37: "Experiments",
    38: "Loyalty card",
    39: "Cosmetics",
    40: "Group"
};

export const listening_answers = {
    1: "RTY34",
    2: "30",
    3: "3",
    4: "50",
    5: "6",
    6: "Parkinson",
    7: "performance",
    8: "melrose road",
    9: "0928982453",
    10: "2pm",

    11: "back door",
    12: "top floor",
    13: "sign",
    14: "blue light",
    15: "spider",
    16: "company office",
    17: "hall (ways)",
    18: "neighbour",
    19: "the evening(s)",
    20: "monthly",

    21: "officers",
    22: "constitution",
    23: "communications",
    24: "C",
    25: "B",
    26: "A",
    27: "I",
    28: "A",
    29: "I",
    30: "N",

    31: "learning",
    32: "instrumental",
    33: "examination",
    34: "immigrants",
    35: "results",
    36: "risks",
    37: "experiment",
    38: "techniques",
    39: "teacher",
    40: "responsibility"
};