document.addEventListener('DOMContentLoaded', function() {
    const langBtns = document.querySelectorAll('.lang-btn');
    const arabicContent = document.querySelector('.arabic-content');
    const englishContent = document.querySelector('.english-content');
    const contactBtns = document.querySelectorAll('.contact-btn');
    
    function setDirectionAndStyles(dir) {
        document.documentElement.dir = dir;
        document.documentElement.lang = dir === 'rtl' ? 'ar' : 'en';
        
        // إضافة أنماط RTL/LTR المحددة
        if(dir === 'ltr') {
            document.body.style.fontFamily = "'Roboto', sans-serif";
        } else {
            document.body.style.fontFamily = "'Tajawal', 'Roboto', sans-serif";
        }
    }
    
    function switchLanguage(lang) {
        if(lang === 'ar') {
            arabicContent.classList.remove('hidden');
            englishContent.classList.add('hidden');
            setDirectionAndStyles('rtl');
        } else {
            arabicContent.classList.add('hidden');
            englishContent.classList.remove('hidden');
            setDirectionAndStyles('ltr');
        }
        
        // تحديث الزر النشط
        langBtns.forEach(btn => {
            if(btn.dataset.lang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // حفظ التفضيل في localStorage
        localStorage.setItem('preferredLang', lang);
    }

    // إضافة معالجات الأحداث لأزرار اللغة
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            switchLanguage(lang);
        });
    });

    // تحميل اللغة المحفوظة عند بدء التشغيل
    const savedLang = localStorage.getItem('preferredLang') || 'ar';
    switchLanguage(savedLang);
    
    // معالجة أزرار الاتصال
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const plan = this.getAttribute('data-plan');
            const email = 'arabswordforads@gmail.com';
            const subject = `طلب اشتراك في ${plan}`;
            const body = `أرغب في الاشتراك في ${plan}، الرجاء التواصل معي.`;
            window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        });
    });
});
