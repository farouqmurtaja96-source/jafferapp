// Auto-generated from original app.js
import { LESSON_ID_SHOPPING } from '../../core/constants.js';

export const lessonId = LESSON_ID_SHOPPING;
export const lesson = {
    meta: {
        level: "Pre-Intermediate",
        unit: "Shopping & Prices",
        lessonTitle: "Unit 8 – Shopping, Markets & Prices",
    },

    overview: {
        title: "Unit 8 – Shopping & Prices",
        description:
            "In this unit, students learn how to shop, ask about prices, bargain, and pay in Palestinian Arabic. The focus is on useful chunks like asking how much, saying it’s expensive or cheap, counting items, and dealing with markets, small shops, and online buying.",
        goals: [
            "Ask and answer about prices clearly and naturally.",
            "Use numbers, currency, and quantity words in real shopping situations.",
            "Express opinion about price: expensive, cheap, fair, too much.",
            "Practice bargaining with polite and effective phrases.",
            "Describe what they want to buy and how many, and handle payment.",
        ],
    },

    // ====================================
    // VOCABULARY
    // ====================================
    vocabulary: {
        core: [
            // ===== PLACES =====
            {
                id: "dukkan",
                ar: "دُكّان",
                en: "corner shop / mini-market",
                enArabeezy: "dukkān / dukkan",
                hint:
                    "Small neighbourhood shop for basic groceries and stuff.",
                exampleAr: "رُحْت عَالدُّكّان أَشْتِري خُبِز وَحْلِيب.",
                exampleArabeezy: "r7t 3aldkan ashtry khbz w7lyb.",
                exampleEn: "I went to the corner shop to buy bread and milk.",
            },
            {
                id: "ma7al",
                ar: "مَحَلّ",
                en: "shop / store",
                enArabeezy: "ma7all / maḥall",
                hint:
                    "General word for any shop. Plural: مَحَلّات.",
                exampleAr: "هَادَا أَحْسَن مَحَلّ أَوَاعِي بِالحَارَة.",
                exampleArabeezy: "hada a7sn m7l awa3y bel7ara.",
                exampleEn: "This is the best clothes shop in the neighbourhood.",
            },
            {
                id: "souk",
                ar: "سُوق",
                en: "market",
                enArabeezy: "sūʾ / souq",
                hint:
                    "Traditional market or big shopping street with many small shops.",
                exampleAr: "بِنِنْزِل عَالسُّوق يَوْم الجُمعة.",
                exampleArabeezy: "bnnzl 3alswq ywm eljm3a.",
                exampleEn: "We go down to the market on Friday.",
            },
            {
                id: "supermarket",
                ar: "سوبِرماركِت",
                en: "supermarket",
                enArabeezy: "supermarket",
                hint:
                    "Big self-service grocery shop.",
                exampleAr: "بنشتري الأغراض الكبيرة من السوبرماركت.",
                exampleArabeezy: "bnshtry elaghrad elkbyra mn elswbrmarkt.",
                exampleEn: "We buy the big supplies from the supermarket.",
            },

            // ===== MONEY & PRICE =====
            {
                id: "masari",
                ar: "مَصاري",
                en: "money (cash)",
                enArabeezy: "maṣāri / masari",
                hint:
                    "Very common Palestinian word for money in general.",
                exampleAr: "مَعِي مَصاري شْوَيّ بَس.",
                exampleArabeezy: "m3y msary shwy bs.",
                exampleEn: "I only have a little money.",
            },
            {
                id: "se3er",
                ar: "سِعِر",
                en: "price",
                enArabeezy: "siʿer / se3er",
                hint: "How much something costs.",
                exampleAr: "شُو السِّعِر هُون؟",
                exampleArabeezy: "shw els3r hwn?",
                exampleEn: "What’s the price here?",
            },
            {
                id: "addeish_hada",
                ar: "قَدِّيش هَادَا؟",
                en: "How much is this?",
                enArabeezy: "addeish hāda? / 2addeish hada?",
                hint:
                    "Most common way to ask the price of something you’re holding/pointing at.",
                exampleAr: "قَدِّيش هَادَا، لَو سَمَحِت؟",
                exampleArabeezy: "qdysh hada, lw sm7t?",
                exampleEn: "How much is this, please?",
            },
            {
                id: "ghali",
                ar: "غالي",
                en: "expensive",
                enArabeezy: "ghāli / ghali",
                hint:
                    "Masc: غالي, fem: غاليِة. Opposite of رخيص.",
                exampleAr: "صَرَاحَةً هَادَا غالي شْوَيّ.",
                exampleArabeezy: "sra7a hada ghaly shwy.",
                exampleEn: "Honestly, this is a bit expensive.",
            },
            {
                id: "rakhis",
                ar: "رخيص",
                en: "cheap / inexpensive",
                enArabeezy: "rakhiṣ / rakhis",
                hint:
                    "Masc: رخيص, fem: رخيصَة. Can be positive (good price) or negative (bad quality).",
                exampleAr: "السِّعِر رخيص بَس الجَوْدَة عادية.",
                exampleArabeezy: "els3r rkhys bs eljwda 3adya.",
                exampleEn: "The price is cheap but the quality is average.",
            },
            {
                id: "tanzeel",
                ar: "تَنْزيلات",
                en: "sale / discounts",
                enArabeezy: "tanzīlāt / tanzeelat",
                hint:
                    "Also خَصْم = discount. Shops write: تَنْزيلات كْبيرَة.",
                exampleAr: "فِي تَنْزيلات عَلَى الأَوَاعِي هالأَيام.",
                exampleArabeezy: "fy tnzylat 3la elawa3y halayam.",
                exampleEn: "There are sales on clothes these days.",
            },
            {
                id: "khasm",
                ar: "خَصْم",
                en: "discount",
                enArabeezy: "khaṣm / khasm",
                hint: "Money taken off the original price.",
                exampleAr: "فِيه خَصْم لِلطُلّاب؟",
                exampleArabeezy: "fyh khsm leltlab?",
                exampleEn: "Is there a student discount?",
            },

            // ===== PAYMENT =====
            {
                id: "kash",
                ar: "كاش",
                en: "cash",
                enArabeezy: "cash",
                hint:
                    "Pay with physical money, not card.",
                exampleAr: "بِفَضَّل أَدْفَع كاش.",
                exampleArabeezy: "bfdl adf3 kash.",
                exampleEn: "I prefer to pay in cash.",
            },
            {
                id: "card",
                ar: "كَرْت / كَرْد",
                en: "bank card",
                enArabeezy: "kart / card",
                hint:
                    "Bank card / debit or credit.",
                exampleAr: "مُمْكِن أَدْفَع بِالكَرْت؟",
                exampleArabeezy: "mmkn adf3 belkrt?",
                exampleEn: "Can I pay by card?",
            },
            {
                id: "atm",
                ar: "صَرّاف آلي",
                en: "ATM / cash machine",
                enArabeezy: "ṣarrāf ʾāli / sarraf āli",
                hint:
                    "Machine to withdraw money from your card.",
                exampleAr: "فِيه صَرّاف آلي قُدّام المَحَلّ.",
                exampleArabeezy: "fyh sraf aaly qdam elm7l.",
                exampleEn: "There is an ATM in front of the shop.",
            },
            {
                id: "wasl",
                ar: "وَصْل / بَوْن",
                en: "receipt",
                enArabeezy: "waṣl / bawn",
                hint:
                    "Paper you get after paying. Useful if you want to return something.",
                exampleAr: "خُد الوَصْل، يُمْكِن تْحْتَاجه بَعْدين.",
                exampleArabeezy: "khd elwsl, ymkn t7tajh b3dyn.",
                exampleEn: "Take the receipt, you might need it later.",
            },
            {
                id: "fatora_shop",
                ar: "فاتورَة",
                en: "invoice / bill",
                enArabeezy: "fātūra / fatora",
                hint:
                    "More official than وَصْل, especially for big purchases or deliveries.",
                exampleAr: "طَلَبْنَا فاتورَة رَسْمِيّة مِن الشِّرْكَة.",
                exampleArabeezy: "tlbna fatwra rsmya mn elshrka.",
                exampleEn: "We asked for an official invoice from the company.",
            },

            // ===== ITEM DETAILS =====
            {
                id: "no3",
                ar: "نَوْع",
                en: "type / kind",
                enArabeezy: "nawʿ / no3",
                hint:
                    "What kind: نوع القَمِيص، نوع القَهْوِة، نوع القِماش.",
                exampleAr: "شُو نَوْع القِماش هَادَا؟",
                exampleArabeezy: "shw nw3 elqmash hada?",
                exampleEn: "What type of fabric is this?",
            },
            {
                id: "lawn",
                ar: "لَوْن",
                en: "color",
                enArabeezy: "lawn",
                hint:
                    "Plural: أَلْوان. Very common in clothes & shoes shopping.",
                exampleAr: "عِنْدو أَلْوان تَانِيَة مِن نَفْس الموديل.",
                exampleArabeezy: "3ndw alwan tanya mn nfs elmwdyl.",
                exampleEn: "They have other colors of the same model.",
            },
            {
                id: "7ajm",
                ar: "حَجِم / مَقاس",
                en: "size",
                enArabeezy: "7ajm / maqās",
                hint:
                    "حَجِم for general size, مَقاس for clothes & shoes.",
                exampleAr: "مَقاس الجزمة كْبِير عَلَيّ شْوَيّ.",
                exampleArabeezy: "mqas eljzma kbyr 3ly shwy.",
                exampleEn: "The shoe size is a bit big on me.",
            },
            {
                id: "kilo",
                ar: "كِيلو",
                en: "kilo (kilogram)",
                enArabeezy: "kilo",
                hint:
                    "Used in markets for fruits, vegetables, etc.",
                exampleAr: "بَدّي نُصّ كِيلو بندورة.",
                exampleArabeezy: "bdy ns kylw bndwra.",
                exampleEn: "I want half a kilo of tomatoes.",
            },
            {
                id: "era",
                ar: "قِطْعَة",
                en: "piece / item",
                enArabeezy: "ʾiṭʿa / 2eṭ3a",
                hint:
                    "One piece of something: clothes, cake, cheese…",
                exampleAr: "بَدّي قِطْعَة كْمان مِن هَادَا النَّوْع.",
                exampleArabeezy: "bdy qt3a kman mn hada elnw3.",
                exampleEn: "I want one more piece of this type.",
            },

            // ===== VERBS & USEFUL CHUNKS =====
            {
                id: "bashtiri",
                ar: "بَشْتِري",
                en: "I buy",
                enArabeezy: "bashtiri",
                hint:
                    "From اِشْتَرَى = to buy. Very frequent in shopping talk.",
                exampleAr: "كْلّ مَرَّة بَطْلَع عَالسُّوق بَشْتِري اشياء زْيادَة.",
                exampleArabeezy: "kl mra btl3 3alswq bshtry ashya zyada.",
                exampleEn: "Every time I go to the market I buy extra things.",
            },

            {
                id: "baddi_ashtiri",
                ar: "بَدّي أِشْتِري...",
                en: "I want to buy...",
                enArabeezy: "baddi ashtiri...",
                hint:
                    "Good opener with the seller: بَدّي أِشْتِري بنْطَلُون / هَدِيّة...",
                exampleAr: "بَدّي أِشْتِري هَدِيّة لِصْحِبْتي.",
                exampleArabeezy: "bdy ashtry hdya ls7bty.",
                exampleEn: "I want to buy a gift for my friend.",
            },
            {
                id: "ana_bas_batfarraj",
                ar: "أَنا بَس بَتْفَرَّج",
                en: "I’m just looking",
                enArabeezy: "ana bas batfarraj",
                hint:
                    "Polite way to tell the seller you’re not ready to buy yet.",
                exampleAr: "مِش مُجْبَرَة تِشْتِري، حَتّى لَو حَكِيتِيلُه: أَنا بَس بَتْفَرَّج.",
                exampleArabeezy: "msh mjbra tshtry, 7ta lw 7kytylh: ana bs btfrj.",
                exampleEn: "You’re not obliged to buy, even if you tell him: I’m just looking.",
            },
            {
                id: "3indak_ishi_tani",
                ar: "عِنْدَك إِشِي تَانِي؟",
                en: "Do you have something else?",
                enArabeezy: "ʿindak ishi tāni? / 3indak ishi tani?",
                hint:
                    "Useful to ask for another model / color / size.",
                exampleAr: "عِنْدَك إِشِي تَانِي نَفْس المَقاس بَس لَوْن تَانِي؟",
                exampleArabeezy: "3ndk ishy tany nfs elmqas bs lwn tany?",
                exampleEn: "Do you have something else in the same size but a different color?",
            },
            {
                id: "mumkin_tnazzel_shway",
                ar: "مُمْكِن تْنَزِّل شْوَيّ؟",
                en: "Can you make it a bit cheaper?",
                enArabeezy: "mumkin tnazzel shway?",
                hint:
                    "Common bargaining phrase in markets and some shops.",
                exampleAr: "السِّعِر عالي، مُمْكِن تْنَزِّل شْوَيّ؟",
                exampleArabeezy: "els3r 3aly, mmkn tnzl shwy?",
                exampleEn: "The price is high, can you lower it a bit?",
            },
            {
                id: "akher_se3er",
                ar: "آخِر سِعِر؟",
                en: "What’s your final price?",
                enArabeezy: "ā5er se3er? / akher se3er?",
                hint:
                    "Used in bargaining when you want the lowest price.",
                exampleAr: "يَعْنِي هَادَا آخِر سِعِر وَلّا فِيه نْقَاص كْمَان؟",
                exampleArabeezy: "y3ny hada aakhr s3r wla fyh nqas kman?",
                exampleEn: "So is this your final price or can you go lower?",
            },
        ],

        extra: [
            {
                id: "mizaniyyeh",
                ar: "مِيزانِيّة",
                en: "budget",
                enArabeezy: "mīzāniyyeh / mizaniyyeh",
                hint:
                    "Money you plan to spend.",
                exampleAr: "مِيزانِيّتي لِلشوبينغ هالشَّهِر مَحْدودَة.",
                exampleArabeezy: "myzanyty lelshwbyngh halshhr m7dwda.",
                exampleEn: "My shopping budget this month is limited.",
            },
            {
                id: "safqa",
                ar: "صَفْقَة / لُقْطَة",
                en: "good deal / bargain",
                enArabeezy: "ṣafʾa / loʾta / lo2ta",
                hint:
                    "لُقْطَة = really good catch / bargain.",
                exampleAr: "هَادِي لُقْطَة، السِّعِر كْتِير مْناسِب.",
                exampleArabeezy: "hady lqta, els3r ktyr mnasb.",
                exampleEn: "This is a steal, the price is very good.",
            },
            {
                id: "istibdal",
                ar: "اِسْتِبْدال",
                en: "exchange (change an item)",
                enArabeezy: "istibdāl / istibdal",
                hint:
                    "Changing item for another one. Often with وَصْل.",
                exampleAr: "بقدر أبدّلها بنفس السعر بس بمقاس غير؟",
                exampleArabeezy: "bqdr abdlha bnfs els3r bs bmqas ghyr?",
                exampleEn: "Can I exchange it for the same price but a different size?",
            },
            {
                id: "istirja3",
                ar: "اِسْتِرْجاع",
                en: "return (give back item)",
                enArabeezy: "istirjāʿ / istirja3",
                hint:
                    "Taking item back to the shop and getting money back.",
                exampleAr: "السِّياسَة عِنْدْهُم مَا فِيه اِسْتِرْجاع، بَس اِسْتِبْدال.",
                exampleArabeezy: "elsyasa 3ndhm ma fyh astrja3, bs astbdal.",
                exampleEn: "Their policy has no returns, only exchanges.",
            },
            {
                id: "3ard_khas",
                ar: "عَرْض خَاصّ",
                en: "special offer",
                enArabeezy: "ʿarḍ khāṣṣ / 3ard khaṣ",
                hint:
                    "Temporary promotion: 2 for 1, or cheaper price.",
                exampleAr: "فِي عَرْض خَاصّ عَلَى الشَّمْبُو الْيَوْم.",
                exampleArabeezy: "fy 3rd khas 3la elshmbw elywm.",
                exampleEn: "There is a special offer on shampoo today.",
            },
            {
                id: "khidmet_zaba2en",
                ar: "خِدْمِة زَبائِن",
                en: "customer service",
                enArabeezy: "khidmet zabāʾen / khidmet zaba2en",
                hint:
                    "Where you complain or ask for help with a purchase.",
                exampleAr: "خِدْمِة الزَّبائِن فِي هالمَحَلّ مُمْتازَة.",
                exampleArabeezy: "khdma elzbayn fy halm7l mmtaza.",
                exampleEn: "Customer service in this shop is excellent.",
            },
        ],
    }
    ,

    // ====================================
    // DIALOGUE
    // ====================================
    dialogue: {
        lines: [
            {
                "speaker": "Nader",
                "ar": "مَسّا الخير يا يوسف، شُو أخْبارَك؟",
                "arArabeezy": "msa elkhyr ya ywsf, shw akhbark?",
                "en": "Good evening, Yousef, how are you?"
            },
            {
                "speaker": "Yousef",
                "ar": "مَسّا النّور، تَمام. اليوم عندي وَقْت أشتري اشِي لِلحَفْلَة.",
                "arArabeezy": "msa elnwr, tmam. elywm 3ndy wqt ashtry ashy lel7fla.",
                "en": "Good evening, I’m fine. Today I have time to buy something for the party."
            },
            {
                "speaker": "Nader",
                "ar": "طَيّب، مُمْكِن نروح عَالدُّكّان القَريب، سَامِع إنّو في تنزيلات هالأُسْبوع.",
                "arArabeezy": "tyb, mmkn nrw7 3aldkan elqryb, sam3 inw fy tnzylat halasbw3.",
                "en": "Okay, we can go to the nearby shop; I heard there are discounts this week."
            },
            {
                "speaker": "Yousef",
                "ar": "مُمْتاز، يِلّا نِروح.",
                "arArabeezy": "mmtaz, yla nrw7.",
                "en": "Great, let’s go."
            },
            {
                "speaker": "Yousef",
                "ar": "سَلام عَليكم، قَدّيش سِعِر هاد القَمِيص؟",
                "arArabeezy": "slam 3lykm, qdysh s3r had elqmys?",
                "en": "Peace be upon you, how much is this shirt?"
            },
            {
                "speaker": "Shopkeeper",
                "ar": "هَادَا بِخَمْسُمِيّة شِيكِل.",
                "arArabeezy": "hada bkhmsmya shykl.",
                "en": "This one is five hundred shekels."
            },
            {
                "speaker": "Nader",
                "ar": "غالي شْوَي. مُمْكِن تِنَزِّل السِّعِر؟",
                "arArabeezy": "ghaly shwy. mmkn tnzl els3r?",
                "en": "It’s a bit expensive. Can you lower the price?"
            },
            {
                "speaker": "Shopkeeper",
                "ar": "بقدر أعطيك خصم بسيط؛ خلّيه أربعمية وخمسين.",
                "arArabeezy": "bqdr a3tyk khsm bsyt; khlyh arb3mya wkhmsyn.",
                "en": "I can give you a small discount; let’s make it four hundred fifty."
            },
            {
                "speaker": "Nader",
                "ar": "وفي تَنزيلات تانيِة هالأُسْبوع عَالأغراض التّانْيِة؟",
                "arArabeezy": "wfy tnzylat tanya halasbw3 3alaghrad eltanya?",
                "en": "And are there other discounts this week on the other items?"
            },
            {
                "speaker": "Shopkeeper",
                "ar": "إي، في تنزيلات عَالمُعْظَم، بَس هالقَمِيص من البِضاعَة الجْديدَة.",
                "arArabeezy": "iy, fy tnzylat 3alm3zm, bs halqmys mn elbda3a eljdyda.",
                "en": "Yes, there are discounts on most things, but this shirt is from the new stock."
            },
            {
                "speaker": "Yousef",
                "ar": "تمام، طيب شوف هالقميص التاني، أرخص؟",
                "arArabeezy": "tmam, tyb shwf halqmys eltany, arkhs?",
                "en": "Okay, look at this other shirt, is it cheaper?"
            },
            {
                "speaker": "Shopkeeper",
                "ar": "إي، هَادَا أَرْخَص، سِعْرُه أَرْبَعْمِيّة شِيكِل.",
                "arArabeezy": "iy, hada arkhs, s3rh arb3mya shykl.",
                "en": "Yes, this one is cheaper, its price is four hundred shekels."
            },
            {
                "speaker": "Nader",
                "ar": "مُمْكِن نِقارن الجَوْدَة بَيْن الإِثْنَيْن؟",
                "arArabeezy": "mmkn nqarn eljwda byn elithnyn?",
                "en": "Can we compare the quality between the two?"
            },
            {
                "speaker": "Shopkeeper",
                "ar": "الأَوَّل جَوْدَتُه أَعْلَى والقماش أَغْلَى، بَس التّاني كْمان مْنيح لِلاِسْتِعْمال اليومي.",
                "arArabeezy": "elawl jwdth a3la welqmash aghla, bs eltany kman mny7 lelast3mal elywmy.",
                "en": "The first has higher quality and more expensive fabric, but the second is also good for daily use."
            },
            {
                "speaker": "Yousef",
                "ar": "أنا مِيزانِيتي مَحْدودَة، بَدّي شِي مُمْكِن أَشتِريه وما يْكَسِّرني.",
                "arArabeezy": "ana myzanyty m7dwda, bdy shy mmkn ashtryh wma yksrny.",
                "en": "My budget is limited, I want something I can buy without it breaking me."
            },
            {
                "speaker": "Shopkeeper",
                "ar": "مُمْكِن أعمل تَنزيل عَالتّاني، نِخَلّيه تْلَاتْمِيّة وَخَمْسِين إِذا بتاخُدُه هَلَّق.",
                "arArabeezy": "mmkn a3ml tnzyl 3altany, nkhlyh tlatmya wkhmsyn idha btakhdh hlq.",
                "en": "I can give a discount on the second one, we make it three hundred fifty if you take it now."
            },
            {
                "speaker": "Nader",
                "ar": "هيك أحسن. بضلّ ثلاثمية وخمسين إذا دفعنا بالبطاقة؟",
                "arArabeezy": "hyk a7sn. bdl thlathmya wkhmsyn idha df3na belbtaqa?",
                "en": "That’s better. Will it still be three hundred fifty if we pay by card?"
            },
            {
                "speaker": "Shopkeeper",
                "ar": "بِالبِطاقَة في عَلَيْها رُسُوم وبِضِيف ضَرِيبَة صْغيرَة.",
                "arArabeezy": "belbtaqa fy 3lyha rswm wbdyf dryba sghyra.",
                "en": "With card there are fees and we add a small tax."
            },
            {
                "speaker": "Yousef",
                "ar": "قَدّيش تَقْريبًا الضَّرِيبَة والرُّسُوم؟",
                "arArabeezy": "qdysh tqryba eldryba welrswm?",
                "en": "Approximately how much are the tax and fees?"
            },
            {
                "speaker": "Shopkeeper",
                "ar": "تَقْريبًا خَمِسْطَعْش شِكِل زِيادَة.",
                "arArabeezy": "tqryba khmst3sh shkl zyada.",
                "en": "Around fifteen shekels extra."
            },
            {
                "speaker": "Nader",
                "ar": "طَيّب، مُمْكِن نَدْفَع كاش وتِضَلّ تْلَاتْمِيّة وَخَمْسِين بَس؟",
                "arArabeezy": "tyb, mmkn ndf3 kash wtdl tlatmya wkhmsyn bs?",
                "en": "Okay, can we pay cash and keep it three hundred fifty only?"
            },
            {
                "speaker": "Shopkeeper",
                "ar": "إي، الكاش أَفْضَل، خَلّيه تْلَاتْمِيّة وَخَمْسِين كاش من غير زِيادَة.",
                "arArabeezy": "iy, elkash afdl, khlyh tlatmya wkhmsyn kash mn ghyr zyada.",
                "en": "Yes, cash is better, let’s keep it three hundred fifty cash with no extra."
            },
            {
                "speaker": "Yousef",
                "ar": "لَو اشْتَرَيْنا شِي تاني مَعُه، مُمْكِن تِنَزِّل كْمان شْوَي؟",
                "arArabeezy": "lw ashtryna shy tany m3h, mmkn tnzl kman shwy?",
                "en": "If we buy something else with it, can you lower the price a bit more?"
            },
            {
                "speaker": "Shopkeeper",
                "ar": "إِذا أَخَدتوا كَم قِطْعَة، بِنِقْدَر نِعْمَل تَنزيل إِضافي عَالحِساب الكُلِّي.",
                "arArabeezy": "idha akhdtwa km qt3a, bnqdr n3ml tnzyl idafy 3al7sab elkly.",
                "en": "If you take a few items, we can give an additional discount on the total."
            },
            {
                "speaker": "Nader",
                "ar": "طَيّب، هالكِرافِت كْمان حْلُوة. قَدّيش سِعْرُها؟",
                "arArabeezy": "tyb, halkraft kman 7lwa. qdysh s3rha?",
                "en": "Okay, this tie is also nice. How much is it?"
            },
            {
                "speaker": "Shopkeeper",
                "ar": "هَاد بِخَمْسين شِيكِل، بَس إِذا مَع القَمِيص، بَعْطيكُم التّنتين بِتْلَاتْمِيّة وَتْسعِين.",
                "arArabeezy": "had bkhmsyn shykl, bs idha m3 elqmys, b3tykm eltntyn btlatmya wts3yn.",
                "en": "This is fifty shekels, but if it’s with the shirt, I’ll give you both for three hundred ninety."
            },
            {
                "speaker": "Yousef",
                "ar": "تْلَاتْمِيّة وَتْسعِين مْنيحَة، بِناسِب مِيزانِيتي.",
                "arArabeezy": "tlatmya wts3yn mny7a, bnasb myzanyty.",
                "en": "Three hundred ninety is good, it suits my budget."
            },
            {
                "speaker": "Nader",
                "ar": "مْوافِقين، مْنِخُد القَمِيص وَالرِّباط.",
                "arArabeezy": "mwafqyn, mnkhd elqmys welrbat.",
                "en": "We agree, we’ll take the shirt and the tie."
            },
            {
                "speaker": "Shopkeeper",
                "ar": "بَدّكُم كيس كْبير وَلّا صْغير؟",
                "arArabeezy": "bdkm kys kbyr wla sghyr?",
                "en": "Do you want a big bag or a small one?"
            },
            {
                "speaker": "Nader",
                "ar": "كيس صْغير بِكَفّي، شُكْرًا.",
                "arArabeezy": "kys sghyr bkfy, shkra.",
                "en": "A small bag is enough, thank you."
            },
            {
                "speaker": "Shopkeeper",
                "ar": "هاي الكيس، وهاي الفاتورَة، أَهْلًا وسَهْلًا فيكُم.",
                "arArabeezy": "hay elkys, whay elfatwra, ahla wshla fykm.",
                "en": "Here is the bag, and here is the receipt, you’re most welcome."
            },
            {
                "speaker": "Yousef",
                "ar": "شُكْرًا إِلَك، الله يُعْطيك العافْيِة.",
                "arArabeezy": "shkra ilk, ellh y3tyk el3afya.",
                "en": "Thank you, may God give you health."
            },
            {
                "speaker": "Nader",
                "ar": "يلا نرجع عالبيت ونجرّب القميص؛ بحسّه رح يكون مناسب كتير للحفلة",
                "arArabeezy": "yla nrj3 3albyt wnjrb elqmys; b7sh r7 ykwn mnasb ktyr lel7fla",
                "en": "Let’s go back home and try the shirt on; I think it will be very suitable for the party."
            },
            {
                "speaker": "Yousef",
                "ar": "إي، شَكْلُه أَحْلى إِشِي شُفْناه اليوم.",
                "arArabeezy": "iy, shklh a7la ishy shfnah elywm.",
                "en": "Yes, it looks like the nicest thing we saw today."
            }
        ]
    }
    ,

    // ====================================
    // GRAMMAR
    // ====================================

    grammar: [
        {
            id: "numbers_basic",
            title: "Numbers (1–5)",
            short: "Use numbers for prices, quantity, and shopping.",
            description:
                `Numbers are used constantly in shops: price, amount, and count.
Keep the forms simple and spoken.

Use the number directly before the noun.`,
            table: {
                title: "Numbers",
                headers: ["Arabic", "Arabeezy", "English", "Usage"],
                rows: [
                    ["واحد", "waa7ed", "one", "1"],
                    ["اتنين", "itneen", "two", "2"],
                    ["تلاتة", "talaateh", "three", "3"],
                    ["أربعة", "arba3a", "four", "4"],
                    ["خمسة", "khamsa", "five", "5"]
                ]
            },
            examples: [
                { ar: "بدي واحد قهوة", arabeezy: "biddi waa7ed 2ahwe", en: "I want one coffee." },
                { ar: "عندي اتنين أولاد", arabeezy: "3indi itneen awlaad", en: "I have two kids." },
                { ar: "الكيلو بخمسة شواكل", arabeezy: "el-keelo bkhamsa shawaa2el", en: "The kilo is five shekels." },
                { ar: "تلاتة خبزات", arabeezy: "talaateh khubzaat", en: "Three breads." },
                { ar: "بدنا أربعة مي", arabeezy: "bidna arba3a may", en: "We want four waters." }
            ],
            teacherNotes:
                `Spoken forms are shorter than MSA (اتنين vs اثنان).
Keep price examples local and simple.
Use real items from the shop.
Avoid large numbers early.`,
            commonMistakes: [
                "Using formal MSA numbers",
                "Forgetting the noun after the number",
                "Mixing gender with low numbers too early"
            ],
            functionalUse: "Use this to ask for quantities and understand prices in shops."
        },
        {
            id: "ordinal_numbers",
            title: "Ordinal Numbers (الأول، التاني...)",
            short: "Use ordinals to show order or rank.",
            description:
                `Ordinals show order: first, second, third.
In spoken Arabic, we often use الأول / التاني / التالت / الرابع / الخامس.

Use them for floors, options, and order.`,
            table: {
                title: "Ordinals",
                headers: ["Arabic", "Arabeezy", "English", "Usage"],
                rows: [
                    ["الأول", "el-awwal", "first", "Order"],
                    ["التاني", "et-taani", "second", "Order"],
                    ["التالت", "et-taalet", "third", "Order"],
                    ["الرابع", "er-raabe3", "fourth", "Order"],
                    ["الخامس", "el-khaames", "fifth", "Order"]
                ]
            },
            examples: [
                { ar: "بدي الخيار الأول", arabeezy: "biddi el-khiyaar el-awwal", en: "I want the first option." },
                { ar: "الشقة بالطابق التاني", arabeezy: "esh-sha22a bit-Taabe2 et-taani", en: "The apartment is on the second floor." },
                { ar: "الطلب التالت جاهز", arabeezy: "et-Talab et-taalet jaahiz", en: "The third order is ready." },
                { ar: "خد المقاس الرابع", arabeezy: "khud el-ma2aas er-raabe3", en: "Take the fourth size." },
                { ar: "هاد خامس كتاب", arabeezy: "haad khaames kitaab", en: "This is the fifth book." }
            ],
            teacherNotes:
                `Spoken uses التاني/التالت more than MSA الثاني/الثالث.
Keep examples tied to shopping choices.
Explain floors and size options.
Avoid long ordinal lists.`,
            commonMistakes: [
                "Using MSA ordinals in speech",
                "Forgetting ال before the ordinal",
                "Mixing the ordinal with the counted noun"
            ],
            functionalUse: "Use this to choose options, describe order, and talk about floors."
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
                prompt: "Match the English word to Arabic: corner shop / mini-market",
                options: ["دُكّان", "مَحَلّ", "سُوق", "سوبِرماركِت", "مَصاري"],
                correct: "دُكّان",
            },
            {
                id: "mc_complete_2",
                type: "complete",
                prompt: "Complete the Arabic sentence for: Honestly, this is a bit expensive.\nصَرَاحَةً هَادَا ___ شْوَيّ.",
                options: ["سِعِر", "قَدِّيش هَادَا؟", "غالي", "رخيص", "تَنْزيلات"],
                correct: "غالي",
            },
            {
                id: "mc_reorder_3",
                type: "reorder",
                prompt: "Reorder the Arabic words to match: Is there a student discount?",
                options: ["فِيه", "خَصْم", "لِلطُلّاب؟"],
                correct: ["فِيه", "خَصْم", "لِلطُلّاب؟"],
            },
            {
                id: "mc_choose_4",
                type: "choose",
                prompt: "Choose the correct Arabic word for: invoice / bill",
                options: ["فاتورَة", "نَوْع", "لَوْن", "حَجِم / مَقاس", "كِيلو"],
                correct: "فاتورَة",
            },
            {
                id: "mc_match_5",
                type: "match",
                prompt: "Match the English word to Arabic: piece / item",
                options: ["قِطْعَة", "بَشْتِري", "بَدّي أِشْتِري...", "أَنا بَس بَتْفَرَّج", "عِنْدَك إِشِي تَانِي؟"],
                correct: "قِطْعَة",
            },
            {
                id: "mc_complete_6",
                type: "complete",
                prompt: "Complete the Arabic sentence for: The price is high, can you lower it a bit?\nالسِّعِر عالي، ___",
                options: ["مُمْكِن تْنَزِّل شْوَيّ؟", "آخِر سِعِر؟", "مِيزانِيّة", "صَفْقَة / لُقْطَة", "اِسْتِبْدال"],
                correct: "مُمْكِن تْنَزِّل شْوَيّ؟",
            },
            {
                id: "mc_reorder_7",
                type: "reorder",
                prompt: "Reorder the Arabic words to match: Their policy has no returns, only exchanges.",
                options: ["السِّياسَة", "عِنْدْهُم", "مَا", "فِيه", "اِسْتِرْجاع،", "بَس", "اِسْتِبْدال"],
                correct: ["السِّياسَة", "عِنْدْهُم", "مَا", "فِيه", "اِسْتِرْجاع،", "بَس", "اِسْتِبْدال"],
            },
        ],
    },

    practice: {
        quiz: [
            {
                id: "shop_q1",
                questionAr: "أَيّ تَعْبِير تَسْتَعْمِلُه لِـ ‘How much is this?’؟",
                optionsEn: ["بِكَم هَادَا؟", "بَدْفَع هَادَا", "غَالِي كْتِير"],
                correctIndex: 0,
            },
            {
                id: "shop_q2",
                questionAr: "مَعْنَى ‘غَالِي’ هُوَّ:",
                optionsEn: ["cheap", "expensive", "beautiful"],
                correctIndex: 1,
            },
            {
                id: "shop_q3",
                questionAr: "مَعْنَى ‘رَخِيص’ هُوَّ:",
                optionsEn: ["cheap", "expensive", "small"],
                correctIndex: 0,
            },
            {
                id: "shop_q4",
                questionAr: "أَيّ جُمْلَة تُسْتَعْمَل لِلْبَحْث عَنْ تَخْفِيض؟",
                optionsEn: ["مَا بِشْتَغِل", "مُمْكِن نِنَاقِص شْوَيّ؟", "بَدْفَع كَارْد"],
                correctIndex: 1,
            },
            {
                id: "shop_q5",
                questionAr: "مَعْنَى ‘كِيلُو’ هُوَّ:",
                optionsEn: ["piece", "kilogram", "meter"],
                correctIndex: 1,
            },
        ],

        rolePlays: [
            "Role-play 1: Market bargaining. Student A is the seller; Student B is the buyer. Buyer asks price, says it is too expensive, asks to reduce a bit, then pays. Use numbers for kilos or quantity.",
            "Role-play 2: Clothes shop. Buyer sees a shirt and asks price. Seller gives price; buyer requests discount politely; seller offers minor reduction. Buyer decides to buy or leave. Use polite phrases and numbers.",
            "Role-play 3: Online deal. Buyer asks for special student price. Seller gives discount. Buyer chooses payment method and says they will pay. Use chunk for online payment or cash on delivery.",
        ],
        translation: [
            { id: "shop_t1", type: "enToAr", textEn: "How much is this?", textAr: "بكم هاد؟" },
            { id: "shop_t2", type: "arToEn", textEn: "It's too expensive.", textAr: "غالي كتير." },
            { id: "shop_t3", type: "enToAr", textEn: "I want the blue one.", textAr: "بدي الأزرق." },
            { id: "shop_t4", type: "arToEn", textEn: "Do you have a smaller size?", textAr: "عندك مقاس أصغر؟" },
            { id: "shop_t5", type: "enToAr", textEn: "Can you make a discount?", textAr: "ممكن تعمل خصم؟" },
            { id: "shop_t6", type: "arToEn", textEn: "I'll take it.", textAr: "رح آخده." }
        ],
    },

    // ====================================
    // HOMEWORK
    // ====================================
    homework: {
        instructions:
            "Write and record a 60–90 second audio in Palestinian Arabic about a shopping experience. Include:\n" +
            "• What you bought and where (market, shop, online).\n" +
            "• The price and whether it was expensive or cheap.\n" +
            "• Use at least 3 numbers or measurements, and mention the currency.\n" +
            "• Include one bargaining sentence or a polite request for a discount.",
    },

    // ====================================
    // TEACHER NOTES
    // ====================================
    teacherNotes: {
        warmup: [
            "Start by asking the student what they usually buy when they go out: snacks, clothes, phone credit, etc.",
            "Show a picture of a small market stall or a shop and ask them to name items in English; then translate into Palestinian Arabic and add a price.",
        ],
        vocabularySteps: [
            "Teach key price and money words first: بِكَم؟, شِيكِل, غَالِي, رَخِيص, مُنَاسِب.",
            "Then add numbers and quantities: وَاحِد, اتْنَيْن, تَلَاتَة, كِيلُو. Practice with real items or drawings.",
            "Add verbs and chunks in small sets: بَدْفَع, بِيِعْنُوهُ, بِنَاقِص, بِيِعْطِي. Use them with a single item to reinforce.",
        ],
        dialogueSteps: [
            "Use Scene 1 and Scene 2 scripts as role-play scripts. Let the student act as seller and buyer in both sequences.",
            "Encourage imitation of polite phrases; repeat the bargaining line a few times until it feels natural.",
            "Adapt numbers and items to match the student’s real market or shop experience.",
        ],
        practiceTips: [
            "If the student seems shy to bargain, start with a very small reduction example and praise them for trying.",
            "Point out tiny wins: even reducing three shekels is a success; it builds confidence.",
            "Use short timed drills: student asks price, seller answers; switch quickly between roles.",
        ],
        wrapup: [
            "Summarize the main chunks and numbers on a small list the student can screenshot or copy.",
            "Ask the student to write 2–3 items they will buy this week with prices, even if imaginary.",
            "Remind them of homework and that the audio can be about a real or imagined shopping trip.",
        ],
        myNotes: "",
    },
};