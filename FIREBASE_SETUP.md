# إعداد Firebase Security Rules

## خطوات تحديث قواعد Firestore:

1. اذهب إلى Firebase Console: https://console.firebase.google.com/
2. اختر مشروعك
3. من القائمة الجانبية، اذهب إلى: **Firestore Database** > **Rules**
4. انسخ محتوى ملف `firestore.rules`
5. الصقه في محرر القواعد
6. اضغط **Publish**

## قواعد الأمان المحدثة:

القواعد الجديدة تسمح بـ:
- ✅ القراءة للجميع (بما في ذلك الضيوف)
- ✅ الكتابة للمستخدمين المسجلين فقط

هذا يسمح بـ:
- عرض أوقات الحجز للجميع
- حجز الحصص للضيوف والمستخدمين المسجلين
- تحديث إعدادات الحجز للمستخدمين المسجلين
- ربط تقويم جوجل للمستخدمين المسجلين

## ملاحظات مهمة:

1. **تأكد من تحديث القواعد** بعد أي تعديل
2. **تأكد من تفعيل Authentication** في Firebase Console
3. **تأكد من وجود حساب مدرس** في Authentication
4. **تأكد من وجود مستند المدرس** في Firestore

## حل المشاكل الشائعة:

### مشكلة "Missing or insufficient permissions":
- تأكد من تحديث قواعد Firestore
- تأكد من تفعيل Authentication
- تأكد من تسجيل الدخول

### مشكلة "Google Calendar not connected":
- سجل الدخول كمدرس
- اذهب إلى Teacher Dashboard
- اضغط "Connect Google Calendar"
- اتبع خطوات الربط

### مشكلة أوقات الحجز مختلفة:
- تأكد من تحديث إعدادات الحجز في Teacher Dashboard
- تأكد من حفظ الإعدادات في Firebase
- حدّث صفحة الحجز
