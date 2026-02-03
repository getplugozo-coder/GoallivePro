
# دليل الربط والتشغيل النهائي - Goallive Pro

## أولاً: ربط Firebase (الجانب التقني)
1. قم بإنشاء مشروع في [Firebase Console](https://console.firebase.google.com/).
2. اضغط على علامة الويب `</>` لإنشاء App جديد.
3. انسخ "Firebase Config" وضعه في ملف `firebase.ts`.
4. **تفعيل الأدمن**: اذهب لـ Authentication -> Sign-in method وفعل "Email/Password". أضف إيميل وباسورد خاص بك.
5. **تفعيل البيانات**: اذهب لـ Firestore Database وفعلها، ثم ضع القواعد (Rules) لتسمح للأدمن فقط بالكتابة وللجميع بالقراءة.

## ثانياً: الرفع على GitHub
1. قم بإنشاء Repository جديد على حسابك في GitHub.
2. ارفع جميع ملفات المشروع.
3. اذهب لـ **Settings** داخل الـ Repository.
4. اذهب لـ **Pages**.
5. في قسم **Build and deployment**، اختر Branch: `main` والمجلد `/root` (أو كما هو افتراضي).
6. اضغط **Save**. سيظهر لك رابط الموقع بعد دقائق.

## ثالثاً: الدخول للوحة التحكم (لوضع الماتشات)
- بعد رفع الموقع، اذهب للرابط التالي:
  `https://your-username.github.io/your-repo-name/#/admin-goallive-pro/login`
- سجل دخولك بالإيميل والباسورد الذي أنشأته في Firebase.
- الآن يمكنك إضافة الماتشات، سكور المباريات، وروابط البث (Stream URL).

## رابعاً: نظام البث (Streaming)
- التطبيق يدعم روابط الـ **Iframe**. عند إضافة مباراة، ابحث عن كود الـ Embed في مواقع البث المشهورة وانسخ الرابط الموجود داخل الـ `src`.
