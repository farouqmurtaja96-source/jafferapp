import { LESSON_ID_PLANS_FUTURE } from '../../core/constants.js';

export const lessonId = LESSON_ID_PLANS_FUTURE;
export const lesson = {
    meta: {
        level: "Intermediate",
        unit: "Plans & Future",
        lessonTitle: "Unit 13 – Plans & Future",
    },

    overview: {
        title: "Unit 13 – Plans & Future",
        description:
            "In this unit, students learn how to talk about future plans, intentions, schedules, and dreams in Palestinian Arabic, using patterns like ‘I’m going to’, ‘I want to’, ‘I’m planning to’, and common time expressions.",
        goals: [
            "Use ‘بَدّي’ and ‘رَح’ to talk about future and near plans.",
            "Use common time expressions: today, tomorrow, next week, this year.",
            "Talk about study, work, travel, and free-time plans.",
            "Express intentions with ‘نَاوِي / حَابِب / مُخَطِّط’.",
            "Ask other people about their plans and react naturally.",
        ],
    },

    // ====================================
    // VOCABULARY
    // ====================================
    vocabulary: {
        core: [
            // ===== BASIC FUTURE & INTENT =====
            {
                id: "baddi",
                ar: "بَدّي",
                en: "I want / I’m going to (intention)",
                enArabeezy: "baddi",
                hint:
                    "Very common for simple plans: بَدّي أَدْرُس = I want to / I’m going to study.",
                exampleAr: "بَدّي أَدْرُس بُكْرَا بَعْد الحصة.",
                exampleArabeezy: "bdy adrs bkra b3d el7sa.",
                exampleEn: "I’m going to study tomorrow after the lesson.",
            },
            {
                id: "ra7",
                ar: "رَح",
                en: "will (future marker)",
                enArabeezy: "ra7",
                hint:
                    "Used before the verb for planned/expected future: رَح أُسَافِر = I will travel.",
                exampleAr: "بُكْرَا رَح أُصْحَى بدري.",
                exampleArabeezy: "bkra r7 as7a bdry.",
                exampleEn: "Tomorrow I will wake up early.",
            },
            {
                id: "nawi",
                ar: "نَاوِي",
                en: "I intend / I’m planning (inside myself)",
                enArabeezy: "nawi",
                hint:
                    "Masc: نَاوِي، fem: نَاوْيَة. Use with ‘إِنِّي’: نَاوِي إِنِّي…",
                exampleAr: "أَنَا نَاوْيَ  أُكَمِّل دِرَاسَة عَرَبِي.",
                exampleArabeezy: "ana nawy akml drasa 3rby.",
                exampleEn: "I intend to continue studying Arabic.",
            },
            {
                id: "mukhattat",
                ar: "مخَطِّط",
                en: "planning / I have a plan",
                enArabeezy: "mukhattet",
                hint:
                    "Masc: مُخَطِّط، fem: مُخَطِّطَة. Stronger, more organized than نَاوِي.",
                exampleAr: "مخَطِّط إِنِّي أُسَافِر بَعْد سَنَة.",
                exampleArabeezy: "mkhtt iny asafr b3d sna.",
                exampleEn: "I’m planning to travel in a year.",
            },
            {
                id: "7abeb",
                ar: "حَابِب",
                en: "I’d like / I feel like (want in a soft way)",
                enArabeezy: "7abeb",
                hint:
                    "Masc: حَابِب، fem: حَابْبَة. Softer than بَدّي.",
                exampleAr: "حَابْبَ أَجَرِّب شِي جْدِيد هَالسَّنَة.",
                exampleArabeezy: "7abb ajrb shy jdyd halsna.",
                exampleEn: "I’d like to try something new this year.",
            },
            {
                id: "lazem",
                ar: "لَازِم",
                en: "must / have to",
                enArabeezy: "lazem",
                hint:
                    "Used for obligations, plans you ‘have to’ do.",
                exampleAr: "لَازِم أُخَلِّص الوَاجِب قَبْل الجمعة.",
                exampleArabeezy: "lazm akhls elwajb qbl eljm3a.",
                exampleEn: "I have to finish the homework before Friday.",
            },

            // ===== TIME EXPRESSIONS =====
            {
                id: "elyoom",
                ar: "اليَوْم",
                en: "today",
                enArabeezy: "elyoom",
                hint: "",
                exampleAr: "اليَوْم مَا عِنْدِي خُطَط كْتِير.",
                exampleArabeezy: "elywm ma 3ndy khtt ktyr.",
                exampleEn: "I don’t have many plans today.",
            },
            {
                id: "bukra",
                ar: "بُكْرَا",
                en: "tomorrow",
                enArabeezy: "bukra",
                hint: "",
                exampleAr: "بُكْرَا رَح أَقَابِل صَدِيقْتِي.",
                exampleArabeezy: "bkra r7 aqabl sdyqty.",
                exampleEn: "Tomorrow I will meet my friend.",
            },
            {
                id: "ba3d_bukra",
                ar: "بَعْد بُكْرَا",
                en: "the day after tomorrow",
                enArabeezy: "ba3d bukra",
                hint: "",
                exampleAr: "بَعْد بُكْرَا بَدّي أُرَتِّب غُرْفْتِي.",
                exampleArabeezy: "b3d bkra bdy artb ghrfty.",
                exampleEn: "The day after tomorrow I’m going to tidy my room.",
            },
            {
                id: "hal_usbou3",
                ar: "هَالْأُسْبُوع",
                en: "this week",
                enArabeezy: "hal usbou3",
                hint: "",
                exampleAr: "هَالْأُسْبُوع عِنْدِي مِشَارِيع كْتِير.",
                exampleArabeezy: "halasbw3 3ndy mshary3 ktyr.",
                exampleEn: "This week I have many projects.",
            },
            {
                id: "jاي_ousbou3",
                ar: "الأُسْبُوع الجَّاي",
                en: "next week",
                enArabeezy: "il usbou3 il jay",
                hint: "",
                exampleAr: "الأُسْبُوع الجَّاي رَح نِبْدَى وَحْدَة جْدِيدَة.",
                exampleArabeezy: "elasbw3 eljay r7 nbda w7da jdyda.",
                exampleEn: "Next week we will start a new unit.",
            },
            {
                id: "shahr_jاي",
                ar: "الشَّهِر الجَّاي",
                en: "next month",
                enArabeezy: "ish-shahr il jay",
                hint: "",
                exampleAr: "الشَّهِر الجَّاي نَاوِي أَبْلِش رِيَاضَة.",
                exampleArabeezy: "elshhr eljay nawy ablsh ryada.",
                exampleEn: "Next month I intend to start doing exercise.",
            },
            {
                id: "hal_saneh",
                ar: "هَالسَّنَة",
                en: "this year",
                enArabeezy: "hal saneh",
                hint: "",
                exampleAr: "هَالسَّنَة حَابِب أُسَافِر مَرَّة وَاحْدَة عَالأَقَلّ.",
                exampleArabeezy: "halsna 7abb asafr mra wa7da 3alaql.",
                exampleEn: "This year I’d like to travel at least once.",
            },
            {
                id: "saneh_jayyeh",
                ar: "السَّنَة الجَّاي",
                en: "next year",
                enArabeezy: "is-saneh il jayyeh",
                hint: "",
                exampleAr: "السَّنَة الجَّاي مُخَطِّط أَكْمِّل مُسْتَوَى أَعْلَى.",
                exampleArabeezy: "elsna eljay mkhtt akml mstwa a3la.",
                exampleEn: "Next year I’m planning to complete a higher level.",
            },
            {
                id: "ba3deen",
                ar: "بَعْدِين",
                en: "later / after that",
                enArabeezy: "ba3deen",
                hint: "Useful connector for future sequences.",
                exampleAr: "بَدّي أَدْرُس شْوَيّ، بَعْدِين أَتْفَرَّج عَلَى فِلْم.",
                exampleArabeezy: "bdy adrs shwy, b3dyn atfrj 3la flm.",
                exampleEn: "I’m going to study a bit, then watch a movie.",
            },

            // ===== TYPES OF PLANS =====
            {
                id: "mashrou3",
                ar: "مَشْرُوع",
                en: "project",
                enArabeezy: "mashrou3",
                hint: "Study or work project.",
                exampleAr: "عِنْدِي مَشْرُوع كْبِير لِلنِّهَاية السَّنَة.",
                exampleArabeezy: "3ndy mshrw3 kbyr lelnhaya elsna.",
                exampleEn: "I have a big project for the end of the year.",
            },

            {
                id: "safar",
                ar: "سَفَر",
                en: "travel",
                enArabeezy: "safar",
                hint: "",
                exampleAr: "حَابِب أَخَطِّط لِسَفَر قَصِير فِي الصَّيْف.",
                exampleArabeezy: "7abb akhtt lsfr qsyr fy elsyf.",
                exampleEn: "I’d like to plan a short trip in summer.",
            },
            {
                id: "i3tlah",
                ar: "عُطْلَة",
                en: "holiday / vacation",
                enArabeezy: "3otleh",
                hint: "",
                exampleAr: "بِالعُطْلَة بَدّي أَرِيح وَأَنَام كْتِير.",
                exampleArabeezy: "bel3tla bdy ary7 wanam ktyr.",
                exampleEn: "In the holiday I’m going to rest and sleep a lot.",
            },

            // ===== ASKING ABOUT PLANS =====
            {
                id: "shoo_mokhattatak",
                ar: "شُو مُخَطَّطَاتَك؟",
                en: "What are your plans?",
                enArabeezy: "shoo mukhattatatak?",
                hint:
                    "Masc/fem the same if you drop the ending in speech: مُخَطَّطَاتَك.",
                exampleAr: "شُو مُخَطَّطَاتَك لِهَالسَّنَة؟",
                exampleArabeezy: "shw mkhttatk lhalsna?",
                exampleEn: "What are your plans for this year?",
            },
            {
                id: "shoo_baddak_t3mel",
                ar: "شُو بَدَّك تِعْمِل بُكْرَا؟",
                en: "What do you want to do tomorrow?",
                enArabeezy: "shoo baddak t3mel bukra?",
                hint:
                    "Fem: شُو بَدِّك تِعْمْلِي؟ You can keep 1 entry & explain here.",
                exampleAr: "شُو بَدِّك تِعْمْلِي بُكْرَا بَعْد الدَّرْس؟",
                exampleArabeezy: "shw bdk t3mly bkra b3d eldrs?",
                exampleEn: "What do you want to do tomorrow after the lesson?",
            },
            {
                id: "3indak_khatta",
                ar: "عِنْدَك خُطَّة؟",
                en: "Do you have a plan?",
                enArabeezy: "3indak khitta?",
                hint: "",
                exampleAr: "لِوِيكِينْد، عِنْدَك خُطَّة أَو لِسَّه؟",
                exampleArabeezy: "lwykynd, 3ndk khta aw lsh?",
                exampleEn: "For the weekend, do you have a plan or not yet?",
            },
            {
                id: "ma3_time",
                ar: "لِبَعْدِين / لِبَعْد شْوَيّ",
                en: "for later",
                enArabeezy: "lba3deen / lba3d shway",
                hint: "Used when arranging time: لِبَعْدِين = for later.",
                exampleAr: "خَلِّينَا نِخَلِّي الدَّرْس لِبَعْدِين.",
                exampleArabeezy: "khlyna nkhly eldrs lb3dyn.",
                exampleEn: "Let’s leave the lesson for later.",
            },
        ],

        extra: [
            {
                id: "ahdaf",
                ar: "أَهْدَاف",
                en: "goals",
                enArabeezy: "ahdaf",
                hint: "Singular: هَدَف.",
                exampleAr: "عِنْدِي أَهْدَاف لِهَالسَّنَة فِي الدِّرَاسَة وَاللُّغَة.",
                exampleArabeezy: "3ndy ahdaf lhalsna fy eldrasa wellgha.",
                exampleEn: "I have goals for this year in study and language.",
            },
            {
                id: "tadreejan",
                ar: "تَدْرِيجِيًّا",
                en: "gradually",
                enArabeezy: "tadreejeyyan",
                hint: "",
                exampleAr: "بَدّي أَتْقَدَّم تَدْرِيجِيًّا يَعْنِي شْوَيّ شْوَيّ.",
                exampleArabeezy: "bdy atqdm tdryjya y3ny shwy shwy.",
                exampleEn: "I want to progress gradually, step by step.",
            },
            {
                id: "illa_iza",
                ar: "إِلَّا إِذَا",
                en: "unless / except if",
                enArabeezy: "illa iza",
                hint: "Used when plan might change.",
                exampleAr: "رَح أِجِي عَالدَّرْس، إِلَّا إِذَا طَلَع شِي طَارِئ.",
                exampleArabeezy: "r7 ajy 3aldrs, ila idha tl3 shy tary.",
                exampleEn: "I will come to the lesson, unless something urgent comes up.",
            },
            {
                id: "tanzim_wa2t",
                ar: "تَنْظِيم وَقْت",
                en: "time management",
                enArabeezy: "tanzeem wa2t",
                hint: "",
                exampleAr: "هَدَفِي هَالسَّنَة أُحَسِّن تَنْظِيم الوَقْت عِنْدِي.",
                exampleArabeezy: "hdfy halsna a7sn tnzym elwqt 3ndy.",
                exampleEn: "My goal this year is to improve my time management.",
            },
        ],
    }
    ,

    // ====================================
    // DIALOGUE – LONG SCENES
    // ====================================
    dialogue: {
        lines: [
            {
                "speaker": "Omar",
                "ar": "هاي يا مَلِك، كِيفِك اليوم؟",
                "arArabeezy": "hay ya mlk, kyfk elywm?",
                "en": "Hey Malek, how are you today?"
            },
            {
                "speaker": "Malek",
                "ar": "هَلَّقيت تَعْبان شْوَي، بَس مَبْسوط عَالخِطَط لِلأُسْبوع الجّاي.",
                "arArabeezy": "hlqyt t3ban shwy, bs mbswt 3alkhtt lelasbw3 eljay.",
                "en": "I’m a bit tired now, but I’m happy about the plans for next week."
            },
            {
                "speaker": "Omar",
                "ar": "جَدّ؟ قُول، شُو مُخَطِّط تِعْمِل؟",
                "arArabeezy": "jd?qwl, shw mkhtt t3ml?",
                "en": "Really? Tell me, what are you planning to do?"
            },
            {
                "speaker": "Malek",
                "ar": "الأُسْبوع الجّاي رَح أِبْلِّش تَدْرِيب بِشِرْكَة سوفتْوِير.",
                "arArabeezy": "elasbw3 eljay r7 ablsh tdryb bshrka swftwyr.",
                "en": "Next week I’ll start an internship at a software company."
            },
            {
                "speaker": "Omar",
                "ar": "واو، مُمْتاز! صار لَك زَمان ناوي عَهاد الاشي.",
                "arArabeezy": "waw, mmtaz! sar lk zman nawy 3had elashy.",
                "en": "Wow, that’s great! You’ve been intending to do that for a long time."
            },
            {
                "speaker": "Malek",
                "ar": "إي، بِرَأْيي هاي خُطْوَة خُطْوَة لِلْمُسْتَقْبَل.",
                "arArabeezy": "iy, brayy hay khtwa khtwa lelmstqbl.",
                "en": "Yes, in my opinion it’s a step-by-step move for the future."
            },
            {
                "speaker": "Omar",
                "ar": "طيب وإجازَة الصَّيْف؟ رَح تِسافِر وِلّا كُلَّه شُغُل؟",
                "arArabeezy": "tyb wijaza elsyf?r7 tsafr wla klh shghl?",
                "en": "And the summer vacation? Will you travel or is it all work?"
            },
            {
                "speaker": "Malek",
                "ar": "حابِب أُسافِر أُسْبوع، بَس أوَّل إِشي بَدّي أُوَفِّر مَصاري.",
                "arArabeezy": "7abb asafr asbw3, bs awl ishy bdy awfr msary.",
                "en": "I’d like to travel for a week, but first I want to save money."
            },
            {
                "speaker": "Omar",
                "ar": "بتمنى يِزْبُط مَعَك. أنا خِطّتي أِتْخَرَّج السَّنَة الجّاي.",
                "arArabeezy": "btmna yzbt m3k. ana khtty atkhrj elsna eljay.",
                "en": "Hopefully it works out. My plan is to graduate next year."
            },
            {
                "speaker": "Malek",
                "ar": "وبَعْدين؟ بَعْد التَّخَرُّج، شُو ناوي تِعْمِل؟",
                "arArabeezy": "wb3dyn?b3d eltkhrj, shw nawy t3ml?",
                "en": "And then? After graduation, what do you intend to do?"
            },
            {
                "speaker": "Omar",
                "ar": "لَسّه القَرار مِش نِهائي، بَس ناوي أَقَدِّم عَشُغُل وبِنْفَس الوَقْت أُكَمِّل دِراسَة.",
                "arArabeezy": "lsh elqrar msh nhayy, bs nawy aqdm 3shghl wbnfs elwqt akml drasa.",
                "en": "The decision is not final yet, but I intend to apply for a job and at the same time continue studying."
            },
            {
                "speaker": "Malek",
                "ar": "مش مستعجل شوي؟ هاد شغل كتير على شخص واحد.",
                "arArabeezy": "msh mst3jl shwy?had shghl ktyr 3la shkhs wa7d.",
                "en": "Aren’t you rushing it a bit? It’s a lot of work for one person."
            },
            {
                "speaker": "Omar",
                "ar": "مَبْسوط بِالفِكْرَة، بَس إذا شُفْت ضَغْط كْثير مُمْكِن أَجِّل واحِد مِن الهَدَفين.",
                "arArabeezy": "mbswt belfkra, bs idha shft dght kthyr mmkn ajl wa7d mn elhdfyn.",
                "en": "I like the idea, but if I see too much pressure I might postpone one of the two goals."
            },
            {
                "speaker": "Malek",
                "ar": "مْهِمّ تِرَتِّب أَوْلَوِيّاتَك، هادا أَهَمّ إشِي.",
                "arArabeezy": "mhm trtb awlwyatk, hada ahm ishy.",
                "en": "It’s important to arrange your priorities, that’s the most important thing."
            },
            {
                "speaker": "Omar",
                "ar": "صَحّ. على سِيرَة الخِطَط، شُو رَأْيَك نِطْلَع نِتْغَدّى بُكْرَة؟",
                "arArabeezy": "s7. 3la syra elkhtt, shw rayk ntl3 ntghda bkra?",
                "en": "Right. Speaking of plans, what do you think about going out for lunch tomorrow?"
            },
            {
                "speaker": "Malek",
                "ar": "بُكْرَة شْوَي مَشْغول، يِمْكِن بَعْد بُكْرَة أَفْضَل.",
                "arArabeezy": "bkra shwy mshghwl, ymkn b3d bkra afdl.",
                "en": "Tomorrow I’m a bit busy, maybe the day after tomorrow is better."
            },
            {
                "speaker": "Omar",
                "ar": "تمام، بَعْد بُكْرَة عَالسّاعَة وحدة",
                "arArabeezy": "tmam, b3d bkra 3alsa3a w7da",
                "en": "Okay, the day after tomorrow at one o’clock?"
            },
            {
                "speaker": "Malek",
                "ar": "أَكِيد، رَح أِفْضي حالي.",
                "arArabeezy": "akyd, r7 afdy 7aly.",
                "en": "Sure, I’ll make myself free."
            },
            {
                "speaker": "Omar",
                "ar": "وإذا صار تَغْيِير بالخِطّة؟",
                "arArabeezy": "widha sar tghyyr belkhta?",
                "en": "And if there’s a change in the plan?"
            },
            {
                "speaker": "Malek",
                "ar": "مِنْتِّفِق هَلَّقيت، وإذا اِضْطْرّينا نِلْغي أَو نِأَجِّل، بِبَعْتِلَك مِسِج.",
                "arArabeezy": "mntfq hlqyt, widha adtryna nlghy aw najl, bb3tlk msj.",
                "en": "We’ll agree now, and if we have to cancel or postpone, I’ll send you a message."
            },
            {
                "speaker": "Omar",
                "ar": "شُكْرًا، بحِبّ الناس إلّي بِتِلْتِزِم بِمَواعِيدها.",
                "arArabeezy": "shkra, b7b elnas ily btltzm bmwa3ydha.",
                "en": "Thanks, I like people who stick to their appointments."
            },
            {
                "speaker": "Malek",
                "ar": "تِصَدِّق؟ قَبِل، كُنْت أُخَطِّط كْثير وبَس ولا إِشِي يِصِير!",
                "arArabeezy": "tsdq?qbl, knt akhtt kthyr wbs wla ishy ysyr!",
                "en": "You know what? Before, I used to plan a lot and then nothing happened!"
            },
            {
                "speaker": "Omar",
                "ar": "يعني هلّق صرت واقعي أكتر؟",
                "arArabeezy": "y3ny hlq srt waq3y aktr?",
                "en": "So now you’ve become more realistic?"
            },
            {
                "speaker": "Malek",
                "ar": "إي، بِحاوِل أِخُذ خُطْوَة خُطْوَة وما أِحْطّ عَحالي ضَغْط كْثير.",
                "arArabeezy": "iy, b7awl akhdh khtwa khtwa wma a7t 37aly dght kthyr.",
                "en": "Yes, I try to go step by step and not put too much pressure on myself."
            },
            {
                "speaker": "Omar",
                "ar": "حِلِم السَّفَر لِسّه مَوْجود عِنْدَك؟",
                "arArabeezy": "7lm elsfr lsh mwjwd 3ndk?",
                "en": "Is the dream of traveling still there for you?"
            },
            {
                "speaker": "Malek",
                "ar": "أَكِيد! إن شاء الله بَعْد ما أِتْخَرَّج وَأُوَفِّر مَصاري، رَح أُقْدِّم عَمنْحَة.",
                "arArabeezy": "akyd! in sha ellh b3d ma atkhrj wawfr msary, r7 aqdm 3mn7a.",
                "en": "Of course! God willing, after I graduate and save money, I’ll apply for a scholarship."
            },
            {
                "speaker": "Omar",
                "ar": "وإذا ما زَبَطْت المنْحَة؟",
                "arArabeezy": "widha ma zbtt elmn7a?",
                "en": "And if the scholarship doesn’t work out?"
            },
            {
                "speaker": "Malek",
                "ar": "دايمًا في خِيار تاني، مُمْكِن آخُذ كُورْسات أونلاين وأَطَوِّر حالي مِن هون.",
                "arArabeezy": "dayma fy khyar tany, mmkn aakhdh kwrsat awnlayn watwr 7aly mn hwn.",
                "en": "There is always a second option: I can take online courses and improve myself from here."
            },
            {
                "speaker": "Omar",
                "ar": "هالحَكِي بيعْجِبْني، في تَفاؤُل وبِنَفْس الوَقْت واقِعِي.",
                "arArabeezy": "hal7ky by3jbny, fy tfawl wbnfs elwqt waq3y.",
                "en": "I like that; there is optimism and at the same time realism."
            },
            {
                "speaker": "Malek",
                "ar": "وإنت؟ شُو أَكْبَر هَدَف لَك لَلْمُسْتَقْبَل؟",
                "arArabeezy": "wint?shw akbr hdf lk lelmstqbl?",
                "en": "And you? What is your biggest goal for the future?"
            },
            {
                "speaker": "Omar",
                "ar": "هَدَفي أِتْخَرَّج، أِتْوَظَّف بِمَكان بحِبّه، وبَعْدين أُسافِر تَدْرِيب بَرّا سَنِة واحْدَة.",
                "arArabeezy": "hdfy atkhrj, atwzf bmkan b7bh, wb3dyn asafr tdryb bra sna wa7da.",
                "en": "My goal is to graduate, get a job in a place I like, and then travel for a one-year training abroad."
            },
            {
                "speaker": "Malek",
                "ar": "إن شاء الله كِلّ خِطَطَك تِزْبُط، خُطْوَة خُطْوَة.",
                "arArabeezy": "in sha ellh kl khttk tzbt, khtwa khtwa.",
                "en": "God willing, all your plans will work out, step by step."
            },
            {
                "speaker": "Omar",
                "ar": "وإن شاء الله خِطَطَك إنت كْمان.",
                "arArabeezy": "win sha ellh khttk int kman.",
                "en": "And God willing, your plans too."
            }
        ]
    }
    ,

    // ====================================
    // GRAMMAR
    // ====================================

    grammar: [
        {
            id: "past_want_have",
            title: "Past of Want/Have (كان بدي / كان عندي)",
            short: "Use كان + بدي/عندي for past wants and possession.",
            description:
                `To talk about past wants, use كان/كنت + بدي.
To talk about past possession, use كان/كنت + عندي.

Pattern:
كان/كنت + بدي / عندي.`,
            table: {
                title: "Past Want/Have",
                headers: ["Arabic", "Arabeezy", "English", "Usage"],
                rows: [
                    ["كنت بدي", "kunt biddi", "I wanted", "Past want"],
                    ["كان بدّو", "kaan bidd-o", "He wanted", "Male"],
                    ["كانت بدّها", "kaanit bidd-ha", "She wanted", "Female"],
                    ["كان عندي", "kaan 3indi", "I had", "Past have"],
                    ["كان عندها", "kaanit 3inda", "She had", "Past have"]
                ]
            },
            examples: [
                { ar: "كنت بدي أزور غزة", arabeezy: "kunt biddi azuur ghazze", en: "I wanted to visit Gaza." },
                { ar: "كان بدّو يسافر", arabeezy: "kaan bidd-o ysaafir", en: "He wanted to travel." },
                { ar: "كانت بدّها تدرس", arabeezy: "kaanit bidd-ha tdros", en: "She wanted to study." },
                { ar: "كان عندي وقت", arabeezy: "kaan 3indi wa2t", en: "I had time." },
                { ar: "كنت بدي قهوة", arabeezy: "kunt biddi 2ahwe", en: "I wanted coffee." }
            ],
            teacherNotes:
                `Spoken uses كان + بدي/عندي; MSA uses different verbs.
Keep the structure fixed and simple.
Use everyday wants and needs.
Avoid complex verb forms.`,
            commonMistakes: [
                "Using بدي for past situations",
                "Dropping كان/كنت",
                "Mixing gender in بدّو/بدّها"
            ],
            functionalUse: "Use this to describe past desires or what someone had."
        },
        {
            id: "future_intention",
            title: "Future Intention (رح + فعل)",
            short: "رح shows future plans.",
            description:
                `In spoken Arabic, رح marks future intention.
It goes before the verb.

رح + فعل = future plan.`,
            table: {
                title: "Future Patterns",
                headers: ["Arabic", "Arabeezy", "English", "Usage"],
                rows: [
                    ["رح أروح", "ra7 aruu7", "I will go", "Plan"],
                    ["رح تروح", "ra7 truu7", "You will go", "Second person"],
                    ["رح ييجي", "ra7 yiiji", "He will come", "Male"],
                    ["رح تيجي", "ra7 tiiji", "She will come", "Female"],
                    ["رح نطلع", "ra7 niTla3", "We will go out", "Group"]
                ]
            },
            examples: [
                { ar: "رح أزور أهلي", arabeezy: "ra7 azuur ahli", en: "I will visit my family." },
                { ar: "رح تروح عالشغل بكير", arabeezy: "ra7 truu7 3ash-shoghl bakkeer", en: "You will go to work early." },
                { ar: "رح يبلّش الدرس بكرا", arabeezy: "ra7 yballish ed-dars bukra", en: "The lesson will start tomorrow." },
                { ar: "رح نطلع مشوار", arabeezy: "ra7 niTla3 mshwaar", en: "We will go out." },
                { ar: "رح تيجي صاحبتك", arabeezy: "ra7 tiiji Sa7bitik", en: "Your friend will come." }
            ],
            teacherNotes:
                `Spoken uses رح more than MSA سوف.
Keep verbs in present form after رح.
Use plans and schedules for practice.
Avoid using رح with past time.`,
            commonMistakes: [
                "Using رح with past time",
                "Dropping رح in future statements",
                "Mixing MSA سوف with spoken"
            ],
            functionalUse: "Use this to talk about plans, intentions, and upcoming actions."
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
                prompt: "Match the English word to Arabic: I want / I’m going to (intention)",
                options: ["بَدّي", "رَح", "نَاوِي", "مخَطِّط", "حَابِب"],
                correct: "بَدّي",
            },
            {
                id: "mc_complete_2",
                type: "complete",
                prompt: "Complete the Arabic sentence for: I have to finish the homework before Friday.\n___ أُخَلِّص الوَاجِب قَبْل الجمعة.",
                options: ["لَازِم", "اليَوْم", "بُكْرَا", "بَعْد بُكْرَا", "هَالْأُسْبُوع"],
                correct: "لَازِم",
            },
            {
                id: "mc_reorder_3",
                type: "reorder",
                prompt: "Reorder the Arabic words to match: Next week we will start a new unit.",
                options: ["الأُسْبُوع", "الجَّاي", "رَح", "نِبْدَى", "وَحْدَة", "جْدِيدَة"],
                correct: ["الأُسْبُوع", "الجَّاي", "رَح", "نِبْدَى", "وَحْدَة", "جْدِيدَة"],
            },
            {
                id: "mc_choose_4",
                type: "choose",
                prompt: "Choose the correct Arabic word for: project",
                options: ["مَشْرُوع", "سَفَر", "عُطْلَة", "شُو مُخَطَّطَاتَك؟", "شُو بَدَّك تِعْمِل بُكْرَا؟"],
                correct: "مَشْرُوع",
            },
            {
                id: "mc_match_5",
                type: "match",
                prompt: "Match the English word to Arabic: Do you have a plan?",
                options: ["عِنْدَك خُطَّة؟", "لِبَعْدِين / لِبَعْد شْوَيّ", "أَهْدَاف", "تَدْرِيجِيًّا", "إِلَّا إِذَا"],
                correct: "عِنْدَك خُطَّة؟",
            },
        ],
    },

    practice: {
        quiz: [
            {
                id: "plans_q1",
                questionAr: "أَيّ جُمْلَة تِسْتَعْمِل «رَح» لِلْمُسْتَقْبَل؟",
                optionsEn: [
                    "بَدّي أَكْتُب الْيَوْم.",
                    "رَح أَكْتُب بُكْرَا.",
                    "أَنَا أَكْتُب هَلَّق.",
                ],
                correctIndex: 1,
            },
            {
                id: "plans_q2",
                questionAr: "«نَاوِي إِنِّي أُسَافِر» مَعْنَاهَا:",
                optionsEn: [
                    "I used to travel.",
                    "I intend to travel.",
                    "I hate traveling.",
                ],
                correctIndex: 1,
            },
            {
                id: "plans_q3",
                questionAr: "«الأُسْبُوع الجَّاي» مَعْنَاهَا:",
                optionsEn: [
                    "this week",
                    "next week",
                    "last week",
                ],
                correctIndex: 1,
            },
            {
                id: "plans_q4",
                questionAr: "أَيّ كَلِمَة تِسْتَعْمِلْهَا لِـ ‘later / after that’؟",
                optionsEn: [
                    "بَعْدِين",
                    "إِلَّا إِذَا",
                    "ضَغْط",
                ],
                correctIndex: 0,
            },
            {
                id: "plans_q5",
                questionAr: "«لَازِم أُخَلِّص المَشْرُوع» مَعْنَاهَا:",
                optionsEn: [
                    "I might finish the project.",
                    "I have to finish the project.",
                    "I don’t want to finish the project.",
                ],
                correctIndex: 1,
            },
        ],

        rolePlays: [
            "Role-play 1: Two friends talk about their plans for this week and next week. They must use: بَدّي / رَح / هَالْأُسْبُوع / الأُسْبُوع الجَّاي / بَعْدِين in at least 6–8 lines.",
            "Role-play 2: Talk about long-term future (this year + next year): study, work, travel. Use: نَاوِي، مُخَطِّط، أَهْدَاف، تَدْرِيجِيًّا، إِلَّا إِذَا… .",
            "Role-play 3: Student and teacher negotiate a study plan for Arabic (how many lessons, homework, extra tasks). The student must express preferences and limits using: بَحِبّ، مَا بَحِبّ، لَازِم، مُمْكِن، مَا بِفْرِق مَعِي.",
        ],
        translation: [
            { id: "plan_t1", type: "enToAr", textEn: "I will travel next month.", textAr: "رح أسافر الشهر الجاي." },
            { id: "plan_t2", type: "arToEn", textEn: "We are going to meet tomorrow.", textAr: "رح نتقابل بكرا." },
            { id: "plan_t3", type: "enToAr", textEn: "Do you have plans this weekend?", textAr: "عندك خطط بعطلة الأسبوع؟" },
            { id: "plan_t4", type: "arToEn", textEn: "I will call you later.", textAr: "رح أتصل فيك بعدين." },
            { id: "plan_t5", type: "enToAr", textEn: "I want to visit my family.", textAr: "بدي أزور أهلي." },
            { id: "plan_t6", type: "arToEn", textEn: "We will start at eight.", textAr: "رح نبلّش الساعة تمانية." }
        ],
    },

    // ====================================
    // HOMEWORK
    // ====================================
    homework: {
        instructions:
            "Write and record a 60–90 second audio in Palestinian Arabic about your future plans:\n" +
            "1. Talk about your plans for this week and next week (at least 3 sentences each) using: هَالْأُسْبُوع، الأُسْبُوع الجَّاي، بَدّي، رَح، بَعْدِين.\n" +
            "2. Talk about your big goals for this year and next year using: نَاوِي / حَابِب / مُخَطِّط / أَهْدَاف / تَدْرِيجِيًّا.\n" +
            "3. Try to mention one plan for study, one for work (or future job), and one for travel or free time.\n" +
            "4. Use at least one ‘unless’ sentence with «إِلَّا إِذَا».",
    },

    // ====================================
    // TEACHER NOTES
    // ====================================
    teacherNotes: {
        warmup: [
            "Ask the student what day it is today and then in English ask: ‘What are your plans for this week?’ Move slowly into Arabic with key words: بَدّي، بُكْرَا، الأُسْبُوع الجَّاي.",
            "Draw a small timeline (today → this week → next month → next year) and write Arabic labels.",
        ],
        vocabularySteps: [
            "First, teach بَدّي vs رَح with very short examples tied to the student’s real life.",
            "Then add نَاوِي / مُخَطِّط / حَابِب and show the difference between inside intention and organized plan.",
            "Introduce time expressions in groups (week, month, year) and recycle them constantly.",
        ],
        dialogueSteps: [
            "Use Scene 1 as a model. Then ask the student to replace ‘project / exam / beach’ with their own reality.",
            "For the teacher–student scene, actually ask the student about their real study plan and edit it together in Arabic.",
        ],
        practiceTips: [
            "Encourage approximate answers; don’t demand perfect grammar. The goal is fluency in talking about the future.",
            "If the student is overwhelmed, choose only 2 core patterns for the first lesson (for example: بَدّي + time expressions).",
        ],
        wrapup: [
            "At the end, ask the student to tell you ONE concrete plan for tonight, this week, this month, and this year.",
            "Save or copy their answers to reuse in the next lesson and check what really happened.",
        ],
        myNotes: "",
    },
};