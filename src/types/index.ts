import type {
	CountryCode,
	CountryContinent,
	CountryLocale,
	CountryMeasurement,
	CountryName,
	CountryNativeName,
	CountryPhonePrefix,
	CurrencyCode,
	CurrencyName,
	CurrencySymbol,
	LanguageCode,
	LanguageName,
	LanguageNativeName,
	LanguageScript,
} from "./base"

export interface CurrencyProperties {
	code: CurrencyCode
	symbol: CurrencySymbol
	name: CurrencyName
}

export interface LanguageProperties {
	code: LanguageCode
	name: LanguageName
	native: LanguageNativeName
	scripts: LanguageScript[]
}

export interface LocatorProperties {
	code: CountryCode
	name: CountryName
	prefix: CountryPhonePrefix
	continent: CountryContinent
	native: CountryNativeName
	measurement: CountryMeasurement
	currency: CurrencyProperties
	locales: CountryLocale[]
}
