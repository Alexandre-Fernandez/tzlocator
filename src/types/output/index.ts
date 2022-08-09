import type {
	CountryContinent,
	CountryCode,
	CountryName,
	CurrencyCode,
	CurrencyName,
	Timezone,
} from "../input"

export type Geotimezone = {
	[key in Timezone]: {
		country: {
			code: CountryCode
			name: CountryName
			continent: CountryContinent
		}
		currency: {
			code: CurrencyCode
			symbol: string
			name: CurrencyName
		}
	}
}

export type TimezoneData = Geotimezone[Timezone]

export type { Timezone } from "../input"

export type Country = TimezoneData["country"]

export type Currency = TimezoneData["currency"]
