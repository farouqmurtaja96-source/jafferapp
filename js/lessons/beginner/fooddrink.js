import { LESSON_ID_FOOD_DRINK } from '../../core/constants.js';

export const lessonId = LESSON_ID_FOOD_DRINK;
export const lesson = {
    meta: {
        level: "Beginner",
        unit: "Food & Drink",
        lessonTitle: "Unit 4 – Food & Drink in Palestinian Arabic",
    },

    overview: {
        title: "Unit 4 – Food & Drink",
        description:
            "In this unit, students dive into Palestinian food and drink culture: basic foods, typical meals, how to say ‘I like / I prefer’, how to order in a café or restaurant, and how to talk about what they eat at home. The unit also highlights singular vs plural forms for common foods and drinks.",
        goals: [
            "Name common Palestinian foods and drinks and recognize their singular/plural forms.",
            "Use «بَحِبّ» and «بِفَضَّل» to express likes and preferences.",
            "Talk about typical breakfast, lunch, and dinner in Palestinian culture.",
            "Order food and drinks politely in a café or restaurant.",
            "Connect food habits with daily routine and family life from previous units.",
        ],
    },

    // ====================================
    // VOCABULARY
    // ====================================
    vocabulary: {
        core: [
            // ===== MEALS =====
            {
                id: "fuToor",
                ar: "فُطُور",
                en: "breakfast",
                enArabeezy: "fuToor",
                hint: '',

                exampleAr: "فُطُورِي عَادَةً بَسِيط: خُبِز، لَبَن، وَشَاي.",
                exampleArabeezy: "ftwry 3ada bsyt: khbz, lbn, wshay.",
                exampleEn: "My breakfast is usually simple: bread, yogurt, and tea.",
            },
            {
                id: "ghada",
                ar: "غَدَا",
                en: "lunch",
                enArabeezy: "ghada",
                hint:
                    "Main meal in many Palestinian families. Verb: بِتْغَدَّى = I have lunch.",
                exampleAr: "أَهَمّ أَكْلَة فِي الْبَيْت هِيَّ الْغَدَا.",
                exampleArabeezy: "ahm akla fy elbyt hy elghda.",
                exampleEn: "The most important meal at home is lunch.",
            },
            {
                id: "3asha",
                ar: "عَشَا",
                en: "dinner / evening meal",
                enArabeezy: "3asha",
                hint:
                    "Evening meal. Verb: بِتْعَشَّى = I have dinner. Sometimes dinner is light (like tea and cheese).",
                exampleAr: "بِالْمسا بِنِتْعَشَّى مَع بَعْض قُدَّام التِّلْفِزْيُون.",
                exampleArabeezy: "belmsa bnt3sha m3 b3d qdam eltlfzywn.",
                exampleEn: "In the evening we have dinner together in front of the TV.",
            },

            // ===== BASIC FOODS =====
            {
                id: "khobez",
                ar: "خُبِز",
                en: "bread",
                enArabeezy: "khobez",
                hint:
                    "Very common. Singular as a mass: خُبِز. You can also hear: رغِيف خُبِز = a loaf of bread.",
                exampleAr: "اشتريت خبز طازة من الفرن الصبح.",
                exampleArabeezy: "ishtareit khobez Taaze min el-forn el-Subu7.",
                exampleEn: "I bought fresh bread from the bakery in the morning."

            },
            {
                id: "jibneh",
                ar: "جُبْنَة",
                en: "cheese",
                enArabeezy: "jibneh",
                hint:
                    "",
                exampleAr: "بِحِبّ جُبْنَة بَيْضَا مَع خُبِز سُخْن.",
                exampleArabeezy: "b7b jbna byda m3 khbz skhn.",
                exampleEn: "I like white cheese with warm bread.",
            },

            {
                id: "zeit_zaytoon",
                ar: "زَيْت زَيْتُون",
                en: "olive oil",
                enArabeezy: "zeit_zaytoon",
                hint:
                    "Very basic ingredient in Palestinian food. Often eaten with bread and zaatar.",
                exampleAr: "خُبِز مَع زَيْت زَيْتُون وَزَعْتَر فُطُور فِلَسْطِينِي كْتِير مَشْهُور.",
                exampleArabeezy: "khbz m3 zyt zytwn wz3tr ftwr flstyny ktyr mshhwr.",
                exampleEn: "Bread with olive oil and zaatar is a very famous Palestinian breakfast.",
            },

            {
                id: "za3tar",
                ar: "زَعْتَر",
                en: "zaatar (thyme mix)",
                enArabeezy: "za3tar",
                hint:
                    "Herb mix (thyme, sesame, etc.). Usually eaten with bread and olive oil or on manaqeesh.",
                exampleAr: "مَنَاقِيش زَعْتَر مَع شَاي مِن أَحْلَى الْأَشْيَاء.",
                exampleArabeezy: "mnaqysh z3tr m3 shay mn a7la elashya.",
                exampleEn: "Zaatar manaqeesh with tea is one of the best things.",
            },
            {
                id: "hummus",
                ar: "حُمُّص",
                en: "hummus (chickpea dip)",
                enArabeezy: "hummus",
                hint:
                    "Very famous Middle Eastern food. Also means ‘chickpeas’ as beans.",
                exampleAr: "حُمُّص مَع طَحِينَة أَكْلَة مَشْهُورَة فِي فِلَسْطِين.",
                exampleArabeezy: "7ms m3 t7yna akla mshhwra fy flstyn.",
                exampleEn: "Hummus with tahini is a famous dish in Palestine.",
            },
            {
                id: "falafel",
                ar: "فَلَافِل",
                en: "falafel",
                enArabeezy: "falafel",
                hint:
                    "Deep-fried chickpea balls. Often eaten in a sandwich for breakfast or dinner.",
                exampleAr: "كْتِير نَّاس بِفْطَرُوا سَنْدْوِيش فَلَافِل.",
                exampleArabeezy: "ktyr nas bftrwa sndwysh flafl.",
                exampleEn: "Many people have a falafel sandwich for breakfast.",
            },
            {
                id: "maqlubeh",
                ar: "مَقْلُوبِة",
                en: "maqlubeh (upside-down rice dish)",
                enArabeezy: "maqlubeh",
                hint:
                    "Traditional Palestinian dish with rice, vegetables, and meat, flipped upside down.",
                exampleAr: "مَقْلُوبِة جَاج مِن أَشْهَر أَكَلَات فِلَسْطِين.",
                exampleArabeezy: "mqlwba jaj mn ashhr aklat flstyn.",
                exampleEn: "Chicken maqlubeh is one of the most famous Palestinian dishes.",
            },
            {
                id: "musakhan",
                ar: "مُسَخَّن",
                en: "musakhan (sumac chicken on bread)",
                enArabeezy: "musakhan",
                hint:
                    "Traditional Palestinian dish: bread, onion, sumac, and roasted chicken.",
                exampleAr: "فِي الْمَوَاسِم بيعملوا مُسَخَّن لِلْعِيلَة كُلَّهَا.",
                exampleArabeezy: "fy elmwasm by3mlwa mskhn lel3yla klha.",
                exampleEn: "During special seasons they make musakhan for the whole family.",
            },
            {
                id: "salata",
                ar: "سَلَطَة",
                en: "salad",
                enArabeezy: "salata",
                hint:
                    "General word for salad. Plural سَلَطَات = types of salad.",
                exampleAr: "دايمًا في سلطة مع الغدا.",
                exampleArabeezy: "dayma fy slta m3 elghda.",
                exampleEn: "There is always salad with lunch.",
            },
            {
                id: "khodar",
                ar: "خْضَار",
                en: "vegetables",
                enArabeezy: "khodar",
                hint:
                    "",
                exampleAr: "إِمِّي دَايْمًا بِتِسَوِّي سلطة خضَار طَازَة مَع الْغَدَا.",
                exampleArabeezy: "imy dayma btswy slta khdar taza m3 elghda.",
                exampleEn: "My mom always prepares fresh vegetables salad with lunch.",
            },
            {
                id: "fawakeh",
                ar: "فَوَاكِه",
                en: "fruits",
                enArabeezy: "fawakeh",
                hint:
                    "Plural. Singular type would be like تُفَّاحَة (apple), مَوْزَة (banana).",
                exampleAr: "بَاكُل فَوَاكِه بَعْد الْغَدَا.",
                exampleArabeezy: "bakl fwakh b3d elghda.",
                exampleEn: "I eat fruits after lunch.",
            },
            {
                id: "tuffaHa",
                ar: "تُفَّاحَة",
                en: "an apple",
                enArabeezy: "tuffa7a",
                hint:
                    "Plural: تُفَّاح. For ‘apples’ as a group: تُفَّاح.",
                exampleAr: "بَحِبّ آكُل تُفَّاحَة الصُّبِح.",
                exampleArabeezy: "b7b aakl tfa7a elsb7.",
                exampleEn: "I like to eat an apple in the morning.",
            },
            {
                id: "mozeh",
                ar: "مَوْزَة",
                en: "a banana",
                enArabeezy: "mozeh",
                hint:
                    "Plural: مَوْز. For many bananas: مَوْز كْتِير.",
                exampleAr: "مَوْزَة صْغِيرَة أَحْسَن مِن حْلُو بَعْد الْأَكْل.",
                exampleArabeezy: "mwza sghyra a7sn mn 7lw b3d elakl.",
                exampleEn: "A small banana is better than dessert after food.",
            },
            {
                id: "la7me",
                ar: "لَحِم / لَحْمِة",
                en: "meat",
                enArabeezy: "la7me",
                hint:
                    "Generic word for meat. You can say: لَحِم or لَحْمِة. Example: لَحِم جَاج (chicken), لَحِم بَقَرِي (beef).",
                exampleAr: "مَا بَاكُل لَحِم كْتِير، أَكْثَر إِشِي جَاج.",
                exampleArabeezy: "ma bakl l7m ktyr, akthr ishy jaj.",
                exampleEn: "I don’t eat a lot of meat, mostly chicken.",
            },
            {
                id: "dajaj",
                ar: "جَاج",
                en: "chicken",
                enArabeezy: "dajaj",
                hint:
                    "دَجَاج = chicken (meat). For a whole chicken you can hear جَاجَة.",
                exampleAr: "المقلوبة بالجاج أكلة مفضّلة عند كتير ناس",
                exampleArabeezy: "elmqlwba beljaj akla mfdla 3nd ktyr nas",
                exampleEn: "Chicken maqlubeh is a favorite dish for many people.",
            },
            {
                id: "samak",
                ar: "سَمَك",
                en: "fish",
                enArabeezy: "samak",
                hint:
                    "",
                exampleAr: "فِي غَزَّة السَّمَك طَازَة وِكْتِير طَيِّب.",
                exampleArabeezy: "fy ghza elsmk taza wktyr tyb.",
                exampleEn: "In Gaza, the fish is fresh and very tasty.",
            },
            {
                id: "ruz",
                ar: "رُزّ",
                en: "rice",
                enArabeezy: "rozz",
                hint:
                    "Typically eaten with meat or chicken.",
                exampleAr: "بَاكُل رُزّ مَع خُضَار.",
                exampleArabeezy: "bakl rz m3 khdar.",
                exampleEn: "I eat rice with vegetables.",
            },
            {
                id: "batata",
                ar: "بَطَاطَا",
                en: "potatoes",
                enArabeezy: "batata",
                hint:
                    "Can be fried, baked, etc.",
                exampleAr: "بَحِبّ بَطَاطَا مَقْلِيِّة.",
                exampleArabeezy: "b7b btata mqlya.",
                exampleEn: "I like fried potatoes.",
            },

            // ===== DRINKS =====
            {
                id: "mayy",
                ar: "مَيّ",
                en: "water",
                enArabeezy: "mayy",
                hint:
                    "Very frequent. ‘I drink water’: بَشْرَب مَيّ.",
                exampleAr: "لَازِم تِشْرَب مَيّ كْتِير خِلَال النَّهَار.",
                exampleArabeezy: "lazm tshrb my ktyr khlal elnhar.",
                exampleEn: "You need to drink a lot of water during the day.",
            },
            {
                id: "ahweh",
                ar: "قَهْوَة",
                en: "coffee",
                enArabeezy: "ahweh",
                hint:
                    "",
                exampleAr: "بَشْرَب قَهْوَة سَادَة الصُّبِح.",
                exampleArabeezy: "bshrb qhwa sada elsb7.",
                exampleEn: "I drink black coffee in the morning.",
            },
            {
                id: "shay",
                ar: "شَاي",
                en: "tea",
                enArabeezy: "shay",
                hint:
                    "Very common drink. شَاي أَخْضَر / أَسْوَد / مَع نَعْنَاع.",
                exampleAr: "ستي بِتِحِبّ شَاي مَع نَعْنَاع.",
                exampleArabeezy: "sty bt7b shay m3 n3na3.",
                exampleEn: "My grandmother loves tea with mint.",
            },
            {
                id: "3asir",
                ar: "عَصِير",
                en: "juice",
                enArabeezy: "3aSeer",
                hint:
                    "Plural: عَصَايِر = juices (different kinds).",
                exampleAr: "بِفَضَّل عَصِير بُرْتُقَال عَنْ كُولا.",
                exampleArabeezy: "bfdl 3syr brtqal 3n kwla.",
                exampleEn: "I prefer orange juice over cola.",
            },

            // ===== SWEETS & DESSERTS =====
            {
                id: "halaweeyat",
                ar: "حَلَوِيَّات",
                en: "sweets / desserts",
                enArabeezy: "7alaweyyat",
                hint:
                    "Plural noun. Singular general form: حَلْوِيّة. Includes cakes, Arabic sweets, etc.",
                exampleAr: "بِحِبّ حَلَوِيَّات عَرَبِيَّة زَيّ كُنَافَة.",
                exampleArabeezy: "b7b 7lwyat 3rbya zy knafa.",
                exampleEn: "I like Arabic sweets like kunafa.",
            },
            {
                id: "kunafeh",
                ar: "كُنَافَة",
                en: "kunafa (cheese pastry dessert)",
                enArabeezy: "kunafeh",
                hint:
                    "Traditional Middle Eastern dessert, very famous in Palestine.",
                exampleAr: "كُنَافَة نَابُلْسِيَّة مَعْرُوفَة فِي كُلّ الدُّنْيَا.",
                exampleArabeezy: "knafa nablsya m3rwfa fy kl eldnya.",
                exampleEn: "Nabulsi kunafa is famous all over the world.",
            },

            // ===== GENERAL FOOD WORDS =====
            {
                id: "akel",
                ar: "أَكِل",
                en: "food",
                enArabeezy: "akel",
                hint: "General word for ‘food’.",
                exampleAr: "الْأَكِل الْفِلَسْطِينِي طَيِّب كْتِير.",
                exampleArabeezy: "elakl elflstyny tyb ktyr.",
                exampleEn: "Palestinian food is very tasty.",
            },
            {
                id: "t3am",
                ar: "طَعِم",
                en: "taste (flavour)",
                enArabeezy: "ta3am",
                hint: "Used to talk about taste of food.",
                exampleAr: "طَعِم الْأَكِل هُنَا مُمْتَاز.",
                exampleArabeezy: "t3m elakl hna mmtaz.",
                exampleEn: "The taste of the food here is excellent.",
            },

            // ===== FEELINGS & TASTE =====
            {
                id: "j3an",
                ar: "جُوعَان",
                en: "hungry",
                enArabeezy: "joo3an",
                hint: "Masc: جُوعَان, fem: جُوعَانَة.",
                exampleAr: "أَنَا جُوعَان، بَدِّي آكُل.",
                exampleArabeezy: "ana jw3an, bdy aakl.",
                exampleEn: "I’m hungry, I want to eat.",
            },
            {
                id: "3atshan",
                ar: "عَطْشَان",
                en: "thirsty",
                enArabeezy: "3atshan",
                hint: "Masc: عَطْشَان, fem: عَطْشَانَة.",
                exampleAr: "أَنَا عَطْشَان، بَدِّي مَيِّة.",
                exampleArabeezy: "ana 3tshan, bdy mya.",
                exampleEn: "I’m thirsty, I want water.",
            },
            {
                id: "zaki",
                ar: "زَاكِي",
                en: "tasty / delicious",
                enArabeezy: "zaki",
                hint: "Masc: زَاكِي, fem: زَاكِيِّة.",
                exampleAr: "الْأَكِل هُونَ زَاكِي كْتِير.",
                exampleArabeezy: "elakl hwna zaky ktyr.",
                exampleEn: "The food here is very tasty.",
            },
            {
                id: "msh_zaki",
                ar: "مِش زَاكِي",
                en: "not tasty",
                enArabeezy: "mish_zaki",
                hint: "Simple way to say you don’t like the taste.",
                exampleAr: "بصراحة اكِل الْيَوْم مِش زَاكِي.",
                exampleArabeezy: "bsra7a akl elywm msh zky.",
                exampleEn: "Honestly, today the food is not tasty.",
            },
            {
                id: "bisho3or_juu3",
                ar: "بِجُوع",
                en: "I get hungry",
                enArabeezy: "bijoo3",
                hint:
                    "From جُوع = hunger. You can say كْتِير بِجُوع بَسُّرْعَة = I get hungry very fast.",
                exampleAr: "بِجُوع بَعْد الْمُحَاضَرَة الطَّوِيلَة.",
                exampleArabeezy: "bjw3 b3d elm7adra eltwyla.",
                exampleEn: "I get hungry after the long lecture.",
            },
            {
                id: "bisho3or 3aTash",
                ar: "بِعْطَش",
                en: "I get thirsty",
                enArabeezy: "bi3tash",
                hint:
                    "From عَطَش = thirst. Opposite of بَشْرَب مَيّ.",
                exampleAr: "فِي الصَّيْف بِعْطَش كْتِير، فَبَشْرَب مَيّ أَكْثَر.",
                exampleArabeezy: "fy elsyf b3tsh ktyr, fbshrb my akthr.",
                exampleEn: "In summer I get very thirsty, so I drink more water.",
            },

            // ===== VERBS ABOUT FOOD =====
            {
                id: "ba7ebb",
                ar: "بَحِبّ",
                en: "I like / I love",
                enArabeezy: "ba7ebb",
                hint:
                    "From حَبّ = to love/like. Used for food, people, activities. For he/she: بِيِحِبّ / بِتِحِبّ.",
                exampleAr: "بَحِبّ الأَكْل الْفِلَسْطِينِي كْتِير.",
                exampleArabeezy: "b7b elakl elflstyny ktyr.",
                exampleEn: "I really like Palestinian food.",
            },
            {
                id: "ma_ba7ebb",
                ar: "مَا بَحِبّ",
                en: "I don’t like",
                enArabeezy: "ma_ba7ebb",
                hint: "Simple negation for ‘I don’t like’.",
                exampleAr: "مَا بَحِبّ قَهْوَة تقيلة.",
                exampleArabeezy: "ma b7b qhwa tqyla.",
                exampleEn: "I don’t like strong coffee.",
            },
            {
                id: "ba7ebb_aktar",
                ar: "بَحِبّ ... أَكْثَر",
                en: "I like … more",
                enArabeezy: "ba7ebb_aktar",
                hint: "For preferences: comparing things.",
                exampleAr: "بَحِبّ شَاي أَكْثَر مِن قَهْوَة.",
                exampleArabeezy: "b7b shay akthr mn qhwa.",
                exampleEn: "I like tea more than coffee.",
            },
            {
                id: "bifaDDil",
                ar: "بِفَضَّل",
                en: "I prefer",
                enArabeezy: "bifaDDel",
                hint:
                    "More specific than بَحِبّ. ‘I prefer X over Y’: بِفَضَّل … عَنْ …. ",
                exampleAr: "بِفَضَّل السَّمَك عَنْ اللَّحِم.",
                exampleArabeezy: "bfdl elsmk 3n ell7m.",
                exampleEn: "I prefer fish over meat.",
            },
            {
                id: "baTbokh",
                ar: "بَطْبُخ",
                en: "I cook",
                enArabeezy: "baTbokh",
                hint:
                    "From طَبَخ = to cook. For she cooks: بْتُطْبُخ، for he: بِيِطْبُخ.",
                exampleAr: "أَحْيَانًا بَطْبُخ أَنَا، مَش دَايْمًا إِمِّي.",
                exampleArabeezy: "a7yana btbkh ana, msh dayma imy.",
                exampleEn: "Sometimes I cook, not always my mom.",
            },
            {
                id: "ba2mor",
                ar: "بَطْلُب",
                en: "I order (food/drink)",
                enArabeezy: "baTlob",
                hint:
                    "Spoken form for ‘I order’ (in café / restaurant): بَطْلُب قَهْوَة، بَطْلُب سَنْدْوِيش.",
                exampleAr: "فِي الكافي بَطْلُب قَهْوَة وَعَصِير.",
                exampleArabeezy: "fy elkafy btlb qhwa w3syr.",
                exampleEn: "At the café I order coffee and juice.",
            },
            {
                id: "bajarrib",
                ar: "بَجَرِّب",
                en: "I try (food / something new)",
                enArabeezy: "bajarrib",
                hint:
                    "From جَرَّب = to try. Used a lot with new dishes: بَجَرِّب أَكْلَة جْدِيدَة.",
                exampleAr: "لَمَّا أَسَافِر بَجَرِّب أَكْلَات مَحَلِّيَّة.",
                exampleArabeezy: "lma asafr bjrb aklat m7lya.",
                exampleEn: "When I travel I try local dishes.",
            },
            {
                id: "baddi",
                ar: "بَدِّي",
                en: "I want",
                enArabeezy: "baddi",
                hint: "Use with food/drink to order.",
                exampleAr: "بَدِّي فَلَافِل وَعَصِير.",
                exampleArabeezy: "bdy flafl w3syr.",
                exampleEn: "I want falafel and juice.",
            },
            {
                id: "sho_bte7ebb",
                ar: "شُو بْتِحِبّ تَاكُل؟",
                en: "What do you like to eat?",
                enArabeezy: "shu_bte7ebb_takol",
                hint: "Used to ask about food preferences.",
                exampleAr: "شُو بْتِحِبّ تَاكُل عَلَى الْغَدَا؟",
                exampleArabeezy: "shw bt7b takl 3la elghda?",
                exampleEn: "What do you like to eat for lunch?",
            },

            // ===== CONTEXT EXPRESSIONS =====
            {
                id: "fi_maT3am",
                ar: "فِي مَطْعَم",
                en: "in a restaurant",
                enArabeezy: "fi_maT3am",
                hint: "Place context for food.",
                exampleAr: "بِنْقَعُد فِي مَطْعَم صَغِير قُرْيب من الْبَحَر.",
                exampleArabeezy: "bnq3d fy mt3m sghyr qryb mn elb7r.",
                exampleEn: "We sit in a small restaurant near the sea.",
            },
            {
                id: "3ala_el_bayt",
                ar: "فِي الْبَيْت",
                en: "at home",
                enArabeezy: "fi_el_beit",
                hint: "Home context.",
                exampleAr: "غَالِبًا بَنَاكُل فِي الْبَيْت.",
                exampleArabeezy: "ghalba bnakl fy elbyt.",
                exampleEn: "We usually eat at home.",
            },
        ],

        extra: [
            {
                id: "ma7alli",
                ar: "مَحَلّ",
                en: "shop / place",
                enArabeezy: "ma7all",
                hint:
                    "Food context: مَحَلّ فَلَافِل، مَحَلّ فَوَاكِه…",
                exampleAr: "فِي مَحَلّ فَلَافِل قَرِيب مِن بَيْتْنَا.",
                exampleArabeezy: "fy m7l flafl qryb mn bytna.",
                exampleEn: "There is a falafel shop near our house.",
            },
            {
                id: "mat3am",
                ar: "مَطْعَم",
                en: "restaurant",
                enArabeezy: "maT3am",
                hint:
                    "Plural: مَطَاعِم. A bit more formal than مَحَلّ.",
                exampleAr: "رُحْنَا عَلَى مَطْعَم فِلَسْطِينِي فِي الْمَدِينَة.",
                exampleArabeezy: "r7na 3la mt3m flstyny fy elmdyna.",
                exampleEn: "We went to a Palestinian restaurant in the city.",
            },
            {
                id: "ma2le",
                ar: "مَقْلِي",
                en: "fried",
                enArabeezy: "ma2li",
                hint:
                    "Adjective: مُقْرَمِش مَقْلِي = crispy fried.",
                exampleAr: "فَلَافِل أَكْثَرُه أَكْلَة مَقْلِيَّة.",
                exampleArabeezy: "flafl akthrh akla mqlya.",
                exampleEn: "Falafel is mostly a fried food.",
            },
            {
                id: "maTbukh",
                ar: "مَطْبُوخ",
                en: "cooked",
                enArabeezy: "maTbukh",
                hint:
                    "Opposite of raw. خْضَار مَطْبُوخَة = cooked vegetables.",
                exampleAr: "بِفَضَّل خْضَار مَطْبُوخَة عَنْ المَقْلِيَّة.",
                exampleArabeezy: "bfdl khdar mtbwkha 3n elmqlya.",
                exampleEn: "I prefer cooked vegetables over fried ones.",
            },

            {
                id: "m7ar",
                ar: "حَارّ  ",
                en: "spicy / hot (food)",
                enArabeezy: "7arr",
                hint: "Used for spicy food.",
                exampleAr: "بَحِبّ الاكل الحارّ.",
                exampleArabeezy: "b7b elakl el7ar.",
                exampleEn: "I like spicy food.",
            },
            {
                id: "mal7",
                ar: "مِلِح",
                en: "salty",
                enArabeezy: "melle7",
                hint: "From مِلِح = salt.",
                exampleAr: "هَادَا الطَّبَق مِلِح كْتِير.",
                exampleArabeezy: "hada eltbq ml7 ktyr.",
                exampleEn: "This dish is too salty.",
            },
            {
                id: "S7i",
                ar: "صِحِّي",
                en: "healthy",
                enArabeezy: "Se77i",
                hint: "Used for healthy food.",
                exampleAr: "بِحَاوِل آكُل أَكِل صِحِّي.",
                exampleArabeezy: "b7awl aakl akl s7y.",
                exampleEn: "I try to eat healthy food.",
            },
        ],
    },

    // ====================================
    // DIALOGUE (long café + home + culture)
    // ====================================
    dialogue: {
        lines: [
            {
                "speaker": "رامي",
                "ar": "مَرْحَبَا مَرْيَم، شُو أَكَلْتِي الْيَوْم عَلَى الْفْطُور؟",
                "arArabeezy": "mr7ba mrym, shw aklty elywm 3la elftwr?",
                "en": "Hi Maryam, what did you eat today for breakfast?"
            },
            {
                "speaker": "مَرْيَم",
                "ar": "صَبَاح الْخِير، أَكَلْت خُبِز مَع جِبْنِة وَزَيْت وَزَعْتَر.",
                "arArabeezy": "sba7 elkhyr, aklt khbz m3 jbna wzyt wz3tr.",
                "en": "Good morning, I ate bread with cheese and olive oil with zaatar."
            },
            {
                "speaker": "رامي",
                "ar": "شربتي كمان قهوة ولا شاي؟",
                "arArabeezy": "shirbti kamaan ahwe walla shay?",
                "en": "Did you also drink coffee or tea?"
            },
            {
                "speaker": "مَرْيَم",
                "ar": "بَشْرَب فِي الصُّبْح شَاي، مِش قَهْوَة.",
                "arArabeezy": "bshrb fy elsb7 shay, msh qhwa.",
                "en": "In the morning I drink tea, not coffee."
            },
            {
                "speaker": "رامي",
                "ar": "أَنَا بِالْعَكْس، بَشْرَب قَهْوَة كُل يَوْم.",
                "arArabeezy": "ana bel3ks, bshrb qhwa kl ywm.",
                "en": "I’m the opposite, I drink coffee every day."
            },
            {
                "speaker": "مَرْيَم",
                "ar": "أَحْيَانًا بَشْرَب حليب كمان.",
                "arArabeezy": "a7yana bshrb 7lyb kman.",
                "en": "Sometimes I drink milk too."
            },
            {
                "speaker": "رامي",
                "ar": "شُو بْتِحِبي تَاكُلي عَلَى الْغَدَا؟",
                "arArabeezy": "shw bt7by takly 3la elghda?",
                "en": "What do you like to eat for lunch?"
            },
            {
                "speaker": "مَرْيَم",
                "ar": "بِحِبّ آكُل عَالغَدا جَاج وَرُزّ.",
                "arArabeezy": "b7b aakl 3alghda jaj wrz.",
                "en": "I like to eat chicken and rice for lunch."
            },
            {
                "speaker": "رامي",
                "ar": "وَالْلَحْمِة؟",
                "arArabeezy": "well7ma?",
                "en": "And meat?"
            },
            {
                "speaker": "مَرْيَم",
                "ar": "بَحِبّ الَلحْمِة بَسّ مِش كْتِير، أَكْثَر شِي بَحِبّ جاج.",
                "arArabeezy": "b7b el7ma bs msh ktyr, akthr shy b7b jaj.",
                "en": "I like meat but not a lot; I like vegetables and fruit the most."
            },
            {
                "speaker": "رامي",
                "ar": "شُو أَكْتَر فَاكْهَة بِتْحِبّي؟",
                "arArabeezy": "shw aktr fakha bt7by?",
                "en": "Which fruit do you like the most?"
            },
            {
                "speaker": "مَرْيَم",
                "ar": "بَحِبّ تُفَّاح وَمَوِز، بَسّ مَا بَحِبّ بُرْتُقَال كْتِير.",
                "arArabeezy": "b7b tfa7 wmwz, bs ma b7b brtqal ktyr.",
                "en": "I like apples and bananas, but I don’t like oranges very much."
            },
            {
                "speaker": "رامي",
                "ar": "يَلَّا نُقْعُد فِي مَطْعَم صَغِير هُون.",
                "arArabeezy": "yla nq3d fy mt3m sghyr hwn.",
                "en": "Come on, let’s sit in a small restaurant here."
            },
            {
                "speaker": "مَرْيَم",
                "ar": "تمام، أَنَا جُوعَانَة كْتِير.",
                "arArabeezy": "tmam, ana jw3ana ktyr.",
                "en": "ok, I’m very hungry."
            },
            {
                "speaker": "سَامِي",
                "ar": "أَهْلًا وَسَهْلًا، شُو بْتِحِبُّوا تَاكْلُوا؟",
                "arArabeezy": "ahla wshla, shw bt7bwa taklwa?",
                "en": "Welcome, what would you like to eat?"
            },
            {
                "speaker": "رامي",
                "ar": "بَدِّي صَحْن فَلَافِل وَحُمُّص، مِن فَضْلَك.",
                "arArabeezy": "bdy s7n flafl w7ms, mn fdlk.",
                "en": "I want a plate of falafel and hummus, please."
            },
            {
                "speaker": "مَرْيَم",
                "ar": "وَأَنَا بَدِّي سَلَطَة وَدْجَاج مَع رُزّ.",
                "arArabeezy": "wana bdy slta wdjaj m3 rz.",
                "en": "And I want salad and chicken with rice."
            },
            {
                "speaker": "سَامِي",
                "ar": "طَيِّب، وَشُو بْتِحِبُّوا تِشْرَبُوا؟",
                "arArabeezy": "tyb, wshw bt7bwa tshrbwa?",
                "en": "Okay, and what would you like to drink?"
            },
            {
                "speaker": "رامي",
                "ar": "أَنَا بَحِبّ قَهْوَة بَعْد الْأَكِل، هَلَّقيت بَدِّي مَيِّة.",
                "arArabeezy": "ana b7b qhwa b3d elakl, hlqyt bdy mya.",
                "en": "I like coffee after food; now I want water."
            },
            {
                "speaker": "مَرْيَم",
                "ar": "أَنَا عَطْشَانَة، بَدِّي كولا.",
                "arArabeezy": "ana 3tshana, bdy kwla.",
                "en": "I’m thirsty, I want orange juice."
            },
            {
                "speaker": "سَامِي",
                "ar": "زَيْ مَا بْتِحِبُّوا، صَحَّة وَعَافِيَة.",
                "arArabeezy": "zy ma bt7bwa, s7a w3afya.",
                "en": "As you like, bon appétit / enjoy."
            },
            {
                "speaker": "رامي",
                "ar": "الْفَلَافِل هُونَ زَاكِي كْتِير.",
                "arArabeezy": "elflafl hwna zky ktyr.",
                "en": "The falafel here is very tasty."
            },
            {
                "speaker": "مَرْيَم",
                "ar": "صَحّ، بَسّ السَّلَطَة مالحة شَوَيّ.",
                "arArabeezy": "s7, bs elslta mal7a shwy.",
                "en": "True, but the salad is a bit salty."
            },
            {
                "speaker": "رامي",
                "ar": "مَع هَيْك، الْغَدَا صِحِّي أَكْثَر مِن مَطَاعِم ثَانِيِة.",
                "arArabeezy": "m3 hyk, elghda s7y akthr mn mta3m thanya.",
                "en": "Even so, this lunch is healthier than other restaurants."
            },

            {
                "speaker": "رامي",
                "ar": "شُكْرًا كْتِير، الْأَكِل كَان زَاكِي.",
                "arArabeezy": "shkra ktyr, elakl kan zky.",
                "en": "Thank you very much, the food was delicious."
            },
            {
                "speaker": "سَامِي",
                "ar": "عَفْوَاً، تْشَرَّفْنَا فِيكُم.",
                "arArabeezy": "3fwa, tshrfna fykm.",
                "en": "You’re welcome, pleased to have you."
            },
            {
                "speaker": "مَرْيَم",
                "ar": "مَع السَّلَامَة، رَاح نِرْجَع مَرَّة ثَانِيِة.",
                "arArabeezy": "m3 elslama, ra7 nrj3 mra thanya.",
                "en": "Goodbye, we’ll come back another time."
            },
            {
                "speaker": "رامي",
                "ar": "يَلَّا، اِنْبِسِطِي بِبَاقِي الْيَوْم.",
                "arArabeezy": "yla, anbsty bbaqy elywm.",
                "en": "Come on, enjoy the rest of the day."
            },
            {
                "speaker": "مَرْيَم",
                "ar": "وَإِنْتَ كَمَان، بَشُوفَك بُكْرَا فِي الدَّرْس.",
                "arArabeezy": "wint kman, bshwfk bkra fy eldrs.",
                "en": "You too, see you tomorrow in class."
            }
        ]
    },

    // ====================================
    // GRAMMAR
    // ====================================

    grammar: [
        {
            id: "direct_object",
            title: "Direct Object (I eat + what?)",
            short: "The object comes right after the verb.",
            description:
                `A direct object answers “what?” after the verb.
In spoken Palestinian Arabic, we place it right after the verb.

Golden Rule:
Verb + object = simple food sentence.`,
            table: {
                title: "Direct Object Patterns",
                headers: ["Arabic", "Arabeezy", "English", "Usage Note"],
                rows: [
                    ["بـ + فعل + أكل", "b- + verb + akel", "eat something", "Meals"],
                    ["بـ + فعل + شرب", "b- + verb + shorb", "drink something", "Drinks"],
                    ["بدي + اسم", "biddi + noun", "I want + noun", "Ordering"],
                    ["بحب + اسم", "b7ibb + noun", "I like + noun", "Preferences"],
                ]
            },
            examples: [
                { ar: "أنا باكُل منسف", arabeezy: "ana baakul mansaf", en: "I eat mansaf." },
                { ar: "إنتَ بتشرب شاي", arabeezy: "inta btishrab shay", en: "You drink tea." },
                { ar: "إنتِ بتحبي قهوة", arabeezy: "inti bte7bbi 2ahwe", en: "You like coffee. (f)" },
                { ar: "هو بدّه عصير", arabeezy: "howwa bidd-o 3aseer", en: "He wants juice." },
                { ar: "هي بتاكُل سلطة", arabeezy: "hiyye btaakul salata", en: "She eats salad." }
            ],
            teacherNotes:
                `Spoken keeps word order simple: verb then object.
MSA adds case endings; spoken drops them.
Focus on food vocabulary and short sentences.
Avoid long clauses at this stage.`,
            commonMistakes: [
                "Putting the object before the verb",
                "Using MSA endings on the object",
                "Forgetting b- on the verb",
            ],
            functionalUse:
                "Used when ordering food, talking about meals, and stating preferences.",
        },
        {
            id: "active_participles_states",
            title: "Active Participles (states: hungry/thirsty)",
            short: "Use participles to describe states.",
            description:
                `Spoken Arabic uses active participles to describe states.
Common ones in food talk are hungry, full, and thirsty.

Golden Rule:
State words act like adjectives.`,
            table: {
                title: "Common States",
                headers: ["Arabic", "Arabeezy", "English", "Usage Note"],
                rows: [
                    ["جوعان", "joo3aan", "hungry", "Male"],
                    ["جوعانة", "joo3aaneh", "hungry", "Female"],
                    ["شبعان", "shab3aan", "full", "After eating"],
                    ["عطشان", "3atshaan", "thirsty", "Need a drink"],
                ]
            },
            examples: [
                { ar: "أنا جوعان", arabeezy: "ana joo3aan", en: "I am hungry." },
                { ar: "إنتِ عطشانة؟", arabeezy: "inti 3atshaaneh?", en: "Are you thirsty? (f)" },
                { ar: "هو شبعان", arabeezy: "howwa shab3aan", en: "He is full." },
                { ar: "هي جوعانة شوي", arabeezy: "hiyye joo3aaneh shway", en: "She is a little hungry." },
                { ar: "إحنا عطشانين", arabeezy: "e7na 3atshaaneen", en: "We are thirsty." }
            ],
            teacherNotes:
                `Spoken uses participles as everyday state words.
MSA uses similar forms with formal endings.
Teach masculine/feminine forms together.
Use real-life food situations.`,
            commonMistakes: [
                "Using a verb instead of the participle",
                "Forgetting feminine endings",
                "Mixing MSA pronunciation",
            ],
            functionalUse:
                "Used when ordering food, expressing hunger/fullness, or asking about needs.",
        },
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
                prompt: "Match the English word to Arabic: breakfast",
                options: ["فُطُور", "غَدَا", "عَشَا", "خُبِز", "جُبْنَة"],
                correct: "فُطُور",
            },
            {
                id: "mc_complete_2",
                type: "complete",
                prompt: "Complete the Arabic sentence for: Bread with olive oil and zaatar is a very famous Palestinian breakfast.\nخُبِز مَع ___ وَزَعْتَر فُطُور فِلَسْطِينِي كْتِير مَشْهُور.",
                options: ["زَيْتُون", "زَيْت زَيْتُون", "زَيْت وَزَعْتَر", "زَعْتَر", "حُمُّص"],
                correct: "زَيْت زَيْتُون",
            },
            {
                id: "mc_reorder_3",
                type: "reorder",
                prompt: "Reorder the Arabic words to match: Many people have a falafel sandwich for breakfast.",
                options: ["كْتِير", "نَّاس", "بِفْطَرُوا", "سَنْدْوِيش", "فَلَافِل"],
                correct: ["كْتِير", "نَّاس", "بِفْطَرُوا", "سَنْدْوِيش", "فَلَافِل"],
            },
            {
                id: "mc_choose_4",
                type: "choose",
                prompt: "Choose the correct Arabic word for: fruits",
                options: ["فَوَاكِه", "تُفَّاحَة", "مَوْزَة", "لَحِم / لَحْمِة", "جَاج"],
                correct: "فَوَاكِه",
            },
            {
                id: "mc_match_5",
                type: "match",
                prompt: "Match the English word to Arabic: fish",
                options: ["سَمَك", "رُزّ", "بَطَاطَا", "مَيّ", "قَهْوَة"],
                correct: "سَمَك",
            },
            {
                id: "mc_complete_6",
                type: "complete",
                prompt: "Complete the Arabic sentence for: My grandmother loves tea with mint.\nستي بِتِحِبّ ___ مَع نَعْنَاع.",
                options: ["شَاي", "عَصِير", "حَلَوِيَّات", "كُنَافَة", "أَكِل"],
                correct: "شَاي",
            },
            {
                id: "mc_reorder_7",
                type: "reorder",
                prompt: "Reorder the Arabic words to match: The taste of the food here is excellent.",
                options: ["طَعِم", "الْأَكِل", "هُنَا", "مُمْتَاز"],
                correct: ["طَعِم", "الْأَكِل", "هُنَا", "مُمْتَاز"],
            },
            {
                id: "mc_choose_8",
                type: "choose",
                prompt: "Choose the correct Arabic word for: I get hungry",
                options: ["بِجُوع", "بِعْطَش", "بَحِبّ", "مَا بَحِبّ", "بَحِبّ ... أَكْثَر"],
                correct: "بِجُوع",
            },
            {
                id: "mc_match_9",
                type: "match",
                prompt: "Match the English word to Arabic: I prefer",
                options: ["بِفَضَّل", "بَطْبُخ", "بَطْلُب", "بَجَرِّب", "بَدِّي"],
                correct: "بِفَضَّل",
            },
            {
                id: "mc_complete_10",
                type: "complete",
                prompt: "Complete the Arabic sentence for: We sit in a small restaurant near the sea.\nبِنْقَعُد ___ صَغِير قُرْيب من الْبَحَر.",
                options: ["شُو بْتِحِبّ تَاكُل؟", "فِي مَطْعَم", "فِي الْبَيْت", "مَحَلّ", "مَطْعَم"],
                correct: "فِي مَطْعَم",
            },
            {
                id: "mc_reorder_11",
                type: "reorder",
                prompt: "Reorder the Arabic words to match: Falafel is mostly a fried food.",
                options: ["فَلَافِل", "أَكْثَرُه", "أَكْلَة", "مَقْلِيَّة"],
                correct: ["فَلَافِل", "أَكْثَرُه", "أَكْلَة", "مَقْلِيَّة"],
            },
        ],
    },

    practice: {
        quiz: [
            {
                id: "food_q1",
                questionAr: "«بِفَضَّل السَّمَك عَنْ اللَّحِم» مَعْنَاهَا:",
                optionsEn: [
                    "I prefer meat over fish.",
                    "I prefer fish over meat.",
                    "I don’t eat fish or meat.",
                ],
                correctIndex: 1,
            },
            {
                id: "food_q2",
                questionAr: "«بَحِبّ مَقْلُوبِة كْتِير» مَعْنَاهَا:",
                optionsEn: [
                    "I like maqlubeh a lot.",
                    "I cook maqlubeh a lot.",
                    "I don’t like maqlubeh.",
                ],
                correctIndex: 0,
            },
            {
                id: "food_q3",
                questionAr: "أَيّ كَلِمَة تِسْتَخْدِمْهَا لِـ ‘fruits’؟",
                optionsEn: [
                    "خْضَار",
                    "فَوَاكِه",
                    "حَلَوِيَّات",
                ],
                correctIndex: 1,
            },
            {
                id: "food_q4",
                questionAr: "«بَطْلُب سَنْدْوِيش فَلَافِل» مَعْنَاهَا:",
                optionsEn: [
                    "I cook a falafel sandwich.",
                    "I order a falafel sandwich.",
                    "I hate falafel sandwiches.",
                ],
                correctIndex: 1,
            },


        ],

        rolePlays: [
            "Role-play 1: Café scene. Student A is the waiter (like Omar), Student B is the customer. A asks what B wants to drink and eat using Palestinian Arabic. B answers using «بَحِبّ»، «بِفَضَّل»، «بَطْلُب». Then switch roles.",
        ],
        translation: [
            { id: "food_t1", type: "enToAr", textEn: "I want a coffee, please.", textAr: "بدي قهوة لو سمحت." },
            { id: "food_t2", type: "arToEn", textEn: "I prefer tea with mint.", textAr: "بِفَضَّل شاي مع نعنع." },
            { id: "food_t3", type: "enToAr", textEn: "Do you want sugar?", textAr: "بدك سكر؟" },
            { id: "food_t4", type: "arToEn", textEn: "I'm hungry.", textAr: "أنا جوعان/جوعانة." },
            { id: "food_t5", type: "enToAr", textEn: "I eat breakfast at home.", textAr: "أنا باكل فطور بالبيت." },
            { id: "food_t6", type: "arToEn", textEn: "This is a delicious sandwich.", textAr: "هاد سندويش زاكي." },
        ],
    },

    // ====================================
    // HOMEWORK
    // ====================================
    homework: {
        instructions:
            "Write and record a 60–90 second description of food and drink in your life in Palestinian Arabic. Include:\n" +
            "• What you usually eat for فُطُور، غَدَا، and عَشَا.\n" +
            "• At least 5 food words (for example: خُبِز، حُمُّص، سَلَطَة، فَوَاكِه، لَحِم، سَمَك).\n" +
            "• At least 3 drink words (for example: مَيّ، قَهْوَة، شَاي، عَصِير).\n" +
            "• Use both «بَحِبّ» and «بِفَضَّل» to talk about your preferences.\n" +
            "Try to sound like you are talking to a Palestinian friend, not reading a list.",
    },

    // ====================================
    // TEACHER NOTES
    // ====================================
    teacherNotes: {
        warmup: [
            "Start in English: ask the student about their favorite food in their own country, then teach them how to say it in Arabic if possible.",
            "Show pictures of Palestinian dishes (maqlubeh, musakhan, falafel, hummus) and let the student guess what they are before giving the names.",
            "Ask: ‘What do you eat for breakfast in your country?’ then map the answer into Arabic using the new vocabulary.",
        ],
        vocabularySteps: [
            "Group vocabulary by theme: breakfast foods, main dishes, vegetables/fruits, drinks, sweets.",
            "Highlight singular vs plural differences when needed (tuffaHa/tuffaH, mozeh/moz, salata/salatat) without going too deep into morphology.",
            "Use quick mini-games: ‘This or that?’ – you say two foods and the student answers quickly which one they prefer using «بِفَضَّل».",
        ],
        dialogueSteps: [
            "Act out the café scene with clear roles. First you model as both sides, then let the student play the customer and later the waiter.",
            "Pause during the dialogue to ask comprehension questions in English, then gradually move to simple Arabic questions.",
            "Encourage the student to personalise: change the orders, drinks, and dishes but keep the same structure and polite phrases.",
        ],
        practiceTips: [
            "Focus error correction on: the use of «بَحِبّ / بِفَضَّل», food word pronunciation, and singular/plural contrasts.",
            "Use the quiz not just for right/wrong but as a start for extra questions, like: ‘And you, do you also prefer fish over meat?’.",
            "If the student is shy, let them ‘invent’ a restaurant menu and then play ordering from it. This gives structure and makes it fun.",
        ],
        wrapup: [
            "End the lesson by summarising the student’s favourite Palestinian foods and drinks in Arabic, slightly upgrading their sentences.",
            "Ask the student to choose one Palestinian dish they want to try in real life and make one sentence in Arabic about it.",
            "Remind them of the homework recording and suggest they imagine they are explaining their food life to a Palestinian host family.",
        ],
        myNotes: "",
    },
};