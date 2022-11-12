const languages = [{code: 'en', lang: 'English'}, {code: 'pt', lang: 'Portuguese'}, {code: 'ar', lang: 'Arabic'},
{code: 'bg', lang: 'Bulgarian'}, {code: 'ca', lang: 'Catalan'}, {code: 'zh', lang: 'Chinese'}, {code: 'da', lang: 'Danish'}, 
{code: 'fr', lang: 'French'}, {code: 'de', lang: 'German'}, {code: 'el', lang: 'Greek'}, {code: 'gn', lang: 'Guarani'}, 
{code: 'hi', lang: 'Hindi'}, {code: 'it', lang: 'Italian'}, {code: 'ja', lang: 'Japanese'}, {code: 'ko', lang: 'Korean'},
{code: 'no', lang: 'Norwegian'}, {code: 'ru', lang: 'Russian'}, {code: 'es', lang: 'Spanish'}, {code: 'sv', lang: 'Swedish'}, 
{code: 'af', lang: 'Afrikaans'}]

const getLang = (code: string) => {
    const lang = languages.find(obj => obj.code === code)
    return lang?.lang
}

export default getLang 