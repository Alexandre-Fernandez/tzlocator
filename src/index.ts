import Tzlocator from "./classes/Tzlocator"
import tzlocatorJson from "./static/tzlocator.json"
export type {
	Timezones,
	TimezoneData,
	Timezone,
	Country,
	Currency,
} from "./types/output"

export const tzlocator = new Tzlocator(tzlocatorJson as any)
