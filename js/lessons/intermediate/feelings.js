// Auto-extracted from original app.js
import { LESSON_ID_FEELINGS } from '../../core/constants.js';

export const lessonId = LESSON_ID_FEELINGS;
export const lesson = {
    meta: {
        level: "Intermediate",
        unit: "Feelings & Mental State",
        lessonTitle: "Unit 15 – Feelings & Mental State",
    },

    overview: {
        title: "Unit 15 – Feelings & Mental State",
        description:
            "In this unit, students learn how to talk about their feelings, energy, stress, and mood in Palestinian Arabic, and how to ask others about their emotional state in a natural, supportive way.",
        goals: [
            "Use common adjectives to describe feelings (happy, sad, tired, stressed, relaxed, bored, worried…).",
            "Ask and answer questions like ‘How do you feel?’ and ‘What’s wrong?’.",
            "Use chunks like ‘I feel…’, ‘I’m under pressure’, ‘I’m not in the mood’, ‘take a break’.",
            "React in a supportive way to bad news or difficult situations.",
            "Talk about simple self-care plans in Palestinian Arabic.",
        ],
    },

    // ====================================
    // VOCABULARY
    // ====================================
    vocabulary: {
        core: [
            // ===== BASIC FEELINGS =====
            {
                id: "mabsut",
                ar: "مَبْسُوط",
                en: "happy / pleased",
                hint:
                    "Masc: مَبْسُوط، fem: مَبْسُوطَة، plural: مَبْسُوطِين. Very common for ‘feeling good / happy’.",
                exampleAr: "اليَوْم مَبْسُوطَة لِأَنِّي خَلَّصِت المَشْرُوع.",
                exampleArabeezy: "elywm mbswta lany khlst elmshrw3.",
                exampleEn: "Today I’m happy because I finished the project.",
},
            {
                id: "za3lan",
                ar: "زَعْلَان",
                en: "upset / sad",
                hint:
                    "Masc: زَعْلَان، fem: زَعْلَانَة. Can be ‘angry’ or ‘sad’ depending on context.",
                exampleAr: "هُوَّا زَعْلَان شْوَيّ مِن النَّتِيجَة.",
                exampleArabeezy: "hwa z3lan shwy mn elntyja.",
                exampleEn: "He is a bit upset about the result.",
},
            {
                id: "ta3ban",
                ar: "تَعْبَان",
                en: "tired / exhausted",
                hint:
                    "Masc: تَعْبَان، fem: تَعْبَانَة. Physical or mental tiredness.",
                exampleAr: "بَعْد اليَوْم الطَّوِيل حَاسِّة حَالِي تَعْبَانَة.",
                exampleArabeezy: "b3d elywm eltwyl 7asa 7aly t3bana.",
                exampleEn: "After the long day I feel tired.",
},

            {
                id: "zahgan",
                ar: "زَهْقَان",
                en: "bored / fed up",
                hint:
                    "Masc: زَهْقَان، fem: زَهْقَانَة. Often with مِن: زَهْقَان مِن الدِّرَاسَة.",
                exampleAr: "حاسس حالي زهقان من الشغل الروتيني",
                exampleArabeezy: "7ass 7aly zhqan mn elshghl elrwtyny",
                exampleEn: "I feel bored / fed up with the routine work.",
},
            {
                id: "motawattar",
                ar: "مُتَوَتِّر",
                en: "nervous / tense",
                hint:
                    "Masc: مُتَوَتِّر، fem: مُتَوَتِّرَة. Often before exams, interviews, etc.",
                exampleAr: "متوتّر من قبل ما أقدّم الامتحان.",
                exampleArabeezy: "mtwtr mn qbl ma aqdm elamt7an.",
                exampleEn: "I’m nervous before taking the exam.",
},
            {
                id: "mado3oot",
                ar: "مَضْغُوط",
                en: "under pressure / stressed",
                hint:
                    "Masc: مَضْغُوط، fem: مَضْغُوطَة. From the word for ‘pressure’.",
                exampleAr: "هَالشَّهِر كْلُه مَضْغُوطَة بَيْن الدِّرَاسَة وَالشُّغُل.",
                exampleArabeezy: "halshhr klh mdghwta byn eldrasa welshghl.",
                exampleEn: "This month I’m under pressure between study and work.",
},
            {
                id: "merta7",
                ar: "مِرْتَاح",
                en: "comfortable / relaxed",
                hint:
                    "Masc: مِرْتَاح، fem: مِرْتَاحَة. Can be physical or emotional comfort.",
                exampleAr: "بَحِسّ حَالِي مِرْتَاحَ لَمَّا أَكُون عَالبَحِر.",
                exampleArabeezy: "b7s 7aly mrta7 lma akwn 3alb7r.",
                exampleEn: "I feel relaxed when I’m at the sea.",
},
            {
                id: "mit7ammis",
                ar: "مِتْحَمِّس",
                en: "excited / motivated",
                hint:
                    "Masc: مِتْحَمِّس، fem: مِتْحَمِّسَة. From حَمَاس ‘enthusiasm’.",
                exampleAr: "مِتْحَمِّسَ أَبْلِش المُسْتَوَى الجَّدِيد.",
                exampleArabeezy: "mt7ms ablsh elmstwa eljdyd.",
                exampleEn: "I’m excited to start the new level.",
},
            {
                id: "khayef",
                ar: "خَايِف",
                en: "afraid / scared",
                hint:
                    "Masc: خَايِف، fem: خَايْفَة. Often with مِن: خَايْفَة مِن النَّتِيجَة.",
                exampleAr: "خَايْفَة مِن النَّتِيجَة بَعْد الاِمْتِحَان.",
                exampleArabeezy: "khayfa mn elntyja b3d elamt7an.",
                exampleEn: "I’m scared about the result after the exam.",
},
            {
                id: "mashkour",
                ar: "مَشْكُور",
                en: "grateful / thankful (feeling)",
                hint:
                    "Literally ‘thanked’; used to express gratitude. Fem: مَشْكُورَة.",
                exampleAr: "مَشْكُورَة كْتِير عَلَى دَعْمِك، عَنْجَد فَادَنِي.",
                exampleArabeezy: "mshkwra ktyr 3la d3mk, 3njd fadny.",
                exampleEn: "I feel very grateful for your support, it really helped me.",
},

            // ===== MOOD & ENERGY CHUNKS =====
            {
                id: "mazaaji_mnee7",
                ar: "مَزَاجِي مْنِيح",
                en: "my mood is good",
                hint:
                    "Opposite: مَزَاجِي مِش مْنِيح = my mood is not good.",
                exampleAr: "اليوم مزاجي منيح، بس تعبان شوي.",
                exampleArabeezy: "elywm mzajy mny7, bs t3ban shwy.",
                exampleEn: "Today my mood is good but I’m a bit tired.",
},
            {
                id: "ma_eli_maal",
                ar: "مش رايق",
                en: "I’m not in the mood / I don’t feel like it",
                hint:
                    "Chunk to refuse softly or explain low energy.",
                exampleAr: "صحابي بدّهم يطلعوا، بس اليوم مش رايق",
                exampleArabeezy: "s7aby bdhm ytl3wa, bs elywm msh rayq",
                exampleEn: "My friends want to go out, but today I’m not in the mood.",
},
            {
                id: "ta2ti_zeleeleh",
                ar: "طَاقْتِي قَلِيلَة",
                en: "my energy is low",
                hint:
                    "Useful to say you’re tired mentally/physically.",
                exampleAr: "طَاقْتِي قَلِيلَة مِن كِلّ الشُّغُل وَالدِّرَاسَة.",
                exampleArabeezy: "taqty qlyla mn kl elshghl weldrasa.",
                exampleEn: "My energy is low from all the work and study.",
},
            {
                id: "bihاجa_istiraaha",
                ar: "بِحَاجَة لاسْتِرَاحَة",
                en: "in need of a break",
                hint:
                    "Very natural chunk about self-care.",
                exampleAr: "حَاسِّة إِنِّي بِحَاجَة لاسْتِرَاحَة يَومَيْن.",
                exampleArabeezy: "7asa iny b7aja lastra7a ywmyn.",
                exampleEn: "I feel I need a break for two days.",
},
            {
                id: "mesh_mosta3de",
                ar: "مِش مُسْتَعِدّ",
                en: "not ready",
                hint:
                    "Masc: مِش مُسْتَعِدّ، fem: مِش مُسْتَعِدَّة. Emotionally or practically.",
                exampleAr: "مِش مُسْتَعِدَّة أَخُد قَرَار هَلَّق.",
                exampleArabeezy: "msh mst3da akhd qrar hlq.",
                exampleEn: "I’m not ready to make a decision now.",
},
            {
                id: "daye3",
                ar: "ضَايِع",
                en: "lost / confused",
                hint:
                    "Emotional ‘lost’ (not understanding / not sure).",
                exampleAr: "بِهَالمَوْضُوع حَاسّ حَالِي ضَايِع شْوَيّ.",
                exampleArabeezy: "bhalmwdw3 7as 7aly day3 shwy.",
                exampleEn: "In this topic I feel a bit lost.",
},

            // ===== VERBS ABOUT FEELINGS =====
            {
                id: "ba7ess",
                ar: "بَحِسّ",
                en: "I feel",
                hint:
                    "From يِحِسّ. Often with إِنِّي: بَحِسّ إِنِّي…",
                exampleAr: "بَحِسّ إِنِّي مَضْغُوطَة هَالأُسْبُوع.",
                exampleArabeezy: "b7s iny mdghwta halasbw3.",
                exampleEn: "I feel that I’m under pressure this week.",
},
            {
                id: "bifakker",
                ar: "بِفَكِّر",
                en: "I think",
                hint:
                    "Mental process: thinking / considering.",
                exampleAr: "بفكّر آخد يوم إجازة أرتاح فيه",
                exampleArabeezy: "bfkr aakhd ywm ijaza arta7 fyh",
                exampleEn: "I’m thinking of taking a day off to rest.",
},

            // ===== SUPPORT & EMPATHY =====
            {
                id: "ma_tkhafi",
                ar: "مَا تِخَافِي / مَا تِخَاف",
                en: "don’t be afraid / don’t worry",
                hint:
                    "Masc: مَا تِخَاف، fem: مَا تِخَافِي. Emotional support.",
                exampleAr: "مَا تِخَافِي، كِلّ إِشِي بِيُزْبُط شْوَيّ شْوَيّ.",
                exampleArabeezy: "ma tkhafy, kl ishy byzbt shwy shwy.",
                exampleEn: "Don’t worry, everything will work out step by step.",
},
            {
                id: "wala_yhemmak_2",
                ar: "وَلَا يِهِمَّك",
                en: "don’t worry you",
                hint:
                    "Masc: وَلَا يِهِمَّك، fem: وَلَا يِهِمِّك. Very common comforting phrase.",
                exampleAr: "آسِف عَلَى الغَلَط. ـ وَلَا يِهِمَّك، صَار خَيْر.",
                exampleArabeezy: "aasf 3la elghlt. wla yhmk, sar khyr.",
                exampleEn: "Sorry about the mistake. — Don’t worry, it’s okay now.",
},
            {
                id: "hadri_nefsek",
                ar: "دِير(ي) بَالَك عَلَى حَالَك",
                en: "take care of yourself",
                hint:
                    "Masc: دِير بَالَك عَلَى حَالَك، fem: دِيرِي بَالِك عَلَى حَالِك.",
                exampleAr: "الدِّرَاسَة مُهِمَّة بَسّ كَمَان دِيرِي بَالِك عَلَى حَالِك.",
                exampleArabeezy: "eldrasa mhma bs kman dyry belk 3la 7alk.",
                exampleEn: "Study is important but also take care of yourself.",
},
            {
                id: "taba3i3i",
                ar: "طَبِيعِي",
                en: "normal / natural",
                hint:
                    "Masc: طَبِيعِي، fem: طَبِيعِيَّة. For validating feelings.",
                exampleAr: "طَبِيعِي تِكُونِي مُتَوَتِّرَة قَبْل الاِمْتِحَان.",
                exampleArabeezy: "tby3y tkwny mtwtra qbl elamt7an.",
                exampleEn: "It’s normal to feel nervous before the exam.",
},
        ],

        extra: [
            {
                id: "mankasar_khater",
                ar: "مِنْكَسِر خَاطِرُه",
                en: "heartbroken / deeply sad",
                hint:
                    "Emotional idiom: literally ‘his heart/feeling is broken’.",
                exampleAr: "بَعْد الخَبَر مَبَيِّن عَلِيه مِنْكَسِر خَاطِرُه.",
                exampleArabeezy: "b3d elkhbr mbyn 3lyh mnksr khatrh.",
                exampleEn: "After the news he looks heartbroken.",
},
            {
                id: "mabsoot_3ala_elnahaieh",
                ar: "مَبْسُوط عَلَى الآخِر",
                en: "super happy",
                hint:
                    "Stronger than just مَبْسُوط.",
                exampleAr: "نَجَحْت فِي كِلّ المَوَادّ وَمَبْسُوط عَلَى الآخِر.",
                exampleArabeezy: "nj7t fy kl elmwad wmbswt 3la elaakhr.",
                exampleEn: "I passed all my subjects and I’m super happy.",
},
            {
                id: "ma_baddi_a7ki",
                ar: "مَا بَدّي أَحْكِي عَن هَالمَوْضُوع",
                en: "I don’t want to talk about this topic",
                hint:
                    "Useful boundary phrase when not ready to talk.",
                exampleAr: "آسف/آسفة، هلّق ما بدي أحكي عن هالموضوع.",
                exampleArabeezy: "aasf/aasfa, hlq ma bdy a7ky 3n halmwdw3.",
                exampleEn: "Sorry, right now I don’t want to talk about this topic.",
},
            {
                id: "shway_shway",
                ar: "شْوَيّ شْوَيّ",
                en: "slowly / step by step",
                hint:
                    "Common calming phrase: take it easy, step by step.",
                exampleAr: "خُدِيه شْوَيّ شْوَيّ، مَا فِي دَاعِي لِلعَجَلَة.",
                exampleArabeezy: "khdyh shwy shwy, ma fy da3y lel3jla.",
                exampleEn: "Take it step by step, there’s no need to rush.",
},
        ],
    },

    // ====================================
    // DIALOGUE – LONG & NATURAL
    // ====================================
    dialogue: {
        lines: [
            // Scene 1 – Two friends talking about exam stress
            {
                speaker: "Narrator",
                ar: "بَعْد المَحَاضَرَة، رُوبَا وَصَاحْبْتَهَا نُور قَاعِدِين بِالكَافِيه وَبِيِحْكُوا عَن الاِمْتِحَانَات وَالمَزَاج.",
                en: "After the lecture, Roba and her friend Noor are sitting in a café, talking about exams and mood.",
            },
            {
                speaker: "Roba",
                ar: "صِرَاحَةً نُور، هَالأُسْبُوع مَزَاجِي مِش مْنِيح.",
                en: "Honestly, Noor, this week my mood is not good.",
            },
            {
                speaker: "Noor",
                ar: "لِيش؟ شُو صَايِر مَعِك؟",
                en: "Why? What’s happening with you?",
            },
            {
                speaker: "Roba",
                ar: "حَاسِّة حَالِي مَضْغُوطَة كْتِير. عِنْدِي مَشَارِيع، وَاجِبَات، وَكَم اِمْتِحَان، وَطَاقْتِي قَلِيلَة.",
                en: "I feel really under pressure. I have projects, homework, and several exams, and my energy is low.",
            },
            {
                speaker: "Noor",
                ar: "طَبِيعِي، هَالفَتْرَة كْتِير صَعْبَة. كَمَّان أَنَا مُتَوَتِّرَة قَبْل الاِمْتِحَانات.",
                en: "That’s normal, this period is very hard. I’m also nervous before the exams.",
            },
            {
                speaker: "Roba",
                ar: "أَحْيَانًا بَحِسّ إِنِّي زَهْقَانَة مِن الدِّرَاسَة، بَسّ مَا فِيش خِيَار، لَازِم نِكْمِل.",
                en: "Sometimes I feel fed up with studying, but there’s no choice, we have to continue.",
            },
            {
                speaker: "Noor",
                ar: "شُوفِي، دِيرِي بَالِك عَلَى حَالِك. خُدِي نَفَس عَمِيق، استِرِيحِي سَاعَة، وَبَعْدِين كَمِّلِي شْوَيّ شْوَيّ.",
                en: "Look, take care of yourself. Take a deep breath, rest for an hour, then continue little by little.",
            },
            {
                speaker: "Roba",
                ar: "مَعِك حَقّ. بَحِسّ إِنِّي بِحَاجَة لاسْتِرَاحَة يَوم بَدُون دِّرَاسَة.",
                en: "You’re right. I feel I need a day of rest without studying.",
            },
            {
                speaker: "Noor",
                ar: "وَلَا يِهِمِّك، بِنْحَاوِل نِتْعَامَل مَع الضَّغْط سَوَى. إِذَا حَاسَّة حَالِك مْضَايْقَة، اِتَّصِلِي فِيا تِلْفُون.",
                en: "Don’t worry, we’ll try to deal with the pressure together. If you’re feeling down, call me.",
            },
            {
                speaker: "Roba",
                ar: "الله يْخَلِّيك، عَنْجَد مَشْكُورَة عَلَى دَعْمِك.",
                en: "May God keep you, I’m really grateful for your support.",
            },

            // Scene 2 – Student talking to teacher about motivation
            {
                speaker: "Narrator",
                ar: "بَعْد الدَّرْس، رُوبَا قَعَدَت شْوَيّ مَع المُدَرِّس تِحْكِي عَن المَعْنَوِيَّات وَالحَمَاس.",
                en: "After class, Roba sat a bit with the teacher to talk about motivation and morale.",
            },
            {
                speaker: "Teacher",
                ar: "روبا، باين عليكِ تعبانة هالأيام. كيفك؟",
                en: "Roba, it looks like you’re tired these days. How are you doing?",
            },
            {
                speaker: "Roba",
                ar: "بِصَرَاحَة، بَحِسّ إِنِّي مِش مِتْحَمِّسَة زَيّ الأَوَّل. المَوَادّ كْتِيرَة، وَأَحْيَانًا بَحِسّ حَالِي ضَايِعَة.",
                en: "Honestly, I feel I’m not as excited as before. There are many subjects, and sometimes I feel lost.",
            },
            {
                speaker: "Teacher",
                ar: "طَبِيعِي تِحِسِّي هِيك. المَهَمّ مَا تِتْرُكِي كُلّ إِشِي. شُو الأَكْثَر شِي مَضْغُوطِة فِيه هَلَّق؟",
                en: "It’s normal to feel like that. What’s important is that you don’t drop everything. What is the area where you feel the most pressure now?",
            },
            {
                speaker: "Roba",
                ar: "مَضْغُوطَة مِن المَشْرُوع الكْبِير وَالاِمْتِحَان نَفْس الأُسْبُوع.",
                en: "I’m under pressure from the big project and the exam in the same week.",
            },
            {
                speaker: "Teacher",
                ar: "طَيِّب، شُوفِي. مُمْكِن نِقَسِّم الشُّغُل تَدْرِيجِيًّا. اليَوم شْوَيّ، بُكْرَا شْوَيّ. مَا بِنِدْفَع كُلّ إِشِي مَرَّة وَاحْدَة.",
                en: "Okay, look. We can divide the work gradually. A bit today, a bit tomorrow. We don’t push everything at once.",
            },
            {
                speaker: "Roba",
                ar: "هَيْك بَحِسّ إِنِّي أَقْدَر أَسَيْطِر عَلَى التَّعَب.",
                en: "That way I feel I can control the tiredness.",
            },
            {
                speaker: "Teacher",
                ar: "بس أهم إشي إنك تهتمي بحالك: نوم، أكل منيح، وشوي رياضة، كل هالأشياء بتساعد على المزاج.",
                en: "But the most important thing is to take care of yourself. Sleep, food, a bit of exercise, all of that helps the mood.",
            },
            {
                speaker: "Roba",
                ar: "شكرًا إلك، هلّق حاسّة حالي أحسن.",
                en: "Thanks you, I feel better now.",
            },

        ],
    },

    // ====================================
    // GRAMMAR
    // ====================================

  grammar: [
        {
            id: "full_negation",
            title: "Full Negation System (ما...ش / مش / ما في)",
            short: "Use different patterns depending on the sentence type.",
            description:
                `Spoken Arabic uses different negation patterns.
Use ما + فعل + ش for actions, مش for adjectives/nouns, and ما في for existence.

Choose the pattern based on what you negate.`,
            table: {
                title: "Negation Patterns",
                headers: ["Arabic Pattern", "Arabeezy", "English", "Usage"],
                rows: [
                    ["ما + فعل + ش", "ma + verb + sh", "not (verb)", "Actions"],
                    ["مش + صفة", "mish + adjective", "not (adj)", "States"],
                    ["ما في + اسم", "ma fi + noun", "there isn’t", "Existence"],
                    ["مش أنا", "mish ana", "not me", "Emphasis"]
                ]
            },
            examples: [
                { ar: "أنا ما بحب الزحمة", arabeezy: "ana ma b7ibb ez-z7me", en: "I don’t like crowds." },
                { ar: "هو مش مبسوط", arabeezy: "howwa mish mabsuuT", en: "He isn’t happy." },
                { ar: "ما في أمل", arabeezy: "ma fi amal", en: "There isn’t hope." },
                { ar: "إنتِ ما بتناميش بكير", arabeezy: "inti ma btinaamish bakkeer", en: "You don’t sleep early. (f)" },
                { ar: "أنا مش زعلان", arabeezy: "ana mish za3laan", en: "I’m not upset." }
            ],
            teacherNotes:
                `Spoken uses ما...ش more than MSA.
Teach مش for adjectives early.
Use feelings and emotions as context.
Keep patterns clear and separated.`,
            commonMistakes: [
                "Using مش with verbs",
                "Forgetting ش in ما...ش",
                "Mixing patterns in one sentence"
            ],
            functionalUse: "Use this to express what you don’t do or how you don’t feel."
        },
        {
            id: "active_participles_emotions",
            title: "Active Participles (Emotional States)",
            short: "Use participles to describe feelings.",
            description:
                `Spoken Arabic often uses active participles to describe states.
They act like adjectives and change for gender.

Use them with pronouns to describe emotions.`,
            table: {
                title: "Common Emotions",
                headers: ["Arabic", "Arabeezy", "English", "Usage"],
                rows: [
                    ["مبسوط", "mabsuuT", "happy", "Male"],
                    ["مبسوطة", "mabsuuTa", "happy", "Female"],
                    ["زعلان", "za3laan", "upset", "Male"],
                    ["قلقان", "2al2aan", "anxious", "Male"],
                    ["متوتر", "mtawattar", "stressed", "General"]
                ]
            },
            examples: [
                { ar: "أنا مبسوط اليوم", arabeezy: "ana mabsuuT el-yom", en: "I’m happy today." },
                { ar: "هي مبسوطة", arabeezy: "hiyye mabsuuTa", en: "She is happy." },
                { ar: "هو زعلان", arabeezy: "howwa za3laan", en: "He is upset." },
                { ar: "إنت قلقان؟", arabeezy: "inta 2al2aan?", en: "Are you anxious?" },
                { ar: "أنا مش مبسوط", arabeezy: "ana mish mabsuuT", en: "I’m not happy." }
            ],
            teacherNotes:
                `Spoken uses participles more than MSA adjective phrases.
Focus on gender endings with real examples.
Use daily emotions and check-ins.
Avoid formal mental-health terms.`,
            commonMistakes: [
                "Mixing masculine/feminine forms",
                "Adding a verb like \"am\"",
                "Using formal MSA emotion words"
            ],
            functionalUse: "Use this to describe feelings, moods, and emotional states."
        }
    ],



    // ====================================
    // PRACTICE
    // ====================================
    microChecks: {
        enabled: true,
        every: 5,
        items: [
            {
                id: "mc_match_1",
                type: "match",
                prompt: "Match the English word to Arabic: happy / pleased",
                options: ["مَبْسُوط", "زَعْلَان", "تَعْبَان", "زَهْقَان", "مُتَوَتِّر"],
                correct: "مَبْسُوط",
            },
            {
                id: "mc_complete_2",
                type: "complete",
                prompt: "Complete the Arabic sentence for: This month I’m under pressure between study and work.\nهَالشَّهِر كْلُه ___َة بَيْن الدِّرَاسَة وَالشُّغُل.",
                options: ["مَضْغُوط", "مِرْتَاح", "مِتْحَمِّس", "خَايِف", "مَشْكُور"],
                correct: "مَضْغُوط",
            },
            {
                id: "mc_reorder_3",
                type: "reorder",
                prompt: "Reorder the Arabic words to match: Today my mood is good but I’m a bit tired.",
                options: ["اليوم", "مزاجي", "منيح،", "بس", "تعبان", "شوي"],
                correct: ["اليوم", "مزاجي", "منيح،", "بس", "تعبان", "شوي"],
            },
            {
                id: "mc_choose_4",
                type: "choose",
                prompt: "Choose the correct Arabic word for: lost / confused",
                options: ["ضَايِع", "بَحِسّ", "بِفَكِّر", "مَا تِخَافِي / مَا تِخَاف", "وَلَا يِهِمَّك"],
                correct: "ضَايِع",
            },
            {
                id: "mc_match_5",
                type: "match",
                prompt: "Match the English word to Arabic: take care of yourself",
                options: ["دِير(ي) بَالَك عَلَى حَالَك", "طَبِيعِي", "مِنْكَسِر خَاطِرُه", "مَبْسُوط عَلَى الآخِر", "مَا بَدّي أَحْكِي عَن هَالمَوْضُوع"],
                correct: "دِير(ي) بَالَك عَلَى حَالَك",
            },
        ],
    },

    practice: {
        quiz: [
            {
                id: "feel_q1",
                questionAr: "«مَضْغُوطَة» مَعْنَاهَا أَقْرَب لِـ:",
                optionsEn: [
                    "very happy",
                    "under pressure / stressed",
                    "hungry",
                ],
                correctIndex: 1,
            },
            {
                id: "feel_q2",
                questionAr: "أَيّ كَلِمَة أَكْثَر شِي تِسْتَعْمِلْهَا لِـ ‘bored / fed up’؟",
                optionsEn: [
                    "مَبْسُوط",
                    "زَهْقَان",
                    "مِتْحَمِّس",
                ],
                correctIndex: 1,
            },
            {
                id: "feel_q3",
                questionAr: "«مَزَاجِي مِش مْنِيح» مَعْنَاهَا:",
                optionsEn: [
                    "my mood is not good",
                    "I’m very hungry",
                    "I’m late",
                ],
                correctIndex: 0,
            },
            {
                id: "feel_q4",
                questionAr: "أَيّ عِبَارَة دَاعِمَة أَكْثَر لِصَدِيق تَعْبَان؟",
                optionsEn: [
                    "مَا إِلِي مَال.",
                    "طَبِيعِي تِحِسّ هِيك، مَا تِخَاف.",
                    "مَا بَدّي أَحْكِي.",
                ],
                correctIndex: 1,
            },
            {
                id: "feel_q5",
                questionAr: "«بَحِسّ إِنِّي مِش مُسْتَعِدّ» تِسْتَعْمِلْهَا لَمَّا:",
                optionsEn: [
                    "you are very excited",
                    "you want to sleep",
                    "you don’t feel ready (emotionally/practically)",
                ],
                correctIndex: 2,
            },
        ],

        rolePlays: [
            "Role-play 1: Two friends after a hard week. Student A asks about mood using: كِيف مَزَاجِك؟، شُو صَايِر مَعِك؟. Student B answers using at least 3 adjectives (تَعْبَان، مَضْغُوط، زَهْقَان…) and 1 chunk: مَا إِلِي مَال / طَاقْتِي قَلِيلَة.",
            "Role-play 2: Student and teacher. The student explains they feel tired and not motivated. The teacher uses supportive chunks: طَبِيعِي، مَا تِخَافِي، وَلَا يِهِمَّك، شْوَيّ شْوَيّ، دِيرِي بَالِك عَلَى حَالِك.",
            "Role-play 3: Short online chat. One person doesn’t want to talk about the problem now and uses: مَا بَدّي أَحْكِي عَن هَالمَوْضُوع هَلَّق. The other respects the boundary and answers with empathy and support.",
        ],
        translation: [
            { id: "feel_t1", type: "enToAr", textEn: "I feel happy today.", textAr: "أنا مبسوط اليوم." },
            { id: "feel_t2", type: "arToEn", textEn: "She feels stressed.", textAr: "هي متوترة." },
            { id: "feel_t3", type: "enToAr", textEn: "We feel tired after work.", textAr: "إحنا تعبانين بعد الشغل." },
            { id: "feel_t4", type: "arToEn", textEn: "He feels nervous.", textAr: "هو متوتر." },
            { id: "feel_t5", type: "enToAr", textEn: "Are you okay?", textAr: "إنت منيح/منيحة؟" },
            { id: "feel_t6", type: "arToEn", textEn: "I feel calm.", textAr: "أنا هادي." }
        ],
    },

    // ====================================
    // HOMEWORK
    // ====================================
    homework: {
        instructions:
            "Record a 60–90 second audio in Palestinian Arabic about your feelings this week:\n" +
            "1. Describe 2–3 different feelings you had (for example: happy, tired, stressed, bored) and on which days you felt them.\n" +
            "2. Use at least 3 chunks from the unit: بَحِسّ إِنِّي…, مَزَاجِي مْنِيح / مِش مْنِيح، مَا إِلِي مَال، طَاقْتِي قَلِيلَة، طَبِيعِي.…\n" +
            "3. Say one small self-care plan (for example: taking a break, sleeping earlier, walking, talking to a friend).\n" +
            "4. Try to finish with a positive note, like ‘إن شاء الله الأُسْبُوع الجَّاي بَحِسّ أَحْسَن’.",
    },

    // ====================================
    // TEACHER NOTES
    // ====================================
    teacherNotes: {
        warmup: [
            "Start in English: ask the student to rate their mood from 1 to 10 today, then give them 3 words in Arabic: مَبْسُوط، تَعْبَان، مَضْغُوط.",
            "Write a simple ‘feelings thermometer’ (from very bad to very good) and map Arabic words onto it together.",
        ],
        vocabularySteps: [
            "Teach pairs of opposites or contrasts: مَبْسُوط × زَعْلَان، مِرْتَاح × مَضْغُوط، مِتْحَمِّس × زَهْقَان.",
            "Drill mini-sentences in first person: اليَوْم أَحِسّ…, أَحْيَانًا بَحِسّ…, نَادِرًا بَحِسّ….",
            "Highlight that masc/fem changes are mostly at the end: ـَان / ـَانَة، ـوط / ـوطَة، إلخ.",
        ],
        dialogueSteps: [
            "Act Scene 1 slowly, pausing to ask comprehension questions in English or Arabic.",
            "Ask the student to change details in the dialogues: different sources of pressure, different ways to relax.",
        ],
        practiceTips: [
            "Allow the student to use English inside one or two sentences while keeping the frame in Arabic (for example: بَحِسّ إِنِّي ‘stuck’, بَحِسّ إِنِّي ‘overwhelmed’).",
            "Focus on giving them safe chunks to talk honestly about feelings, not on perfect grammar.",
        ],
        wrapup: [
            "End the lesson by asking: «اليَوْم، بَعْد الدَّرْس، مَزَاجِك أَحْسَن أَو أَسْوَأ؟ لِيش؟» and let them answer freely.",
            "Note the feelings words they use comfortably, and pick 1–2 new ones to recycle at the start of the next lesson.",
        ],
        myNotes: "",
    },
};