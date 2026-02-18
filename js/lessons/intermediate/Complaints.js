import { LESSON_ID_COMPLAINTS } from '../../core/constants.js';

export const lessonId = LESSON_ID_COMPLAINTS;
export const lesson = {
    meta: {
        level: "Intermediate",
        unit: "Complaints",
        lessonTitle: "Unit 12 – Making Complaints Politely",
    },
    overview: {
        title: "Unit 12 – Complaints",
        description:
            "In this lesson, students learn how to complain politely but clearly about problems (services, noise, delays), ask for a solution, and react to responses in Palestinian Arabic.",
        goals: [
            "Describe a problem clearly using common complaint language.",
            "Express frustration and annoyance without sounding rude or aggressive.",
            "Make polite requests for action and suggest possible solutions.",
            "React to apologies and promises: accept, refuse, or insist.",
            "Handle a short role-play with a receptionist, office worker, or service employee.",
        ],
    },

    vocabulary: {
        core: [
            {
                id: "co_core_1",
                ar: "شَكْوَى",
                en: "complaint",
                enArabeezy: "shakwa",
                hint: "Formal or semi-formal complaint",
                exampleAr: "بِفَكِّر أَقَدِّم شَكْوَى رَسْمِيّة.",
                exampleArabeezy: "bfkr aqdm shkwa rsmya.",
                exampleEn: "I’m thinking of filing an official complaint.",
            },
            {
                id: "co_core_2",
                ar: "يِشْتِكي",
                en: "to complain",
                enArabeezy: "yeshtiki",
                hint: "Verb: he complains",
                exampleAr: "ما بِحِبّ أِشْتِكي، بَس في مَشْكِلة جَدِّيّة.",
                exampleArabeezy: "ma b7b ashtky, bs fy mshkla jdya.",
                exampleEn: "I don’t like to complain, but there is a serious problem.",
            },
            {
                id: "co_core_3",
                ar: "مَشْكِلة",
                en: "problem",
                enArabeezy: "mashkleh",
                hint: "General word",
                exampleAr: "في مَشْكِلة بِالمَوَاصَلات.",
                exampleArabeezy: "fy mshkla belmwaslat.",
                exampleEn: "There is a problem with the transportation.",
            },
            {
                id: "co_core_4",
                ar: "مُزْعِج",
                en: "annoying / disturbing",
                enArabeezy: "moz3ej",
                hint: "Describes noise, behavior, etc.",
                exampleAr: "الصَّوْت مُزْعِج كْثير.",
                exampleArabeezy: "elswt mz3j kthyr.",
                exampleEn: "The noise is very annoying.",
            },
            {
                id: "co_core_5",
                ar: "مِش مَعْقول",
                en: "unacceptable / unbelievable",
                enArabeezy: "mish ma3ʾool",
                hint: "Strong reaction to situation",
                exampleAr: "مِش مَعْقول كُل يوم نِسْتَنّى ساعة.",
                exampleArabeezy: "msh m3qwl kl ywm nstna sa3a.",
                exampleEn: "It’s not acceptable to wait an hour every day.",
            },
            {
                id: "co_core_6",
                ar: "عنْجَد",
                en: "really / seriously",
                enArabeezy: "3an jad",
                hint: "Emphasis marker",
                exampleAr: "عنْجَد الوَضْع صار مُزْعِج.",
                exampleArabeezy: "3njd elwd3 sar mz3j.",
                exampleEn: "Seriously, the situation has become annoying.",
            },
            {
                id: "co_core_7",
                ar: "يِنْرْفِز",
                en: "to make (someone) nervous / annoyed",
                enArabeezy: "yenrfiz",
                hint: "Colloquial verb",
                exampleAr: "التَّأْخير بْيِنْرْفِزني.",
                exampleArabeezy: "eltakhyr bynrfzny.",
                exampleEn: "The delay makes me nervous.",
            },
            {
                id: "co_core_8",
                ar: "يِتْأَخَّر",
                en: "to be late / delayed",
                enArabeezy: "yitʾaʾkhar",
                exampleAr: "الباص دايْمًا بْيِتْأَخَّر.",
                exampleArabeezy: "elbas dayma bytakhr.",
                exampleEn: "The bus is always late.",
            },
            {
                id: "co_core_9",
                ar: "بِضِلّ",
                en: "keeps / continues",
                enArabeezy: "bidall",
                hint: "Used with a problem continuing",
                exampleAr: "المَشْكِلة بِتضِلّ تِتْكَرَّر.",
                exampleArabeezy: "elmshkla btdl ttkrr.",
                exampleEn: "The problem keeps repeating.",
            },
            {
                id: "co_core_10",
                ar: "مِن حَقّي",
                en: "it’s my right",
                enArabeezy: "min 7aqqi",
                hint: "Used in complaints",
                exampleAr: "مِن حَقّي أوْصَل عَالوَقْت.",
                exampleArabeezy: "mn 7qy awsl 3alwqt.",
                exampleEn: "It’s my right to arrive on time.",
            },
            {
                id: "co_core_11",
                ar: "خِدْمَة",
                en: "service",
                enArabeezy: "khidmeh",
                exampleAr: "الخدمة هون مش بالمستوى المطلوب.",
                exampleArabeezy: "elkhdma hwn msh belmstwa elmtlwb.",
                exampleEn: "The service here is not at the right level.",
            },
            {
                id: "co_core_12",
                ar: "مُسْتَوى",
                en: "level / standard",
                enArabeezy: "mostawa",
                exampleAr: "مُسْتَوى النَّظافَة قليل.",
                exampleArabeezy: "mstwa elnzafa qlyl.",
                exampleEn: "The level of cleanliness is low.",
            },
            {
                id: "co_core_13",
                ar: "مَسؤول",
                en: "person in charge",
                enArabeezy: "masʾool",
                hint: "Manager / responsible person",
                exampleAr: "بَحِبّ أحْكي مَع المَسؤول لو سَمَحْت.",
                exampleArabeezy: "b7b a7ky m3 elmswwl lw sm7t.",
                exampleEn: "I’d like to speak to the person in charge, please.",
            },
            {
                id: "co_core_14",
                ar: "مُوَظَّف الاسْتِقْبال",
                en: "receptionist",
                enArabeezy: "mwaZZaf il-isteʾbāl",
                exampleAr: "حَكِيت مَع مُوَظَّف الاسْتِقْبال عَن المَشْكِلة.",
                exampleArabeezy: "7kyt m3 mwzf elastqbal 3n elmshkla.",
                exampleEn: "I spoke with the receptionist about the problem.",
            },
            {
                id: "co_core_15",
                ar: "يِعالِج المَشْكِلة",
                en: "to handle / fix the problem",
                enArabeezy: "ye3ālej il-mashkleh",
                exampleAr: "لازِم حدا يِعالِج المَشْكِلة بسرعة.",
                exampleArabeezy: "lazm 7da y3alj elmshkla bsr3a.",
                exampleEn: "Someone must handle the problem quickly.",
            },
            {
                id: "co_core_16",
                ar: "يِحِلّ المَشْكِلة",
                en: "to solve the problem",
                enArabeezy: "ye7ell il-mashkleh",
                exampleAr: "إن شاء الله تِحِلّوا المَشْكِلة قَرِيب.",
                exampleArabeezy: "in sha ellh t7lwa elmshkla qryb.",
                exampleEn: "Hopefully you will solve the problem soon.",
            },
            {
                id: "co_core_17",
                ar: "يِوَعِد",
                en: "to promise",
                enArabeezy: "yewa3ed",
                exampleAr: "وَعَدُونا يِحِلّوا المَشْكِلة.",
                exampleArabeezy: "w3dwna y7lwa elmshkla.",
                exampleEn: "They promised us they would solve the problem.",
            },
            {
                id: "co_core_18",
                ar: "يِرُدّ",
                en: "to reply / respond",
                enArabeezy: "yerodd",
                exampleAr: "المَكْتَب ما رَدّ عَالشَّكْوَى.",
                exampleArabeezy: "elmktb ma rd 3alshkwa.",
                exampleEn: "The office didn’t respond to the complaint.",
            },
            {
                id: "co_core_19",
                ar: "يِعْتِذِر",
                en: "to apologize",
                enArabeezy: "ye3tezr",
                exampleAr: "المُوَظَّف اِعْتَذَر عَالتَّأْخير.",
                exampleArabeezy: "elmwzf a3tdhr 3altakhyr.",
                exampleEn: "The employee apologized for the delay.",
            },
            {
                id: "co_core_20",
                ar: "عُذْر",
                en: "excuse",
                enArabeezy: "3ozr",
                exampleAr: "العُذْر مَش مَقْنِع.",
                exampleArabeezy: "el3dhr msh mqn3.",
                exampleEn: "The excuse is not convincing.",
            },
            {
                id: "co_core_21",
                ar: "مَقْنِع",
                en: "convincing",
                enArabeezy: "maqne3",
                exampleAr: "التَّبْرير ما كان مَقْنِع.",
                exampleArabeezy: "eltbryr ma kan mqn3.",
                exampleEn: "The explanation wasn’t convincing.",
            },
            {
                id: "co_core_22",
                ar: "يِتْجاهَل",
                en: "to ignore",
                enArabeezy: "yitjāhal",
                exampleAr: "حاسَّة إنّهم عَم يِتْجاهَلوا المَشْكِلة.",
                exampleArabeezy: "7asa inhm 3m ytjahlwa elmshkla.",
                exampleEn: "I feel they are ignoring the problem.",
            },
            {
                id: "co_core_23",
                ar: "مِسْتَمِرّ",
                en: "continuous / ongoing",
                enArabeezy: "mestamer",
                exampleAr: "الصَّوْت المُزْعِج مِسْتَمِرّ لَحد هَلَّق.",
                exampleArabeezy: "elswt elmz3j mstmr l7d hlq.",
                exampleEn: "The annoying noise is still ongoing.",
            },
            {
                id: "co_core_24",
                ar: "تِكْرار",
                en: "repetition",
                enArabeezy: "tekraar",
                exampleAr: "تِكْرار المَشْكِلة خَلّاني أِشْتِكي.",
                exampleArabeezy: "tkrar elmshkla khlany ashtky.",
                exampleEn: "The repetition of the problem made me complain.",
            },
            {
                id: "co_core_25",
                ar: "مَرَّة واحْدَة / أوَّل مَرّة",
                en: "one time / first time",
                enArabeezy: "marra wa7deh / awwal marra",
                exampleAr: "لو كانت مرّة وحدة ماشي الحال، بس هاي بتتكرّر.",
                exampleArabeezy: "lw kant mra w7da mashy el7al, bs hay bttkrr.",
                exampleEn: "If it were one time it’s fine, but this is repeated.",
            },
            {
                id: "co_core_26",
                ar: "مَع إحْتِرامي",
                en: "with all respect",
                enArabeezy: "ma3 e7terāmi",
                hint: "Softener before criticism",
                exampleAr: "مَع إحْتِرامي، الخِدْمَة هون ضَعيفَة.",
                exampleArabeezy: "m3 i7tramy, elkhdma hwn d3yfa.",
                exampleEn: "With all respect, the service here is weak.",
            },
            {
                id: "co_core_27",
                ar: "ما قَصْدي أِزَعِّل حَدا",
                en: "I don’t mean to upset anyone",
                enArabeezy: "ma ʾasdi aza33el 7ada",
                exampleAr: "ما قَصْدي أِزَعِّل حَدا بَس الوَضْع مِش مَقْبول.",
                exampleArabeezy: "ma qsdy az3l 7da bs elwd3 msh mqbwl.",
                exampleEn: "I don’t mean to upset anyone, but the situation is not acceptable.",
            },
            {
                id: "co_core_28",
                ar: "مُمْكِن تِعْمِلوا شِي؟",
                en: "can you do something?",
                enArabeezy: "mumkin t3mlo shi?",
                hint: "Request for action",
                exampleAr: "المَشْكِلة مِسْتَمِرّة، مُمْكِن تِعْمِلوا شِي؟",
                exampleArabeezy: "elmshkla mstmra, mmkn t3mlwa shy?",
                exampleEn: "The problem is ongoing, can you do something?",
            },
            {
                id: "co_core_29",
                ar: "بِتْمَنّى تِلْقوا حَلّ",
                en: "I hope you find a solution",
                enArabeezy: "bitmanna telʾo 7all",
                exampleAr: "بِتْمَنّى تِلْقوا حَلّ قَبْل الاسْبوع الجّاي.",
                exampleArabeezy: "btmna tlqwa 7l qbl elasbw3 eljay.",
                exampleEn: "I hope you find a solution before next week.",
            },
            {
                id: "co_core_30",
                ar: "ما إلِي خِلِق",
                en: "I have no energy / I’m fed up",
                enArabeezy: "ma eli khileʾ",
                hint: "Colloquial, expresses frustration",
                exampleAr: "بصراحة ما عندي طاقة أتعامل مع هالموضوع أكتر.",
                exampleArabeezy: "bsra7a ma 3ndy taqa at3aml m3 halmwdw3 aktr.",
                exampleEn: "Honestly I have no energy to deal with this any more.",
            },
            {
                id: "co_core_31",
                ar: "يِصْبِر",
                en: "to be patient",
                enArabeezy: "yesbor",
                exampleAr: "تحمّلنا شهر كامل، بس المشكلة لسه موجودة.",
                exampleArabeezy: "t7mlna shhr kaml, bs elmshkla lsh mwjwda.",
                exampleEn: "We were patient for a whole month but the problem is still there.",
            },
            {
                id: "co_core_32",
                ar: "يِشَكِّر",
                en: "to thank",
                enArabeezy: "yeshakkir",
                exampleAr: "بِدّي أِشَكِّرَك عَالتَّجاوُب.",
                exampleArabeezy: "bdy ashkrk 3altjawb.",
                exampleEn: "I want to thank you for responding.",
            },
            {
                id: "co_core_33",
                ar: "يِتْفاهَم",
                en: "to understand each other",
                enArabeezy: "yitfāham",
                exampleAr: "مهم نتّفق على حلّ وسط.",
                exampleArabeezy: "mhm ntfq 3la 7l wst.",
                exampleEn: "It’s important that we agree on a middle solution.",
            },
            {
                id: "co_core_34",
                ar: "حَلّ وَسَط",
                en: "compromise / middle solution",
                enArabeezy: "7all wasaT",
                exampleAr: "مُمْكِن نِلاقِي حَلّ وَسَط يِرْضي الجِهْتَيْن.",
                exampleArabeezy: "mmkn nlaqy 7l wst yrdy eljhtyn.",
                exampleEn: "We can find a compromise that satisfies both sides.",
            },
            {
                id: "co_core_35",
                ar: "مُعامَلَة",
                en: "treatment (how they treat you)",
                enArabeezy: "mo3āmaleh",
                exampleAr: "مُعامَلَة المُوَظَّفين إِلَنا كانِت مُحْتَرَمَة.",
                exampleArabeezy: "m3amla elmwzfyn ilna kant m7trma.",
                exampleEn: "The way the employees treated us was respectful.",
            },
        ],

        extra: [
            {
                id: "co_extra_1",
                ar: "قِسْم شَكَاوِي",
                en: "complaints department",
                enArabeezy: "ʾesm shakaawi",
                exampleAr: "في قِسْم شَكَاوِي بِالإِدارَة.",
                exampleArabeezy: "fy qsm shkawy belidara.",
                exampleEn: "There is a complaints department in the administration.",
            },
            {
                id: "co_extra_2",
                ar: "رَدّ رَسْمِي",
                en: "official reply",
                enArabeezy: "radd rasmi",
                exampleAr: "اسْتَنّينا رَدّ رَسْمِي ومَا إجا.",
                exampleArabeezy: "astnyna rd rsmy wma ija.",
                exampleEn: "We waited for an official reply and it didn’t come.",
            },
            {
                id: "co_extra_3",
                ar: "حِجّة",
                en: "pretext / lame excuse",
                enArabeezy: "7ejjeh",
                exampleAr: "حاسِّة إنّه هادا كُلّه حِجّة.",
                exampleArabeezy: "7asa inh hada klh 7ja.",
                exampleEn: "I feel like this is all just an excuse.",
            },
            {
                id: "co_extra_4",
                ar: "مُتابَعَة",
                en: "follow-up",
                enArabeezy: "motābaʿa",
                exampleAr: "بِدّنا مُتابَعَة عَالمَشْكِلة مِش بَس وَعْد.",
                exampleArabeezy: "bdna mtab3a 3almshkla msh bs w3d.",
                exampleEn: "We want follow-up on the problem, not just a promise.",
            },
            {
                id: "co_extra_5",
                ar: "تَعْويض",
                en: "compensation",
                enArabeezy: "ta3weeD",
                exampleAr: "طَلَبْنا تَعْويض بَسِيط عَالخَسارَة.",
                exampleArabeezy: "tlbna t3wyd bsyt 3alkhsara.",
                exampleEn: "We asked for a small compensation for the loss.",
            },
        ],
    }
    ,

    dialogue: {
        lines: [
            {
                "speaker": "Rina",
                "ar": "يا مِنى، عنْجَد ما إلِي خِلِق اليوم.",
                "arArabeezy": "ya mna, 3njd ma ily khlq elywm.",
                "en": "Mina, I honestly have no energy today."
            },
            {
                "speaker": "Mina",
                "ar": "شو اللي صار يا رينا؟ شكلك متضايقة.",
                "arArabeezy": "shw elly sar ya ryna?shklk mtdayqa.",
                "en": "What happened, Rina? You look upset."
            },
            {
                "speaker": "Rina",
                "ar": "الباص اللي بروح عالجامعة تقريبًا كل يوم بتأخّر نص ساعة أو أكتر.",
                "arArabeezy": "elbas elly brw7 3aljam3a tqryba kl ywm btakhr ns sa3a aw aktr.",
                "en": "The bus to the university is almost every day half an hour late or more."
            },
            {
                "speaker": "Mina",
                "ar": "إي بَعْرِف، عنْجَد مُزْعِج.",
                "arArabeezy": "iy b3rf, 3njd mz3j.",
                "en": "Yeah, I know, it’s really annoying."
            },
            {
                "speaker": "Rina",
                "ar": "مِش مَعْقول نِدْفَع اِشْتِراك وِنْضَلّ نِسْتَنّى عَالفاضي.",
                "arArabeezy": "msh m3qwl ndf3 ashtrak wndl nstna 3alfady.",
                "en": "It’s not acceptable that we pay a subscription and keep waiting for nothing."
            },
            {
                "speaker": "Mina",
                "ar": "حاوَلْتي تِشْتِكي لَحَدّا؟",
                "arArabeezy": "7awlty tshtky l7da?",
                "en": "Have you tried complaining to someone?"
            },
            {
                "speaker": "Rina",
                "ar": "مَرّة حَكَيْت مَع السّواق، بَس حَكى إنّه الزَّحْمِة مِش بِيِدُه.",
                "arArabeezy": "mra 7kyt m3 elswaq, bs 7ka inh elz7ma msh bydh.",
                "en": "Once I talked to the driver, but he said the traffic is not in his hands."
            },
            {
                "speaker": "Mina",
                "ar": "مَع إحْتِرامي إلُه، بَس المَشْكِلة مِسْتَمِرّة.",
                "arArabeezy": "m3 i7tramy ilh, bs elmshkla mstmra.",
                "en": "With all respect to him, but the problem is continuing."
            },
            {
                "speaker": "Rina",
                "ar": "صح. تكرار المشكلة هو اللي فعليًا بنرفزني كتير.",
                "arArabeezy": "s7. tkrar elmshkla hw elly f3lya bnrfzny ktyr.",
                "en": "Right. The repetition of the problem is what really gets on my nerves."
            },
            {
                "speaker": "Mina",
                "ar": "مِن حَقِّك توْصَلي عَالوَقْت. ليش ما نِحْكي مَع مُوَظَّف الاسْتِقْبال بِالشَّرِكِة؟",
                "arArabeezy": "mn 7qk twsly 3alwqt. lysh ma n7ky m3 mwzf elastqbal belshrka?",
                "en": "It’s your right to arrive on time. Why don’t we talk to the receptionist at the company?"
            },
            {
                "speaker": "Rina",
                "ar": "بِخاف يِفَكْرونا عَم نِبالِغ.",
                "arArabeezy": "bkhaf yfkrwna 3m nbalgh.",
                "en": "I’m afraid they’ll think we’re exaggerating."
            },
            {
                "speaker": "Mina",
                "ar": "لا، إذا حكيتي بهدوء وبأدب، ولا حدا رح يزعل.",
                "arArabeezy": "la, idha 7kyty bhdw wbadb, wla 7da r7 yz3l.",
                "en": "No, if you speak calmly and politely, no one will get upset."
            },
            {
                "speaker": "Rina",
                "ar": "طيب، بتيجي معي؟",
                "arArabeezy": "tyb, btyjy m3y?",
                "en": "Okay, will you come with me?"
            },
            {
                "speaker": "Mina",
                "ar": "أكيد، يَلّا نِنْزِل عَالمَكْتَب.",
                "arArabeezy": "akyd, yla nnzl 3almktb.",
                "en": "Of course, let’s go down to the office."
            },
            {
                "speaker": "Receptionist",
                "ar": "مَسّا الخير، تْفَضَّلوا.",
                "arArabeezy": "msa elkhyr, tfdlwa.",
                "en": "Good afternoon, welcome."
            },
            {
                "speaker": "Rina",
                "ar": "مَسّا النّور. مَع إحْتِرامي، في مَشْكِلة حابّين نِحْكي فيها.",
                "arArabeezy": "msa elnwr. m3 i7tramy, fy mshkla 7abyn n7ky fyha.",
                "en": "Good afternoon. With all respect, there is a problem we’d like to talk about."
            },
            {
                "speaker": "Receptionist",
                "ar": "تْفَضَّلوا إحْكوا، شُو في؟",
                "arArabeezy": "tfdlwa i7kwa, shw fy?",
                "en": "Please go ahead, what’s going on?"
            },
            {
                "speaker": "Rina",
                "ar": "باص الجامعة عادةً بتأخّر نص ساعة، وأحيانًا أكتر.",
                "arArabeezy": "bas eljam3a 3ada btakhr ns sa3a, wa7yana aktr.",
                "en": "The university bus usually is thirty minutes late, and sometimes more."
            },
            {
                "speaker": "Mina",
                "ar": "والمَشْكِلة مِش مَرَّة واحْدَة، هادا تِكْرار يَومِي تَقريبًا.",
                "arArabeezy": "welmshkla msh mra wa7da, hada tkrar ywmy tqryba.",
                "en": "And the problem isn’t just once, this is almost daily repetition."
            },
            {
                "speaker": "Rina",
                "ar": "عنْجَد صار الوَضْع مُزْعِج، ومِن حَقّنا نوْصَل عَمحاضْراتنا عَالوَقْت.",
                "arArabeezy": "3njd sar elwd3 mz3j, wmn 7qna nwsl 3m7adratna 3alwqt.",
                "en": "It really has become annoying, and it’s our right to arrive to our lectures on time."
            },
            {
                "speaker": "Receptionist",
                "ar": "فاهمين عليكم، وبصراحة الأيام هاي في زحمة سير كتيرة.",
                "arArabeezy": "fahmyn 3lykm, wbsra7a elayam hay fy z7ma syr ktyra.",
                "en": "We understand you; honestly, the traffic is heavy these days."
            },

            {
                "speaker": "Mina",
                "ar": "ممكن تعملوا إشي بخصوص الموعد؟ ممكن الباصات تطلع أبكر شوي؟",
                "arArabeezy": "mmkn t3mlwa ishy bkhsws elmw3d?mmkn elbasat ttl3 abkr shwy?",
                "en": "Can you do something about the schedule? Can the buses leave a bit earlier?"
            },
            {
                "speaker": "Receptionist",
                "ar": "إحنا ملتزمين بوقت ثابت، بس رح نوصل كلامكم للمسؤول.",
                "arArabeezy": "i7na mltzmyn bwqt thabt, bs r7 nwsl klamkm lelmswwl.",
                "en": "We are tied to a fixed time, but we will pass your words to the person in charge."
            },
            {
                "speaker": "Rina",
                "ar": "صَبَرْنا شَهِر كَامِل، وبِتْمَنّى هالمَرّة يكون في مُتابَعَة حَقِيقِيّة.",
                "arArabeezy": "sbrna shhr kaml, wbtmna halmra ykwn fy mtab3a 7qyqya.",
                "en": "We’ve been patient for a whole month, and I hope this time there will be real follow-up."
            },
            {
                "speaker": "Receptionist",
                "ar": "عَن جَدّ إحْنا آسْفِين عَالإِزْعاج، وبنِوَعِدكم نِراجِع الجَدْوَل.",
                "arArabeezy": "3n jd i7na aasfyn 3aliz3aj, wbnw3dkm nraj3 eljdwl.",
                "en": "We are really sorry for the inconvenience, and we promise to review the schedule."
            },
            {
                "speaker": "Mina",
                "ar": "شُكْرًا عَالتَّجاوُب، وبِتْمَنّى تِلْقوا حَلّ في أَقْرَب وَقْت.",
                "arArabeezy": "shkra 3altjawb, wbtmna tlqwa 7l fy aqrb wqt.",
                "en": "Thank you for responding, and I hope you find a solution as soon as possible."
            },
            {
                "speaker": "Rina",
                "ar": "ما قَصْدي أِزَعِّل حَدا، بَس بجد الوَضْع مِش مَعْقول.",
                "arArabeezy": "ma qsdy az3l 7da, bs bjd elwd3 msh m3qwl.",
                "en": "I don’t mean to upset anyone, but honestly the situation is unacceptable."
            },
            {
                "speaker": "Receptionist",
                "ar": "لا، كلامكم مَفْهُوم، وهَادا حَقِّكُم. وبنِشَكِّرُكُم إنّكم حَكَيْتوا بِأَدَب.",
                "arArabeezy": "la, klamkm mfhwm, whada 7qkm. wbnshkrkm inkm 7kytwa badb.",
                "en": "No, your words are understood, and this is your right. We thank you for speaking politely."
            },

            {
                "speaker": "Mina",
                "ar": "يَلّا رِنا، نِرْجَع عَالمَحاضْرَة قَبْل ما نِتْأَخَّر مَرّة تانيِة.",
                "arArabeezy": "yla rna, nrj3 3alm7adra qbl ma ntakhr mra tanya.",
                "en": "Come on Rina, let’s go back to the lecture before we’re late again."
            },
            {
                "speaker": "Rina",
                "ar": "مَزْبوط، يِلّا نِمْشي.",
                "arArabeezy": "mzbwt, yla nmshy.",
                "en": "True, let’s go."
            }
        ]
    }
    ,

    grammar: [
        {
            id: "past_tense",
            title: "Past Tense (Simple Conjugation)",
            short: "Add endings to talk about finished actions.",
            description:
                `Past tense in spoken Arabic is built by adding endings to the verb stem.
The base is usually for هو, and you add endings for other pronouns.

Use it for actions that already happened.`,
            table: {
                title: "Past Endings (كتب)",
                headers: ["Arabic", "Arabeezy", "English", "Ending"],
                rows: [
                    ["أنا كتبت", "ana katabt", "I wrote", "-t"],
                    ["إنتَ كتبت", "inta katabt", "You wrote (m)", "-t"],
                    ["إنتِ كتبتي", "inti katabti", "You wrote (f)", "-ti"],
                    ["هو كتب", "howwa katab", "He wrote", "base"],
                    ["هي كتبت", "hiyye katabit", "She wrote", "-it"]
                ]
            },
            examples: [
                { ar: "أنا حكيت مع الدكتور", arabeezy: "ana 7akeet ma3 ed-doktor", en: "I spoke with the doctor." },
                { ar: "إنت اشتكيت؟", arabeezy: "inta eshtakeet?", en: "Did you complain?" },
                { ar: "إنتِ رحتي عالعيادة", arabeezy: "inti ru7ti 3al-3iyaade", en: "You went to the clinic. (f)" },
                { ar: "هو اتأخر", arabeezy: "howwa et2a55ar", en: "He was late." },
                { ar: "هي تعبت مبارح", arabeezy: "hiyye ta3bit mbaare7", en: "She got tired yesterday." }
            ],
            teacherNotes:
                `Spoken uses simpler past forms than MSA.
Avoid heavy verb patterns at first.
Use daily complaint scenarios.
Practice with one verb family.`,
            commonMistakes: [
                "Mixing present and past endings",
                "Forgetting feminine -ti",
                "Using MSA pronunciation"
            ],
            functionalUse: "Use this when describing complaints or problems that already happened."
        },
        {
            id: "negation_past",
            title: "Negation (Past) ما...ش",
            short: "Use ما + past + ش to say something didn’t happen.",
            description:
                `To negate past actions, use ما + verb + ش.
This is the main spoken pattern for past negation.

Pattern:
ما + past verb + ش.`,
            table: {
                title: "Past Negation Patterns",
                headers: ["Arabic", "Arabeezy", "English", "Usage"],
                rows: [
                    ["ما رحتش", "ma ru7tish", "I didn’t go", "Past negation"],
                    ["ما حكاش", "ma 7akish", "He didn’t speak", "Male"],
                    ["ما كتبتش", "ma katabtish", "I didn’t write", "-t"],
                    ["ما سمعتش", "ma simi3tish", "I didn’t hear", "Complaint"],
                    ["ما كانش", "ma kaansh", "There wasn’t", "Existence"]
                ]
            },
            examples: [
                { ar: "أنا ما رحتش عالشغل", arabeezy: "ana ma ru7tish 3ash-shoghl", en: "I didn’t go to work." },
                { ar: "هو ما سمعش الكلام", arabeezy: "howwa ma simi3sh el-kalaam", en: "He didn’t listen." },
                { ar: "إنتِ ما حكيتش معي", arabeezy: "inti ma 7akeetish ma3i", en: "You didn’t talk to me. (f)" },
                { ar: "إنتِ ما اتصلتيش مبارح", arabeezy: "inti ma itSallitish mbaare7", en: "You didn’t call yesterday. (f)" },
                { ar: "ما كانش في موعد", arabeezy: "ma kaansh fi maw3ed", en: "There wasn’t an appointment." }
            ],
            teacherNotes:
                `Spoken uses ما...ش consistently for past negation.
MSA often uses لم + مضارع.
Keep it spoken and practical.
Use complaints and service situations.`,
            commonMistakes: [
                "Using مش with past verbs",
                "Placing ش in the wrong spot",
                "Forgetting ما at the start"
            ],
            functionalUse: "Use this to say what didn’t happen in past situations."
        }
    ],
    microChecks: {
        enabled: true,
        every: 5,
        items: [
            {
                id: "mc_match_1",
                type: "match",
                prompt: "Match the English word to Arabic: complaint",
                options: ["شَكْوَى", "يِشْتِكي", "مَشْكِلة", "مُزْعِج", "مِش مَعْقول"],
                correct: "شَكْوَى",
            },
            {
                id: "mc_complete_2",
                type: "complete",
                prompt: "Complete the Arabic sentence for: Seriously, the situation has become annoying.\n___ الوَضْع صار مُزْعِج.",
                options: ["عنْجَد", "يِنْرْفِز", "يِتْأَخَّر", "بِضِلّ", "مِن حَقّي"],
                correct: "عنْجَد",
            },
            {
                id: "mc_reorder_3",
                type: "reorder",
                prompt: "Reorder the Arabic words to match: The service here is not at the right level.",
                options: ["الخدمة", "هون", "مش", "بالمستوى", "المطلوب"],
                correct: ["الخدمة", "هون", "مش", "بالمستوى", "المطلوب"],
            },
            {
                id: "mc_choose_4",
                type: "choose",
                prompt: "Choose the correct Arabic word for: to solve the problem",
                options: ["يِحِلّ المَشْكِلة", "يِوَعِد", "يِرُدّ", "يِعْتِذِر", "عُذْر"],
                correct: "يِحِلّ المَشْكِلة",
            },
            {
                id: "mc_match_5",
                type: "match",
                prompt: "Match the English word to Arabic: convincing",
                options: ["مَقْنِع", "يِتْجاهَل", "مِسْتَمِرّ", "تِكْرار", "مَرَّة واحْدَة / أوَّل مَرّة"],
                correct: "مَقْنِع",
            },
            {
                id: "mc_complete_6",
                type: "complete",
                prompt: "Complete the Arabic sentence for: With all respect, the service here is weak.\n___، الخِدْمَة هون ضَعيفَة.",
                options: ["مَع إحْتِرامي", "ما قَصْدي أِزَعِّل حَدا", "مُمْكِن تِعْمِلوا شِي؟", "بِتْمَنّى تِلْقوا حَلّ", "ما إلِي خِلِق"],
                correct: "مَع إحْتِرامي",
            },
            {
                id: "mc_reorder_7",
                type: "reorder",
                prompt: "Reorder the Arabic words to match: We were patient for a whole month but the problem is still there.",
                options: ["تحمّلنا", "شهر", "كامل،", "بس", "المشكلة", "لسه", "موجودة"],
                correct: ["تحمّلنا", "شهر", "كامل،", "بس", "المشكلة", "لسه", "موجودة"],
            },
            {
                id: "mc_choose_8",
                type: "choose",
                prompt: "Choose the correct Arabic word for: complaints department",
                options: ["قِسْم شَكَاوِي", "رَدّ رَسْمِي", "حِجّة", "مُتابَعَة", "تَعْويض"],
                correct: "قِسْم شَكَاوِي",
            },
        ],
    },




    practice: {
        quiz: [
            {
                id: "co_q1",
                questionAr: "مِش مَعْقول كُل يوم الباص يِتْأَخَّر.",
                optionsEn: [
                    "It’s unacceptable that the bus is late every day.",
                    "It’s amazing that the bus is late every day.",
                    "It’s possible the bus is early every day.",
                ],
                correctIndex: 0,
            },
            {
                id: "co_q2",
                questionAr: "مَع إحْتِرامي، الخِدْمَة هون ضَعيفَة.",
                optionsEn: [
                    "With all respect, the service here is weak.",
                    "I respect the service, it is strong.",
                    "I don’t respect the weak service here.",
                ],
                correctIndex: 0,
            },
            {
                id: "co_q3",
                questionAr: "بِتْمَنّى تِلْقوا حَلّ قَرِيب.",
                optionsEn: [
                    "I hope you find a solution soon.",
                    "I hope you cancel the service soon.",
                    "I hope you don’t answer soon.",
                ],
                correctIndex: 0,
            },
            {
                id: "co_q4",
                questionAr: "العُذْر مَش مَقْنِع.",
                optionsEn: [
                    "The excuse is not convincing.",
                    "The excuse is very funny.",
                    "The excuse is totally correct.",
                ],
                correctIndex: 0,
            },
            {
                id: "co_q5",
                questionAr: "تِكْرار المَشْكِلة خَلّاني أِشْتِكي.",
                optionsEn: [
                    "The repetition of the problem made me complain.",
                    "One small problem made me happy.",
                    "The solution to the problem made me complain.",
                ],
                correctIndex: 0,
            },
        ],
        rolePlays: [
            "Student A is a dorm resident; Student B is the dorm receptionist. A complains about constant noise at night that is 'ʿanjad muzʿij' and 'miš maʿʾūl'. B listens, apologizes, and promises to 'yiḥill il-maškile'. They must use at least one softener like 'maʿ iḥtirāmi'.",
            "Student A and B both use the university bus. They prepare together a polite complaint to the transportation office. They describe the problem (repeated delays), the effect (missing classes), and suggest one or two solutions (earlier departure, extra bus).",
            "Student A made a complaint last week; Student B works in the office. They meet again: B gives an update (follow-up, maybe partial solution), A reacts: thanks, or insists on more action, using phrases like 'ṣabarnā šahir kāmil' and 'bitemanna tilʾū ḥall'.",
        ],
        translation: [
            { id: "comp_t1", type: "enToAr", textEn: "The service is slow.", textAr: "الخدمة بطيئة." },
            { id: "comp_t2", type: "arToEn", textEn: "The food is cold.", textAr: "الأكل بارد." },
            { id: "comp_t3", type: "enToAr", textEn: "I want to speak to the manager.", textAr: "بدي أحكي مع المدير." },
            { id: "comp_t4", type: "arToEn", textEn: "This is not what I ordered.", textAr: "هذا مش اللي طلبته." },
            { id: "comp_t5", type: "enToAr", textEn: "Can you change it?", textAr: "ممكن تبدّله؟" },
            { id: "comp_t6", type: "arToEn", textEn: "I'm not satisfied.", textAr: "أنا مش راضي." }
        ],
    },

    homework: {
        instructions:
            "Write 8–10 sentences in Palestinian Arabic about a real or imaginary complaint (for example: transport, dorm, cafeteria, internet). Describe the problem, why it is annoying, what you already tried, and what you want them to do. Use at least three complaint chunks (مثل: في مَشْكِلة، عنْجَد مُزْعِج، مِش مَعْقول) and two polite softeners (مثل: مَع إحْتِرامي، ما قَصْدي أِزَعِّل حَدا).",
    },

    teacherNotes: {
        warmup: [
            "Ask students to brainstorm small, everyday problems (late bus, noisy neighbor, dirty classroom). Write them on the board in English or Arabic and then add 1–2 key Arabic words next to each.",
            "Discuss the difference between complaining aggressively vs. politely. Ask: in your language, what expressions show polite complaint?",
        ],
        vocabularySteps: [
            "Present strong complaint chunks (fi maškile, ʿanjad muzʿij, miš maʿʾūl) and have students repeat with different intonation (angry vs. calm).",
            "Introduce softeners (maʿ iḥtirāmi, ma ʾaṣdi ʾazaʿʿel ḥada) and practice placing them before/after complaints to hear how the tone changes.",
            "Drill pairs like problem + action: 'fi maškile' → 'mumkin tiʿmilu ši?' so students don’t stop at just describing the problem.",
        ],
        dialogueSteps: [
            "Read the dialogue once and ask comprehension questions: What is the problem? Who is the receptionist? What solution is promised?",
            "Assign roles and have students act it out. Then, in pairs, they replace 'bus' with another context (dorm, cafeteria, internet).",
            "Highlight in the text all expressions of complaint, softening, and action requests. Ask students to categorize them in three columns.",
        ],
        practiceTips: [
            "For the quiz, focus on the nuance of 'miš maʿʾūl' and 'ʿuzr miš muqneʿ' so students understand the attitude behind the words.",
            "During role-plays, encourage students to stay in Arabic even when frustrated. If they can’t find a word, allow quick English, then provide the Arabic equivalent.",
            "Remind students that in many real situations, tone and body language are as important as the words; encourage calm but firm delivery.",
        ],
        wrapup: [
            "Ask a few students to summarize one partner’s complaint using reported speech, starting with 'huwwa/hiya biʾūl/inno...'.",
            "End by asking: 'emta btkūn il-šakwa mafʿūla w emta laʾ?' and collect a few short answers using new vocabulary.",
        ],
        myNotes: "",
    },
};