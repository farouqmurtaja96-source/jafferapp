# إعداد تقويم جوجل

## المشاكل التي تم حلها:

### 1. ❌ عندما يحجز الطالب حصة، لا تظهر في تقويم جوجل
### 2. ❌ عندما يكون وقت مشغول في تقويم جوجل، لا يظهر كمحجوز عند الطالب
### 3. ✅ عندما يتم حجز من صفحة الأساتذة، يظهر بشكل صحيح في كل مكان

## الحلول التي تم تطبيقها:

### 1. تحديث دالة createGoogleCalendarEvent:
- البحث عن المدرس الأساسي إذا لم يكن المستخدم الحالي مدرساً
- استخدام accessToken و refreshToken من مستند المدرس
- إضافة logging شامل للتحقق من التوكنات

### 2. تحديث دالة getGoogleCalendarEvents:
- البحث عن المدرس الأساسي إذا لم يكن المستخدم الحالي مدرساً
- استخدام accessToken و refreshToken من مستند المدرس
- إضافة logging شامل للتحقق من التوكنات

### 3. تحديث دالة connectToGoogleCalendar:
- حفظ accessToken و refreshToken في Firestore
- إضافة logging شامل للتحقق من التوكنات

### 4. تحديث دالة deleteGoogleCalendarEvent:
- البحث عن المدرس الأساسي إذا لم يكن المستخدم الحالي مدرساً
- استخدام accessToken و refreshToken من مستند المدرس
- إضافة logging شامل للتحقق من التوكنات

## خطوات الاختبار:

### 1. **إعادة ربط تقويم جوجل:**
1. سجل دخول كمدرس
2. اذهب إلى Teacher Dashboard
3. افصل تقويم جوجل (Disconnect)
4. أعد ربط تقويم جوجل (Connect)
5. اتبع خطوات الربط

### 2. **اختبار الحجز كضيف:**
1. سجل خروج من حساب المدرس
2. اذهب إلى صفحة الحجز
3. اختر تاريخ ووقت
4. املأ النموذج
5. اضغط "احجز الآن"
6. يجب أن:
   - ✅ ينجح الحجز
   - ✅ يظهر الحدث في تقويم جوجل

### 3. **اختبار تقويم جوجل:**
1. افتح تقويم جوجل
2. أضف حدث في وقت معين
3. سجل خروج
4. اذهب إلى صفحة الحجز
5. هذا الوقت يجب أن:
   - ❌ لا يظهر كمتاح
   - ✅ يظهر كمحجوز

### 4. **اختبار الحجز من صفحة الأساتذة:**
1. سجل دخول كمدرس
2. اذهب إلى Teacher Dashboard
3. اختر تاريخ ووقت
4. اضغط "احجز"
5. يجب أن:
   - ✅ ينجح الحجز
   - ✅ يظهر الحدث في تقويم جوجل
   - ✅ يظهر كمحجوز عند الطالب

## ملاحظات مهمة:

1. **تأكد من إعادة ربط تقويم جوجل** بعد التحديثات
2. **تأكد من أن accessToken و refreshToken محفوظة** في Firestore
3. **تأكد من أن تقويم جوجل متصل** في لوحة تحكم المدرس
4. **راقب Console** للتحقق من الأخطاء

## ما يجب أن تراه في Console:

✅ صحيح:
```
Connecting to Google Calendar...
gapiInited: true gisInited: true
Access token: Found
Refresh token: Found
Google Calendar connected successfully
Creating Google Calendar event...
Using access token for teacher: ...
Access token: Found
Refresh token: Found
Google Calendar event created: ...
Booking created successfully with ID: ...
Booked! You will receive a confirmation email.
```

❌ خطأ:
```
Google Calendar not connected for teacher
Access token: Not found
Refresh token: Not found
Error creating Google Calendar event: ...
```

## إذا استمرت المشاكل:

1. **أعد ربط تقويم جوجل**
2. **تحقق من وجود accessToken و refreshToken** في Firestore
3. **راقب Console** للتحقق من الأخطاء
4. **أخبرني بالرسائل التي تظهر في Console**
