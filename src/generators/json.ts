import countryTimezones from "../static/base/timezone-country-code.json"
import countries from "../static/base/countries.json"
import currencies from "../static/base/currencies.json"
import {
	assertIsCountryDataArray,
	assertIsCurrencyDataArray,
	assertIsTimezoneCountryCodeArray,
} from "../functions/assertions"
import type { Geotimezone } from "../types/output"
import { writeFileSync } from "fs"
import paths from "../paths"

assertIsTimezoneCountryCodeArray(countryTimezones)
assertIsCountryDataArray(countries)
assertIsCurrencyDataArray(currencies)

const timezoneData = {} as Geotimezone
for (const countryTimezone of countryTimezones) {
	const country = countries.find(
		c => c.countryCode === countryTimezone.countryCode
	)
	if (!country) {
		console.warn(
			`Could not find a country for code "${countryTimezone.countryCode}" (${countryTimezone.countryCode}).`
		)
		continue
	}

	const currency = currencies.find(
		c => c.currencyCode === country.currencyCode
	)
	if (!currency) {
		if (country.countryCode !== "AQ") {
			console.warn(
				`Could not find a currency for code "${country.currencyCode}" (${countryTimezone.countryCode}).`
			)
		}
		continue
	}

	timezoneData[countryTimezone.timezone] = {
		country: {
			code: countryTimezone.countryCode,
			name: country.countryName,
			continent: country.continentName,
		},
		currency: {
			code: currency.currencyCode,
			symbol: currency.currencySymbol,
			name: currency.currencyName,
		},
	}
}

writeFileSync(paths.output.json, JSON.stringify(timezoneData))
