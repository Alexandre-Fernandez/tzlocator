import countryTimezones from "../static/base/timezone-country-code.json"
import countries from "../static/base/countries.json"
import currencies from "../static/base/currencies.json"
import { getArrayItemProperties } from "../functions/parsing"
import { generateUnionTypesFile } from "../functions/file/generation"
import paths from "../paths"

const { CountryCode, Timezone } = getArrayItemProperties(countryTimezones, [
	{ saveAs: "CountryCode", fn: o => o.countryCode },
	{ saveAs: "Timezone", fn: o => o.timezone },
])
const { CountryName, CountryContinent } = getArrayItemProperties(countries, [
	{ saveAs: "CountryName", fn: o => o.countryName },
	{ saveAs: "CountryContinent", fn: o => o.continentName },
])
const { CurrencyCode, CurrencyName } = getArrayItemProperties(currencies, [
	{ saveAs: "CurrencyCode", fn: o => o.currencyCode },
	{ saveAs: "CurrencyName", fn: o => o.currencyName },
])

generateUnionTypesFile(paths.output.types, [
	{ name: "CountryCode", values: CountryCode },
	{ name: "Timezone", values: Timezone },
	{ name: "CountryName", values: CountryName },
	{ name: "CountryContinent", values: CountryContinent },
	{ name: "CurrencyCode", values: CurrencyCode },
	{ name: "CurrencyName", values: CurrencyName },
])
