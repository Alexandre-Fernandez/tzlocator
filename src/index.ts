import GeotimezoneMap from "./classes/GeotimezoneMap"
import geotimezoneJson from "./static/geotimezone.json"
export type {
	Geotimezone,
	TimezoneData,
	Timezone,
	Country,
	Currency,
} from "./types/output"

export const geotimezone = new GeotimezoneMap(geotimezoneJson as any)
