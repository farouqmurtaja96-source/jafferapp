import { LESSON_ID_APARTMENT } from '../../core/constants.js';

export const lessonId = LESSON_ID_APARTMENT;
export const lesson = {
    meta: {
        level: "Pre-Intermediate",
        unit: "Apartment & Problems",
        lessonTitle: "Unit 10 – Apartment, Neighbours & Problems",
    },

    overview: {
        title: "Unit 10 – Apartment & Problems",
        description:
            "In this unit, students learn how to describe their apartment, rooms, basic furniture, and common problems in a Palestinian building: water, electricity, internet, noise, humidity, and broken things. The focus is on real-life chunks for talking to a landlord, neighbours, and technicians.",
        goals: [
            "Describe their apartment and rooms in simple Palestinian Arabic.",
            "Use key words for basic furniture, building parts, and neighbours.",
            "Explain common problems like no water, no electricity, broken things, and noise.",
            "Use high-frequency verbs like ‘to rent, to pay, to fix, to break, to leak’ in context.",
            "Handle short phone calls and face-to-face complaints with polite chunks.",
        ],
    },

    // ====================================
    // VOCABULARY
    // ====================================
    vocabulary: {
        core: [
            // ===== APARTMENT & BUILDING =====
            {
                id: "shaqqa",
                ar: "شِقّة",
                en: "apartment / flat",
                enArabeezy: "shéʾa / shé2a",
                hint:
                    "Plural: شِقَق / شُقَق. ‘my apartment’ = شِقْتي. Used for rented or owned flats.",
                exampleAr: "بِسْكُن بِشِقّة قَريب مِن الجامْعَة.",
                exampleArabeezy: "bskn bshqa qryb mn eljam3a.",
                exampleEn: "I live in an apartment near the university.",
            },
            {
                id: "3imara",
                ar: "عِمارَة",
                en: "building",
                enArabeezy: "3imāra",
                hint:
                    "Also بِنَاية in some areas. عِمارَة تَلات طَوابِق = a three-floor building.",
                exampleAr: "العِمارَة قَديمَة بَس نْضيفَة.",
                exampleArabeezy: "el3mara qdyma bs ndyfa.",
                exampleEn: "The building is old but clean.",
            },
            {
                id: "taba2",
                ar: "طابِق",
                en: "floor (1st, 2nd…)",
                enArabeezy: "ṭābeʾ / ṭābe2",
                hint:
                    "Level in the building. أَوَّل طابِق / تاني طابِق / طابِق أَرْضي.",
                exampleAr: "الشِّقّة عَالطّابِق التّالِت.",
                exampleArabeezy: "elshqa 3altabq eltalt.",
                exampleEn: "The apartment is on the third floor.",
            },
            {
                id: "sellem",
                ar: "دَرَج / سِلِّم",
                en: "stairs / staircase",
                enArabeezy: "daraj / séllem",
                hint:
                    "دَرَج = stairs in general, سِلِّم = staircase in a building.",
                exampleAr: "لما يكون المصعد خربان، بنطلع عالدَّرَج.",
                exampleArabeezy: "lma ykwn elms3d khrban, bntl3 3aldrj.",
                exampleEn: "When the elevator is broken, we go up the stairs.",
            },
            {
                id: "bab_el3imara",
                ar: "باب العِمارَة",
                en: "building door / entrance",
                enArabeezy: "bāb il-3imāra",
                hint: "Main entrance of the building.",
                exampleAr: "باب العِمارَة مِش مْسَكَّر مْنيح.",
                exampleArabeezy: "bab el3mara msh mskr mny7.",
                exampleEn: "The building door doesn’t close well.",
            },

            // ===== ROOMS =====
            {
                id: "ghurfet_nawm",
                ar: "غُرْفِة نَوْم",
                en: "bedroom",
                enArabeezy: "ghurfet nōm",
                hint: "Short: غُرْفِة = room. Plural: غُرَف.",
                exampleAr: "الشِّقّة فيها غُرْفِة نَوْم واحْدِة.",
                exampleArabeezy: "elshqa fyha ghrfa nwm wa7da.",
                exampleEn: "The apartment has one bedroom.",
            },
            {
                id: "salon",
                ar: "صالون",
                en: "living room",
                enArabeezy: "ṣālōn / salon",
                hint: "Sitting room for guests and family.",
                exampleAr: "بِنِقْعُد بِالصّالون نِتْفَرَّج عَالتِّلْفِزْيون.",
                exampleArabeezy: "bnq3d belsalwn ntfrj 3altlfzywn.",
                exampleEn: "We sit in the living room and watch TV.",
            },
            {
                id: "matbakh",
                ar: "مَطْبَخ",
                en: "kitchen",
                enArabeezy: "maṭbakh",
                hint: "Room for cooking. Plural: مَطابِخ.",
                exampleAr: "مَطْبَخ الشِّقّة صْغير بَس مُرَتَّب.",
                exampleArabeezy: "mtbkh elshqa sghyr bs mrtb.",
                exampleEn: "The apartment’s kitchen is small but tidy.",
            },
            {
                id: "7ammam",
                ar: "حَمّام",
                en: "bathroom",
                enArabeezy: "ḥammām / 7ammam",
                hint: "Bathroom / toilet, depending on context.",
                exampleAr: "الحَمّام في مَشْكِلَة بِالمَيّ.",
                exampleArabeezy: "el7mam fy mshkla belmy.",
                exampleEn: "There is a water problem in the bathroom.",
            },
            {
                id: "balkon",
                ar: "بَلكون / شُرْفَة",
                en: "balcony",
                enArabeezy: "balkōn / shurfa",
                hint: "Outside space of the apartment (balcony).",
                exampleAr: "بَحِبّ أَشْرَب قَهْوِة عَالبَلكون.",
                exampleArabeezy: "b7b ashrb qhwa 3alblkwn.",
                exampleEn: "I like to drink coffee on the balcony.",
            },

            // ===== PEOPLE & MONEY =====
            {
                id: "jar",
                ar: "جار / جارَة",
                en: "neighbor (m/f)",
                enArabeezy: "jār / jāra",
                hint: "Someone who lives next door or nearby. Plural: جيران.",
                exampleAr: "جيرانّا طَيِّبين بَس صَوْتهم عالي أَحْيانا.",
                exampleArabeezy: "jyrana tybyn bs swthm 3aly a7yana.",
                exampleEn: "Our neighbors are nice but sometimes loud.",
            },
            {
                id: "sa7eb_elbeit",
                ar: "صاحِب البَيْت",
                en: "landlord / owner",
                enArabeezy: "ṣāḥeb il-bēt / sa7eb el-beit",
                hint: "Owner of the apartment or house.",
                exampleAr: "صاحِب البَيْت ساكِن في نَفْس العِمارَة.",
                exampleArabeezy: "sa7b elbyt sakn fy nfs el3mara.",
                exampleEn: "The landlord lives in the same building.",
            },
            {
                id: "ijar",
                ar: "إيجار",
                en: "rent",
                enArabeezy: "ījār / ijar",
                hint: "Money paid every month for the apartment.",
                exampleAr: "إيجار الشِّقّة غالي شْوَي.",
                exampleArabeezy: "iyjar elshqa ghaly shwy.",
                exampleEn: "The apartment’s rent is a bit expensive.",
            },
            {
                id: "fatora",
                ar: "فاتورَة",
                en: "bill",
                enArabeezy: "fātūra / fatora",
                hint: "General word, often for utilities.",
                exampleAr: "لازِم أَدْفَع فاتورَة الشَّهِر هادا.",
                exampleArabeezy: "lazm adf3 fatwra elshhr hada.",
                exampleEn: "I have to pay this month’s bill.",
            },

            {
                id: "fatora_mayy",
                ar: "فاتورَة مَيّ",
                en: "water bill",
                enArabeezy: "fātūrat mayy",
                hint: "Bill for water consumption.",
                exampleAr: "فاتورَة المَيّ مِش مَشْمُولَة بِالإيجار.",
                exampleArabeezy: "fatwra elmy msh mshmwla beliyjar.",
                exampleEn: "The water bill is not included in the rent.",
            },

            // ===== DOORS, WINDOWS & KEYS =====
            {
                id: "mifta7",
                ar: "مِفْتاح",
                en: "key",
                enArabeezy: "miftaḥ / mifta7",
                hint: "Key for the door, etc.",
                exampleAr: "نِسيت المِفْتاح جُوّا الشِّقّة.",
                exampleArabeezy: "nsyt elmfta7 jwa elshqa.",
                exampleEn: "I forgot the key inside the apartment.",
            },
            {
                id: "bab",
                ar: "باب",
                en: "door",
                enArabeezy: "bāb",
                hint: "Door of a room, apartment, or building.",
                exampleAr: "باب البَلكون مِش مْسَكَّر مْنيح.",
                exampleArabeezy: "bab elblkwn msh mskr mny7.",
                exampleEn: "The balcony door doesn’t close well.",
            },
            {
                id: "shubbak",
                ar: "شُبّاك",
                en: "window",
                enArabeezy: "shubbāk / shubbak",
                hint: "Window of a room.",
                exampleAr: "الشُّبّاك مَكْسور وبدّه تَصْلِيح.",
                exampleArabeezy: "elshbak mkswr wbdh tsly7.",
                exampleEn: "The window is broken and needs repair.",
            },

            // ===== UTILITIES & APPLIANCES =====
            {
                id: "mayy",
                ar: "مَيّ",
                en: "water",
                enArabeezy: "mayy",
                hint: "Tap water / water in general.",
                exampleAr: "المَيّ بِتِنْقِط مِن السَّقْف.",
                exampleArabeezy: "elmy btnqt mn elsqf.",
                exampleEn: "Water is dripping from the ceiling.",
            },
            {
                id: "kahraba",
                ar: "كَهْرَبا",
                en: "electricity",
                enArabeezy: "kahrabā / kahraba",
                hint: "Power in the house. قَطْع كَهْرَبا = power cut.",
                exampleAr: "الكَهْرَبا بِتِنْقِطِع كْثير بِهالْمَنطِقَة.",
                exampleArabeezy: "elkhrba btnqt3 kthyr bhalmntqa.",
                exampleEn: "The electricity cuts off a lot in this area.",
            },
            {
                id: "daw",
                ar: "ضَوّ",
                en: "light",
                enArabeezy: "ḍaww / daw",
                hint: "Electric light / lamp.",
                exampleAr: "في ضَوّ مِش شَغّال بِالْمَمَرّ.",
                exampleArabeezy: "fy dw msh shghal belmmr.",
                exampleEn: "There is a light not working in the hallway.",
            },
            {
                id: "ghassaleh",
                ar: "غَسّالِة",
                en: "washing machine",
                enArabeezy: "ghassāle / ghassaleh",
                hint: "Machine for washing clothes.",
                exampleAr: "غَسّالِة الشِّقّة خَرْبانِة هالأَيام.",
                exampleArabeezy: "ghsala elshqa khrbana halayam.",
                exampleEn: "The apartment’s washing machine is broken these days.",
            },
            {
                id: "tallajeh",
                ar: "تَلّاجَة",
                en: "fridge",
                enArabeezy: "tallājeh",
                hint: "Refrigerator.",
                exampleAr: "التَّلّاجَة مَش مْبَرِّدَة مْنيح.",
                exampleArabeezy: "eltlaja msh mbrda mny7.",
                exampleEn: "The fridge is not cooling well.",
            },
            {
                id: "ghaz",
                ar: "غَاز",
                en: "gas (for cooking)",
                enArabeezy: "ghāz / ghaz",
                hint: "Gas cylinder or gas line.",
                exampleAr: "جرة الغَاز فاضيِة، لازم نِغَيِّرْها.",
                exampleArabeezy: "jra elghaz fadya, lazm nghyrha.",
                exampleEn: "The gas cylinder is empty; we need to change it.",
            },
            {
                id: "furn",
                ar: "فُرْن",
                en: "oven",
                enArabeezy: "furn",
                hint: "For baking / cooking, gas or electric.",
                exampleAr: "فرن الكَهْرَبا خَرْبان اليوم.",
                exampleArabeezy: "frn elkhrba khrban elywm.",
                exampleEn: "The electric oven is broken today.",
            },
            {
                id: "sakhan_mayy",
                ar: "سَخّان مَيّ",
                en: "water heater",
                enArabeezy: "sakkhān mayy",
                hint: "Heater for shower water.",
                exampleAr: "السَّخّان مَش شَغّال، المَيّ بارْدِة.",
                exampleArabeezy: "elskhan msh shghal, elmy barda.",
                exampleEn: "The water heater is not working; the water is cold.",
            },
            {
                id: "makyyef",
                ar: "مِكيّف",
                en: "air conditioner",
                enArabeezy: "mikayyef / makyyef",
                hint: "AC unit.",
                exampleAr: "المِكيّف بِطَفّي لَمّا نِشَغِّل غَسّالِة.",
                exampleArabeezy: "elmkyf btfy lma nshghl ghsala.",
                exampleEn: "The AC turns off when we turn on the washing machine.",
            },
            {
                id: "maghsaleh",
                ar: "مَغْسَلِة",
                en: "sink (bathroom or kitchen)",
                enArabeezy: "maghsaleh",
                hint: "Basin for water.",
                exampleAr: "المَغْسَلِة في الحَمّام مَسْدودَة.",
                exampleArabeezy: "elmghsla fy el7mam msdwda.",
                exampleEn: "The bathroom sink is blocked.",
            },
            {
                id: "7anafiyeh",
                ar: "حَنَفِيّة",
                en: "tap / faucet",
                enArabeezy: "ḥanafyyeh / 7anafiyeh",
                hint: "Water tap.",
                exampleAr: "الحَنَفِيّة بتنقط مَيّ طول الليل.",
                exampleArabeezy: "el7nfya btnqt my twl ellyl.",
                exampleEn: "The tap drips water all night.",
            },

            {
                id: "beykhar_mayy",
                ar: "بنقط مَيّ",
                en: "it leaks water",
                enArabeezy: "bikharr mayy / bey5ar mayy",
                hint: "Used for tap, pipe, ceiling.",
                exampleAr: "السَّقْف بنقط مَيّ لَمّا تشتي.",
                exampleArabeezy: "elsqf bnqt my lma tshty.",
                exampleEn: "The ceiling leaks when it rains.",
            },

            // ===== ELEVATOR, STAIRS & NOISE =====
            {
                id: "mis3ad",
                ar: "مِصْعَد / أسانْسير",
                en: "elevator",
                enArabeezy: "miṣʿad / asansēr",
                hint: "Lift in the building.",
                exampleAr: "المِصْعَد بْوِقَّف بِنُصّ الطّابِق أَحْيانًا.",
                exampleArabeezy: "elms3d bwqf bns eltabq a7yana.",
                exampleEn: "The elevator sometimes stops between floors.",
            },
            {
                id: "sawt_3ali",
                ar: "صَوْت عالي",
                en: "loud noise",
                enArabeezy: "ṣōt ʿāli / sawt 3ali",
                hint: "Used for neighbors, street, etc.",
                exampleAr: "في صَوْت عالي مِن الجيران بِاللَّيْل.",
                exampleArabeezy: "fy swt 3aly mn eljyran bellyl.",
                exampleEn: "There is loud noise from the neighbors at night.",
            },

            // ===== STATE OF THINGS =====
            {
                id: "maksur",
                ar: "مَكْسور",
                en: "broken",
                enArabeezy: "maksūr / maksour",
                hint: "Physically broken (glass, door, window).",
                exampleAr: "الشُّبّاك مَكْسور .",
                exampleArabeezy: "elshbak mkswr.",
                exampleEn: "The window is broken ",
            },
            {
                id: "kharban",
                ar: "خَرْبان",
                en: "not working / out of order",
                enArabeezy: "kharbān / kharban",
                hint: "Device that doesn’t work.",
                exampleAr: "الأسانْسير خَرْبان من أُسْبوع.",
                exampleArabeezy: "elasansyr khrban mn asbw3.",
                exampleEn: "The elevator has been out of order for a week.",
            },
            {
                id: "ma_bishtghil",
                ar: "مَا بِشْتَغِل",
                en: "it doesn’t work",
                enArabeezy: "ma bishtghil",
                hint:
                    "Used for any device: الضَّوّ مَا بِشْتَغِل، الغَسّالِة مَا بِتِشْتَغِل.",
                exampleAr: "السَّخّان مَا بِشْتَغِل، المَيّ بارْدِة.",
                exampleArabeezy: "elskhan ma bshtghl, elmy barda.",
                exampleEn: "The water heater doesn’t work; the water is cold.",
            },

            // ===== VERBS & USEFUL CHUNKS =====
            {
                id: "basta2jer",
                ar: "بَسْتَأْجِر",
                en: "I rent (an apartment)",
                enArabeezy: "bastaʾjir / basta2jer",
                hint:
                    "From اِسْتَأْجَر = to rent. بَسْتَأْجِر شِقّة فِي غَزّة.",
                exampleAr: "هَادي أَوَّل مَرّة بَسْتَأْجِر شِقّة لَحالي.",
                exampleArabeezy: "hady awl mra bstajr shqa l7aly.",
                exampleEn: "This is the first time I rent an apartment by myself.",
            },
            {
                id: "badfa3_ijar",
                ar: "بَدْفَع الإيجار",
                en: "I pay the rent",
                enArabeezy: "badfaʿ il-ījār / badfa3 el-ijar",
                hint: "Add time: كُلّ أَوَّل شَهِر / فِي نُصّ الشَّهِر.",
                exampleAr: "بَدْفَع الإيجار أُونْلايْن.",
                exampleArabeezy: "bdf3 eliyjar awnlayn.",
                exampleEn: "I pay the rent online.",
            },
            {
                id: "fi_mushkileh_fi",
                ar: "في مُشْكِلَة في...",
                en: "there is a problem with…",
                enArabeezy: "fī mushkile fi...",
                hint:
                    "Template: في مُشْكِلَة في المَيّ / في الضَوّ / في البَلكون...",
                exampleAr: "في مُشْكِلَة في الإِنْتَرْنِت مِن امْبارِح.",
                exampleArabeezy: "fy mshkla fy elintrnt mn ambar7.",
                exampleEn: "There has been a problem with the internet since yesterday.",
            },
            {
                id: "batwasal_ma3",
                ar: "بَتْواصَل مَع...",
                en: "I contact / get in touch with…",
                enArabeezy: "batwāṣal maʿ...",
                hint: "بَتْواصَل مَع صاحِب البَيْت / مَع الشِّرْكَة.",
                exampleAr: "لَمّا يكون في مُشْكِلَة بَتْواصَل مَع صاحِب البَيْت.",
                exampleArabeezy: "lma ykwn fy mshkla btwasl m3 sa7b elbyt.",
                exampleEn: "When there is a problem, I contact the landlord.",
            },
        ],

        extra: [
            {
                id: "3a2d_ijar",
                ar: "عَقْد إيجار",
                en: "rental contract",
                enArabeezy: "ʿaʾd ījār / 3a2d ijār",
                hint: "Paper that explains rules, rent, and conditions.",
                exampleAr: "عَقْد الإيجار مَكْتوب فيه كُلّ الشُّروط.",
                exampleArabeezy: "3qd eliyjar mktwb fyh kl elshrwt.",
                exampleEn: "All the conditions are written in the rental contract.",
            },

            {
                id: "7ares_el3imara",
                ar: "حارِس العِمارَة",
                en: "building guard / caretaker",
                enArabeezy: "ḥāres il-3imāra / 7ares el-3imara",
                hint: "Person who looks after the building.",
                exampleAr: "حارِس العِمارَة بِفَتِّح الباب وَبْيِنَظِّف الدَّرَج.",
                exampleArabeezy: "7ars el3mara bft7 elbab wbynzf eldrj.",
                exampleEn: "The building guard opens the door and cleans the stairs.",
            },
            {
                id: "ratoobe",
                ar: "رُطوبَة",
                en: "humidity / damp",
                enArabeezy: "ruṭūba / ratoobe",
                hint: "Moisture on walls or in the air.",
                exampleAr: "في رُطوبَة عَالحِيط بِغُرْفِة النَّوْم.",
                exampleArabeezy: "fy rtwba 3al7yt bghrfa elnwm.",
                exampleEn: "There is damp on the wall in the bedroom.",
            },
            {
                id: "tedfi2a",
                ar: "تِدْفِئَة",
                en: "heating",
                enArabeezy: "tidfiʾa / tedfi2a",
                hint: "System for warming the house.",
                exampleAr: "ما في تِدْفِئَة مْنيحَة بالشتا.",
                exampleArabeezy: "ma fy tdfya mny7a belshta.",
                exampleEn: "There is no good heating in winter.",
            },

            {
                id: "sakan_jdid",
                ar: "سَكَن جْديد",
                en: "new place / new apartment",
                enArabeezy: "sakan jdid",
                hint: "Used when someone has just moved.",
                exampleAr: "رُوبَا نَقَلِت عَسَكَن جْديد قَريب مِن الجامْعَة.",
                exampleArabeezy: "rwba nqlt 3skn jdyd qryb mn eljam3a.",
                exampleEn: "Roba moved to a new place near the university.",
            },
            {
                id: "mash7oun",
                ar: "مَشْحون",
                en: "charged (for electricity card / meter)",
                enArabeezy: "mashḥūn / mash7oun",
                hint: "Used for prepaid electricity meters.",
                exampleAr: "نَسِينَا نِشْحَن العَدّاد، قَطَعِت الكَهْرَبا.",
                exampleArabeezy: "nsyna nsh7n el3dad, qt3t elkhrba.",
                exampleEn: "We forgot to charge the meter, the electricity went off.",
            },
        ],
    }
    ,

    // ====================================
    // DIALOGUE (moving in, problems, landlord & neighbour)
    // ====================================
    dialogue: {
        lines: [
            {
                "speaker": "Rami",
                "ar": "مَسّا الخير يا خالِد، نِقَلْت عَالشِّقّة الجْديدَة أَخِيرًا!",
                "arArabeezy": "msa elkhyr ya khald, nqlt 3alshqa eljdyda akhyra!",
                "en": "Good evening, Khaled, I finally moved to the new apartment!"
            },
            {
                "speaker": "Khaled",
                "ar": "مَبْروك! شُو أَخْبار الشِّقّة؟ كْبيرَة وِلّا صْغيرَة؟",
                "arArabeezy": "mbrwk! shw akhbar elshqa?kbyra wla sghyra?",
                "en": "Congratulations! How is the apartment? Big or small?"
            },
            {
                "speaker": "Rami",
                "ar": "مِش كْبيرَة بَس مْنيحَة، فيها غُرْفِة نَوْم واحْدِة، صالون، مَطْبَخ وَحَمّام.",
                "arArabeezy": "msh kbyra bs mny7a, fyha ghrfa nwm wa7da, salwn, mtbkh w7mam.",
                "en": "It’s not big but it’s nice; it has one bedroom, a living room, a kitchen and a bathroom."
            },
            {
                "speaker": "Khaled",
                "ar": "وعِندَك بَلكون كْمان وِلّا لا؟",
                "arArabeezy": "w3ndk blkwn kman wla la?",
                "en": "And do you also have a balcony or not?"
            },
            {
                "speaker": "Rami",
                "ar": "إي، في بَلكون صْغيرة عالشّارِع الرّئيسي.",
                "arArabeezy": "iy, fy blkwn sghyra 3alshar3 elryysy.",
                "en": "Yes, there is a small balcony on the main street."
            },
            {
                "speaker": "Khaled",
                "ar": "عَأيّ طابِق الشِّقّة؟ العِمارَة فيها أسانْسير؟",
                "arArabeezy": "3ay tabq elshqa?el3mara fyha asansyr?",
                "en": "On which floor is the apartment? Does the building have an elevator?"
            },
            {
                "speaker": "Rami",
                "ar": "عَالطّابِق الرّابِع، وفي مِصْعَد،بس احيانا بكون خربان.",
                "arArabeezy": "3altabq elrab3, wfy ms3d, bs a7yana bkwn khrban.",
                "en": "On the fourth floor, and there is an elevator, but it’s sometimes out of order."
            },
            {
                "speaker": "Khaled",
                "ar": "طَيِّب، قَدّيش الإيجار؟ شامِل فاتورَة مَيّ وَكَهْرَبا؟",
                "arArabeezy": "tyb, qdysh eliyjar?shaml fatwra my wkhrba?",
                "en": "Okay, how much is the rent? Does it include water and electricity bills?"
            },
            {
                "speaker": "Rami",
                "ar": "الإيجار خَمِس مِيّة شِيكِل، بَس فاتورَة المَيّ وَالكَهْرَبا عَلَيْنا.",
                "arArabeezy": "eliyjar khms mya shykl, bs fatwra elmy welkhrba 3lyna.",
                "en": "The rent is five hundred shekels, but the water and electricity bills are on us."
            },
            {
                "speaker": "Khaled",
                "ar": "والجيران؟ هاد السُّؤال المُهِم.",
                "arArabeezy": "weljyran?had elswal elmhm.",
                "en": "And the neighbors? That’s the important question."
            },
            {
                "speaker": "Rami",
                "ar": "جارتي اللّي قبالي طَيِّبَة، بَس الجار اللّي فَوقنا صَوْته عالي بِاللَّيْل.",
                "arArabeezy": "jarty elly qbaly tyba, bs eljar elly fwqna swth 3aly bellyl.",
                "en": "My neighbor next door is nice, but the neighbor above us is loud at night."
            },
            {
                "speaker": "Khaled",
                "ar": "مُمْكِن تِحْكوا مَعُه بِهُدُوء أَو تِحْكوا مَع صاحِب البَيْت.",
                "arArabeezy": "mmkn t7kwa m3h bhdw aw t7kwa m3 sa7b elbyt.",
                "en": "You can talk to him calmly or talk to the landlord."
            },
            {
                "speaker": "Rami",
                "ar": "بِصْراحَة في مَشاكِل تانِيَة جَوّا الشِّقّة.",
                "arArabeezy": "bsra7a fy mshakl tanya jwa elshqa.",
                "en": "Honestly, there are other problems inside the apartment."
            },
            {
                "speaker": "Khaled",
                "ar": "جَدّ؟ مِثْل إيش؟",
                "arArabeezy": "jd?mthl iysh?",
                "en": "Really? Like what?"
            },
            {
                "speaker": "Rami",
                "ar": "المَغْسَلِة في الحَمّام مَسْددَة، والمَيّ بْتِنْقِط مِن السَّقْف لَمّا أَفَتِّح الحَنَفِيّة.",
                "arArabeezy": "elmghsla fy el7mam msdda, welmy btnqt mn elsqf lma aft7 el7nfya.",
                "en": "The sink in the bathroom is blocked and water drips from the ceiling when I open the tap."
            },
            {
                "speaker": "Khaled",
                "ar": "وَلا مَرّة حَكَيت لِصاحِب البَيْت عَن هالمَشاكِل؟",
                "arArabeezy": "wla mra 7kyt lsa7b elbyt 3n halmshakl?",
                "en": "Have you never told the landlord about these problems?"
            },
            {
                "speaker": "Rami",
                "ar": "لِأ، كُنِت مَشْغول بِالنَّقْل وَالاِمْتِحانات، بَس لازم أِتِّصِل فيه.",
                "arArabeezy": "la, knt mshghwl belnql welamt7anat, bs lazm atsl fyh.",
                "en": "No, I was busy with moving and exams, but I must call him."
            },
            {
                "speaker": "Khaled",
                "ar": "يَلّا نتِّصِل هَلَّقيت، أَفْضَل مِن بُكْرَة.",
                "arArabeezy": "yla ntsl hlqyt, afdl mn bkra.",
                "en": "Let’s call him now; better than tomorrow."
            },
            {
                "speaker": "Rami",
                "ar": "تمام هَيْ بَتِّصِل... أَلو، مَسّا الخير يا أُسْتاذ سامِر، أنا المُسْتَأجِر الجْديد بالشِّقّة الرّابِعَة.",
                "arArabeezy": "tmam hy btsl. . . alw, msa elkhyr ya astadh samr, ana elmstajr eljdyd belshqa elrab3a.",
                "en": "Okay, I’m calling… Hello, good evening Mr. Samer, I’m the new tenant in the fourth-floor apartment."
            },
            {
                "speaker": "Landlord",
                "ar": "مَسّا النّور، أَهْلًا، أكِيد. شُو الأَخْبار؟ في مَشْكِلَة؟",
                "arArabeezy": "msa elnwr, ahla, akyd. shw elakhbar?fy mshkla?",
                "en": "Good evening, welcome. Sure. What’s up? Is there a problem?"
            },
            {
                "speaker": "Rami",
                "ar": "إي صَراحَةً، في كَم مَشْكِلَة صْغيرَة: المَغْسَلِة في الحَمّام مَسْددَة، والحَنَفِيّة بتنقط مَيّ طول الليل.",
                "arArabeezy": "iy sra7a, fy km mshkla sghyra: elmghsla fy el7mam msdda, wel7nfya btnqt my twl ellyl.",
                "en": "Yes honestly, there are a few small problems: the bathroom sink is blocked and the tap leaks water all night."
            },
            {
                "speaker": "Landlord",
                "ar": "الميّ بتقطع كليًّا ولا بس ضعيفة؟",
                "arArabeezy": "elmy btqt3 klya wla bs d3yfa?",
                "en": "Does the water stop completely or is it just weak?"
            },
            {
                "speaker": "Rami",
                "ar": "المَيّ مَوْجودَة بَس المَجْرى مَسْدود، والمَيّ بِتِجْمَع عَالأَرْض.",
                "arArabeezy": "elmy mwjwda bs elmjra msdwd, welmy btjm3 3alard.",
                "en": "The water is there but the drain is blocked, and the water gathers on the floor."
            },
            {
                "speaker": "Landlord",
                "ar": "طَيِّب، بَبْعَت سَبّاك يِشوف المَشْكِلَة بُكْرَة الصُّبِح.",
                "arArabeezy": "tyb, bb3t sbak yshwf elmshkla bkra elsb7.",
                "en": "Okay, I’ll send a plumber to check the problem tomorrow morning."
            },
            {
                "speaker": "Rami",
                "ar": "وكَمان في مَشْكِلَة بِالكَهْرَبا، لَمّا أَشَغِّل المِكيّف والغَسّالِة مَع بَعْض بِيِطْفي الضَّوّ.",
                "arArabeezy": "wkman fy mshkla belkhrba, lma ashghl elmkyf welghsala m3 b3d bytfy eldw.",
                "en": "And there’s also a problem with the electricity; when I turn on the AC and the washing machine together, the lights go off."
            },
            {
                "speaker": "Landlord",
                "ar": "مُمْكِن المُفَتِّح (القاطِع) ضَعيف، بَجي أَنا اليَوم عَالمَسَا أَتْأَكَّد.",
                "arArabeezy": "mmkn elmft7 (elqat3) d3yf, bjy ana elywm 3almsa atakd.",
                "en": "Maybe the breaker is weak; I’ll come this evening to make sure."
            },
            {
                "speaker": "Khaled",
                "ar": " اِسْأَلُه عَن الأسانْسير، ليش كْثير خَرْبان.",
                "arArabeezy": "asalh 3n elasansyr, lysh kthyr khrban.",
                "en": " Ask him about the elevator, why it’s often broken."
            },
            {
                "speaker": "Rami",
                "ar": "كمان حَضْرِتَك، الأسانْسير بِيوقَف بِنُصّ الطّابِق أَحْيانًا، ومَرّة خِفْنا نعْلق جُوّاه.",
                "arArabeezy": "kman 7drtk, elasansyr bywqf bns eltabq a7yana, wmra khfna n3lq jwah.",
                "en": "Also sir, the elevator sometimes stops between floors, and once we were afraid we’d get stuck inside."
            },
            {
                "speaker": "Landlord",
                "ar": "عارِف، العُمْارُه قَديم شْوَي، بَس في شِرْكَة صِيانَة حَتِجي هالأُسْبوع تِصَلِّحُه.",
                "arArabeezy": "3arf, el3marh qdym shwy, bs fy shrka syana 7tjy halasbw3 tsl7h.",
                "en": "I know, it’s a bit old, but a maintenance company is coming this week to fix it."
            },
            {
                "speaker": "Rami",
                "ar": "مِنِيح كْثير، شُكْرًا عَالاِهْتِمام.",
                "arArabeezy": "mny7 kthyr, shkra 3alahtmam.",
                "en": "That’s very good, thank you for the attention."
            },
            {
                "speaker": "Landlord",
                "ar": "إذا في أيّ مَشْكِلَة تانيِة، بَعْتِلِّي رِسالَة أَو اِتِّصِل فيّي مباشرة.",
                "arArabeezy": "idha fy ay mshkla tanya, b3tly rsala aw atsl fyy mbashra.",
                "en": "If there is any other problem, send me a message or call me immediately."
            },
            {
                "speaker": "Rami",
                "ar": "أَكِيد، مَع السَّلامَة.",
                "arArabeezy": "akyd, m3 elslama.",
                "en": "Of course, goodbye."
            },
            {
                "speaker": "Khaled",
                "ar": "طَيِّب، شُو حَكالَك صاحِب البَيْت؟",
                "arArabeezy": "tyb, shw 7kalk sa7b elbyt?",
                "en": "Okay, what did the landlord tell you?"
            },
            {
                "speaker": "Rami",
                "ar": "قال بَبْعَت سَبّاك لِلْمَغْسَلِة والحَنَفِيّة، وبَجي هُوّ يِشوف الكَهْرَبا، وَالأسانْسير حَيِصَلِّحوه هالأُسْبوع.",
                "arArabeezy": "qal bb3t sbak lelmghsla wel7nfya, wbjy hw yshwf elkhrba, welasansyr 7ysl7wh halasbw3.",
                "en": "He said he’ll send a plumber for the sink and tap, and he’ll come himself to check the electricity, and the elevator will be fixed this week."
            },
            {
                "speaker": "Khaled",
                "ar": "مْنيح. أَحْسَن إِنَّك تِكْتِب كُل المَشاكِل عَوَرَقَة، حَتى ما تِنْسى شِي.",
                "arArabeezy": "mny7. a7sn ink tktb kl elmshakl 3wrqa, 7ta ma tnsa shy.",
                "en": "Good. It’s better if you write all the problems on a paper so you don’t forget anything."
            },
            {
                "speaker": "Rami",
                "ar": "صَح، وعَندي عَقْد الإيجار مَكْتوب فيه إنّو هُمَّ مَسْؤولين يِصَلِّحوا الأَشْيَا الخَرْبانِة.",
                "arArabeezy": "s7, w3ndy 3qd eliyjar mktwb fyh inw hm mswwlyn ysl7wa elashya elkhrbana.",
                "en": "Right, and in my rental contract it’s written that they’re responsible for fixing broken things."
            },
            {
                "speaker": "Khaled",
                "ar": "إذا ما رَدّوا بَعْدين، مُمْكِن تِقَدِّم شَكْوَى لِلْمَكْتَب تبَع الإيجار.",
                "arArabeezy": "idha ma rdwa b3dyn, mmkn tqdm shkwa lelmktb tb3 eliyjar.",
                "en": "If they don’t respond later, you can file a complaint at the rental office."
            },
            {
                "speaker": "Rami",
                "ar": "إن شاء الله ما نوصل لهالمرحلة، بس هلّق صرت حاسس براحة أكتر بخصوص الشقة بعد الحكي.",
                "arArabeezy": "in sha ellh ma nwsl lhalmr7la, bs hlq srt 7ass bra7a aktr bkhsws elshqa b3d el7ky.",
                "en": "Inshallah we don’t reach that stage, but now I feel more comfortable about the apartment after talking."
            }
        ]
    }
    ,

    // ====================================
    // GRAMMAR
    // ====================================

    grammar: [
        {
            id: "there_is",
            title: "There is / There isn’t (في / ما في)",
            short: "Use في to say something exists.",
            description:
                `In spoken Arabic, في means “there is/are.”
For negation, use ما في.

في = there is, ما في = there isn’t.`,
            table: {
                title: "Existence Patterns",
                headers: ["Arabic", "Arabeezy", "English", "Usage Note"],
                rows: [
                    ["في + اسم", "fi + noun", "there is", "Existence"],
                    ["ما في + اسم", "ma fi + noun", "there isn’t", "Negation"],
                    ["في + رقم + اسم", "fi + number + noun", "there are", "Quantity"],
                    ["ما في ولا + اسم", "ma fi wala + noun", "there isn’t any", "Emphasis"]
                ]
            },
            examples: [
                { ar: "في شباك كبير", arabeezy: "fi shubbaak kbeer", en: "There is a big window." },
                { ar: "ما في مي", arabeezy: "ma fi may", en: "There isn’t water." },
                { ar: "في غرفتين", arabeezy: "fi ghorfteen", en: "There are two rooms." },
                { ar: "ما في ولا كرسي", arabeezy: "ma fi wala kursi", en: "There isn’t any chair." },
                { ar: "في مطبخ صغير", arabeezy: "fi maTba5 zghir", en: "There is a small kitchen." }
            ],
            teacherNotes:
                `Spoken uses في / ما في more than MSA يوجد/لا يوجد.
Keep it practical with home items.
Avoid formal structures early.
Use negative forms often.`,
            commonMistakes: [
                "Using يوجد in spoken",
                "Forgetting ما in negation",
                "Placing في after the noun"
            ],
            functionalUse: "Use this to describe what exists or doesn’t exist in a place."
        },
        {
            id: "prepositions_simple",
            title: "Prepositions (في، على، من، جنب، فوق)",
            short: "Use prepositions to show place and position.",
            description:
                `Prepositions show where something is.
In spoken Arabic, we use very common prepositions for location.

Focus on meaning, not case endings.`,
            table: {
                title: "Common Prepositions",
                headers: ["Arabic", "Arabeezy", "English", "Usage"],
                rows: [
                    ["في البيت", "fi el-beit", "in the house", "Location"],
                    ["على الطاولة", "3ala et-Taawle", "on the table", "Surface"],
                    ["من الغرفة", "min el-ghorfe", "from the room", "Origin"],
                    ["جنب الباب", "janb el-baab", "next to the door", "Position"],
                    ["فوق", "foog", "above", "Position"]
                ]
            },
            examples: [
                { ar: "الكرسي جنب الباب", arabeezy: "el-kursi janb el-baab", en: "The chair is next to the door." },
                { ar: "السرير في الغرفة", arabeezy: "es-sreer fi el-ghorfe", en: "The bed is in the room." },
                { ar: "الشنطة عالطاولة", arabeezy: "esh-shanTa 3al-Taawle", en: "The bag is on the table." },
                { ar: "الضو فوق", arabeezy: "eD-Daw foog", en: "The light is above." },
                { ar: "أنا من رام الله", arabeezy: "ana min Ramallah", en: "I’m from Ramallah." }
            ],
            teacherNotes:
                `MSA teaches مجرور after prepositions; spoken doesn’t mark it.
Use everyday home objects.
Repeat short location sentences.
Keep prepositions minimal.`,
            commonMistakes: [
                "Adding case endings in speech",
                "Mixing على and في",
                "Using formal لدى instead of عند"
            ],
            functionalUse: "Use this to describe rooms, furniture, and locations."
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
                prompt: "Match the English word to Arabic: apartment / flat",
                options: ["شِقّة", "عِمارَة", "طابِق", "دَرَج / سِلِّم", "باب العِمارَة"],
                correct: "شِقّة",
            },
            {
                id: "mc_complete_2",
                type: "complete",
                prompt: "Complete the Arabic sentence for: The apartment has one bedroom.\nالشِّقّة فيها ___ واحْدِة.",
                options: ["غُرْفِة نَوْم", "صالون", "مَطْبَخ", "حَمّام", "بَلكون / شُرْفَة"],
                correct: "غُرْفِة نَوْم",
            },
            {
                id: "mc_reorder_3",
                type: "reorder",
                prompt: "Reorder the Arabic words to match: Our neighbors are nice but sometimes loud.",
                options: ["جيرانّا", "طَيِّبين", "بَس", "صَوْتهم", "عالي", "أَحْيانا"],
                correct: ["جيرانّا", "طَيِّبين", "بَس", "صَوْتهم", "عالي", "أَحْيانا"],
            },
            {
                id: "mc_choose_4",
                type: "choose",
                prompt: "Choose the correct Arabic word for: key",
                options: ["مِفْتاح", "باب", "شُبّاك", "مَيّ", "كَهْرَبا"],
                correct: "مِفْتاح",
            },
            {
                id: "mc_match_5",
                type: "match",
                prompt: "Match the English word to Arabic: light",
                options: ["ضَوّ", "غَسّالِة", "تَلّاجَة", "غَاز", "فُرْن"],
                correct: "ضَوّ",
            },
            {
                id: "mc_complete_6",
                type: "complete",
                prompt: "Complete the Arabic sentence for: The AC turns off when we turn on the washing machine.\nال___ بِطَفّي لَمّا نِشَغِّل غَسّالِة.",
                options: ["سَخّان مَيّ", "مِكيّف", "مَغْسَلِة", "حَنَفِيّة", "بنقط مَيّ"],
                correct: "مِكيّف",
            },
            {
                id: "mc_reorder_7",
                type: "reorder",
                prompt: "Reorder the Arabic words to match: The elevator sometimes stops between floors.",
                options: ["المِصْعَد", "بْوِقَّف", "بِنُصّ", "الطّابِق", "أَحْيانًا"],
                correct: ["المِصْعَد", "بْوِقَّف", "بِنُصّ", "الطّابِق", "أَحْيانًا"],
            },
            {
                id: "mc_choose_8",
                type: "choose",
                prompt: "Choose the correct Arabic word for: I rent (an apartment)",
                options: ["بَسْتَأْجِر", "بَدْفَع الإيجار", "في مُشْكِلَة في...", "بَتْواصَل مَع...", "عَقْد إيجار"],
                correct: "بَسْتَأْجِر",
            },
            {
                id: "mc_match_9",
                type: "match",
                prompt: "Match the English word to Arabic: building guard / caretaker",
                options: ["حارِس العِمارَة", "رُطوبَة", "تِدْفِئَة", "سَكَن جْديد", "مَشْحون"],
                correct: "حارِس العِمارَة",
            },
        ],
    },

    practice: {
        quiz: [
            {
                id: "apt_q1",
                questionAr: "«شَقَّة» مَعْنَاهَا:",
                optionsEn: [
                    "building",
                    "apartment / flat",
                    "balcony",
                ],
                correctIndex: 1,
            },
            {
                id: "apt_q2",
                questionAr: "أَيّ تَعْبِير أَكْثَر طَبِيعِي لِـ ‘There is a problem with the internet’؟",
                optionsEn: [
                    "فِي مُشْكِلَة فِي الإِنْتَرْنِت.",
                    "مَا عِنْدِي شَقَّة.",
                    "بَدْفَع الإِيجَار.",
                ],
                correctIndex: 0,
            },
            {
                id: "apt_q3",
                questionAr: "«ضَوّ الْمَطْبَخ مَا بِشْتَغِل» مَعْنَاهَا:",
                optionsEn: [
                    "The kitchen light doesn’t work.",
                    "The kitchen door is broken.",
                    "There is no kitchen.",
                ],
                correctIndex: 0,
            },
            {
                id: "apt_q4",
                questionAr: "«صَاحِب الْبَيْت» مَعْنَاهَا:",
                optionsEn: [
                    "the neighbour",
                    "the landlord / owner",
                    "the plumber",
                ],
                correctIndex: 1,
            },
            {
                id: "apt_q5",
                questionAr: "أَيّ كَلِمَة تُسْتَخْدَم لِـ ‘leak’؟",
                optionsEn: [
                    "رُطُوبَة",
                    "تَسَرُّب",
                    "ضَجَّة",
                ],
                correctIndex: 1,
            },
        ],

        rolePlays: [
            "Role-play 1: Viewing an apartment. Student A is the landlord; Student B is the new tenant. They talk about number of rooms, balcony, rent, electricity, water, and internet. The tenant asks: «فِي كَهْرَبَا كْوَيِّس؟» «وَقَدِّيش الإِيجَار؟».",
            "Role-play 2: Calling the landlord about a problem. Student A calls Student B and explains that there is a problem with water, electricity, or a broken window using chunks like «فِي مُشْكِلَة فِي…», «…مَا بِشْتَغِل», «التَّسَرُّب زَاد». The landlord promises to send someone.",
            "Role-play 3: Talking to a noisy neighbour. Student A is the neighbour; Student B politely complains about noise using «صَبَاح / مَسَا الْخِير», «بِصِرَاحَة فِي ضَجَّة…», «مَا بَدِّي أُزْعِل حَدَا، بَسّ…». Then they agree on a solution.",
        ],
        translation: [
            { id: "apt_t1", type: "enToAr", textEn: "The water is not working.", textAr: "المي مش شغالة." },
            { id: "apt_t2", type: "arToEn", textEn: "There is a problem with the heater.", textAr: "في مشكلة بالدفاية." },
            { id: "apt_t3", type: "enToAr", textEn: "Can you fix it today?", textAr: "بتقدر تصلّحها اليوم؟" },
            { id: "apt_t4", type: "arToEn", textEn: "The room is noisy.", textAr: "الغرفة مزعجة." },
            { id: "apt_t5", type: "enToAr", textEn: "I need a new apartment.", textAr: "بدي شقة جديدة." },
            { id: "apt_t6", type: "arToEn", textEn: "The electricity went out.", textAr: "الكهربا قطعت." }
        ],
    },

    // ====================================
    // HOMEWORK
    // ====================================
    homework: {
        instructions:
            "Write and record a 60–90 second description in Palestinian Arabic about your apartment (real or imaginary) and one or two problems in it. Include:\n" +
            "• How many rooms, which floor, and if there is a balcony.\n" +
            "• At least 4 words from the unit (for example: شَقَّة، غُرْفَة نُّوم، صَالُون، مَطْبَخ، بَلكُون، جِيرَان، صَاحِب الْبَيْت).\n" +
            "• At least 2 problem sentences using «فِي مُشْكِلَة فِي…» أو «…مَا بِشْتَغِل».\n" +
            "• One or two polite sentences you would say to the landlord or neighbour.",
    },

    // ====================================
    // TEACHER NOTES
    // ====================================
    teacherNotes: {
        warmup: [
            "Start by asking the student in English about their current living situation (house, apartment, student dorm, living with family). Then move key words into Palestinian Arabic.",
            "Draw a simple apartment plan (bedroom + living room + kitchen + bathroom + balcony) and label it together in Arabic.",
            "Ask the student which ‘apartment problems’ exist in their city (electricity, water, internet…) and use that to introduce vocabulary.",
        ],
        vocabularySteps: [
            "Teach room names and basic furniture first so the student can build a mental picture of the apartment.",
            "Then introduce the ‘problems’ group as a separate chunk: water, electricity, leak, humidity, noise, broken things.",
            "Highlight and practise the patterns: «فِي مُشْكِلَة فِي…» and «…مَا بِشْتَغِل» with different items.",
        ],
        dialogueSteps: [
            "Act the ‘viewing apartment’ scene as if you are really renting to the student; let them change the numbers (floors, rent).",
            "For the complaint scenes, help the student sound polite but clear. Practise softening expressions like «بِصِرَاحَة»، «مَا بَدِّي أُزْعِل حَدَا بَسّ…».",
            "Encourage the student to adapt the dialogues to their real life (for example, real problems with internet or neighbours).",
        ],
        practiceTips: [
            "Focus on helping the student say short, strong sentences that they could actually use with a landlord or neighbour.",
            "Use small information-gap activities (for example: the teacher has the ‘problem list’ and the student has the ‘solution list’, and they must match them in Arabic).",
            "If the student lives with family, let them imagine a future apartment they want to rent and describe it.",
        ],
        wrapup: [
            "End by summarising the student’s ‘dream apartment plus one problem’ using very natural Palestinian chunks.",
            "Ask the student to write 3 sentences they would actually say to a landlord if there was a real problem in their apartment.",
            "Remind them of the homework and suggest they record it as if they are talking to a friend about their place.",
        ],
        myNotes: "",
    },
};