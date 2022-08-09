import Tzlocator from "./classes/Tzlocator"
import timezones from "./static/tzlocator.json"
import type { Timezone } from "./types/input"
import type { Timezones } from "./types/output"

export const getTzlocator = async (fallback?: Timezone) => {
	return new Tzlocator(timezones as Timezones, fallback)
}

export { getBrowserTimezone } from "./functions/utilities"

export type {
	Timezones,
	TimezoneData,
	Timezone,
	Country,
	Currency,
} from "./types/output"
