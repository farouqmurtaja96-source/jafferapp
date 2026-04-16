# Palestinian Arabic Lab - منصة تعلم اللغة العربية الفلسطينية

## 📋 نظرة عامة

منصة تعليمية تفاعلية لتعلم اللغة العربية الفلسطينية، مصممة للطلاب والمعلمين مع نظام حجز متكامل وإدارة تقدم الطلاب.

## ✨ المميزات الرئيسية

### للطلاب
- 📚 دروس تفاعلية في ثلاثة مستويات (مبتدئ، متوسط، متقدم)
- 🎯 تمارين وممارسات متنوعة
- 📊 تتبع التقدم الشخصي
- 📅 حجز حصص دراسية
- 💬 حوارات تفاعلية

### للمعلمين
- 👨‍🏫 لوحة تحكم شاملة
- 📈 إدارة تقدم الطلاب
- 🗓️ إدارة التقويم والحجوزات
- ✏️ إنشاء وتعديل الدروس
- 📊 تقارير وإحصائيات

## 🔒 الأمان

تم تنفيذ تحسينات أمنية شاملة:

### 1. Content Security Policy (CSP)
- منع هجمات XSS
- تحكم صارم في مصادر الموارد
- السماح فقط بمصادر موثوقة

### 2. قواعد Firestore Security Rules
- التحقق من صحة البيانات على مستوى قاعدة البيانات
- صلاحيات دقيقة للقراءة والكتابة
- منع الحذف للحفاظ على سجلات التدقيق

### 3. نظام التحقق من صحة المدخلات
- التحقق من البريد الإلكتروني
- التحقق من رقم الهاتف
- التحقق من جميع البيانات المدخلة
- منع حقن البيانات الضارة

لمزيد من التفاصيل، راجع [SECURITY_CHANGES.md](SECURITY_CHANGES.md)

## 🚀 الأداء

تم تنفيذ تحسينات أداء متقدمة:

### 1. Lazy Loading
- تحميل الوحدات عند الحاجة فقط
- تحميل الدروس عند الطلب
- تحميل الصور بشكل متأخر
- نظام cache ذكي

### 2. Performance Optimization
- تحسين scroll و resize events
- Virtual scrolling للقوائم الطويلة
- Debounce و Throttle للعمليات
- Batch updates للـ DOM
- تتبع وقياس الأداء

## 🛠️ التقنيات المستخدمة

### Frontend
- HTML5
- CSS3 (مع متغيرات CSS)
- Vanilla JavaScript (ES6+)
- Firebase SDK
- Google Calendar API

### Backend
- Firebase Firestore
- Firebase Authentication
- Google Apps Script

### الأدوات
- Google Cloud Console
- Firebase Console
- GitHub Pages

## 📁 هيكل المشروع

```
/
├── index.html              # الصفحة الرئيسية
├── styles.css              # التنسيقات الرئيسية
├── js/                     # ملفات JavaScript
│   ├── core/              # الوحدات الأساسية
│   │   ├── constants.js   # الثوابت
│   │   ├── errorHandler.js # معالجة الأخطاء
│   │   ├── validation.js  # التحقق من صحة المدخلات
│   │   ├── lazyLoader.js  # التحميل المتأخر
│   │   └── performance.js # تحسين الأداء
│   ├── logic/             # المنطق الأساسي
│   │   ├── interactions.js # التفاعلات
│   │   ├── bookingManager.js # إدارة الحجوزات
│   │   ├── studentManager.js # إدارة الطلاب
│   │   └── contactManager.js # إدارة الاتصال
│   ├── cloud/             # التكامل مع السحابة
│   │   └── lessonsCloud.js # إدارة الدروس في السحابة
│   ├── lessons/           # الدروس
│   │   ├── beginner/      # المستوى المبتدئ
│   │   ├── preIntermediate/ # المستوى المتوسط
│   │   └── intermediate/  # المستوى المتقدم
│   └── data/              # البيانات
│       └── arabicLettersData.js # بيانات الحروف العربية
├── apps-script/           # Google Apps Script
│   └── booking-sync.gs    # مزامنة الحجوزات
├── firestore.rules        # قواعد أمان Firestore
└── docs/                  # الوثائق
    ├── SECURITY_CHANGES.md # التحسينات الأمنية
    └── README.md          # هذا الملف
```

## 🚀 التثبيت والتشغيل

### المتطلبات
- متصفح حديث (Chrome, Firefox, Safari, Edge)
- اتصال بالإنترنت
- حساب Google (للمعلمين)

### خطوات التشغيل

1. **استنساخ المستودع**
```bash
git clone https://github.com/farouqmurtaja96-source/Palestinian-Arabic.git
cd Palestinian-Arabic
```

2. **إعداد Firebase**
```bash
1. اذهب إلى Firebase Console
2. أنشئ مشروع جديد أو استخدم مشروع موجود
3. فعّل Authentication و Firestore
4. انسخ إعدادات Firebase
5. أضفها إلى index.html
```

3. **إعداد Google Calendar API**
```bash
1. اذهب إلى Google Cloud Console
2. أنشئ مشروع أو استخدم مشروع موجود
3. فعّل Google Calendar API
4. أنشئ OAuth 2.0 credentials
5. أضفها إلى js/config.js
```

4. **تحديث قواعد Firestore**
```bash
1. اذهب إلى Firebase Console
2. اختر مشروعك
3. اذهب إلى Firestore Database > Rules
4. انسخ محتوى firestore.rules
5. الصقه في المحرر
6. اضغط Publish
```

5. **تشغيل المشروع**
```bash
# باستخدام خادم محلي
npx serve

# أو افتح index.html مباشرة في المتصفح
```

## 📝 التوثيق

- [SECURITY_CHANGES.md](SECURITY_CHANGES.md) - التحسينات الأمنية المنفذة
- [FIREBASE_SETUP.md](FIREBASE_SETUP.md) - إعداد Firebase
- [GOOGLE_CALENDAR_SETUP.md](GOOGLE_CALENDAR_SETUP.md) - إعداد Google Calendar
- [CALENDAR_DESIGN.md](CALENDAR_DESIGN.md) - تصميم نظام التقويم

## 🤝 المساهمة

نرحب بالمساهمات! يرجى اتباع الخطوات التالية:

1. Fork المستودع
2. أنشئ branch للميزة الجديدة (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push إلى Branch (`git push origin feature/AmazingFeature`)
5. افتح Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف LICENSE للتفاصيل

## 📞 التواصل

- **المطور**: Farouq Murtaja
- **البريد الإلكتروني**: farouqmoh@hotmail.com
- **الموقع**: https://farouqmurtaja96-source.github.io/Palestinian-Arabic/

## 🙏 شكر وتقدير

- Firebase للبنية التحتية السحابية
- Google للـ Calendar API
- جميع المساهمين في المشروع

---

تم تطوير هذا المشروع بـ ❤️ لتعليم اللغة العربية الفلسطينية
