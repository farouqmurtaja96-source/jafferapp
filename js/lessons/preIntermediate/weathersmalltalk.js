import { LESSON_ID_WEATHER } from '../../core/constants.js';

export const lessonId = LESSON_ID_WEATHER;
export const lesson = {
    meta: {
        level: "Pre-Intermediate",
        unit: "Weather & Small Talk",
        lessonTitle: "Unit 9 – Weather & Small Talk",
    },

    overview: {
        title: "Unit 9 – Weather & Small Talk",
        description:
            "In this unit, students learn how to talk about the weather in the present, past, and future, and how to use weather as a natural way to start friendly small talk in Palestinian Arabic.",
        goals: [
            "Describe basic weather conditions (hot, cold, windy, rainy, humid).",
            "Talk about weather in different cities and seasons.",
            "Use small talk to start and continue light conversations.",
            "Use past/future to say how the weather was or will be.",
            "Express personal opinions about weather they like or hate.",
        ],
    },

    // ====================================
    // VOCABULARY
    // ====================================
    vocabulary: {
        core: [
            // ===== BASIC WEATHER WORDS =====
            {
                id: "el_jaww",
                ar: "الجَوّ",
                en: "the weather",
                enArabeezy: "el-jaww",
                hint: "Most common word for ‘weather’ in Palestinian Arabic.",
                exampleAr: "اليوم الجَوّ حِلُو.",
                exampleArabeezy: "elywm eljw 7lw.",
                exampleEn: "The weather is nice today.",
            },

            {
                id: "bared",
                ar: "بَرْد",
                en: "cold (weather)",
                enArabeezy: "bard",
                hint: "‘There is cold’: في بَرْد اليوم.",
                exampleAr: "فِي بَرْد قَوِي بِاللَّيْل.",
                exampleArabeezy: "fy brd qwy bellyl.",
                exampleEn: "It’s very cold at night.",
            },
            {
                id: "shawb",
                ar: "شُوب",
                en: "heat / hot weather",
                enArabeezy: "shob",
                hint: "Used for hot weather, not for spicy food!",
                exampleAr: "الدُّنْيا شُوب هالأَيام.",
                exampleArabeezy: "eldnya shwb halayam.",
                exampleEn: "It’s really hot these days.",
            },
            {
                id: "daafi",
                ar: "دَافِي",
                en: "warm",
                enArabeezy: "daafi",
                hint: "Masc: دَافِي، fem: دَافْيَة.",
                exampleAr: "الجَوّ دَافِي وَمُرِيح اليوم.",
                exampleArabeezy: "eljw dafy wmry7 elywm.",
                exampleEn: "The weather is warm and comfortable today.",
            },
            {
                id: "mureeh",
                ar: "مُرِيح",
                en: "comfortable (weather)",
                enArabeezy: "muree7",
                hint: "Not too hot, not too cold.",
                exampleAr: "الجَوّ مُرِيح، مْناسِب لِلْطِّلْعَة.",
                exampleArabeezy: "eljw mry7, mnasb leltl3a.",
                exampleEn: "The weather is comfortable, good for going out.",
            },
            {
                id: "rtoubeh",
                ar: "رُطُوبَة",
                en: "humidity",
                enArabeezy: "ruṭoobe / rotoobe",
                hint: "Very common in coastal cities.",
                exampleAr: "الرطوبة بالصيف بتكون عالية كتير.",
                exampleArabeezy: "elrtwba belsyf btkwn 3alya ktyr.",
                exampleEn: "The humidity is extreme in summer.",
            },

            // ===== SUN / CLOUD / RAIN =====
            {
                id: "shams",
                ar: "شَمِس",
                en: "sun",
                enArabeezy: "shamis / shams",
                hint: "Everyday word for sun.",
                exampleAr: "الشمس قويّة، لابس نضّارة شمس؟",
                exampleArabeezy: "elshms qwya, labs ndara shms?",
                exampleEn: "The sun is strong, are you wearing sunglasses?",
            },
            {
                id: "mshammes",
                ar: "مْشَمَّس",
                en: "sunny",
                enArabeezy: "mshammes",
                hint: "From شمس. Sunny day.",
                exampleAr: "بكرا الجو مشمس، نطلع نتمشّى؟",
                exampleArabeezy: "bkra eljw mshms, ntl3 ntmsha?",
                exampleEn: "Tomorrow is sunny, shall we go for a walk?",
            },
            {
                id: "ghem",
                ar: "غَيْم",
                en: "cloud",
                enArabeezy: "gheim / gheym",
                hint: "Cloud itself; for ‘clouds’: غيوم.",
                exampleAr: "في غَيْم كْتير بالسَّما.",
                exampleArabeezy: "fy ghym ktyr belsma.",
                exampleEn: "There are a lot of clouds in the sky.",
            },
            {
                id: "mghayyam",
                ar: "مْغَيَّم",
                en: "cloudy / overcast",
                enArabeezy: "mghayyam",
                hint: "Sky full of clouds.",
                exampleAr: "السَّما مْغَيَّمَة اليوم.",
                exampleArabeezy: "elsma mghyma elywm.",
                exampleEn: "The sky is cloudy today.",
            },
            {
                id: "matar",
                ar: "مَطَر",
                en: "rain",
                enArabeezy: "maTar / matar",
                hint: "There is rain: في مَطَر.",
                exampleAr: "أَحْلَى شِي لَمّا يِنْزِل مَطَر.",
                exampleArabeezy: "a7la shy lma ynzl mtr.",
                exampleEn: "The nicest thing is when it rains.",
            },
            {
                id: "btemTor",
                ar: "بْتِمْطِر",
                en: "it’s raining",
                enArabeezy: "btemTor / btimTor",
                hint: "Present tense ‘to rain’.",
                exampleAr: "بَرّا بْتِمْطِر، خُد شَمْسِيّة.",
                exampleArabeezy: "bra btmtr, khd shmsya.",
                exampleEn: "It’s raining outside, take an umbrella.",
            },

            {
                id: "ri7",
                ar: "الهوا",
                en: "wind",
                enArabeezy: "",
                hint: "Strong wind: رِيح قَوِيّة.",
                exampleAr: "الهوا قوي، سكّر الشباك.",
                exampleArabeezy: "elhwa qwy, skr elshbak.",
                exampleEn: "The wind is strong, close the window.",
            },
            {
                id: "3asefeh",
                ar: "عَاصْفَة",
                en: "storm",
                enArabeezy: "3aaSfeh / ʿaasfeh",
                hint: "Wind + strong rain = عاصفة.",
                exampleAr: "اللَّيْلِة في عَاصْفَة، مَنْضَلّ فِي الْبَيْت.",
                exampleArabeezy: "ellyla fy 3asfa, mndl fy elbyt.",
                exampleEn: "Tonight there’s a storm, we’ll stay home.",
            },
            {
                id: "talj",
                ar: "تَلْج",
                en: "snow",
                enArabeezy: "talj",
                hint: "Not very common in many cities, but known.",
                exampleAr: "نَزَل تَلْج بِاللَّيْل.",
                exampleArabeezy: "nzl tlj bellyl.",
                exampleEn: "It snowed last night.",
            },
            {
                id: "dababb",
                ar: "ضَباب",
                en: "fog",
                enArabeezy: "dabāb / dabaab",
                hint: "Low visibility, especially in morning.",
                exampleAr: "في ضباب عالطريق، سوق على مهلك.",
                exampleArabeezy: "fy dbab 3altryq, swq 3la mhlk.",
                exampleEn: "There’s fog on the road, drive slowly.",
            },

            // ===== TEMPERATURE & SEASONS =====
            {
                id: "darajet_el7arara",
                ar: "دَرَجَة الحَرارَة",
                en: "temperature",
                enArabeezy: "darajet el-7arāra",
                hint: "Literally ‘degree of heat’.",
                exampleAr: "دَرَجَة الحَرارَة اليوم حَوالَي عِشْرين.",
                exampleArabeezy: "drja el7rara elywm 7waly 3shryn.",
                exampleEn: "The temperature today is around twenty.",
            },
            {
                id: "ta7t_el_sefr",
                ar: "تَحْت الصِّفِر",
                en: "below zero",
                enArabeezy: "ta7t es-sefr",
                hint: "Very cold weather.",
                exampleAr: "بِهالْبَلَد الحَرارَة تَحْت الصِّفِر بِالشِّتَا.",
                exampleArabeezy: "bhalbld el7rara t7t elsfr belshta.",
                exampleEn: "In this country the temperature is below zero in winter.",
            },
            {
                id: "abrad_min",
                ar: "أَبْرَد مِن...",
                en: "colder than...",
                enArabeezy: "abrad min...",
                hint: "Comparative: اليوم أَبْرَد مِن امبارِح.",
                exampleAr: "اليوم أَبْرَد مِن امْبارِح.",
                exampleArabeezy: "elywm abrd mn ambar7.",
                exampleEn: "Today is colder than yesterday.",
            },
            {
                id: "fasl",
                ar: "فَصِل",
                en: "season",
                enArabeezy: "faSl / faSel",
                hint: "Plural: فُصُول.",
                exampleAr: "شُو أَحْلَى فَصِل عِنْدَك؟",
                exampleArabeezy: "shw a7la fsl 3ndk?",
                exampleEn: "What’s your favourite season?",
            },
            {
                id: "seif",
                ar: "صَيْف",
                en: "summer",
                enArabeezy: "Seyf / seif",
                hint: "",
                exampleAr: "مَا بَحِبّ الصَّيْف، الشُّوب بِجَنِّن.",
                exampleArabeezy: "ma b7b elsyf, elshwb bjnn.",
                exampleEn: "I don’t like summer, the heat is crazy.",
            },
            {
                id: "sheta",
                ar: "شِتَا",
                en: "winter",
                enArabeezy: "sheta",
                hint: "",
                exampleAr: "بِالشِّتَا بَلْبِس أَواعي ثَقِيلَة.",
                exampleArabeezy: "belshta blbs awa3y thqyla.",
                exampleEn: "In winter I wear heavy clothes.",
            },
            {
                id: "rabee3",
                ar: "رَبِيع",
                en: "spring",
                enArabeezy: "rabee3",
                hint: "",
                exampleAr: "الرَّبِيع فَصِل مُناسِب لِلْمَشِي.",
                exampleArabeezy: "elrby3 fsl mnasb lelmshy.",
                exampleEn: "Spring is a good season for walking.",
            },
            {
                id: "kharif",
                ar: "خَرِيف",
                en: "autumn / fall",
                enArabeezy: "kharif",
                hint: "",
                exampleAr: "بِالخَرِيف الوَرَق بْيُوقَع مِن الشَّجَر.",
                exampleArabeezy: "belkhryf elwrq bywq3 mn elshjr.",
                exampleEn: "In autumn the leaves fall from the trees.",
            },

            // ===== CLOTHES & DAILY TALK =====
            {
                id: "jaket",
                ar: "جاكِت",
                en: "jacket",
                enArabeezy: "jaket",
                hint: "Used for any light/medium jacket.",
                exampleAr: "لا تِنْسى الجاكِت، بَرّا بَرْد.",
                exampleArabeezy: "la tnsa eljakt, bra brd.",
                exampleEn: "Don’t forget your jacket, it’s cold outside.",
            },
            {
                id: "awa3i_2teeleh",
                ar: "أَواعِي ثَقِيلَة",
                en: "heavy clothes",
                enArabeezy: "awa3i ta2eeleh",
                hint: "Winter clothes: jackets, sweaters…",
                exampleAr: "طَلَّعْنا الأَواعِي الثَّقِيلَة لِلشِّتَا.",
                exampleArabeezy: "tl3na elawa3y elthqyla lelshta.",
                exampleEn: "We took out the heavy clothes for winter.",
            },

            // ===== SMALL TALK CHUNKS =====
            {
                id: "keef_el_jaww_3andak",
                ar: "كِيف الجَوّ عِنْدَك؟",
                en: "How’s the weather where you are?",
                enArabeezy: "keef el-jaww 3andak?",
                hint: "Perfect opener for small talk.",
                exampleAr: "كِيف الجَوّ عِنْدَك اليَوْم؟",
                exampleArabeezy: "kyf eljw 3ndk elywm?",
                exampleEn: "How’s the weather where you are today?",
            },
            {
                id: "el_jaww_mnasib",
                ar: "الجَوّ مْناسِب لِلْطِّلْعَة.",
                en: "The weather is good for going out.",
                enArabeezy: "el-jaww mnasib lil-ṭal3a",
                hint: "Nice positive comment about the day.",
                exampleAr: "اليوم الجَوّ مْناسِب لِلْطِّلْعَة عَالبَحِر.",
                exampleArabeezy: "elywm eljw mnasb leltl3a 3alb7r.",
                exampleEn: "Today the weather is good for going out to the beach.",
            },
            {
                id: "ma_bastahmel_el_shob",
                ar: "مَا بَسْتَحْمِل الشُّوب.",
                en: "I can’t stand the heat.",
                enArabeezy: "ma basta7mel esh-shob",
                hint: "Strong opinion about weather.",
                exampleAr: "صَرَاحَةً، مَا بَسْتَحْمِل الشُّوب.",
                exampleArabeezy: "sra7a, ma bst7ml elshwb.",
                exampleEn: "Honestly, I can’t stand the heat.",
            },
            {
                id: "b7eb_el_matar",
                ar: "بَحِبّ المَطَر.",
                en: "I love the rain.",
                enArabeezy: "ba7ebb el-matar",
                hint: "",
                exampleAr: "بَحِبّ المَطَر، بْحِسّ الجَوّ أَهْدَى.",
                exampleArabeezy: "b7b elmtr, b7s eljw ahda.",
                exampleEn: "I love the rain; I feel the weather is calmer.",
            },

        ],

        extra: [
            {
                id: "hawa_nashef",
                ar: "هَوا ناشِف",
                en: "dry air",
                enArabeezy: "hawa nashef",
                hint: "Opposite of humid air.",
                exampleAr: "بِالْجَبَل الهَوا ناشِف أَكْثَر.",
                exampleArabeezy: "beljbl elhwa nashf akthr.",
                exampleEn: "In the mountains the air is drier.",
            },
            {
                id: "hawa_m5noq",
                ar: "هَوا مْخْنُوق",
                en: "stuffy air",
                enArabeezy: "hawa mkhnooʔ / mkhno2",
                hint: "Air feels heavy or polluted.",
                exampleAr: "الجَوّ مْخْنُوق جُوّا، اِفْتَح الشُّبّاك شْوَيّ.",
                exampleArabeezy: "eljw mkhnwq jwa, aft7 elshbak shwy.",
                exampleEn: "The air inside feels stuffy, open the window a bit.",
            },
            {
                id: "nashret_ta2s",
                ar: "نَشْرَة طَقْس",
                en: "weather report / forecast",
                enArabeezy: "nashret ta2s",
                hint: "Like on TV or apps.",
                exampleAr: "شُفْت نَشْرَة الطَّقْس قَبِل ما تْسافِرِي؟",
                exampleArabeezy: "shft nshra eltqs qbl ma tsafry?",
                exampleEn: "Did you check the weather report before you travelled?",
            },

        ],
    }
    ,

    // ====================================
    // DIALOGUE (3 LONG SCENES)
    // ====================================
    dialogue: {
        lines: [
            {
                "speaker": "Lina",
                "ar": "صَباح الخير! كِيف الجَوّ بُرا؟",
                "arArabeezy": "sba7 elkhyr! kyf eljw bra?",
                "en": "Good morning! How’s the weather outside?"
            },
            {
                "speaker": "Rania",
                "ar": "صَباح النّور! مِشْمِس وشُوب شْوَي.",
                "arArabeezy": "sba7 elnwr! mshms wshwb shwy.",
                "en": "Good morning! Sunny and a bit hot."
            },
            {
                "speaker": "Lina",
                "ar": "بِفَكِّر نِطْلَع نِتْمَشّى.",
                "arArabeezy": "bfkr ntl3 ntmsha.",
                "en": "I think we should go for a walk."
            },
            {
                "speaker": "Rania",
                "ar": "مُمْكِن،بس ممكن تمطر بعد الظهر..",
                "arArabeezy": "mmkn, bs mmkn tmtr b3d elzhr. .",
                "en": "Maybe, but it might rain this afternoon."
            },
            {
                "speaker": "Lina",
                "ar": " إيش بتحبي أكتر؟ الصيف ولا الشتا؟",
                "arArabeezy": "iysh bt7by aktr?elsyf wla elshta?",
                "en": " what do you like more? Summer or winter?"
            },
            {
                "speaker": "Rania",
                "ar": "بِصِراحَة الشِّتا. بَحبّ الجَوّ البَارِد.",
                "arArabeezy": "bsra7a elshta. b7b eljw elbard.",
                "en": "Honestly winter. I love the cold weather."
            },
            {
                "speaker": "Lina",
                "ar": "أنا العَكْس! بَحبّ الصَّيف والبحَر.",
                "arArabeezy": "ana el3ks! b7b elsyf welb7r.",
                "en": "I’m the opposite! I love summer and the beach."
            },
            {
                "speaker": "Rania",
                "ar": "كُلّ فَصْل إِلُه جَمالُه.",
                "arArabeezy": "kl fsl ilh jmalh.",
                "en": "Every season has its beauty."
            },
            {
                "speaker": "Lina",
                "ar": "إحْتِمال نِشوف ثَلْج هَالسَّنَة؟",
                "arArabeezy": "i7tmal nshwf thlj halsna?",
                "en": "Maybe we’ll see snow this year?"
            },
            {
                "speaker": "Rania",
                "ar": "إذا الحَرارَة نَزَلَت تَحْت الصّفِر، أكيد!",
                "arArabeezy": "idha el7rara nzlt t7t elsfr, akyd!",
                "en": "If the temperature drops below zero, for sure!"
            },
            {
                "speaker": "Lina",
                "ar": "كيف الأمور بالجامعة؟",
                "arArabeezy": "kyf elamwr beljam3a?",
                "en": "How’s everything at university?"
            },
            {
                "speaker": "Rania",
                "ar": "تَمام، بُدرس كْتير. وإنتي؟",
                "arArabeezy": "tmam, bdrs ktyr. winty?",
                "en": "Good, studying a lot. And you?"
            },
            {
                "speaker": "Lina",
                "ar": "نَفْس الإِشي، بَس عِنْدي وِقْت لَلدَّرْدَشَة!",
                "arArabeezy": "nfs elishy, bs 3ndy wqt leldrdsha!",
                "en": "Same thing, but I have time for chatting!"
            },

            {
                "speaker": "Lina",
                "ar": "إسْمَعي! الهَوا قَوِيّ. نِلبُس جاكِت؟",
                "arArabeezy": "ism3y! elhwa qwy. nlbs jakt?",
                "en": "Listen! The wind is strong. Should we wear jackets?"
            },
            {
                "speaker": "Rania",
                "ar": "إي، خُدي جاكِت وأَواعي ثَقيلَة.",
                "arArabeezy": "iy, khdy jakt wawa3y thqyla.",
                "en": "Yes, take a jacket and heavy clothes."
            },
            {
                "speaker": "Lina",
                "ar": "الجَوّ اتغير بسرعة!",
                "arArabeezy": "eljw atghyr bsr3a!",
                "en": "The weather changed quickly!"
            },
            {
                "speaker": "Rania",
                "ar": "يمكن يكون مؤقّت.",
                "arArabeezy": "ymkn ykwn mwqt.",
                "en": "Maybe it’s temporary."
            },
            {
                "speaker": "Lina",
                "ar": "نستنى شوي؟ يمكن الهوا يوقّف.",
                "arArabeezy": "nstna shwy?ymkn elhwa ywqf.",
                "en": "Shall we wait a bit? Maybe the rain stops."
            },
            {
                "speaker": "Rania",
                "ar": "تمام. خلّينا نطّلع على النشرة.",
                "arArabeezy": "tmam. khlyna ntl3 3la elnshra.",
                "en": "Okay. Let’s check the forecast."
            },

            {
                "speaker": "Lina",
                "ar": "مَع السَّلامَة!",
                "arArabeezy": "m3 elslama!",
                "en": "Goodbye!"
            },
            {
                "speaker": "Rania",
                "ar": "مع السَّلامَة!",
                "arArabeezy": "m3 elslama!",
                "en": "Goodbye!"
            }
        ]
    }
    ,

    // ====================================
    // GRAMMAR – NEW FOCUS
    // ====================================

    grammar: [
        {
            id: "comparative",
            title: "Comparative (أكثر / أقل / أحسن)",
            short: "Compare two things with من.",
            description:
                `In spoken Arabic, we compare using أكثر / أقل / أحسن + من.
This is common in weather and daily opinions.

Pattern:
Comparative + من + second item.`,
            table: {
                title: "Common Comparatives",
                headers: ["Arabic", "Arabeezy", "English", "Usage"],
                rows: [
                    ["أكثر من", "aktar min", "more than", "Quantity"],
                    ["أقل من", "a2all min", "less than", "Quantity"],
                    ["أحسن من", "a7san min", "better than", "Quality"],
                    ["أسوأ من", "aswa2 min", "worse than", "Quality"]
                ]
            },
            examples: [
                { ar: "الجو اليوم أحسن من مبارح", arabeezy: "el-jaww el-yom a7san min mbaare7", en: "The weather today is better than yesterday." },
                { ar: "الشتا أكثر من السنة الماضية", arabeezy: "esh-sheta aktar min es-sane il-maDye", en: "The rain is more than last year." },
                { ar: "الحر أقل بالليل", arabeezy: "el-7arr a2all bel-leel", en: "The heat is less at night." },
                { ar: "هالنهار أسوأ من مبارح", arabeezy: "hal-nahaar aswa2 min mbaare7", en: "This day is worse than yesterday." },
                { ar: "الهوا أحسن من القعدة بالبيت", arabeezy: "el-hawa a7san min el-2a3de bel-beit", en: "Fresh air is better than staying at home." }
            ],
            teacherNotes:
                `MSA has formal comparative forms; spoken favors أحسن/أسوأ.
Practice with من consistently.
Use daily weather comparisons.
Keep sentences short.`,
            commonMistakes: [
                "Forgetting من",
                "Using formal MSA comparative words",
                "Mixing the order of items"
            ],
            functionalUse: "Use this to compare weather, prices, or feelings in small talk."
        },
        {
            id: "regular_plurals",
            title: "Regular Plurals (ـين / ـات)",
            short: "Use -ين for masculine, -ات for feminine and objects.",
            description:
                `Regular plurals are common in spoken Arabic.
Masculine human plurals often take -ين, and many feminine or object nouns take -ات.

Keep the pattern simple and spoken.`,
            table: {
                title: "Plural Examples",
                headers: ["Arabic", "Arabeezy", "English", "Pattern"],
                rows: [
                    ["مهندسين", "mohandseen", "engineers", "-een"],
                    ["معلمات", "mo3allmaat", "teachers (f)", "-aat"],
                    ["سيارات", "sayyaaraat", "cars", "-aat"],
                    ["لغات", "lughaat", "languages", "-aat"],
                    ["طلاب", "Tullaab", "students", "broken plural"]
                ]
            },
            examples: [
                { ar: "المهندسين بالشارع", arabeezy: "el-mohandseen besh-shaare3", en: "The engineers are in the street." },
                { ar: "في معلمات بالمدرسة", arabeezy: "fi mo3allmaat bel-madrasah", en: "There are teachers (f) in the school." },
                { ar: "السيارات كتيرة اليوم", arabeezy: "es-sayyaaraat kteereh el-yom", en: "The cars are many today." },
                { ar: "عندي لغات كتيرة", arabeezy: "3indi lughaat kteereh", en: "I have many languages." },
                { ar: "الطلاب كتيرين", arabeezy: "et-Tullaab kteereen", en: "The students are many." }
            ],
            teacherNotes:
                `Spoken uses regular plurals often, but many nouns are broken plurals.
MSA has more strict patterns.
Teach -ين/-ات first, then mention exceptions.
Use real classroom roles.`,
            commonMistakes: [
                "Overusing -ين with non-human nouns",
                "Forgetting vowel changes in broken plurals",
                "Mixing masculine/feminine plural endings"
            ],
            functionalUse: "Use this to describe groups of people or objects in daily talk."
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
                prompt: "Match the English word to Arabic: the weather",
                options: ["الجَوّ", "بَرْد", "شُوب", "دَافِي", "مُرِيح"],
                correct: "الجَوّ",
            },
            {
                id: "mc_complete_2",
                type: "complete",
                prompt: "Complete the Arabic sentence for: There are a lot of clouds in the sky.\nفي ___ كْتير بالسَّما.",
                options: ["رُطُوبَة", "شَمِس", "مْشَمَّس", "غَيْم", "مْغَيَّم"],
                correct: "غَيْم",
            },
            {
                id: "mc_reorder_3",
                type: "reorder",
                prompt: "Reorder the Arabic words to match: The nicest thing is when it rains.",
                options: ["أَحْلَى", "شِي", "لَمّا", "يِنْزِل", "مَطَر"],
                correct: ["أَحْلَى", "شِي", "لَمّا", "يِنْزِل", "مَطَر"],
            },
            {
                id: "mc_choose_4",
                type: "choose",
                prompt: "Choose the correct Arabic word for: fog",
                options: ["ضَباب", "دَرَجَة الحَرارَة", "تَحْت الصِّفِر", "أَبْرَد مِن...", "فَصِل"],
                correct: "ضَباب",
            },
            {
                id: "mc_match_5",
                type: "match",
                prompt: "Match the English word to Arabic: summer",
                options: ["صَيْف", "شِتَا", "رَبِيع", "خَرِيف", "جاكِت"],
                correct: "صَيْف",
            },
            {
                id: "mc_complete_6",
                type: "complete",
                prompt: "Complete the Arabic sentence for: Honestly, I can’t stand the heat.\nصَرَاحَةً، ___",
                options: ["أَواعِي ثَقِيلَة", "كِيف الجَوّ عِنْدَك؟", "الجَوّ مْناسِب لِلْطِّلْعَة.", "مَا بَسْتَحْمِل الشُّوب.", "بَحِبّ المَطَر."],
                correct: "مَا بَسْتَحْمِل الشُّوب.",
            },
            {
                id: "mc_reorder_7",
                type: "reorder",
                prompt: "Reorder the Arabic words to match: In the mountains the air is drier.",
                options: ["بِالْجَبَل", "الهَوا", "ناشِف", "أَكْثَر"],
                correct: ["بِالْجَبَل", "الهَوا", "ناشِف", "أَكْثَر"],
            },
        ],
    },

    practice: {
        quiz: [
            {
                id: "weather_q1",
                questionAr: "«فِي مَطَر» مَعْنَاهَا:",
                optionsEn: [
                    "There is rain / It’s raining.",
                    "There is wind.",
                    "It is sunny.",
                ],
                correctIndex: 0,
            },
            {
                id: "weather_q2",
                questionAr: "أَيّ جُمْلَة تَعْبِّر عَن الماضي؟",
                optionsEn: [
                    "بُكْرَا رَح يِكُون الجَوّ حِلُو.",
                    "امْبَارِح كان الجَوّ بَرْد.",
                    "اليَوْم الجَوّ دَافِي.",
                ],
                correctIndex: 1,
            },
            {
                id: "weather_q3",
                questionAr: "«مَا بَسْتَحْمِل الشُّوب» مَعْنَاهَا:",
                optionsEn: [
                    "I can’t stand the heat.",
                    "I love the heat.",
                    "The heat is normal.",
                ],
                correctIndex: 0,
            },
            {
                id: "weather_q4",
                questionAr: "أَيّ كَلِمَة تِسْتَخْدِمْهَا لِـ ‘humid’؟",
                optionsEn: [
                    "رُطُوبَة",
                    "شُوب",
                    "تَلْج",
                ],
                correctIndex: 0,
            },
            {
                id: "weather_q5",
                questionAr: "أَيّ عِبَارَة طَبِيعِيّة لِبِدَايَة small talk؟",
                optionsEn: [
                    "كِيف الجَوّ عِنْدَك؟",
                    "بَدِّي أَشْتَرِي مُوبَايِل.",
                    "فِين أَقْرَب مُسْتَشْفَى؟",
                ],
                correctIndex: 0,
            },
        ],

        rolePlays: [
            "Role-play 1: Two classmates meet in the morning at the university entrance. They talk about today’s weather, what it was like yesterday (كان…), and what it will be like tomorrow (رَح…). They also say which season they like or hate and why.",
            "Role-play 2: Two strangers stand in a bus stop or elevator. They start with a weather comment, then use small talk connectors like «عَنْ جَدّ؟», «وَالله», «بَرْضُه» to keep the conversation going for 6–8 lines.",
            "Role-play 3: Video call between two cities with different climate (e.g. Gaza & Ramallah / Gaza & Europe). Each one describes the weather now, last week, and next week using «فِي + noun», «كان», and «رَح يِكُون».",
        ],
        translation: [
            { id: "weather_t1", type: "enToAr", textEn: "The weather is nice today.", textAr: "الجو حلو اليوم." },
            { id: "weather_t2", type: "arToEn", textEn: "It's cold and windy.", textAr: "الجو برد وهوا." },
            { id: "weather_t3", type: "enToAr", textEn: "It will rain tomorrow.", textAr: "رح تمطر بكرا." },
            { id: "weather_t4", type: "arToEn", textEn: "Do you like winter?", textAr: "بتحب الشتا؟" },
            { id: "weather_t5", type: "enToAr", textEn: "It's hot in the afternoon.", textAr: "الجو حر بعد الظهر." },
            { id: "weather_t6", type: "arToEn", textEn: "Let's sit outside.", textAr: "يلا نقعد برا." }
        ],
    },

    // ====================================
    // HOMEWORK
    // ====================================
    homework: {
        instructions:
            "Record a 60–90 second audio in Palestinian Arabic where you:\n" +
            "1. Describe the weather today where you are (use at least 4 key words like: مَطَر، شُوب، بَرْد، رُطُوبَة، مْشَمَّس، مْغَيَّم).\n" +
            "2. Say how the weather was last week using «كان» (for example: امْبَارِح كان الجَوّ…).\n" +
            "3. Say how you think the weather will be next week using «رَح» (for example: رَح يِكُون الجَوّ…).\n" +
            "4. Share your personal opinion about which season you like most and why, using «بَحِبّ / مَا بَحِبّ / مَا بَسْتَحْمِل…».",
    },

    // ====================================
    // TEACHER NOTES
    // ====================================
    teacherNotes: {
        warmup: [
            "Start by asking in English: ‘What’s the weather like today where you are?’ Then slowly move into Arabic with key chunks: «الجَوّ…»، «فِي مَطَر»، «فِي شُوب».",
            "If possible, show a live picture (or describe it) and ask the student to repeat weather sentences after you.",
        ],
        vocabularySteps: [
            "Group vocabulary: (1) base words: بَرْد، شُوب، مَطَر، رُطُوبَة؛ (2) adjectives: دَافِي، مْغَيَّم، مْرَتَّب؛ (3) seasons: رَبِيع، صَيْف، شِتَا، خَرِيف.",
            "Practice the «فِي + noun» pattern with many examples so the student feels it’s easy: فِي مَطَر، فِي بَرْد، فِي غُبَار…",
            "Then add opinion chunks: بَحِبّ…, مَا بَحِبّ…, مَا بَسْتَحْمِل…",
        ],
        dialogueSteps: [
            "Act Scene 1 with the student: you are Lynn, they are Roba, then switch roles and change details (other city, other season).",
            "For Scene 2, focus on rhythm of small talk; encourage using «عَنْ جَدّ؟», «وَالله» naturally, not as ‘hard grammar’.",
            "Scene 3 is great for online lessons: ask the student to really compare their weather with yours.",
        ],
        practiceTips: [
            "Don’t over-correct grammar during small talk; focus on flow, confidence, and chunks.",
            "If the student is shy, give them 3–4 ready-made questions to ask about weather and mood.",
            "Use quick mini-drills: you say a city and season, student makes 1–2 sentences about the weather there.",
        ],
        wrapup: [
            "At the end, build with the student a mini ‘Weather & Small Talk’ script they can reuse at the start of future lessons.",
            "Ask the student to choose their top 5 favourite chunks from the unit, write them in their notebook, and use at least one at the beginning of the next class.",
        ],
        myNotes: "",
    },
};