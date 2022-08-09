import Tzlocator from "./classes/Tzlocator"
import geotimezoneJson from "./static/geotimezone.json"
export type {
	Timezones,
	TimezoneData,
	Timezone,
	Country,
	Currency,
} from "./types/output"

export const geotimezone = new Tzlocator(geotimezoneJson as any)
