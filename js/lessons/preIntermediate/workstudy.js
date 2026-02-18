import { LESSON_ID_WORK_STUDY } from '../../core/constants.js';

export const lessonId = LESSON_ID_WORK_STUDY;
export const lesson = {
    meta: {
        level: "Pre-Intermediate",
        unit: "Work & Study",
        lessonTitle: "Unit 6 – Work & Study in Palestinian Arabic",
    },

    overview: {
        title: "Unit 6 – Work & Study",
        description:
            "In this unit, students learn how to talk about their studies, their job (or future job), university or school life, subjects, exams, projects, and weekly schedule in Palestinian Arabic. The focus is on high-frequency verbs like ‘study, learn, work, teach, understand, finish’ and real-life dialogues between students and teachers.",
        goals: [
            "Talk about what and where they study using natural Palestinian Arabic chunks.",
            "Describe their job or future job, and part-time or online work.",
            "Use key verbs like: أَدْرُس، أَتْعَلَّم، أَشْتِغِل، أُدَرِّس، أَفْهَم، أَنْجَح.",
            "Ask and answer questions about timetable, classes, exams, and projects.",
            "Connect work & study with daily routine, time, and transportation from previous units.",
        ],
    },

    // ====================================
    // VOCABULARY
    // ====================================
    vocabulary: {
        core: [
            // ===== STUDENTS, PEOPLE & PLACES =====
            {
                id: "taleb",
                ar: "طالِب / طالْبِة",
                en: "student (m/f)",
                enArabeezy: "Taleb / Talbe",
                hint: "Person who studies at school or university.",
                exampleAr: "أنا طالْبَة جامْعِيّة.",
                exampleArabeezy: "ana talba jam3ya.",
                exampleEn: "I am a university student.",
},
            {
                id: "madraseh",
                ar: "مَدْرَسَة",
                en: "school",
                enArabeezy: "madraseh",
                hint:
                    "Plural: مَدَارِس. ‘My school’ = مَدْرَسْتِي. Used for primary / secondary school.",
                exampleAr: "أَخُوي لِسَّا فِي الْمَدْرَسَة، بْيِدْرُس صَفّ تَّاسِع.",
                exampleArabeezy: "akhwy lsa fy elmdrsa, bydrs sf tas3.",
                exampleEn: "My brother is still in school; he studies in ninth grade.",
},
            {
                id: "jame3a",
                ar: "جَامْعَة",
                en: "university",
                enArabeezy: "jame3a",
                hint:
                    "Plural: جَامْعَات. ‘My university’ = جَامْعْتِي. You can add the city name.",
                exampleAr: "أَنَا بَدْرُس فِي جَامْعَة غَزَّة.",
                exampleArabeezy: "ana bdrs fy jam3a ghza.",
                exampleEn: "I study at Gaza University.",
},
            {
                id: "qism",
                ar: "قِسْم",
                en: "department",
                enArabeezy: "qism",
                hint:
                    "Plural: أَقْسَام. قِسْم الْهَنْدَسَة، قِسْم اللُّغَات، قِسْم الْحَاسُوب.",
                exampleAr: "أَنَا فِي قِسْم الْهَنْدَسَة الْكَهْرَبَائِيَّة.",
                exampleArabeezy: "ana fy qsm elhndsa elkhrbayya.",
                exampleEn: "I am in the electrical engineering department.",
},

            {
                id: "sherkeh",
                ar: "شِرْكَة",
                en: "company",
                enArabeezy: "sherkeh",
                hint: "Workplace, company.",
                exampleAr: "أَبوي بِشْتِغِل في شِرْكَة خُصوصِيّة.",
                exampleArabeezy: "abwy bshtghl fy shrka khswsya.",
                exampleEn: "My father works in a private company.",
},
            {
                id: "mu3allem",
                ar: "مُعَلِّم / مُعَلِّمَة",
                en: "teacher (m/f)",
                enArabeezy: "mu3allem / mu3allmeh",
                hint:
                    "Spoken synonym of أُسْتَاذ. Used for school / institute teachers.",
                exampleAr: "مُعَلِّمَة الرِّيَاضِيَّات كْتِير شَاطْرَة.",
                exampleArabeezy: "m3lma elryadyat ktyr shatra.",
                exampleEn: "The math teacher is very good.",
},
            {
                id: "zamil",
                ar: "زْمِيل / زْمِيلَة",
                en: "classmate / colleague (m/f)",
                enArabeezy: "zmiil / zmileh",
                hint:
                    "Plural: زْمَلَا. Used for study or work colleagues.",
                exampleAr: "زْميلي في الشُّغُل بيساعِدْني كْثير.",
                exampleArabeezy: "zmyly fy elshghl bysa3dny kthyr.",
                exampleEn: "My colleague at work helps me a lot.",
},
            {
                id: "mudir",
                ar: "مُدِير / مُدِيرَة",
                en: "manager / director",
                enArabeezy: "mudiir / mudiireh",
                hint: "Used in work or school context. Plural: مُدَرَا.",
                exampleAr: "مُدِير الشُّغُل عِنْدُه اِجْتِمَاع كُلّ يَوْم إِثْنَيْن.",
                exampleArabeezy: "mdyr elshghl 3ndh ajtma3 kl ywm ithnyn.",
                exampleEn: "The manager at work has a meeting every Monday.",
},
            {
                id: "muwazzaf",
                ar: "مُوَظَّف / مُوَظَّفِة",
                en: "employee (m/f)",
                enArabeezy: "muwazzaf / muwazzafeh",
                hint: "Person who works in an office, bank, company, etc.",
                exampleAr: "أُخوي مُوَظَّف في بَنْك.",
                exampleArabeezy: "akhwy mwzf fy bnk.",
                exampleEn: "My brother is an employee in a bank.",
},
            {
                id: "mohandes",
                ar: "مُهَنْدِس / مُهَنْدِسَة",
                en: "engineer (m/f)",
                enArabeezy: "mohandes / mohandeseh",
                hint: "Profession (software, civil, electrical…).",
                exampleAr: "بِدْرُس عَشان أَصير مُهَنْدِسَة بَرْمَجِيّات.",
                exampleArabeezy: "bdrs 3shan asyr mhndsa brmjyat.",
                exampleEn: "I study so I can become a software engineer.",
},
            {
                id: "mumarriD",
                ar: "مُمَرِّض / مُمَرِّضَة",
                en: "nurse (m/f)",
                enArabeezy: "mumarriD / mumarriDa",
                hint: "Health profession.",
                exampleAr: "أُختي مُمَرِّضَة في مُسْتَشْفَى.",
                exampleArabeezy: "akhty mmrda fy mstshfa.",
                exampleEn: "My sister is a nurse in a hospital.",
},

            // ===== STUDY TOOLS & ACADEMIC THINGS =====
            {
                id: "daftar",
                ar: "دَفْتَر",
                en: "notebook",
                enArabeezy: "daftar",
                hint: "Plural: دَفَاتِر. ‘My notebook’ = دَفْتَرِي.",
                exampleAr: "بَكْتُب مْلَاحَظَات فِي دَفْتَر خَاصّ لِكُلّ مَادَّة.",
                exampleArabeezy: "bktb mla7zat fy dftr khas lkl mada.",
                exampleEn: "I write notes in a special notebook for each subject.",
},
            {
                id: "qalam",
                ar: "قَلَم",
                en: "pen",
                enArabeezy: "qalam",
                hint:
                    "Plural: أَقْلَام. قَلَم رَصَاص = pencil, قَلَم حِبْر = ink pen.",
                exampleAr: "دَايْمًا بَنْسَى قَلَمِي فِي الْقَاعَة.",
                exampleArabeezy: "dayma bnsa qlmy fy elqa3a.",
                exampleEn: "I always forget my pen in the classroom.",
},
            {
                id: "kumbyuter",
                ar: "كُمْبْيُوتِر / لَابْتُوب",
                en: "computer / laptop",
                enArabeezy: "kombyuter / laptop",
                hint: "Used a lot for online study and work.",
                exampleAr: "بَدْرُس وَبَشْتِغِل أُونْلَايْن عَلَى اللَّابْتُوب.",
                exampleArabeezy: "bdrs wbshtghl awnlayn 3la ellabtwb.",
                exampleEn: "I study and work online on the laptop.",
},
            {
                id: "mawdoo3",
                ar: "مَوْضُوع",
                en: "topic / subject (theme)",
                enArabeezy: "mawDoo3",
                hint:
                    "Plural: مَوَاضِيع. Used for essay topics, project topics, etc.",
                exampleAr: "الْيَوْم مَوْضُوع الدَّرْس هُوَّ الشُّغُل وَالدِّرَاسَة.",
                exampleArabeezy: "elywm mwdw3 eldrs hw elshghl weldrasa.",
                exampleEn: "Today the lesson topic is work and study.",
},
            {
                id: "mawadd",
                ar: "مَوَادّ",
                en: "subjects (school/university)",
                enArabeezy: "mawaadd",
                hint:
                    "Plural word already. Singular مَادَّة = one subject / course.",
                exampleAr: "عِنْدِي تَلَات مَوَادّ هالفصل.",
                exampleArabeezy: "3ndy tlat mwad halfsl.",
                exampleEn: "I have three subjects this semester.",
},
            {
                id: "imti7an",
                ar: "اِمْتِحَان",
                en: "exam / test",
                enArabeezy: "imti7an",
                hint:
                    "Plural: اِمْتِحَانَات. ‘final exam’ = اِمْتِحَان نِهَائِي.",
                exampleAr: "الأُسْبوع الْجَاي عِنْدِي اِمْتِحَان مُهِمّ.",
                exampleArabeezy: "elasbw3 eljay 3ndy amt7an mhm.",
                exampleEn: "Next week I have an important exam.",
},
            {
                id: "wajeb",
                ar: "وَاجِب",
                en: "homework / assignment",
                enArabeezy: "wajeb",
                hint:
                    "Plural: وَاجْبَات. In spoken Arabic ‘homework’ is usually وَاجِب.",
                exampleAr: "الأُسْتَاذ بْيِعْطِينَا وَاجِب بَعْد كُلّ دَرْس.",
                exampleArabeezy: "elastadh by3tyna wajb b3d kl drs.",
                exampleEn: "The teacher gives us homework after every lesson.",
},
            {
                id: "mashroo3",
                ar: "مَشْرُوع",
                en: "project",
                enArabeezy: "mashroo3",
                hint:
                    "Plural: مَشَارِيع. مَشْرُوع تَّخَرُّج = graduation project.",
                exampleAr: "هَادَا أَوَّل مَشْرُوع بَسَوِّيه فِي الْجَامْعَة.",
                exampleArabeezy: "hada awl mshrw3 bswyh fy eljam3a.",
                exampleEn: "This is the first project I do at university.",
},
            {
                id: "mu7adara",
                ar: "مُحاضَرَة",
                en: "lecture / class session",
                enArabeezy: "mu7aDara",
                hint: "University / college lesson.",
                exampleAr: "عندي مُحاضَرَة ساعَتَيْن اليوم.",
                exampleArabeezy: "3ndy m7adra sa3tyn elywm.",
                exampleEn: "I have a two-hour lecture today.",
},
            {
                id: "istira7a",
                ar: "اِسْتِراحَة",
                en: "break",
                enArabeezy: "istira7a",
                hint: "Pause from work or class.",
                exampleAr: "بِنْخُد اِسْتِراحَة صْغيرَة بَين المُحاضَرات.",
                exampleArabeezy: "bnkhd astra7a sghyra byn elm7adrat.",
                exampleEn: "We take a short break between the lectures.",
},

            // ===== WORK & JOB WORDS =====
            {
                id: "shoghol",
                ar: "شُغُل",
                en: "work / job",
                enArabeezy: "shoghol",
                hint:
                    "Can mean ‘work’ in general or a job. ‘I have work’: عِنْدِي شُغُل.",
                exampleAr: "بَشْتِغِل وَبَدْرُس فِي نَفْس الْوَقْت، عِنْدِي شُغُل جُزْئِي.",
                exampleArabeezy: "bshtghl wbdrs fy nfs elwqt, 3ndy shghl jzyy.",
                exampleEn: "I work and study at the same time; I have a part-time job.",
},
            {
                id: "wazifeh",
                ar: "وَظِيفَة",
                en: "job / position",
                enArabeezy: "waZiifeh",
                hint:
                    "Plural: وَظَايِف. More formal than شُغُل.",
                exampleAr: "الْكُلّ بِيِدَوِّر عَلَى وَظِيفَة مُنَاسْبَة بَعْد التَّخَرُّج.",
                exampleArabeezy: "elkl bydwr 3la wzyfa mnasba b3d eltkhrj.",
                exampleEn: "Everyone looks for a suitable job after graduation.",
},
            {
                id: "duwam",
                ar: "دْوَام / دَوام",
                en: "working hours / shift",
                enArabeezy: "dawam",
                hint: "دْوَام صَبَاحِي، دْوَام كَامِل، دْوَام جُزْئِي.",
                exampleAr: "دْوَام الشُّغُل مِن السَّاعَة تَمْنْيَة لِلسَّاعَة أَرْبَعَة.",
                exampleArabeezy: "dwam elshghl mn elsa3a tmnya lelsa3a arb3a.",
                exampleEn: "Working hours are from eight to four.",
},
            {
                id: "dawam_kamel",
                ar: "بِدَوَّام كامِل",
                en: "full-time",
                enArabeezy: "bidawwam_kamel",
                hint: "Full-time work or study schedule.",
                exampleAr: "أَبوي بِشْتِغِل بِدَوَّام كامِل.",
                exampleArabeezy: "abwy bshtghl bdwam kaml.",
                exampleEn: "My father works full-time.",
},
            {
                id: "dawam_joz2i",
                ar: "دَوام جُزْئِي",
                en: "part-time",
                enArabeezy: "dawam_joz2i",
                hint: "Part-time work or job.",
                exampleAr: "أنا طالِب وبَشْتِغِل دَوام جُزْئِي.",
                exampleArabeezy: "ana talb wbshtghl dwam jzyy.",
                exampleEn: "I’m a student and I work part-time.",
},

            // ===== STUDY & WORK VERBS =====
            {
                id: "badros",
                ar: "بَدْرُس",
                en: "I study",
                enArabeezy: "badros",
                hint:
                    "From دَرَس = to study. Used with subject or field: بَدْرُس عَرَبِي / هَنْدَسَة / طِبّ.",
                exampleAr: "بَدْرُس حَاسُوب فِي الْجَامْعَة.",
                exampleArabeezy: "bdrs 7aswb fy eljam3a.",
                exampleEn: "I study computer science at university.",
},

            {
                id: "bat3allam",
                ar: "بَتْعَلَّم",
                en: "I learn",
                enArabeezy: "bat3allam",
                hint:
                    "From تَعَلَّم = to learn. More general than ‘study’.",
                exampleAr: "بَتْعَلَّم اللُّغَة الْعَرَبِيَّة وَاللُّغَة الإِنْجْلِيزِيَّة.",
                exampleArabeezy: "bt3lm ellgha el3rbya wellgha elinjlyzya.",
                exampleEn: "I am learning Arabic and English.",
},
            {
                id: "bas2al",
                ar: "بَسْأَل",
                en: "I ask (a question)",
                enArabeezy: "bas2al",
                hint:
                    "From سَأَل = to ask. Used a lot in class: بَسْأَل الأُسْتَاذ.",
                exampleAr: "لَمَّا مَا أَفْهَم بَسْأَل الأُسْتَاذ.",
                exampleArabeezy: "lma ma afhm bsal elastadh.",
                exampleEn: "When I don’t understand, I ask the teacher.",
},

            {
                id: "bakammel",
                ar: "بَكَمِّل",
                en: "I continue / I complete",
                enArabeezy: "bakammel",
                hint: "Chunk: بَكَمِّل دِرَاسَة، بَكَمِّل مَشْرُوع.",
                exampleAr: "بَكَمِّل مُسْتَوَى أَوَّل فِي اللُّغَة الْفِلَسْطِينِيَّة.",
                exampleArabeezy: "bkml mstwa awl fy ellgha elflstynya.",
                exampleEn: "I am completing level one in Palestinian Arabic.",
},
            {
                id: "banja7",
                ar: "بَنْجَح",
                en: "I pass / I succeed",
                enArabeezy: "banja7",
                hint:
                    "Used with exams/subjects. Opposite: بَرْسُب = I fail.",
                exampleAr: "بَنْجَح فِي الاِمْتِحَان إِذَا بَدْرُس مْنِيح.",
                exampleArabeezy: "bnj7 fy elamt7an idha bdrs mny7.",
                exampleEn: "I pass the exam if I study well.",
},
            {
                id: "barsob",
                ar: "بَرْسُب",
                en: "I fail (a subject / exam)",
                enArabeezy: "barsob",
                hint: "From رَسَب = to fail. Sensitive word, use carefully.",
                exampleAr: "مَا بَدِّي أَرْسُب، عَشَان هَيْك بَدْرُس كْتِير.",
                exampleArabeezy: "ma bdy arsb, 3shan hyk bdrs ktyr.",
                exampleEn: "I don’t want to fail, so I study a lot.",
},
            {
                id: "bashteghil",
                ar: "بَشْتِغِل",
                en: "I work",
                enArabeezy: "bashteghil",
                hint:
                    "Spoken verb for ‘work’. Add where or how: بَشْتِغِل أُونْلَايْن، بَشْتِغِل فِي مَكْتَب.",
                exampleAr: "بشتغل مُدرّس دوام جزئي وبدرس كمان.",
                exampleArabeezy: "bshtghl mdrs dwam jzyy wbdrs kman.",
                exampleEn: "I work part-time as a teacher and study as well.",
},
            {
                id: "yishtaghel",
                ar: "يِشْتِغِل",
                en: "to work",
                enArabeezy: "yishtaghel",
                hint: "Dictionary verb form ‘to work’.",
                exampleAr: "بشتغل دوام جزئي بعد الجامعة.",
                exampleArabeezy: "bshtghl dwam jzyy b3d eljam3a.",
                exampleEn: "I work part-time after university.",
},
            {
                id: "badarreb",
                ar: "بَدَرِّب",
                en: "I train / I give training",
                enArabeezy: "badarreb",
                hint:
                    "From دَرَّب = to train. For giving courses/workshops.",
                exampleAr: "بَدَرِّب طُلَّاب أَجَانِب عَلَى اللُّغَة الْفِلَسْطِينِيَّة.",
                exampleArabeezy: "bdrb tlab ajanb 3la ellgha elflstynya.",
                exampleEn: "I train foreign students in Palestinian Arabic.",
},
            {
                id: "badarris",
                ar: "بَدَرِّس",
                en: "I teach",
                enArabeezy: "badarris",
                hint:
                    "From دَرَّس = to teach. Teacher speaking about their job.",
                exampleAr: "أَنَا بَدَرِّس عَرَبِي لِطُلَّاب مِن دُوَل مُخْتَلِفَة.",
                exampleArabeezy: "ana bdrs 3rby ltlab mn dwl mkhtlfa.",
                exampleEn: "I teach Arabic to students from different countries.",
},
            {
                id: "yitkharraj",
                ar: "يِتْخَرَّج",
                en: "to graduate",
                enArabeezy: "yitkharraj",
                hint: "Finish university or school.",
                exampleAr: "بَدّي أِتْخَرَّج السَّنِة الجاي.",
                exampleArabeezy: "bdy atkhrj elsna eljay.",
                exampleEn: "I want to graduate next year.",
},
        ],

        extra: [
            {
                id: "youm_dirasah",
                ar: "يَوْم دِرَاسَة",
                en: "school / study day",
                enArabeezy: "youm_diraseh",
                hint: "Opposite: يَوْم إِجَازَة = day off.",
                exampleAr: "الْخَمِيس عِنْدْنَا يَوْم دِرَاسَة طَوِيل.",
                exampleArabeezy: "elkhmys 3ndna ywm drasa twyl.",
                exampleEn: "On Thursday we have a long study day.",
},
            {
                id: "sabt_lakhmis",
                ar: "مِن السَّبْت لِلْخَمِيس",
                en: "from Saturday to Thursday",
                enArabeezy: "min_issabt_lil5amiis",
                hint:
                    "Typical study/work week in many Arab countries.",
                exampleAr: "بَدْرُس مِن السَّبْت لِلْخَمِيس وَالجُمُعَة إِجَازَة.",
                exampleArabeezy: "bdrs mn elsbt lelkhmys weljm3a ijaza.",
                exampleEn: "I study from Saturday to Thursday and Friday is off.",
},
            {
                id: "mu3adal",
                ar: "مُعَدَّل",
                en: "average / GPA",
                enArabeezy: "mu3addal",
                hint: "Study context: مُعَدَّل عَالِي / مُنْخَفِض.",
                exampleAr: "بَدِّي مُعَدَّل عَالِي عَشَان أَلْقَى وَظِيفَة أَحْسَن.",
                exampleArabeezy: "bdy m3dl 3aly 3shan alqa wzyfa a7sn.",
                exampleEn: "I want a high GPA so I can find a better job.",
},
            {
                id: "mahameh",
                ar: "مَهَمّة",
                en: "task",
                enArabeezy: "mahameh",
                hint: "Task at work or for a project.",
                exampleAr: "كُل يَوم المُدير بِعْطيهِم مَهَمّات جْديدة.",
                exampleArabeezy: "kl ywm elmdyr b3tyhm mhmat jdyda.",
                exampleEn: "Every day the manager gives them new tasks.",
},
            {
                id: "maw3ed",
                ar: "مَوعِد",
                en: "appointment / deadline",
                enArabeezy: "maw3ed",
                hint: "Time for a meeting or for submitting something.",
                exampleAr: "مَوعِد تَسْليم المَشْروع بُكْرَة.",
                exampleArabeezy: "mw3d tslym elmshrw3 bkra.",
                exampleEn: "The deadline for submitting the project is tomorrow.",
},
            {
                id: "lazem",
                ar: "لازِم",
                en: "must / have to",
                enArabeezy: "lazem",
                hint: "Used to express obligation.",
                exampleAr: "لازِم أَدْرُس كْثير لِلْاِمْتِحان.",
                exampleArabeezy: "lazm adrs kthyr lelamt7an.",
                exampleEn: "I must study a lot for the exam.",
},
            {
                id: "ma_ba2dar",
                ar: "ما بَقْدَر",
                en: "I can’t / I’m not able",
                enArabeezy: "ma_ba2dar",
                hint:
                    "Used when you don’t have time, energy, or possibility.",
                exampleAr: "ما بَقْدَر أِطْلَع اليوم، عندي شُغُل.",
                exampleArabeezy: "ma bqdr atl3 elywm, 3ndy shghl.",
                exampleEn: "I can’t go out today, I have work.",
},
            {
                id: "wa2t_faDi",
                ar: "وَقْت فاضي",
                en: "free time",
                enArabeezy: "wa2t_faDi",
                hint: "Time without work or study.",
                exampleAr: "ما عِنْدي وَقْت فاضي اليوم.",
                exampleArabeezy: "ma 3ndy wqt fady elywm.",
                exampleEn: "I have no free time today.",
},
        ],
    }
    ,

    // ====================================
    // DIALOGUE (class + project + work + future)
    // ====================================
    dialogue: {
        lines: [
            {
                "speaker": "Majd",
                "ar": "صباح الخير يا سارة، كيف جدولك اليوم؟",
                "arArabeezy": "sba7 elkhyr ya sara, kyf jdwlk elywm?",
                "en": "Good morning, Sara, how is your schedule today?"
            },
            {
                "speaker": "Sara",
                "ar": "صباح الخير يا مجد، جدّ جدولي ملخبط! عندي جامعة وشغل.",
                "arArabeezy": "sba7 elkhyr ya mjd, jd jdwly mlkhbt! 3ndy jam3a wshghl.",
                "en": "Good morning, Majd, my schedule is crazy! I have university and work."
            },
            {
                "speaker": "Majd",
                "ar": "جَدّ؟ وين بَشْتِغِلي؟",
                "arArabeezy": "jd?wyn bshtghly?",
                "en": "Really? Where do you work?"
            },
            {
                "speaker": "Sara",
                "ar": "بَشْتِغِل دَوام جُزْئِي في مَكْتَب بِشِرْكَة صْغيرَة.",
                "arArabeezy": "bshtghl dwam jzyy fy mktb bshrka sghyra.",
                "en": "I work part-time in an office at a small company."
            },
            {
                "speaker": "Majd",
                "ar": "قدّيش ساعات شغلك؟ وكم يوم بتدوامي",
                "arArabeezy": "qdysh sa3at shghlk?wkm ywm btdwamy",
                "en": "How long are your work hours? And how many days do you work?"
            },
            {
                "speaker": "Sara",
                "ar": "مِن التّْنين لَلخَميس، مِن السّاعَة تْنين لَلْخَمْسَة.",
                "arArabeezy": "mn eltnyn lelkhmys, mn elsa3a tnyn lelkhmsa.",
                "en": "From Monday to Thursday, from two o’clock to five."
            },
            {
                "speaker": "Majd",
                "ar": "وطَبْعًا قبل هيك عَندِك مُحاضَرات بِالجامْعَة؟",
                "arArabeezy": "wtb3a qbl hyk 3ndk m7adrat beljam3a?",
                "en": "And of course before that you have lectures at the university?"
            },
            {
                "speaker": "Sara",
                "ar": "إي، الصُّبِح بَدْرُس، وبَعْدين بَروح عَالشُّغُل.",
                "arArabeezy": "iy, elsb7 bdrs, wb3dyn brw7 3alshghl.",
                "en": "Yes, in the morning I study, and then I go to work."
            },
            {
                "speaker": "Majd",
                "ar": "ما بِتْحِسّي إنّو ما عِنْدِك وَقْت فاضي؟",
                "arArabeezy": "ma bt7sy inw ma 3ndk wqt fady?",
                "en": "Don’t you feel like you have no free time?"
            },
            {
                "speaker": "Sara",
                "ar": "بصِراحَةً، نادِرًا ما بْلاقي وَقْت فاضي. لاِزِم أَدْرُس لِلْمَشْروع وِلْاِمْتِحانات كْمان.",
                "arArabeezy": "bsra7a, nadra ma blaqy wqt fady. lazm adrs lelmshrw3 wlamt7anat kman.",
                "en": "Honestly, I rarely find free time. I have to study for the project and for exams too."
            },
            {
                "speaker": "Majd",
                "ar": "وشُو مَجال الشُّغُل؟",
                "arArabeezy": "wshw mjal elshghl?",
                "en": "And what type of work is it?"
            },
            {
                "speaker": "Sara",
                "ar": "مُساعَدَة إِداريّة، بَطَبِّع أَوْراق، بِرُدّ عَالتّليفون، وَبَساعِد المُوَظَّفين.",
                "arArabeezy": "msa3da idarya, btb3 awraq, brd 3altlyfwn, wbsa3d elmwzfyn.",
                "en": "Administrative assistance: I print papers, answer the phone, and help the employees."
            },
            {
                "speaker": "Majd",
                "ar": "بتحسّ إنو الشغل بيساعدك بدراستك، ولا بس بتعبك أكتر؟",
                "arArabeezy": "bt7s inw elshghl bysa3dk bdrastk, wla bs bt3bk aktr?",
                "en": "Do you feel that the job helps you with your studies, or does it just tire you out more?"
            },
            {
                "speaker": "Sara",
                "ar": "هُوَّ مُتْعِب، بَس كْمان بَتْعَلَّم مَهارات جْديدة.",
                "arArabeezy": "hw mt3b, bs kman bt3lm mharat jdyda.",
                "en": "It’s tiring, but I also learn new skills."
            },
            {
                "speaker": "Majd",
                "ar": "أنا طالِب بَس، ما بَشْتِغِل هَلَّق. بس أَحْيانًا بَفَكِّر آخُد دَوام جُزْئِي.",
                "arArabeezy": "ana talb bs, ma bshtghl hlq. bs a7yana bfkr aakhd dwam jzyy.",
                "en": "I’m only a student, I don’t work right now. But sometimes I think about taking a part-time job."
            },
            {
                "speaker": "Sara",
                "ar": "إذا بَدَّك تِشْتِغِل، لازم تِنَظِّم وَقْتَك مْنيح.",
                "arArabeezy": "idha bdk tshtghl, lazm tnzm wqtk mny7.",
                "en": "If you want to work, you must organize your time well."
            },
            {
                "speaker": "Majd",
                "ar": "عَنْ قريب عنا اِمْتِحانات، صَعِب أَفَكِّر بِشُغُل هَلَّق.",
                "arArabeezy": "3n qryb 3na amt7anat, s3b afkr bshghl hlq.",
                "en": "We have exams soon, it’s hard to think about work now."
            },
            {
                "speaker": "Sara",
                "ar": "مَزْبوط، الأَهَم هَلَّق الدِّراسَة. بَعْدين بِتْدَوِّر عَشُغُل مُناسِب.",
                "arArabeezy": "mzbwt, elahm hlq eldrasa. b3dyn btdwr 3shghl mnasb.",
                "en": "True, right now the most important thing is studying. Later you look for a suitable job."
            },
            {
                "speaker": "Majd",
                "ar": "إنْ شاءَ الله بَعْد ما أِتْخَرَّج أَلاقِي وَظِيفَة كْوَيْسِة.",
                "arArabeezy": "in sha ellh b3d ma atkhrj alaqy wzyfa kwysa.",
                "en": "Inshallah after I graduate I’ll find a good job."
            },
            {
                "speaker": "Sara",
                "ar": "وأنا كْمان، خَلِّينا نِرْكِز عَالدِّراسَة هَلَّق.",
                "arArabeezy": "wana kman, khlyna nrkz 3aldrasa hlq.",
                "en": "Me too; let’s focus on the studies for now."
            }
        ]
    }
    ,

    // ====================================
    // GRAMMAR
    // ====================================

  grammar: [
        {
            id: "indirect_object",
            title: "Indirect Object (لـ)",
            short: "Use لـ to show who receives the action.",
            description:
                `In spoken Arabic, we use لـ (la-) before the person who receives the action.
It can sound like la / li and often attaches to pronouns.

Pattern:
Verb + thing + لـ + person.`,
            table: {
                title: "Common Patterns",
                headers: ["Arabic Pattern", "Arabeezy", "English", "Usage"],
                rows: [
                    ["بـعطي + شي + لـ + شخص", "ba3Ti + shi + la + shakhs", "give + something + to", "Work/study"],
                    ["ببعت + شي + لـ + شخص", "bib3at + shi + la + shakhs", "send + something + to", "Messages"],
                    ["بشرح + شي + لـ + شخص", "bishra7 + shi + la + shakhs", "explain + something + to", "Class"],
                    ["بقول + شي + لـ + شخص", "bi2ool + shi + la + shakhs", "say + something + to", "Advice"]
                ]
            },
            examples: [
                { ar: "بشرح الدرس للطلاب", arabeezy: "bishra7 ed-dars lil-Tullaab", en: "He explains the lesson to the students." },
                { ar: "ببعت الإيميل للأستاذ", arabeezy: "bib3at el-email lil-ustaz", en: "She sends the email to the teacher." },
                { ar: "بعطي الكتاب لصاحبي", arabeezy: "ba3Ti el-kitaab la-Sa7bi", en: "I give the book to my friend." },
                { ar: "بقول النصيحة إلك", arabeezy: "bi2ool en-naSee7a ilik", en: "I give you (f) advice." },
                { ar: "بشرحلك بسرعة", arabeezy: "bishra7lak bisur3a", en: "I explain to you quickly." }
            ],
            teacherNotes:
                `Spoken often shortens "la" into -lak/-lik suffixes.
MSA keeps full li/ila forms.
Focus on meaning before spelling.
Keep nouns and people simple.`,
            commonMistakes: [
                "Dropping لـ before the person",
                "Putting لـ before the object",
                "Using formal إلى in casual speech"
            ],
            functionalUse: "Use this when you give, send, explain, or say something to someone."
        },
        {
            id: "telling_time",
            title: "Telling the Time (الساعة)",
            short: "Use الساعة + number to tell time.",
            description:
                `Time is said with الساعة + number.
You can add ونص (half) or وربع (quarter).
For 15 before the next hour: الساعة ستة إلا ربع.

Use الساعة + number for clock time.`,
            table: {
                title: "Time Patterns",
                headers: ["Arabic Pattern", "Arabeezy", "English", "Usage"],
                rows: [
                    ["الساعة + رقم", "es-sa3a + raqam", "It’s (time)", "Exact time"],
                    ["الساعة + رقم ونص", "es-sa3a + raqam w nos", "half past", "30 min"],
                    ["الساعة + رقم وربع", "es-sa3a + raqam w rob3", "quarter past", "15 min"],
                    ["الساعة + رقم إلا ربع", "es-sa3a + raqam illa rob3", "quarter to", "45 min" ]
                ]
            },
            examples: [
                { ar: "الساعة خمسة", arabeezy: "es-sa3a khamsa", en: "It’s five." },
                { ar: "الساعة خمسة ونص", arabeezy: "es-sa3a khamsa w nos", en: "It’s 5:30." },
                { ar: "الساعة خمسة وربع", arabeezy: "es-sa3a khamsa w rob3", en: "It’s 5:15." },
                { ar: "الساعة ستة إلا ربع", arabeezy: "es-sa3a sitta illa rob3", en: "It’s 5:45." },
                { ar: "الساعة تسعة، عندي محاضرة", arabeezy: "es-sa3a tis3a, 3indi mu7aDarah", en: "It’s nine, I have a lecture." }
            ],
            teacherNotes:
                `Spoken keeps one simple pattern; MSA uses more formal time phrases.
Say time often in class to build fluency.
Use real schedules and daily routines.
Keep numbers consistent with learner level.`,
            commonMistakes: [
                "Forgetting الساعة",
                "Mixing ordinal numbers with time",
                "Confusing إلا ربع with وربع"
            ],
            functionalUse: "Use this for schedules, meetings, work hours, and class times."
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
                prompt: "Match the English word to Arabic: student (m/f)",
                options: ["طالِب / طالْبِة", "مَدْرَسَة", "جَامْعَة", "قِسْم", "شِرْكَة"],
                correct: "طالِب / طالْبِة",
            },
            {
                id: "mc_complete_2",
                type: "match",
                prompt: "Match the English word to Arabic: teacher (m/f)",
                options: ["مُعَلِّم / مُعَلِّمَة", "زْمِيل / زْمِيلَة", "مُدِير / مُدِيرَة", "مُوَظَّف / مُوَظَّفِة", "مُهَنْدِس / مُهَنْدِسَة"],
                correct: "مُعَلِّم / مُعَلِّمَة",
            },
            {
                id: "mc_reorder_3",
                type: "reorder",
                prompt: "Reorder the Arabic words to match: My sister is a nurse in a hospital.",
                options: ["أُختي", "مُمَرِّضَة", "في", "مُسْتَشْفَى"],
                correct: ["أُختي", "مُمَرِّضَة", "في", "مُسْتَشْفَى"],
            },
            {
                id: "mc_choose_4",
                type: "choose",
                prompt: "Choose the correct Arabic word for: subjects (school/university)",
                options: ["مَوَادّ", "اِمْتِحَان", "وَاجِب", "مَشْرُوع", "مُحاضَرَة"],
                correct: "مَوَادّ",
            },
            {
                id: "mc_match_5",
                type: "match",
                prompt: "Match the English word to Arabic: break",
                options: ["اِسْتِراحَة", "شُغُل", "وَظِيفَة", "دْوَام / دَوام", "بِدَوَّام كامِل"],
                correct: "اِسْتِراحَة",
            },
            {
                id: "mc_complete_6",
                type: "complete",
                prompt: "Complete the Arabic sentence for: I’m a student and I work part-time.\nأنا طالِب وبَشْتِغِل ___.",
                options: ["دَوام جُزْئِي", "بَدْرُس", "بَتْعَلَّم", "بَسْأَل", "بَكَمِّل"],
                correct: "دَوام جُزْئِي",
            },
            {
                id: "mc_reorder_7",
                type: "reorder",
                prompt: "Reorder the Arabic words to match: I pass the exam if I study well.",
                options: ["بَنْجَح", "فِي", "الاِمْتِحَان", "إِذَا", "بَدْرُس", "مْنِيح"],
                correct: ["بَنْجَح", "فِي", "الاِمْتِحَان", "إِذَا", "بَدْرُس", "مْنِيح"],
            },
            {
                id: "mc_choose_8",
                type: "choose",
                prompt: "Choose the correct Arabic word for: I teach",
                options: ["بَدَرِّس", "يِتْخَرَّج", "يَوْم دِرَاسَة", "مِن السَّبْت لِلْخَمِيس", "مُعَدَّل"],
                correct: "بَدَرِّس",
            },
            {
                id: "mc_match_9",
                type: "match",
                prompt: "Match the English word to Arabic: task",
                options: ["مَهَمّة", "مَوعِد", "لازِم", "ما بَقْدَر", "وَقْت فاضي"],
                correct: "مَهَمّة",
            },
        ],
    },

    practice: {
        quiz: [
            {
                id: "ws_q1",
                questionAr: "«بَدْرُس هَنْدَسَة فِي الْجَامْعَة» مَعْنَاهَا:",
                optionsEn: [
                    "I teach engineering at the university.",
                    "I study engineering at the university.",
                    "I work in engineering at the university.",
                ],
                correctIndex: 1,
            },
            {
                id: "ws_q2",
                questionAr: "أَيّ كَلِمَة تِسْتَخْدِمْهَا لِـ ‘exam’؟",
                optionsEn: [
                    "مَشْرُوع",
                    "اِمْتِحَان",
                    "اِجْتِمَاع",
                ],
                correctIndex: 1,
            },
            {
                id: "ws_q3",
                questionAr: "«عِنْدِي شُغُل جُزْئِيّ» مَعْنَاهَا:",
                optionsEn: [
                    "I have a full-time job.",
                    "I have a part-time job.",
                    "I don’t have any job.",
                ],
                correctIndex: 1,
            },
            {
                id: "ws_q4",
                questionAr: "«بَنْجَح فِي الاِمْتِحَان إِذَا بَدْرُس مْنِيح» مَعْنَاهَا:",
                optionsEn: [
                    "I pass the exam if I study well.",
                    "I fail the exam if I study well.",
                    "I don’t have an exam if I study well.",
                ],
                correctIndex: 0,
            },
            {
                id: "ws_q5",
                questionAr: "أَيّ تَعْبِير مَعْنَاه ‘I learn Palestinian dialect online’؟",
                optionsEn: [
                    "بَدْرُس فِلَسْطِينِي فِي الْمَدْرَسَة.",
                    "بَتْعَلَّم فِلَسْطِينِي أُونْلَايْن.",
                    "بَشْتِغِل فِلَسْطِينِي أُونْلَايْن.",
                ],
                correctIndex: 1,
            },
        ],

        rolePlays: [
            "Role-play 1: University introduction. Student A is the teacher; Student B is a new student. The teacher asks about name, what they study, in which university/department, and if they work as well. Student B answers using «بَدْرُس»، «بَتْعَلَّم»، «بَشْتِغِل»، and «عِنْدِي مَشْرُوع / اِمْتِحَان». Then switch roles.",
            "Role-play 2: Exam week. Two students talk about their subjects and exams: which one is easy, which one is difficult, how they study, and what they need to pass. They use «مَادَّة»، «مَوَادّ»، «اِمْتِحَان»، «بَنْجَح»، «بَرْسُب»، and time words (next week, tomorrow, today).",
            "Role-play 3: Future plans. Student A interviews Student B about their future after graduation: job they want, if they want a master’s, if they want to work online or in an office. Use «رَح» for future, «بِفَضَّل»، «وَظِيفَة»، and chunks like «بِصِدْق، بَدِّي…».",
        ],
        translation: [
            { id: "work_t1", type: "enToAr", textEn: "I study at the university.", textAr: "أنا بدرس بالجامعة." },
            { id: "work_t2", type: "arToEn", textEn: "I work online.", textAr: "أنا بشتغل أونلاين." },
            { id: "work_t3", type: "enToAr", textEn: "I have an exam tomorrow.", textAr: "عندي امتحان بكرا." },
            { id: "work_t4", type: "arToEn", textEn: "This subject is difficult.", textAr: "هالمادة صعبة." },
            { id: "work_t5", type: "enToAr", textEn: "Do you want to get a master's?", textAr: "بدك تعمل ماستر؟" },
            { id: "work_t6", type: "arToEn", textEn: "I need to pass this exam.", textAr: "لازم أنجح بهالامتحان." }
        ],
    },

    // ====================================
    // HOMEWORK
    // ====================================
    homework: {
        instructions:
            "Write and record a 60–90 second text in Palestinian Arabic about your work & study life. Include:\n" +
            "• What you study (or studied) and where (school / university / online).\n" +
            "• If you work now or want to work in the future (type of job / field).\n" +
            "• At least 4 study words (like: مَادَّة، مَوَادّ، اِمْتِحَان، مَشْرُوع، وَاجِب).\n" +
            "• At least 3 verbs from the unit (like: بَدْرُس، بَتْعَلَّم، بَشْتِغِل، بَفْهَم، بَنْجَح).\n" +
            "Try to tell it like a story: past (what you studied before), present (what you do now), and future (what you want to do).",
    },

    // ====================================
    // TEACHER NOTES
    // ====================================
    teacherNotes: {
        warmup: [
            "Start by asking in English about the student’s real situation: Are you studying now? Working? Both? Then map the answers into Arabic using the new verbs.",
            "Write on the board two columns: STUDY and WORK. Let the student brainstorm words in English, then give or elicit the Palestinian Arabic equivalents.",
            "Ask the student about their most difficult subject and their favorite subject, then introduce the words مَادَّة / مَوَادّ / اِمْتِحَان.",
        ],
        vocabularySteps: [
            "Teach the study words in small groups: places (school, university, department), things (notebook, pen, laptop), and abstract words (exam, project, meeting).",
            "Highlight singular/plural inside the hints: مَادَّة / مَوَادّ, دَفْتَر / دَفَاتِر, اِمْتِحَان / اِمْتِحَانَات, then let the student make at least one plural sentence.",
            "Introduce the verb pairs clearly: بَدْرُس / بَتْعَلَّم, بَنْجَح / بَرْسُب, and practice with simple personalisation questions.",
        ],
        dialogueSteps: [
            "Use the dialogue as a script for real life: pause after each part and ask if it matches the student’s life or not.",
            "Let the student retell the dialogue in the first person: instead of Roba / Mark / Yara, they talk about themselves using the same structures.",
            "Encourage improvisation: change the field of study, type of job, number of subjects, but keep the grammatical frame.",
        ],
        practiceTips: [
            "Focus error correction on high-frequency chunks: «بَدْرُس»، «بَتْعَلَّم»، «عِنْدِي…»، «رَح…»، and on correct use of present vs future.",
            "When doing role-plays, allow the student to mix a bit of English if needed, but push them to keep all the key verbs and time words in Arabic.",
            "If the student has a real graduation project or job, use it as content: help them build 3–4 strong sentences they can really reuse.",
        ],
        wrapup: [
            "End the lesson by summarising the student’s work & study story in a ‘clean’ Palestinian Arabic version, so they hear a strong model of their own life.",
            "Ask the student to write 3 goals in Arabic for their study or work for the next six months using «بِدِّي» و«رَح».",
            "Remind them of the homework and suggest they imagine they are introducing themselves to a new teacher or manager in Palestine.",
        ],
        myNotes: "",
    },
};