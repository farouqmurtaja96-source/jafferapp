// Auto-generated from original app.js
import { LESSON_ID_FAMILY } from '../../core/constants.js';

export const lessonId = LESSON_ID_FAMILY;
export const lesson = {
    meta: {
        level: "Beginner",
        unit: "Family",
        lessonTitle: "Unit 2 – Family & People",
    },

    overview: {
        title: "Unit 2 – Family & People",
        description:
            "In this unit, students explore how to talk about their family and people close to them in Palestinian Arabic. They learn key family words, how to say ‘I have…’, how to describe older/younger siblings, and how to talk about marital status in a simple, natural way.",
        goals: [
            "Name close family members and relatives in Palestinian Arabic.",
            "Use «عِنْدِي…» (I have…) to talk about family and people.",
            "Describe siblings and relatives using older/younger and basic adjectives.",
            "Ask and answer simple questions about family size and marital status.",
            "Participate in longer conversations about family in a natural, story-like way.",
        ],
    },

    // ====================================
    // VOCABULARY
    // ====================================
    vocabulary: {
        core: [
            // ===== FAMILY & HOUSEHOLD =====
            {
                id: "3eileh",
                ar: "عِيلَة",
                en: "family",
                enArabeezy: "3eileh",
                hint:
                    "Common word for ‘family’. عِيلْتِي = my family. Often used for close family living together.",
                exampleAr: "عِيلْتِي مَو كْبِيرَة، بَسّ كْتِير قَرِيبِين مِن بَعْض.",
                exampleArabeezy: "3ylty mw kbyra, bs ktyr qrybyn mn b3d.",
                exampleEn: "My family is not big, but we are very close to each other.",
            },
            {
                id: "ahl",
                ar: "أَهْل",
                en: " parents",
                enArabeezy: "ahl",
                hint:
                    "أَهْل can mean ‘family’ or specifically ‘parents’. أَهْلِي = my family / my parents.",
                exampleAr: "أَهْلِي سَاكْنِين فِي غَزَّة.",
                exampleArabeezy: "ahly saknyn fy ghza.",
                exampleEn: "My family lives in Gaza.",
            },

            // ===== PARENTS =====
            {
                id: "abuy",
                ar: "أَبُوي",
                en: "my father",
                enArabeezy: "abuy",
                hint:
                    "From أَب (father). أَبُوي = my father. For ‘his father’ you can hear أَبُوه، for ‘her father’ أَبُوهَا.",
                exampleAr: "أَبُوي بِيِشْتِغِل مُهَنْدِس.",
                exampleArabeezy: "abwy byshtghl mhnds.",
                exampleEn: "My father works as an engineer.",
            },
            {
                id: "immi",
                ar: "إِمّي",
                en: "my mother",
                enArabeezy: "immi",
                hint:
                    "From أُمّ (mother). إِمِّي = my mother. You may also hear يَمَّا (mom) in spoken language.",
                exampleAr: "إمي بتشتغل مُعلِّمة",
                exampleArabeezy: "imy btshtghl m3lma",
                exampleEn: "My mother works as a teacher.",
            },

            // ===== SIBLINGS & CHILDREN =====
            {
                id: "akh",
                ar: "أَخ",
                en: "brother",
                enArabeezy: "akh",
                hint:
                    "أَخ = brother. أَخُوي = my brother. Plural: إِخْوَة = siblings/brothers.",
                exampleAr: "عِنْدي أَخ أَكبَر مِنّي بِسِنِين.",
                exampleArabeezy: "3ndy akh akbr mny bsnyn.",
                exampleEn: "I have a brother older than me by a few years.",
            },
            {
                id: "okht",
                ar: "أُخْت",
                en: "sister",
                enArabeezy: "okht",
                hint:
                    "أُخْت = sister. أُخْتِي = my sister. Plural: أَخَوَات = sisters.",
                exampleAr: "أختي بتدرس بالجامعة",
                exampleArabeezy: "akhty btdrs beljam3a",
                exampleEn: "My sister studies at university.",
            },
            {
                id: "walad",
                ar: "ابن",
                en: "son",
                enArabeezy: "walad",
                hint: "Can mean boy or son depending on context.",
                exampleAr: "عندهم ابن واحد وبنتين",
                exampleArabeezy: "3ndhm abn wa7d wbntyn",
                exampleEn: "They have one son and two daughters.",
            },
            {
                id: "bint",
                ar: "بِنْت",
                en: "girl / daughter",
                enArabeezy: "bint",
                hint: "بِنْت = girl; can also mean ‘daughter’.",
                exampleAr: "عِنْدُه بِنْت صْغيرَة كْتير.",
                exampleArabeezy: "3ndh bnt sghyra ktyr.",
                exampleEn: "He has a very young daughter.",
            },
            {
                id: "walad_bint",
                ar: "وَلَد / بِنْت",
                en: "boy / girl (and son / daughter)",
                enArabeezy: "walad_bint",
                hint:
                    "وَلَد = boy or son (by context). بِنْت = girl or daughter. بِنْتِي = my daughter.",
                exampleAr: "عندهم ولد صغير وبنت أكبر منه شوي",
                exampleArabeezy: "3ndhm wld sghyr wbnt akbr mnh shwy",
                exampleEn: "They have a little boy and a slightly older girl.",
            },
            {
                id: "tifl_atfal",
                ar: "طِفِل / أَطْفَال",
                en: "child / children",
                enArabeezy: "tifl/atfal",
                hint:
                    "طِفِل = child (singular). أَطْفَال = children. More neutral than وَلَد / بِنْت.",
                exampleAr: "الْأَطْفَال بِيِلْعَبُوا بَرَّا الْبَيْت.",
                exampleArabeezy: "elatfal byl3bwa bra elbyt.",
                exampleEn: "The children are playing outside the house.",
            },

            // ===== GRANDPARENTS =====

            {
                id: "sidi",
                ar: "سِيدِي",
                en: "my grandfather",
                enArabeezy: "sidi",
                hint: "Another common word for ‘my grandfather’ in Palestinian Arabic.",
                exampleAr: "سِيدِي لِسَّا عَايِش فِي الْقَرْيَة.",
                exampleArabeezy: "sydy lsa 3aysh fy elqrya.",
                exampleEn: "My grandfather still lives in the village.",
            },
            {
                id: "sitti",
                ar: "سِتّي",
                en: "my grandmother",
                enArabeezy: "sitti",
                hint: "Colloquial and affectionate word for ‘my grandmother’.",
                exampleAr: "سِتّي تِسْكُن قَريب مِنّا.",
                exampleArabeezy: "sty tskn qryb mna.",
                exampleEn: "My grandmother lives near us.",
            },

            // ===== UNCLES, AUNTS & COUSINS =====
            {
                id: "3ammo",
                ar: "عَمّ",
                en: "paternal uncle (father’s brother)",
                enArabeezy: "3ammo",
                hint: "عَمّ = father’s brother. عَمّي = my uncle (father’s side).",
                exampleAr: "عَمّي عَندُه أَرْبَع وْلاد.",
                exampleArabeezy: "3my 3ndh arb3 wlad.",
                exampleEn: "My paternal uncle has four children.",
            },
            {
                id: "3ammeh",
                ar: "عَمِّة",
                en: "paternal aunt (father’s sister)",
                enArabeezy: "3ammeh",
                hint: "عَمِّة = father’s sister. عَمْتِي = my aunt (father’s side).",
                exampleAr: "عَمْتِي زَارَتْنَا فِي غَزَّة أُسْبُوع.",
                exampleArabeezy: "3mty zartna fy ghza asbw3.",
                exampleEn: "My aunt visited us in Gaza for a week.",
            },
            {
                id: "khal",
                ar: "خَال",
                en: "maternal uncle (mother’s brother)",
                enArabeezy: "khal",
                hint: "خَال = mother’s brother. خَالِي = my maternal uncle.",
                exampleAr: "خَالِي ساكِن بِرامَ الله.",
                exampleArabeezy: "khaly sakn bram ellh.",
                exampleEn: "My maternal uncle lives in Ramallah.",
            },
            {
                id: "khalah",
                ar: "خَالَة",
                en: "maternal aunt (mother’s sister)",
                enArabeezy: "khalah",
                hint: "خَالَة = mother’s sister. خَالْتِي = my maternal aunt.",
                exampleAr: "خَالْتِي مِثْل إِمِّي تَقْرِيبًا.",
                exampleArabeezy: "khalty mthl imy tqryba.",
                exampleEn: "My aunt is almost like my mother.",
            },
            {
                id: "walad_3ammi",
                ar: "وَلاد عَمّي",
                en: "my cousins (paternal, males/mixed)",
                enArabeezy: "wlaad_3ammi",
                hint: "Male/mixed cousins on father’s side.",
                exampleAr: "وَلاد عَمّي كْمان بِدْرِسوا هُون.",
                exampleArabeezy: "wlaad 3my kman bdrswa hwn.",
                exampleEn: "My cousins on my dad’s side also study here.",
            },
            {
                id: "walad_khali",
                ar: "وَلاد خالي",
                en: "my cousins (maternal, males/mixed)",
                enArabeezy: "wlaad_khali",
                hint: "Male/mixed cousins on mother’s side.",
                exampleAr: "ولاد خالتي ساكنين برا البلد",
                exampleArabeezy: "wlaad khalty saknyn bra elbld",
                exampleEn: "My maternal cousins live outside the town.",
            },

            // ===== RELATIVES & PEOPLE =====
            {
                id: "qarayeb",
                ar: "قَرَايِب",
                en: "relatives",
                enArabeezy: "qarayeb",
                hint:
                    "قَرَايِب = relatives (plural). Often used with إِلْنَا / إِلِّي: ‘we have relatives’.",
                exampleAr: "عندنا قرايب بغزّة وقرايب برا البلد",
                exampleArabeezy: "3ndna qrayb bghza wqrayb bra elbld",
                exampleEn: "We have relatives in Gaza and relatives abroad.",
            },
            {
                id: "3areeb",
                ar: "قَريب / قَريبة",
                en: "relative (m/f)",
                enArabeezy: "qarib/qaribeh",
                hint: "Generic word for one relative (male/female).",
                exampleAr: "عندنا قرايب كتير برا البلد",
                exampleArabeezy: "3ndna qrayb ktyr bra elbld",
                exampleEn: "We have many relatives abroad.",
            },
            {
                id: "nas",
                ar: "نَاس",
                en: "people",
                enArabeezy: "nas",
                hint: "General word for ‘people’.",
                exampleAr: "النَّاس هَان طَيِّبِين وَبِيِحِبُّوا الضُّيُوف.",
                exampleArabeezy: "elnas han tybyn wby7bwa eldywf.",
                exampleEn: "People here are kind and love guests.",
            },
            {
                id: "jar_jiran",
                ar: "جَار / جِيرَان",
                en: "neighbor / neighbors",
                enArabeezy: "jar/jiran",
                hint:
                    "جَار = neighbor (singular). جِيرَان = neighbors (plural). Often used socially: neighbors like family.",
                exampleAr: "جِيرَانَّا مِثْل الْعِيلَة، كُلّ يَوْم مَع بَعْض.",
                exampleArabeezy: "jyrana mthl el3yla, kl ywm m3 b3d.",
                exampleEn: "Our neighbors are like family; we’re together every day.",
            },

            // ===== AGE & COMPARISONS =====
            {
                id: "akbar",
                ar: "أَكبَر",
                en: "older / biggest",
                enArabeezy: "akbar",
                hint: "Comparative: older / bigger. Often used with مِن.",
                exampleAr: "هُوَّ أَكبَر وَلَد بِالعيلِة.",
                exampleArabeezy: "hw akbr wld bel3yla.",
                exampleEn: "He is the oldest boy in the family.",
            },
            {
                id: "asghar",
                ar: "أَصغَر",
                en: "younger / smallest",
                enArabeezy: "asghar",
                hint: "Comparative: younger / smaller.",
                exampleAr: "أَنا أَصغَر واحِد بَيْن إِخْواني.",
                exampleArabeezy: "ana asghr wa7d byn ikhwany.",
                exampleEn: "I’m the youngest among my siblings.",
            },
            {
                id: "akbar_asghar",
                ar: "أَكْبَر / أَصْغَر",
                en: "older / younger",
                enArabeezy: "akbar/asghar",
                hint:
                    "Use with مِنِّي (than me) or مِنُّه / مِنَّهَا (than him/her). أَكْبَر مِنِّي = older than me. أَصْغَر مِنِّي = younger than me.",
                exampleAr: "أُخْتِي أَكْبَر مِنِّي، وَأَخُوي أَصْغَر مِنِّي.",
                exampleArabeezy: "akhty akbr mny, wakhwy asghr mny.",
                exampleEn: "My sister is older than me, and my brother is younger than me.",
            },

            {
                id: "2addi",
                ar: "قَدّي",
                en: "same age as me",
                enArabeezy: "2addi",
                hint: "Used for same age comparison.",
                exampleAr: "أُختي تَقْريبًا قَدّي.",
                exampleArabeezy: "akhty tqryba qdy.",
                exampleEn: "My sister is almost the same age as me.",
            },

            // ===== MARITAL STATUS =====
            {
                id: "mutazawwij",
                ar: "مِتجَوِّز / مِتجَوِّزة",
                en: "married (m/f)",
                enArabeezy: "mitjawwez/mitjawwzeh",
                hint: "Marital status: married man/woman.",
                exampleAr: "أُختي مِتجَوِّزة جْديد.",
                exampleArabeezy: "akhty mtjwza jdyd.",
                exampleEn: "My sister recently got married.",
            },
            {
                id: "3azzab",
                ar: "عَزابي / عَزابيّة",
                en: "single (unmarried, m/f)",
                enArabeezy: "3azabi/3azabiyeh",
                hint: "Not married.",
                exampleAr: "أنا لِسّه عَزابي.",
                exampleArabeezy: "ana lsh 3zaby.",
                exampleEn: "I’m still single.",
            },
            {
                id: "makhtub",
                ar: "خاطِب / مَخطوبة",
                en: "engaged (m/f)",
                enArabeezy: "khatib/makhtubeh",
                hint: "Engaged to be married.",
                exampleAr: "أُخوي خاطِب بِنْت مِن غَزّة.",
                exampleArabeezy: "akhwy khatb bnt mn ghza.",
                exampleEn: "My brother is engaged to a girl from Gaza.",
            },
            {
                id: "maktub_ktabo",
                ar: "مَكْتُوب كِتَابُه",
                en: "engaged (Islamic contract)",
                enArabeezy: "maktub_ktabo",
                hint: "Expression for religious engagement/marriage contract. Fem: مَكْتُوب كِتَابْهَا.",
                exampleAr: "بِنْت خَالْتِي مَكْتُوب كِتَابْهَا مِنْ سَنَة.",
                exampleArabeezy: "bnt khalty mktwb ktabha mn sna.",
                exampleEn: "My aunt’s daughter has been engaged for a year.",
            },

            // ===== HAVE & LIVE WITH =====
            {
                id: "3indi",
                ar: "عِنْدي ...",
                en: "I have ...",
                enArabeezy: "3indi",
                hint: "Used to say you have family members or things.",
                exampleAr: "عِنْدي أُخ وَأُختَيْن.",
                exampleArabeezy: "3ndy akh wakhtyn.",
                exampleEn: "I have one brother and two sisters.",
            },
            {
                id: "ma_3indi",
                ar: "مَا عِنْدي",
                en: "I don’t have",
                enArabeezy: "ma_3indi",
                hint: "Negation of عِنْدي.",
                exampleAr: "مَا عِنْدي أَطْفَال، بَسّ عِنْدي قِطَّة.",
                exampleArabeezy: "ma 3ndy atfal, bs 3ndy qta.",
                exampleEn: "I don’t have children, but I have a cat.",
            },
            {
                id: "saken_ma3",
                ar: "ساكِن / ساكْنة مَع ...",
                en: "living with (m/f) ...",
                enArabeezy: "saken/sakneh_ma3",
                hint: "Talking about who you live with.",
                exampleAr: "أنا ساكْنة مَع أَهلي.",
                exampleArabeezy: "ana sakna m3 ahly.",
                exampleEn: "I live with my family.",
            },
        ],

        extra: [
            // ===== MORE STATUS & RELATIONS =====
            {
                id: "mutallaq",
                ar: "مَطَلَّق / مَطَلَّقَة",
                en: "divorced (m/f)",
                enArabeezy: "mutallaq/mutallaqa",
                hint: "Marital status: divorced.",
                exampleAr: "خالتي مَطَلَّقَة مِن سَنِين.",
                exampleArabeezy: "khalty mtlqa mn snyn.",
                exampleEn: "My aunt has been divorced for years.",
            },
            {
                id: "armal",
                ar: "أَرْمَل / أَرْمَلَة",
                en: "widower / widow",
                enArabeezy: "armal/armaleh",
                hint: "Marital status.",
                exampleAr: "جارتنا أَرْمَلَة.",
                exampleArabeezy: "jartna armla.",
                exampleEn: "Our neighbor is a widow.",
            },
            {
                id: "7amay",
                ar: "حَماي / حَماتي",
                en: "father-in-law / mother-in-law",
                enArabeezy: "7amay/7amayeh",
                hint: "Parents of a spouse.",
                exampleAr: "حَماي وَحَماتي بيسْكُنوا بِنَفْس البِنَايِة.",
                exampleArabeezy: "7may w7maty bysknwa bnfs elbnaya.",
                exampleEn: "My in-laws live in the same building.",
            },

        ],
    },

    // ====================================
    // DIALOGUE (long, with real names)
    // ====================================
    dialogue: {
        lines: [
            {
                "speaker": "Samer",
                "ar": "مَسّا الخير يا ليلى، كِيفِك اليوم؟",
                "arArabeezy": "msa elkhyr ya lyla, kyfk elywm?",
                "en": "Good evening, Layla, how are you today?"
            },
            {
                "speaker": "Layla",
                "ar": "مَسّا النّور يا سامِر، الحَمْدِلله. وإِنْتَ كِيفَك؟",
                "arArabeezy": "msa elnwr ya samr, el7mdllh. wint kyfk?",
                "en": "Good evening, Samer, alhamdulillah. And how are you?"
            },
            {
                "speaker": "Samer",
                "ar": "وين اهلك ساكنين وعلتكم كبيرة ولا صغيرة؟",
                "arArabeezy": "wyn ahlk saknyn w3ltkm kbyra wla sghyra?",
                "en": "Where does your family live, and is your family big or small?"
            },
            {
                "speaker": "Layla",
                "ar": "أَهلي ساكْنين هون بِغَزّة، وعيلِتْنا صغيرة.",
                "arArabeezy": "ahly saknyn hwn bghza, w3yltna sghyra.",
                "en": "My family lives here in Gaza, and our family is small."
            },
            {
                "speaker": "Samer",
                "ar": "كم اخ واخت عندك؟",
                "arArabeezy": "km akh wakht 3ndk?",
                "en": "How many brothers and sisters do you have?"
            },
            {
                "speaker": "Layla",
                "ar": " عِنْدي أُخ أَكبَر مِنّي وَأُخت أَصغَر.",
                "arArabeezy": "3ndy akh akbr mny wakht asghr.",
                "en": " I have an older brother and a younger sister."
            },
            {
                "speaker": "Samer",
                "ar": "أَخوك أَكبَر منك بِقَدّيش؟",
                "arArabeezy": "akhwk akbr mnk bqdysh?",
                "en": "How much older is your brother?"
            },
            {
                "speaker": "Layla",
                "ar": "هو أكبر منّي بحوالي أربع سنين.",
                "arArabeezy": "huwwa akbar minni b7awali arba3 sneen",
                "en": "He’s about four years older than me."
            },
            {
                "speaker": "Samer",
                "ar": "وأختك قدّك ولا أصغر منك كمان؟",
                "arArabeezy": "wakhtk qdk wla asghr mnk kman?",
                "en": "And is your sister your age or younger too?"
            },///
            {
                "speaker": "Layla",
                "ar": "هيَّ أَصغَر، لِسّه بِالتّانَوِيّة.",
                "arArabeezy": "hy asghr, lsh beltanwya.",
                "en": "She’s younger, she’s still in high school."
            },
            {
                "speaker": "Samer",
                "ar": "بتسكنوا كِلْكُم مَع بَعْض؟",
                "arArabeezy": "btsknwa klkm m3 b3d?",
                "en": "Do you all live together?"
            },
            {
                "speaker": "Layla",
                "ar": "أَه، أنا ساكْنة مَع أَهلي: إِمّي، أَبوي، أُخوي، وَأُختي.",
                "arArabeezy": "ah, ana sakna m3 ahly: imy, abwy, akhwy, wakhty.",
                "en": "Yes, I live with my family: my mother, father, brother and sister."
            },
            {
                "speaker": "Samer",
                "ar": "وسيدك وَسِتِّك ساكْنين قَريب مَنْكُم؟",
                "arArabeezy": "wsydk wstk saknyn qryb mnkm?",
                "en": "And do your grandfather and grandmother live near you?"
            },
            {
                "speaker": "Layla",
                "ar": "إي، سيدي وَسِتّي ساكْنين فِي الحارَة اللي جنبنا.",
                "arArabeezy": "iy, sydy wsty saknyn fy el7ara elly jnbna.",
                "en": "Yes, my grandfather and grandmother live in the neighborhood next to us."
            },
            {
                "speaker": "Samer",
                "ar": "حَلُو كْثير. أَنا عيلْتِي أَصْغَر، عِنْدي بَسّ أُخ واحِد.",
                "arArabeezy": "7lw kthyr. ana 3ylty asghr, 3ndy bs akh wa7d.",
                "en": "That’s really nice. My family is smaller, I only have one brother."
            },
            {
                "speaker": "Layla",
                "ar": "هُوَّ أَكبَر مِنَّك وَلّا أَصغَر؟",
                "arArabeezy": "hw akbr mnk wla asghr?",
                "en": "Is he older than you or younger?"
            },
            {
                "speaker": "Samer",
                "ar": "هُوَّ تَقريبًا قَدّي، بِنْدَرُس بنفس السَّنَة بِالجَامْعَة.",
                "arArabeezy": "hw tqryba qdy, bndrs bnfs elsna beljam3a.",
                "en": "He’s almost my age, we study the same year at the university."
            },

            {
                "speaker": "Layla",
                "ar": "أخوالك وعمامك ساكنين هون ولا برا البلد؟",
                "arArabeezy": "akhwalk w3mamk saknyn hwn wla bra elbld?",
                "en": "Do your maternal and paternal uncles live here or abroad?"
            },
            {
                "speaker": "Samer",
                "ar": "عِنْدي خال ساكِن هون، وَعَمّي ساكِن بَرّا البَلَد.",
                "arArabeezy": "3ndy khal sakn hwn, w3my sakn bra elbld.",
                "en": "I have an uncle on my mom’s side who lives here, and an uncle on my dad’s side who lives abroad."
            },
            {
                "speaker": "Layla",
                "ar": "مين أقرب شخص إلك بالعيلة؟",
                "arArabeezy": "myn aqrb shkhs ilk bel3yla?",
                "en": "Who are you closest to in your family?"
            },
            {
                "speaker": "Samer",
                "ar": "بصراحة، أقرب شخص إليّ هو أخوي، بنحكي مع بعض كتير.",
                "arArabeezy": "bsra7a, aqrb shkhs ily hw akhwy, bn7ky m3 b3d ktyr.",
                "en": "Honestly, I’m closest to my brother, we talk a lot with each other."
            },
            {
                "speaker": "Layla",
                "ar": "حلو! إن شاء الله دايمًا تكونوا متفاهمين.",
                "arArabeezy": "7lw! in sha ellh dayma tkwnwa mtfahmyn.",
                "en": "Nice! Inshallah you always stay in good understanding."
            }
        ]
    },

    // ====================================
    // GRAMMAR
    // ====================================

    grammar: [
        {
            id: "possessive_pronouns",
            title: "Possessive Pronouns (suffixes)",
            short: "Ownership sticks to the word.",
            description:
                `In spoken Arabic, we attach ownership to the noun.
We don’t usually say two separate words for “my/your”.

Golden Rule:
Add the suffix to show who owns it.`,
            table: {
                title: "Common Possessive Suffixes",
                headers: ["Arabic", "Arabeezy", "English", "Usage Note"],
                rows: [
                    ["ـي", "-i", "my", "بيتي"],
                    ["ـك", "-ak/-ik", "your", "بيتك/بيتكِ"],
                    ["ـه", "-o", "his", "أبوه"],
                    ["ـها", "-ha", "her", "أمها"],
                     ["ـنا", "-na", "our", "بَيْتْنَا"],
                      ["ـكم", "-kum", "your (plural)", "بَيْتْكُم"],
                    ["ـهم", "-hom", "their", "أُمَّهُمْ"]
                ]
            },
            examples: [
              { ar: "هذا بيتنا", arabeezy: "haada beetna", en: "This is our house." },
{ ar: "وين أبوك؟", arabeezy: "ween abook?", en: "Where is your father?" },
{ ar: "أختي تعبانة اليوم", arabeezy: "okhti ta3baaneh el-yom", en: "My sister is tired today." },
{ ar: "أخوها بالبيت", arabeezy: "akhoha bel-beet", en: "Her brother is at home." },
{ ar: "أمهم في السوق", arabeezy: "omhom fis-soo2", en: "Their mother is at the market." },
{ ar: "صديقنا ساكن هون", arabeezy: "sadee2na saaken hon", en: "Our friend lives here." },
{ ar: "وين بيتكم؟", arabeezy: "ween beetkom?", en: "Where is your (plural) house?" },
{ ar: "أستاذهم مبسوط", arabeezy: "ostazhom mabsut", en: "Their teacher is happy." },
{ ar: "سيارتي جديدة", arabeezy: "sayyaarti jdeedeh", en: "My car is new." },
{ ar: "مدرستها قريبة", arabeezy: "madrastha 2areebeh", en: "Her school is close." }
            ],
            teacherNotes:
                `Spoken uses short suffixes more than MSA forms.
MSA has formal case endings; spoken drops them.
Teach 2–3 suffixes first, then expand.
Use family words from the unit.`,
            commonMistakes: [
                "Saying ‘أنا + اسم + إلي’ instead of suffix",
                "Mixing masculine/feminine suffixes",
                "Overusing full MSA endings",
            ],
            functionalUse:
                "Used to talk about family members and personal belongings.",
        },
        {
            id: "dual_nouns",
            title: "Dual Nouns (اثنين)",
            short: "Spoken Arabic often uses -een for two.",
            description:
                `The dual form shows “two of something.”
In spoken Palestinian Arabic, -een is common for most dual nouns.

Golden Rule:
Add -een to show two.`,
            table: {
                title: "Dual Patterns",
                headers: ["Arabic", "Arabeezy", "English", "Usage Note"],
                rows: [
                    ["كتابين", "ktaab-een", "two books", "General"],
                    ["ولدين", "walad-een", "two boys", "People"],
                    ["بنتين", "bint-een", "two girls", "People"],
                    ["يومين", "yoom-een", "two days", "Time"],
                ]
            },
            examples: [
                { ar: "عندي ولدين", arabeezy: "3indi walad-een", en: "I have two boys." },
                { ar: "إلها بنتين", arabeezy: "elha bint-een", en: "She has two girls." },
                { ar: "إحنا عنا كتابين", arabeezy: "e7na 3inna ktaab-een", en: "We have two books." },
                { ar: "عندي أخوين", arabeezy: "3indi akhween", en: "I have two brothers." },
                { ar: "سافرت يومين", arabeezy: "safart yoom-een", en: "I traveled for two days." }
            ],
            teacherNotes:
                `Spoken simplifies dual endings compared to MSA.
MSA uses -ān/-ayn; spoken prefers -een.
Use family words to keep it concrete.
Avoid heavy grammar terms.`,
            commonMistakes: [
                "Using plural instead of dual",
                "Forgetting -een ending",
                "Mixing MSA dual endings",
            ],
            functionalUse:
                "Used to talk about two family members or two items in daily life.",
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
                prompt: "Match the English word to Arabic: family",
                options: ["عِيلَة", "أَهْل", "أَبُوي", "إِمّي", "أَخ"],
                correct: "عِيلَة",
            },
            {
                id: "mc_complete_2",
                type: "complete",
                prompt: "Complete the Arabic sentence for: They have one son and two daughters.\nعندهم ___ واحد وبنتين",
                options: ["أُخْت", "ابن", "بِنْت", "وَلَد / بِنْت", "طِفِل / أَطْفَال"],
                correct: "ابن",
            },
            {
                id: "mc_reorder_3",
                type: "reorder",
                prompt: "Reorder the Arabic words to match: My grandfather still lives in the village.",
                options: ["سِيدِي", "لِسَّا", "عَايِش", "فِي", "الْقَرْيَة"],
                correct: ["سِيدِي", "لِسَّا", "عَايِش", "فِي", "الْقَرْيَة"],
            },
            {
                id: "mc_choose_4",
                type: "choose",
                prompt: "Choose the correct Arabic word for: maternal aunt (mother’s sister)",
                options: ["خَالَة", "وَلاد عَمّي", "وَلاد خالي", "قَرَايِب", "قَريب / قَريبة"],
                correct: "خَالَة",
            },
            {
                id: "mc_match_5",
                type: "match",
                prompt: "Match the English word to Arabic: people",
                options: ["نَاس", "جَار / جِيرَان", "أَكبَر", "أَصغَر", "أَكْبَر / أَصْغَر"],
                correct: "نَاس",
            },
            {
                id: "mc_complete_6",
                type: "complete",
                prompt: "Complete the Arabic sentence for: My sister is almost the same age as me.\nأُختي تَقْريبًا ___.",
                options: ["قَدّي", "مِتجَوِّز / مِتجَوِّزة", "عَزابي / عَزابيّة", "خاطِب / مَخطوبة", "مَكْتُوب كِتَابُه"],
                correct: "قَدّي",
            },
            {
                id: "mc_reorder_7",
                type: "reorder",
                prompt: "Reorder the Arabic words to match: I have one brother and two sisters.",
                options: ["عِنْدي", "أُخ", "وَأُختَيْن"],
                correct: ["عِنْدي", "أُخ", "وَأُختَيْن"],
            },
        ],
    },

    practice: {
        quiz: [
            {
                id: "fam_q1",
                questionAr: "«عِنْدِي تَلَات إِخْوَة» مَعْنَاهَا:",
                optionsEn: [
                    "I have three sisters.",
                    "I have three brothers.",
                    "I have three children.",
                ],
                correctIndex: 1,
            },
            {
                id: "fam_q2",
                questionAr: "«أَخُوي أَكْبَر مِنِّي» مَعْنَاهَا:",
                optionsEn: [
                    "My brother is older than me.",
                    "My brother is younger than me.",
                    "My brother is the same age as me.",
                ],
                correctIndex: 0,
            },
            {
                id: "fam_q3",
                questionAr: "أَيّ كَلِمَة تِسْتَخْدِمْهَا لِـ قرايب",
                optionsEn: [
                    "neighbors",
                    "people",
                    "relatives",
                ],
                correctIndex: 2,
            },
            {
                id: "fam_q4",
                questionAr: "«هُوَّ عَزَّابي» مَعْنَاهَا:",
                optionsEn: [
                    "He is married.",
                    "He is single (not married).",
                    "He is engaged.",
                ],
                correctIndex: 1,
            },
            {
                id: "fam_q5",
                questionAr: "«مَا عِنْدِي أَطْفَال» مَعْنَاهَا:",
                optionsEn: [
                    "I don’t have children.",
                    "I don’t have siblings.",
                    "I have small children.",
                ],
                correctIndex: 0,
            },
        ],

        rolePlays: [
            "Role-play 3:  student describes a big family gathering at grandma’s house (سِتِّي).",
        ],
        translation: [
            { id: "family_t1", type: "enToAr", textEn: "I have two brothers.", textAr: "عندي أخوين." },
            { id: "family_t2", type: "arToEn", textEn: "My sister is a student.", textAr: "أختي طالبة." },
            { id: "family_t3", type: "enToAr", textEn: "Do you have a big family?", textAr: "عيلتك كبيرة؟" },
            { id: "family_t4", type: "arToEn", textEn: "I live with my parents.", textAr: "أنا ساكن/ساكنة مع أهلي." },
            { id: "family_t5", type: "enToAr", textEn: "My father works in a hospital.", textAr: "أبوي بشتغل بمستشفى." },
            { id: "family_t6", type: "arToEn", textEn: "We love our family.", textAr: "إحنا بنحب عيلتنا." },
        ],
    },

    // ====================================
    // HOMEWORK
    // ====================================
    homework: {
        instructions:
            "Write and record a 60–90 second story about your family in Palestinian Arabic. Mention: who lives in your house, how many brothers and sisters you have, who is older/younger than you, and if any of them are married, single, or engaged. Try to use at least 8 words from the vocabulary list and the structure «عِنْدِي…».",
    },

    // ====================================
    // TEACHER NOTES
    // ====================================
    teacherNotes: {
        warmup: [
            "In English, explain that family is one of the easiest and richest topics to practice in any language.",
            "Draw a simple family tree on the screen or a paper and write Arabic words next to each person (أَبُوي، إِمِّي، أَخُوي، أُخْتِي…).",
            "Ask the student to tell you the equivalent words in their own language to make it personal.",
        ],
        vocabularySteps: [
            "Teach close family first (parents, siblings, grandparents), then extended family (uncles, aunts, relatives).",
            "Use lots of personalization: ask about the student’s real family as soon as they understand the word.",
            "Highlight the ‘my’ forms (أَبُوي، إِمِّي، أَخُوي…) and recycle them in almost every example.",
        ],
        dialogueSteps: [
            "Read the full dialogue as a story. Then ask the student: ‘Which family do you feel closest to, Roba’s, Mark’s, Yara’s, or Omar’s?’",
            "Pick one character (for example, Yara) and ask the student to retell her family story in their own words.",
            "Change the details: same structure but different numbers, countries, and marital status, so the student produces new language using the same pattern.",
        ],
        practiceTips: [
            "When a student answers with short English sentences, gently push them to try small Arabic pieces like «عِنْدِي أَخَيْن» even if the rest is in English.",
            "Use the quiz questions to open mini-conversations, not only A/B/C answers.",
            "If the student has a complicated family situation, let them invent a ‘fantasy family’ just for practice to keep it safe and comfortable.",
        ],
        wrapup: [
            "Ask the student to say 3–5 full sentences about their family only in Arabic, even if simple.",
            "Summarize their family in Arabic back to them, slightly upgraded, so they hear a natural model.",
            "Remind them of the homework and suggest they imagine telling their story to a Palestinian friend, not to the teacher.",
        ],
        myNotes: "",
    },
};