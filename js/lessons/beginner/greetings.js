// Auto-generated from original app.js
import { LESSON_ID_GREETING } from '../../core/constants.js';

export const lessonId = LESSON_ID_GREETING;
export const lesson = {
    meta: {
        level: "Beginner",
        unit: "Greetings",
        lessonTitle: "Unit 1 – Greetings & Introductions (Palestinian Arabic – Gaza)",
    },

    overview: {
        title: "Unit 1 – Greetings & Introductions",
        description:
            "In this creative and interactive unit, students discover how to greet, introduce themselves, and start small talk in Palestinian Arabic (Gaza style). The lesson connects greetings, feelings, basic identity questions, and classroom language to real-life situations so the student feels like they are entering a new world of communication.",
        goals: [
            "Use casual and polite Palestinian Arabic greetings naturally in real conversations.",
            "Ask and answer questions about name, where someone is from, and where they live.",
            "Use basic feeling words and understand when to use each one in context.",
            "Recognize when to use different greetings (morning, evening, religious, casual).",
            "Interact in a full conversation: greeting → small talk → introduction → polite closing.",
        ],
    },

    useInLife: [
        { ar: "شو اسمك؟", en: "What's your name?" },
        { ar: "إنتَ/إنتِ من وين؟", en: "Where are you from?" },
    ],

    // ====================================
    // VOCABULARY (carefully curated)
    // ====================================
    vocabulary: {
        core: [
            // ====== GREETINGS & REPLIES ======
            {
                id: "marhaba",
                ar: "مَرْحَبَا",
                en: "Hello",
                enArabeezy: "marhaba",
                hint:
                    "Very common, friendly greeting. You can use it any time of day with friends, classmates, or even teachers in a relaxed setting. Works for one person or a group (add يا جَمَاعَة).",
                exampleAr: "مَرْحَبَا! كِيفَك؟",
                exampleArabeezy: "marhaba! keefak?",
                exampleEn: "Hello! How are you?",
            },
            {
                id: "ahlan",
                ar: "أَهْلًا",
                en: "Hi",
                enArabeezy: "ahlan",
                hint:
                    "Short, warm reply to مَرْحَبَا or to call someone’s attention. Often used with a name: أَهْلًا يَا لِين.",
                exampleAr: "مَرْحَبَا لِين. ـ أَهْلًا سامر.",
                exampleArabeezy: "marhaba leen. - ahlan samer.",
                exampleEn: "Hello, Lynn. — Hi, samer.",
            },
            {

                id: "ahlan_wa_sahlan",
                ar: "أَهْلًا وَسَهْلًا",
                en: "Welcome",
                enArabeezy: "ahlan wa sahlan",
                hint: "Very warm welcome for guests or new students. Often followed by فيك / فيكي / فيكم.",

                exampleAr: "أهلًا وسهلًا فيك، نَوَّرِت المكان!",
                exampleArabeezy: "ahlan wa sahlan feek, nawwarit el-makaan!",
                exampleEn: "Welcome! You lit up the place! (You’re very welcome here.)"


            },
            {
                id: "sabah_el_kheir",
                ar: "صَبَاح الْخِير",
                en: "Good morning",
                enArabeezy: "sabah_el_kheir",
                hint:
                    "Used in the morning. Typical reply is صَبَاح النُّور. Often used with teachers, coworkers, or in class.",
                exampleAr: "صَبَاح الْخِير يَا أُسْتَاذ.",
                exampleArabeezy: "sabah el-kheir ya ustaz.",
                exampleEn: "Good morning, teacher.",
            },
            {
                id: "sabah_el_noor",
                ar: "صَبَاح النُّور",
                en: "Morning of brightness",
                enArabeezy: "sabah_el_noor",
                hint:
                    "Standard reply to صَبَاح الْخِير. Literally ‘morning of light’.",
                exampleAr: "صَبَاح الْخِير. ـ صَبَاح النُّور.",
                exampleArabeezy: "sabah el-kheir. - sabah el-noor.",
                exampleEn: "Good morning. — Morning of brightness.",
            },
            {
                id: "masa_el_kheir",
                ar: "مَسَا الْخِير",
                en: "Good evening",
                enArabeezy: "masa_el_kheir",
                hint:
                    "Used in the evening or at night. Typical reply: مَسَا النُّور. Can be formal or casual.",
                exampleAr: "مَسَا الْخِير يَا جِيرَان.",
                exampleArabeezy: "masa el-kheir ya jiran.",
                exampleEn: "Good evening, neighbors.",
            },

            {
                id: "masa_el_noor",
                ar: "مَسَا النُّور",
                en: "Evening of Brightness",
                enArabeezy: "masa_el_noor",
                hint:
                    "Standard reply to مَسَا الْخِير.",
                exampleAr: "مَسَا الْخِير. ـ مَسَا النُّور.",
                exampleArabeezy: "masa el-kheir. - masa el-noor.",
                exampleEn: "Good evening. — Evening of Brightness.",
            },

            // ====== HOW ARE YOU & FEELINGS ======
            {
                id: "kif_halak",
                ar: "كِيف حَالَك؟",
                en: "How are you?",
                enArabeezy: "keef_halak / keef_halik",
                hint:
                    "Base question ‘How are you?’. Forms: masc كِيف حَالَك؟ (kīf ḥalak), fem كِيف حَالِك؟ (kīf ḥalik), plural كِيف حَالْكُم؟ (kīf ḥalkum). Use after greeting to open small talk.",
                exampleAr: "مَرْحَبَا، كِيف حَالَك الْيَوْم؟",
                exampleArabeezy: "marhaba, keef 7alak el-yom?",
                exampleEn: "Hello, how are you today?",
            },
            {
                id: "mnee7",
                ar: "مْنِيح",
                en: "good / fine",
                enArabeezy: "mnee7 / mnee7a",
                hint:
                    "Very common positive answer. Forms: masc مْنِيح, fem مْنِيحَة, plural مْنَاح. Often followed by شُكْرًا.",
                exampleAr: "أَنَا مْنِيحَة، شُكْرًا. وَإِنْتَ كِيف حَالَك؟",
                exampleArabeezy: "ana mnee7a, shukran. w inta keef 7alak?",
                exampleEn: "I’m good, thanks. And how are you?",
            },
            {
                id: "maashi",
                ar: "مَاشِي الحال",
                en: "okay / so-so",
                enArabeezy: "maashi el-7al",
                hint:
                    "Neutral answer. Means ‘I’m okay’ or ‘so-so’. Used when things are not great, but not bad either.",
                exampleAr: "كِيفَك؟ مَاشِي الحال.",
                exampleArabeezy: "keefak? maashi el-7al.",
                exampleEn: "How are you? I'm okay / so-so.",
            }
            ,
            {
                id: "ta3ban",
                ar: "تَعْبَان",
                en: "tired",
                enArabeezy: "ta3ban / ta3baneh",
                hint:
                    "Feeling word. Masculine: تَعْبَان, Feminine: تَعْبَانَة. Used for physical or mental tiredness.",
                exampleAr: "أَنَا تَعْبَان شْوَيّ الْيَوْم.",
                exampleArabeezy: "ana ta3ban shway el-yom.",
                exampleEn: "I’m a little tired today.",
            }
            ,
            {
                id: "mabsut",
                ar: "مَبْسُوط",
                en: "happy / pleased",
                enArabeezy: "mabsut / mabsuta / mabsuTeen",
                hint:
                    "Positive feeling word. Masculine: مَبْسُوط, Feminine: مَبْسُوطَة, Plural: مَبْسُوطِين.",
                exampleAr: "أَنَا مَبْسُوط إِنَّك هُون.",
                exampleArabeezy: "ana mabsut innak hon.",
                exampleEn: "I’m happy you’re here.",
            }
            ,

            // ====== IDENTITY & ORIGIN ======
            {
                id: "shu_ismak",
                ar: "شُو اِسْمَك؟",
                en: "What’s your name?",
                enArabeezy: "shu_ismak / shu_ismik",
                hint:
                    "Basic identity question. Forms: masc شُو اِسْمَك؟ (shu ismak), fem شُو اِسْمِك؟ (shu ismik). Use it right after greeting.",
                exampleAr: "مَرْحَبَا، شُو اِسْمَك ؟",
                exampleArabeezy: "marhaba, shu ismak ?",
                exampleEn: "Hi, what’s your name?",
            },
            {
                id: "ana_ismi",
                ar: "أَنَا اِسْمِي...",
                en: "My name is…",
                enArabeezy: "ana_ismi",
                hint:
                    "Standard way to introduce your name. You can add your country or job after.",
                exampleAr: "أَنَا اِسْمِي ربَا.",
                exampleArabeezy: "ana ismi roba",
                exampleEn: "My name is Roba",
            },
            {
                id: "min_wen",
                ar: "مِنْ وِين؟",
                en: "Where are you from?",
                enArabeezy: "min wein / min wen",
                hint:
                    "Question about origin. You can ask: مِنْ وِين إِنْتَ؟ (to a man) or مِنْ وِين إِنْتِ؟ (to a woman). Used for country or city.",
                exampleAr: "مِنْ وِين إِنْتَ؟",
                exampleArabeezy: "min wein inta?",
                exampleEn: "Where are you from?",
            }
            ,
            {
                id: "ana_min",
                ar: "أَنَا مِنْ...",
                en: "I am from…",
                enArabeezy: "ana min...",
                hint:
                    "Use with a country or city: أَنَا مِنْ غَزَّة، أَنَا مِنْ أَلْمَانْيَا.",
                exampleAr: "أَنَا مِنْ هُولَنْدَا.",
                exampleArabeezy: "ana min holanda.",
                exampleEn: "I am from the Netherlands.",
            }
            ,
            {
                id: "wen_saken",
                ar: "وِين سَاكِن؟",
                en: "Where do you live?",
                enArabeezy: "weyn_saken / weyn_sakneh",
                hint:
                    "Talking about where you live now. Forms: masc وِين سَاكِن؟, fem وِين سَاكْنَة؟, plural وِين سَاكْنِين؟.",
                exampleAr: "هَلَّقيت إِنْتِ وِين سَاكْنَة؟",
                exampleArabeezy: "hall2 inti wein sakneh?",
                exampleEn: "Where do you live now?",
            },
            {
                id: "ana_saken_fi",
                ar: "أَنَا سَاكِن فِي...",
                en: "I live in…",
                enArabeezy: "ana saken fi... / ana sakneh fi...",
                hint:
                    "Masculine: سَاكِن, Feminine: سَاكْنَة. Used to say where you live.",
                exampleAr: "أَنَا سَاكِن فِي رَام اللّٰه.",
                exampleArabeezy: "ana saken fi ramallah.",
                exampleEn: "I live in Ramallah.",
            }
            ,

            // ====== CLASSROOM & ROLE WORDS ======
            {
                id: "talib",
                ar: "طَالِب / طَالْبَة",
                en: "student",
                enArabeezy: "taleb / talbeh",
                hint:
                    "Masculine: طَالِب, Feminine: طَالْبَة. Used for school or university students.",
                exampleAr: "أَنَا طَالْبَة فِي الْجَامْعَة.",
                exampleArabeezy: "ana talbeh fel-jam3a.",
                exampleEn: "I am a student at the university.",
            }
            ,
            {
                id: "ustaz",
                ar: "أُسْتَاذ / أُسْتَاذَة",
                en: "teacher",
                enArabeezy: "ostaz / ostaze",
                hint:
                    "Masc أُسْتَاذ, fem أُسْتَاذَة. You can call your teacher ‘أُسْتَاذ + name’.",
                exampleAr: "مَرْحَبَا أُسْتَاذ، كِيف حَالَك الْيَوْم؟",
                exampleArabeezy: "marhaba ustaz, keef 7alak el-yom?",
                exampleEn: "Hi teacher, how are you today?",
            },
            {
                id: "dars",
                ar: "دَرْس",
                en: "lesson / class",
                enArabeezy: "dars",
                hint:
                    "Used for one lesson or class. Example: دَرْس الْيَوْم = today’s lesson.",
                exampleAr: "هَادَا أَوَّل دَرْس فِي الْعَرَبِي.",
                exampleArabeezy: "hada awwal dars fil-3arabi.",
                exampleEn: "This is the first Arabic lesson.",
            }
            ,


            // ====== POLITENESS & CLOSING ======
            {
                id: "shukran",
                ar: "شُكْرًا",
                en: "thank you",
                enArabeezy: "shukran",
                hint:
                    "Very common thanks. Stronger: شُكْرًا كْتِير = thank you very much.",
                exampleAr: "شُكْرًا كْتِير عَلَى الدَّرْس الْيَوْم.",
                exampleArabeezy: "shukran kteer 3ala ed-dars el-yom.",
                exampleEn: "Thank you very much for the lesson today.",
            },
            {
                id: "afwan",
                ar: "عَفْوًا",
                en: "you’re welcome",
                enArabeezy: "3afwan",
                hint:
                    "Standard reply to شُكْرًا. Can also lightly mean ‘excuse me’.",
                exampleAr: "شُكْرًا أُسْتَاذ. ـ عَفْوًا.",
                exampleArabeezy: "shukran ustaz. - 3afwan",
                exampleEn: "Thank you, teacher. — You’re welcome.",
            },
            {
                id: "law_samaHt",
                ar: "لَوْ سَمَحْت",
                en: "please / excuse me",
                enArabeezy: "law_sama7t / law_sama7ti",
                hint:
                    "Polite way to ask for something: ‘please’. Fem لَوْ سَمَحْتِي, plural لَوْ سَمَحْتُوا.",
                exampleAr: "لَوْ سَمَحْت، عِيد الْجُمْلَة.",
                exampleArabeezy: "law sama7t, 3eed el-jumle.",
                exampleEn: "Please repeat the sentence.",

            },
            {
                id: "ana_mesh_fahem",
                ar: "أَنَا مِش فَاهِم",
                en: "I don’t understand",
                enArabeezy: "ana_mesh_fahem / ana_mesh_fahmeh",
                hint:
                    "Masc أَنَا مِش فَاهِم, fem أَنَا مِش فَاهْمَة. Very useful in class and real life!",
                exampleAr: "أَنَا مِش فَاهْمَة الْكَلِمَة؟",
                exampleArabeezy: "ana mish fahmeh el-kalmeh?",
                exampleEn: "I don’t understand the word?",
            },
            {
                id: "ma3_salaameh",
                ar: "مَع السَّلَامَة",
                en: "goodbye",
                enArabeezy: "ma3_salaameh",
                hint:
                    "Polite goodbye. Often used at the end of a call, visit, or lesson.",
                exampleAr: "مَع السَّلَامَة، بَشُوفْك بُكْرَا.",
                exampleArabeezy: "ma3 es-salameh, bashufak bukra.",
                exampleEn: "Goodbye, I’ll see you tomorrow.",
            },
            {
                id: "alla_ma3ak",
                ar: "الله مَعَك",
                en: "God be with you",
                enArabeezy: "allah_ma3ak / allah_ma3ek",
                hint:
                    "Common closing phrase. Fem: الله مَعِك, plural: الله مَعْكُم.",
                exampleAr: "مَع السَّلَامَة، الله مَعِك.",
                exampleArabeezy: "ma3 es-salameh, allah ma3ak.",
                exampleEn: "Goodbye, God be with you.",
            },
            {
                id: "yalla",
                ar: "يَلَّا",
                en: "come on / let’s go",
                enArabeezy: "yalla",
                hint:
                    "Very frequent word to start or finish something: ‘okay, let’s…’.",
                exampleAr: "يَلَّا، نِبْدَا الدَّرْس الْأَوَّل.",
                exampleArabeezy: "yalla, nebda ed-dars el-awwal.",
                exampleEn: "Come on, let’s start the first lesson.",
            },
        ],

    },

    // ====================================
    // DIALOGUE (multi-scene, rich)
    // ====================================
    dialogue: {
        lines: [
            {
                "speaker": "Teacher",
                "ar": "مَرْحَبَا، أَهْلًا وَسَهْلًا فِي الدَّرْس!",
                "arArabeezy": "mr7ba, ahla wshla fy eldrs!",
                "en": "Hi, welcome to the lesson!"
            },
            {
                "speaker": "Lina",
                "ar": "مَرْحَبَا أُسْتَاذ.",
                "arArabeezy": "mr7ba astadh.",
                "en": "Hi, teacher."
            },
            {
                "speaker": "Teacher",
                "ar": "صَبَاح الْخِير، كِيفَك الْيَوْم؟",
                "arArabeezy": "sba7 elkhyr, kyfk elywm?",
                "en": "Good morning, how are you today?"
            },
            {
                "speaker": "Lina",
                "ar": "أَنَا مْنِيحَة، شُكْرًا. وَإِنْتَ؟",
                "arArabeezy": "ana mny7a, shkra. wint?",
                "en": "I’m good, thanks. And you?"
            },
            {
                "speaker": "Teacher",
                "ar": "أَنَا مْنِيح، الْحَمْدِلِلَّه.",
                "arArabeezy": "ana mny7, el7mdllh.",
                "en": "I’m good, praise be to God."
            },
            {
                "speaker": "Teacher",
                "ar": "شُو اِسْمِك؟",
                "arArabeezy": "shw asmk?",
                "en": "What’s your name?"
            },
            {
                "speaker": "Lina",
                "ar": "أَنَا اِسْمِي لِينْ.",
                "arArabeezy": "ana asmy lyn.",
                "en": "My name is Lynn."
            },
            {
                "speaker": "Teacher",
                "ar": "فُرْصَة سَعِيدَة يَا لِينْ.",
                "arArabeezy": "frsa s3yda ya lyn.",
                "en": "Nice to meet you, Lynn."
            },
            {
                "speaker": "Lina",
                "ar": "تْشَرَّفْت فِيك أُسْتَاذ.",
                "arArabeezy": "tshrft fyk astadh.",
                "en": "Pleased to meet you, teacher."
            },
            {
                "speaker": "Teacher",
                "ar": "مِنْ وِين إِنْتِي ",
                "arArabeezy": "mn wyn inty ?",
                "en": "Where are you from?"
            },
            {
                "speaker": "Lina",
                "ar": "أَنَا مِنْ كَنَدَا.",
                "arArabeezy": "ana mn knda.",
                "en": "I’m from Canada."
            },
            {
                "speaker": "Teacher",
                "ar": "حِلُو! وَهَلَّقيت وِين سَاكْنَة؟",
                "arArabeezy": "7lw! whlqyt wyn sakna?",
                "en": "Nice! And where do you live now?"
            },
            {
                "speaker": "Lina",
                "ar": "هَلَّقيت أَنَا سَاكْنَة فِي رَام اللّٰه.",
                "arArabeezy": "hlqyt ana sakna fy ram ellh.",
                "en": "Now I live in Ramallah."
            },
            {
                "speaker": "Lina",
                "ar": "وَإِنْتَ مِنْ وِين؟",
                "arArabeezy": "wint mn wyn?",
                "en": "And where are you from?"
            },
            {
                "speaker": "Teacher",
                "ar": "أَنَا مِنْ غَزَّة، بَسّ هَلَّقيت بَشْتِغِل فِي الْقُدْس.",
                "arArabeezy": "ana mn ghza, bs hlqyt bshtghl fy elqds.",
                "en": "I’m from Gaza, but now I work in Jerusalem."
            },
            {
                "speaker": "Teacher",
                "ar": "إِنْتِي طَالْبَة وَلَّا بِتْشْتِغْلِي؟",
                "arArabeezy": "inty talba wla btshtghly?",
                "en": "Are you a student or do you work?"
            },
            {
                "speaker": "Lina",
                "ar": "أَنَا طَالْبَة، بَدْرُس عَرَبِي وَإِنْجِلِيزِي.",
                "arArabeezy": "ana talba, bdrs 3rby winjlyzy.",
                "en": "I’m a student, I study Arabic and English."
            },
            {
                "speaker": "Teacher",
                "ar": "حِلُو، أَنَا كَمَان أُسْتَاذ عَرَبِي.",
                "arArabeezy": "7lw, ana kman astadh 3rby.",
                "en": "Nice, I’m also an Arabic teacher."
            },
            {
                "speaker": "Lina",
                "ar": "مَبْسُوطَة إِنِّي مَعَك فِي الدَّرْس.",
                "arArabeezy": "mbswta iny m3k fy eldrs.",
                "en": "I’m happy to be in your class."
            },
            {
                "speaker": "Teacher",
                "ar": "وَإِحْنَا مَبْسُوطِين فِيك كَمَان.",
                "arArabeezy": "wi7na mbswtyn fyk kman.",
                "en": "And we’re happy to have you too."
            },
            {
                "speaker": "Adam",
                "ar": "السَّلَامُ عَلَيْكُمْ يَا شَبَاب!",
                "arArabeezy": "elslam 3lykm ya shbab!",
                "en": "Peace be upon you, everyone!"
            },
            {
                "speaker": "Lina",
                "ar": "وَعَلَيْكُم السَّلَام، مَرْحَبَا!",
                "arArabeezy": "w3lykm elslam, mr7ba!",
                "en": "And peace be upon you, hi!"
            },
            {
                "speaker": "Teacher",
                "ar": "كِيفْكُم الْيَوْم؟",
                "arArabeezy": "kyfkm elywm?",
                "en": "How are you all today?"
            },
            {
                "speaker": "Adam",
                "ar": "إِحْنَا مْنَاح، بَسّ شَوَيّ تَعْبَانِين.",
                "arArabeezy": "i7na mna7, bs shwy t3banyn.",
                "en": "We’re fine, just a bit tired."
            },
            {
                "speaker": "Sara",
                "ar": "أَنَا مَبْسُوط إِنِّي بَدْرُس عَرَبِي مَعْكُم.",
                "arArabeezy": "ana mbswt iny bdrs 3rby m3km.",
                "en": "I’m happy that I study Arabic with you all."
            },
            {
                "speaker": "Teacher",
                "ar": "طَيِّب يَلَّا، هَادَا كَانَ التَّعَارُف الْأَوَّل.",
                "arArabeezy": "tyb yla, hada kan elt3arf elawl.",
                "en": "Alright, this was our first introduction."
            },
            {
                "speaker": "Teacher",
                "ar": "مَع السَّلَامَة، مَا تِنْسُوا الْوَاجِب.",
                "arArabeezy": "m3 elslama, ma tnswa elwajb.",
                "en": "Goodbye, don’t forget the homework."
            },
            {
                "speaker": "Lina",
                "ar": "مَع السَّلَامَة أُسْتَاذ، بِالتَّوْفِيق.",
                "arArabeezy": "m3 elslama astadh, beltwfyq.",
                "en": "Goodbye, teacher, good luck."
            },
            {
                "speaker": "Adam",
                "ar": "شُكْرًا، اِنْبِسِطُوا بِوَقْتْكُم الْيَوْم.",
                "arArabeezy": "shkra, anbstwa bwqtkm elywm.",
                "en": "Thank you, enjoy your time today."
            },

        ]
    }
    ,

    // ====================================
    // GRAMMAR (creative, like a mini textbook)
    // ====================================

    grammar: [
        {
            id: "pronouns_nominal",
            title: "Pronouns (أنا، إنت، هو)",
            short: "Pronouns replace names in simple sentences.",
            description:
                `Pronouns tell us who we are talking about.
In spoken Palestinian Arabic, we use them directly with names, adjectives, and countries.

Golden Rule:
Use pronouns to avoid repeating a name.`,
            table: {
                title: "Independent Pronouns",
                headers: ["Arabic", "Arabeezy", "English", "Usage Note"],
                rows: [
                    ["أنا", "ana", "I", "Speaker"],
                    ["إنتَ", "inta", "You (m)", "Male listener"],
                    ["إنتِ", "inti", "You (f)", "Female listener"],
                    ["هو", "howwa", "He", "Male third person"],
                    ["هي", "hiyye", "She", "Female third person"],
                    ["إحنا", "e7na", "We", "Group including speaker"],
                    ["إنتو", "ento", "You (plural)", "Talking to more than one person"],
                    ["هما", "hama", "They", "Group of people"],
                ]
            },
            examples: [
                { ar: "أنا طالب", arabeezy: "ana taaleb", en: "I am a student." },
                { ar: "إنتَ منيح", arabeezy: "inta mnee7", en: "You are good. (m)" },
                { ar: "إنتِ من مصر", arabeezy: "inti min masr", en: "You are from Egypt. (f)" },
                { ar: "هو تعبان", arabeezy: "howwa ta3ban", en: "He is tired." },
                { ar: "هي فلسطينية", arabeezy: "hiyye falastiniyyeh", en: "She is Palestinian." },
                { ar: "إحنا جاهزين", arabeezy: "e7na جاهzeen", en: "We are ready." },
                { ar: "إنتو طلاب", arabeezy: "ento tullab", en: "You are students." },
                { ar: "هما مشغولين", arabeezy: "homa mashghooleen", en: "They are busy." }
            ],
            teacherNotes:
                `Spoken often drops the formal MSA feel: “هو تعبان” not “إنه متعب”.
Pronouns are used more frequently in spoken for clarity.
MSA may use “أنا طالبٌ” with case endings; spoken drops them.
Keep focus on pronouns + short sentences only.`,
            commonMistakes: [
                "Mixing إنتَ and إنتِ",
                "Adding a verb ‘to be’ (هو يكون تعبان)",
                "Using MSA pronunciation (أنتَ) instead of spoken إنتَ",
            ],
            functionalUse:
                "Used in greetings and introductions to identify who you are and describe yourself or others.",
        },
        {
            id: "nominal_sentence",
            title: "Nominal Sentence (no ‘to be’ in present)",
            short: "Present tense ‘to be’ is not spoken in Arabic.",
            description:
                `In Palestinian Arabic, we don’t say “am/is/are” in the present.
We connect a subject directly to a noun or adjective.

Golden Rule:
Subject + adjective/noun = complete sentence.`,
            table: {
                title: "Nominal Sentence Patterns",
                headers: ["Arabic", "Arabeezy", "English", "Usage Note"],
                rows: [
                    ["أنا + صفة", "ana + sifah", "I am + adjective", "Feelings"],
                    ["هو/هي + اسم", "howwa/hiyye + ism", "He/She is + noun", "Identity"],
                    ["إنتَ/إنتِ + من + بلد", "inta/inti + min + balad", "You are from + country", "Origin"],
                    ["أنا + جنسية", "ana + jinsiyyeh", "I am + nationality", "Identity"],
                ]
            },
            examples: [
                { ar: "أنا منيح", arabeezy: "ana mnee7", en: "I am fine." },
                { ar: "إنتِ تعبانة", arabeezy: "inti ta3baaneh", en: "You are tired. (f)" },
                { ar: "هو أستاذ", arabeezy: "howwa ustaz", en: "He is a teacher." },
                { ar: "هي من الأردن", arabeezy: "hiyye min el-ordon", en: "She is from Jordan." },
                { ar: "أنا فلسطيني", arabeezy: "ana falastini", en: "I am Palestinian." }
            ],
            teacherNotes:
                `MSA also drops “to be” in the present, but spoken is shorter and faster.
In spoken, “أنا طالب” is enough without case endings.
Avoid over-explaining grammar terms; model sentences.
Drill with substitutions: pronoun + adjective/noun.`,
            commonMistakes: [
                "Adding ‘am/is/are’ (أنا أكون منيح)",
                "Using full MSA endings (طالبٌ, فلسطينيٌّ)",
                "Forgetting feminine adjective endings",
            ],
            functionalUse:
                "Used for introductions, describing feelings, jobs, and nationalities in everyday speech.",
        },
    ],
    microChecks: {
        enabled: true,
        every: 5,
        items: [
            {
                id: "mc_match_1",
                type: "match",
                prompt: "Match the English word to Arabic: Hello",
                options: ["مَرْحَبَا", "أَهْلًا", "أَهْلًا وَسَهْلًا", "صَبَاح الْخِير", "صَبَاح النُّور"],
                correct: "مَرْحَبَا",
            },
            {
                id: "mc_complete_2",
                type: "complete",
                prompt: "Complete the Arabic sentence for: Good evening, neighbors.\n يَا جِيرَان.___",
                options: ["مَسَا الْخِير", "مَسَا النُّور", "كِيف حَالَك؟", "مْنِيح", "مَاشِي"],
                correct: "مَسَا الْخِير",
            },
            {
                id: "mc_reorder_3",
                type: "reorder",
                prompt: "Reorder the Arabic words to match: Today I’m a bit tired from studying.",
                options: ["الْيَوْم", "أَنَا", "تَعْبَان", "شْوَيّ", "مِن", "الدِّرَاسَة"],
                correct: ["الْيَوْم", "أَنَا", "تَعْبَان", "شْوَيّ", "مِن", "الدِّرَاسَة"],
            },
            {
                id: "mc_choose_4",
                type: "choose",
                prompt: "Choose the correct Arabic word for: I am from…",
                options: ["أَنَا مِنْ...", "وِين سَاكِن؟", "أَنَا سَاكِن فِي...", "طَالِب / طَالْبَة", "أُسْتَاذ / أُسْتَاذَة"],
                correct: "أَنَا مِنْ...",
            },
            {
                id: "mc_match_5",
                type: "match",
                prompt: "Match the English word to Arabic: lesson / class",
                options: ["دَرْس", "اللُّغَة الْعَرَبِيَّة", "شُكْرًا", "عَفْوًا", "لَوْ سَمَحْت"],
                correct: "دَرْس",
            },
            {
                id: "mc_complete_6",
                type: "complete",
                prompt: "Complete the Arabic sentence for: Goodbye, I’ll see you tomorrow.\n___، بَشُوفْك بُكْرَا.",
                options: ["أَنَا مِش فَاهِم", "مَع السَّلَامَة", "الله مَعَك", "يَلَّا"],
                correct: "مَع السَّلَامَة",
            },
        ],
    },

    // ====================================
    // PRACTICE (quiz + interactive role-plays)
    // ====================================
    practice: {
        quiz: [
            {
                id: "greet_q1",
                questionAr: "«مِنْ وِين إِنْتِ؟» مَعْنَاهَا:",
                optionsEn: [
                    "What is your name? (to a female)",
                    "Where are you from? (to a female)",
                    "Where do you live now? (to a female)",
                ],
                correctIndex: 1,
            },
            {
                id: "greet_q2",
                questionAr: "«أَنَا سَاكِن فِي غَزَّة» مَعْنَاهَا:",
                optionsEn: [
                    "I am from Gaza.",
                    "I live in Gaza (male speaking).",
                    "I work in Gaza.",
                ],
                correctIndex: 1,
            },

            {
                id: "greet_q4",
                questionAr: "«أَنَا مِش فَاهْمَة الْكَلِمَة» مَعْنَاهَا:",
                optionsEn: [
                    "I don’t understand the word (female speaking).",
                    "I don’t like the word.",
                    "I can’t say the word.",
                ],
                correctIndex: 0,
            },
            {
                id: "greet_q5",
                questionAr: "When someone says «شُكْرًا كْتِير» what’s a natural reply?",
                optionsEn: [
                    "Good morning.",
                    "You’re welcome.",
                    "See you yesterday.",
                ],
                correctIndex: 1,
            },
        ],

        rolePlays: [
            "Role-play 1: Student A is the teacher, Student B is new. A greets B (choose مَرْحَبَا أو السَّلَامُ عَلَيْكُمْ), asks about name, where B is from, and where B lives now. Then switch roles.",
            "Role-play 2: Two students meet in the morning in Gaza. Start with صَبَاح الْخِير / صَبَاح النُّور, ask كِيف حَالَك؟ and answer using مْنِيح / مَاشِي / تَعْبَان. Add at least one follow-up question about study or work.",
            "Role-play 3: At the end of an online lesson, say goodbye in a natural way. Use: شُكْرًا, مَع السَّلَامَة, الله مَعَك, and maybe يَلَّا. Try to make the goodbye sound friendly and not robotic.",
        ],
        translation: [
            { id: "greet_t1", type: "enToAr", textEn: "Hi, how are you?", textAr: "مرحباً، كيفك؟" },
            { id: "greet_t2", type: "arToEn", textEn: "My name is Lina.", textAr: "أنا اسمي لينا." },
            { id: "greet_t3", type: "enToAr", textEn: "Where are you from?", textAr: "إنتَ/إنتِ من وين؟" },
            { id: "greet_t4", type: "arToEn", textEn: "I live in Ramallah.", textAr: "أنا ساكن/ساكنة برام الله." },
            { id: "greet_t5", type: "enToAr", textEn: "Nice to meet you.", textAr: "تشرفنا." },
            { id: "greet_t6", type: "arToEn", textEn: "Goodbye, see you tomorrow.", textAr: "مع السلامة، بشوفك بكرا." },
        ],
    },

    // ====================================
    // HOMEWORK
    // ====================================
    homework: {
        instructions:
            "Write and record a 45–60 second self-introduction in Palestinian Arabic. Include: a greeting, your name, where you are from, where you live now, one feeling word (for example: مْنِيح / مَبْسُوط / تَعْبَان), and a natural closing such as مَع السَّلَامَة or الله مَعَك. Try to recycle at least 6 words from the vocabulary list.",
    },

    // ====================================
    // TEACHER NOTES (for you on Preply)
    // ====================================
    teacherNotes: {
        warmup: [
            "Start in English: explain that this unit is about real greetings and introductions that students can use from minute one in Palestine or online.",
            "Ask students how they usually say ‘hi’ in their own language, then connect it to مَرْحَبَا / السَّلَامُ عَلَيْكُمْ.",
            "Play a quick game: you say different times or places (morning, evening, mosque, Preply class) and the student chooses a suitable greeting.",
        ],
        vocabularySteps: [
            "Teach greetings in small groups (3–4 items) and always show when to use each one (time of day, casual vs formal).",
            "When teaching feelings, act them physically (tired, happy) and let the student guess the meaning before you confirm.",
            "Use the hints actively: ask students to notice masc/fem/plural forms but keep the entry as one main word.",
        ],
        dialogueSteps: [
            "First time: read the whole dialogue with natural speed while the student just listens.",
            "Second time: read line by line and let the student repeat (shadowing). Focus on rhythm and melody, not only words.",
            "Third time: hide the English and ask the student to tell you in English what is happening in each scene.",
            "Finally: have the student personalize the dialogue: change the countries, cities, and feelings but keep the structure.",
        ],
        practiceTips: [
            "Treat the quiz as conversation prompts, not a formal test. After each answer, ask a mini follow-up question.",
            "Encourage the student to answer questions about themselves using the same patterns from the dialogue.",
            "When the student says something slightly wrong but understandable, repeat it back in the correct way so they hear the model.",
        ],
        wrapup: [
            "End the lesson in Arabic using only words from this unit: greeting → small talk → goodbye.",
            "Ask the student to tell you: which greeting feels most natural to them and which one they want to practice more.",
            "Remind them of the homework and suggest that they send the recording before the next lesson so you can give feedback.",
        ],
        myNotes: "",
    },
};
