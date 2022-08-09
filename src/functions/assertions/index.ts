import type {
	CountryCode,
	CountryContinent,
	CountryName,
	CurrencyCode,
	CurrencyName,
	Timezone,
} from "../../types/input"

type TimezoneCountryCode = {
	countryCode: CountryCode
	timezone: Timezone
}
const timezoneCountryCodeKeys = ["countryCode", "timezone"] as const
export function assertIsTimezoneCountryCodeArray(
	array: unknown[]
): asserts array is TimezoneCountryCode[] {
	array.forEach(item => {
		if (!item || typeof item !== "object") {
			throw new Error("`array` is not an array of objects.")
		}
		Object.entries(item).forEach(([key, value]) => {
			if (!timezoneCountryCodeKeys.some(k => k === key)) {
				throw new Error(
					"`array` items must implement TimezoneCountryCode's properties."
				)
			}
			if (typeof value !== "string") {
				throw new Error( // trusting string value...
					"`array` items properties must be of type string."
				)
			}
		})
	})
}

type CountryData = {
	countryCode: CountryCode
	countryName: CountryName
	continentName: CountryContinent
	currencyCode: CurrencyCode
}
const countryDataKeys = [
	"countryCode",
	"countryName",
	"continentName",
	"currencyCode",
] as const
export function assertIsCountryDataArray(
	array: unknown[]
): asserts array is CountryData[] {
	array.forEach(item => {
		if (!item || typeof item !== "object") {
			throw new Error("`array` is not an array of objects.")
		}
		Object.entries(item).forEach(([key, value]) => {
			if (!countryDataKeys.some(k => k === key)) {
				throw new Error(
					"`array` items must implement CountryData's properties."
				)
			}
			if (typeof value !== "string") {
				throw new Error( // trusting string value...
					"`array` items properties must be of type string."
				)
			}
		})
	})
}

type CurrencyData = {
	currencyCode: CurrencyCode
	currencyName: CurrencyName
	currencySymbol: string
}
const currencyDataKeys = [
	"currencyCode",
	"currencyName",
	"currencySymbol",
] as const
export function assertIsCurrencyDataArray(
	array: unknown[]
): asserts array is CurrencyData[] {
	array.forEach(item => {
		if (!item || typeof item !== "object") {
			throw new Error("`array` is not an array of objects.")
		}
		Object.entries(item).forEach(([key, value]) => {
			if (!currencyDataKeys.some(k => k === key)) {
				throw new Error(
					"`array` items must implement CountryData's properties."
				)
			}
			if (typeof value !== "string") {
				throw new Error( // trusting string value...
					"`array` items properties must be of type string."
				)
			}
		})
	})
}
