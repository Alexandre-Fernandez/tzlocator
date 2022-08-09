import Tzlocator from "./classes/Tzlocator"
import type { Timezone } from "./types/input"

export const getTzlocator = async (fallback?: Timezone) =>
	new Tzlocator((await import("./static/tzlocator.json")) as any, fallback)

export { getBrowserTimezone } from "./functions/utilities"

export type {
	Timezones,
	TimezoneData,
	Timezone,
	Country,
	Currency,
} from "./types/output"
