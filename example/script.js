const languages = ["ar", "en"]
const translations = {
    main: {
        h1: {
            ar: "قم بإنشاء مواقع متعددة اللغات بسهولة.",
            en: "Create multi-language websites easily."
        },
        paragraph: {
            ar: "بواسطة saber-translate، يمكنك إضافة المحتوى لموقعك بعدة لغات مختلفة و التبديل بينهم دون الحاجة إلى إعادة تحميل الصفحة الحالية.",
            en: "with saber-translate, you can easily add content of your website in different languages and switch between them without refreshing the page."
        }
    },
    ar_btn: {
        ar: "العربية",
        en: "Arabic"
    },
    en_btn: {
        ar: "الانجليزية",
        en: "English"
    }
}

const translationHandler = new SaberTranslate(translations, languages)
translationHandler.setLanguage("ar")

const langBtns = document.querySelectorAll(".lang-btn")
langBtns.forEach(btn => {
    btn.addEventListener("click", () => translationHandler.setLanguage(btn.dataset.lang))
})
