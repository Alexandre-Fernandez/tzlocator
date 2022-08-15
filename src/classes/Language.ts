import languages from "../../json/languages.json"
import type {
	LanguageCode,
	LanguageName,
	LanguageNativeName,
	LanguageScript,
} from "../types/base"

export interface LanguageProperties {
	code: LanguageCode
	name: LanguageName
	native: LanguageNativeName
	scripts: LanguageScript[]
}
class Language implements LanguageProperties {
	code: LanguageCode
	name: LanguageName
	native: LanguageNativeName
	scripts: LanguageScript[]

	constructor(languageCode: LanguageCode) {
		if (!languages[languageCode]) {
			throw new Error(`${languageCode} is not a valid language.`)
		}
		this.code = languageCode
		this.name = languages[languageCode].name as LanguageName
		this.native = languages[languageCode].native as LanguageNativeName
		this.scripts = languages[languageCode].scripts as LanguageScript[]
	}
}

export default Language
