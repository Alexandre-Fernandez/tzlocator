import languages from "../../json/languages.json"
import type {
	LanguageCode,
	LanguageName,
	LanguageNativeName,
	LanguageScript,
} from "../types/base"
import type { LiteralUnion } from "../types/utilities"

class Language {
	code: LanguageCode

	name: LanguageName

	native: LanguageNativeName

	scripts: LanguageScript[]

	/**
	 * Returns a boolean indicating if the `languageCode` has an assigned
	 * Language.
	 */
	static exists(
		languageCode: LiteralUnion<LanguageCode>
	): languageCode is LanguageCode {
		if (languages[languageCode as LanguageCode]) return true
		return false
	}

	constructor(languageCode: LiteralUnion<LanguageCode>) {
		if (!Language.exists(languageCode)) {
			throw new Error(`${languageCode} is not a valid language.`)
		}
		this.code = languageCode
		this.name = languages[languageCode].name as LanguageName
		this.native = languages[languageCode].native as LanguageNativeName
		this.scripts = languages[languageCode].scripts as LanguageScript[]
	}
}

export default Language
