const getTranslationPath = (template) => {
    let currentTemplate = template.trim()
    if (!currentTemplate.startsWith("{") || !currentTemplate.endsWith("}")) {
        return undefined
    }

    currentTemplate = currentTemplate.slice(1, -1)
    currentTemplate = currentTemplate.trim()

    return currentTemplate
}

const getTranslatedContent = (template = "", lang) => {
    const path = getTranslationPath(template)
    if (path === undefined) {
        return template
    }

    const pathAsArray = path.split(".")
    let currentTranslation = translations
    for (let i = 0; i < pathAsArray.length; i++) {
        if (currentTranslation[pathAsArray[i]]) currentTranslation = currentTranslation[pathAsArray[i]]
        else return template
    }

    return currentTranslation[lang] === undefined ? template : currentTranslation[lang]
}

const saberTranslate = (lang) => {
    const translatableItems = document.querySelectorAll(".saber-translate-item")
    translatableItems.forEach(item => item.textContent = getTranslatedContent(item.dataset.translation, lang))

    const rootElement = document.getElementsByTagName('html')[0]
    languages.forEach(language => rootElement.classList.remove(language))
    rootElement.classList.add(lang)
}