class SaberTranslate {
    constructor(translations, languages) {
        this.isValid = true

        if (!SaberTranslate.isObject(translations)) {
            console.error(`The first parameter must be an object, ${JSON.stringify(translations)} is not accepted. (new SaberTranslate())`)
            this.isValid = false
            return
        }

        if (!SaberTranslate.isArray(languages)) {
            console.error(`The second parameter must be an array, ${JSON.stringify(languages)} is not accepted. (new SaberTranslate())`)
            this.isValid = false
            return
        }

        if (languages.length === 0) {
            console.error(`The second parameter can't be an empty array, ${JSON.stringify(languages)} is not accepted. (new SaberTranslate())`)
            this.isValid = false
            return
        }

        for (let i = 0; i < languages.length; i++) {
            if (!SaberTranslate.isString(languages[i])) {
                console.error(`The second parameter must be an array that only contains elements as string data, ${JSON.stringify(languages[i])} is not accepted. (new SaberTranslate())`)
                this.isValid = false
                return
            }
        }

        this.translations = translations
        this.languages = languages
        this.currentLanguage = null

        this.setLanguage(languages[0])
    }

    static isArray(value) {
        return Object.prototype.toString.call(value) === '[object Array]';
    }

    static isObject(value) {
        return typeof value === 'object' && value !== null && !Array.isArray(value);
    }

    static isString(value) {
        return typeof value === "string"
    }

    setLanguage(lang) {
        if (!this.isValid) {
            console.error(`Make sure you are using "new SaberTranslate()" in a valid way. (setLanguage())`)
            return
        }

        if (!SaberTranslate.isString(lang)) {
            console.error(`The first parameter must be a string, ${JSON.stringify(lang)} is not accepted. (setLanguage())`)
            return
        }

        if (!this.languages.includes(lang)) {
            console.error(`The desired language doesn't exist in the languages given, ${JSON.stringify(lang)} is not accepted. (setLanguage())`)
            return
        }

        this.currentLanguage = lang

        const translatableItems = document.querySelectorAll("[data-translate]")
        translatableItems.forEach(item => item.textContent = this.getTranslation(item.dataset.translate))

        const rootElement = document.getElementsByTagName('html')[0]
        this.languages.forEach(language => rootElement.classList.remove(language))
        rootElement.classList.add(lang)
        rootElement.setAttribute("lang", lang)
    }

    getTranslation(template) {
        if (!this.isValid) {
            console.error(`Make sure you are using "new SaberTranslate()" in a valid way. (getTranslation())`)
            return
        }

        if (!SaberTranslate.isString(template)) {
            console.error(`The first parameter must be a string, ${JSON.stringify(template)} is not accepted. (getTranslation())`)
            return
        }

        const path = template.trim()
        if (path === "") {
            console.warn(`The desired translation ${JSON.stringify(template)} can't be empty or just spaces. (getTranslation())`)
            return template
        }

        const pathAsArray = path.split(".")
        let currentTranslation = this.translations
        for (let i = 0; i < pathAsArray.length; i++) {
            if (currentTranslation[pathAsArray[i]]) {
                currentTranslation = currentTranslation[pathAsArray[i]]
            } else {
                console.warn(`The desired translation ${JSON.stringify(template)} is not found. (getTranslation())`)
                return template
            }
        }

        if (currentTranslation[this.currentLanguage]) {
            return currentTranslation[this.currentLanguage]
        }

        console.warn(`The desired translation ${JSON.stringify(template)} is found but doesn't exist for the desired language ${JSON.stringify(this.currentLanguage)}. (getTranslation())`)
        return template
    }
}
