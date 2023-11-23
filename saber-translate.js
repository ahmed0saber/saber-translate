class SaberTranslate {
    constructor(translations = {}, languages = ["en"]) {
        this.translations = translations
        this.languages = languages
    }

    setLanguage(lang = this.languages[0]) {
        const translatableItems = document.querySelectorAll("[data-translate]")
        translatableItems.forEach(item => item.textContent = this.getTranslation(item.dataset.translate, lang))

        const rootElement = document.getElementsByTagName('html')[0]
        this.languages.forEach(language => rootElement.classList.remove(language))
        rootElement.classList.add(lang)
        rootElement.setAttribute("lang", lang)
    }

    getTranslation(template = "", lang) {
        const path = template.trim()
        if (path === "") {
            return template
        }

        const pathAsArray = path.split(".")
        let currentTranslation = this.translations
        for (let i = 0; i < pathAsArray.length; i++) {
            if (currentTranslation[pathAsArray[i]]) currentTranslation = currentTranslation[pathAsArray[i]]
            else return template
        }

        return currentTranslation[lang] === undefined ? template : currentTranslation[lang]
    }
}
