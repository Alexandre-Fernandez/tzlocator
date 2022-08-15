import countries from "../../json/countries.json"
import type {
	CountryCode,
	CountryContinent,
	CountryLocale,
	CountryMeasurement,
	CountryName,
	CountryNativeName,
	CountryPhonePrefix,
	CurrencyCode,
	LanguageCode,
} from "../types/base"
import Currency from "./Currency"
import Language from "./Language"

export interface LocatorProperties {
	code: CountryCode
	name: CountryName
	prefix: CountryPhonePrefix
	continent: CountryContinent
	native: CountryNativeName
	measurement: CountryMeasurement
	currency: Currency
	locales: CountryLocale[]
}
class Locator implements LocatorProperties {
	code: CountryCode
	name: CountryName
	prefix: CountryPhonePrefix
	continent: CountryContinent
	native: CountryNativeName
	measurement: CountryMeasurement
	currency: Currency
	locales: CountryLocale[]

	constructor(countryCode: CountryCode) {
		if (!countries[countryCode]) {
			throw new Error(`${countryCode} is not a valid country.`)
		}
		this.code = countryCode
		this.name = countries[countryCode].name as CountryName
		this.prefix = countries[countryCode].prefix as CountryPhonePrefix
		this.continent = countries[countryCode].continent as CountryContinent
		this.native = countries[countryCode].native as CountryNativeName
		this.measurement = countries[countryCode]
			.measurement as CountryMeasurement
		this.locales = countries[countryCode].locales as CountryLocale[]
		this.currency = new Currency(
			countries[countryCode].currency as CurrencyCode
		)
	}

	getLanguages() {
		return this.locales.reduce((prev, locale) => {
			const i = locale.indexOf("-")
			if (i > -1) {
				prev.push(new Language(locale.substring(0, i) as LanguageCode))
			}
			return prev
		}, [] as Language[])
	}
}

/*
export interface LocatorProperties {
	code: CountryCode
	name: CountryName
	prefix: CountryPhonePrefix
	continent: CountryContinent
	native: CountryNativeName
	measurement: CountryMeasurement
	currency: Currency
	locales: CountryLocale[]
}
*/

export default Locator
