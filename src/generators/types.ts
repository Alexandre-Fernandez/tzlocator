import countries from "../../json/countries.json"
import currencies from "../../json/currencies.json"
import languages from "../../json/languages.json"
import timezones from "../../json/timezones.json"
import paths from "../paths"
import { generateUnionTypesFile } from "../functions/file/generation"
import { getArrayItemProperties } from "../functions/parsing"

const countryEntries = Object.entries(countries)
const {
	countryCodes,
	countryMeasurements,
	countryNames,
	countryPrefixes,
	countryContinents,
	countryNativeNames,
} = getArrayItemProperties(countryEntries, [
	{ saveAs: "countryCodes", fn: ([code]) => code },
	{
		saveAs: "countryMeasurements",
		fn: ([_, country]) => country.measurement,
	},
	{ saveAs: "countryNames", fn: ([_, country]) => country.name },
	{ saveAs: "countryPrefixes", fn: ([_, country]) => country.prefix },
	{
		saveAs: "countryContinents",
		fn: ([_, country]) => country.continent,
	},
	{ saveAs: "countryNativeNames", fn: ([_, country]) => country.native },
])
const countryLocales = countryEntries.reduce((prev, [_, country]) => {
	return [...prev, ...country.locales]
}, [] as string[])

const { currencyCodes, currencySymbols, currencyNames } =
	getArrayItemProperties(Object.entries(currencies), [
		{ saveAs: "currencyCodes", fn: ([code]) => code },
		{ saveAs: "currencySymbols", fn: ([_, currency]) => currency.symbol },
		{ saveAs: "currencyNames", fn: ([_, currency]) => currency.name },
	])

const languageEntries = Object.entries(languages)
const { languageCodes, languageNames, languageNativeNames } =
	getArrayItemProperties(languageEntries, [
		{ saveAs: "languageCodes", fn: ([code]) => code },
		{ saveAs: "languageNames", fn: ([_, language]) => language.name },
		{
			saveAs: "languageNativeNames",
			fn: ([_, language]) => language.native,
		},
	])
const languageScripts = languageEntries.reduce((prev, [_, language]) => {
	return [...prev, ...language.scripts]
}, [] as string[])

const { tzs } = getArrayItemProperties(Object.entries(timezones), [
	{ saveAs: "tzs", fn: ([timezone]) => timezone },
])

generateUnionTypesFile(paths.output.types, [
	{ name: "CountryCode", values: countryCodes },
	{ name: "CountryMeasurement", values: countryMeasurements },
	{ name: "CountryName", values: countryNames },
	{ name: "CountryPhonePrefix", values: countryPrefixes },
	{ name: "CountryContinent", values: countryContinents },
	{ name: "CountryNativeName", values: countryNativeNames },
	{ name: "CountryLocale", values: countryLocales },
	{ name: "CurrencyCode", values: currencyCodes },
	{ name: "CurrencySymbol", values: currencySymbols },
	{ name: "CurrencyName", values: currencyNames },
	{ name: "LanguageCode", values: languageCodes },
	{ name: "LanguageName", values: languageNames },
	{ name: "LanguageNativeName", values: languageNativeNames },
	{ name: "LanguageScript", values: languageScripts },
	{ name: "Timezone", values: tzs },
])
