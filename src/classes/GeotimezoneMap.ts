import type {
	Geotimezone as GeotimezoneJson,
	Timezone,
	TimezoneData,
} from "../types/output"
import type { LiteralUnion } from "../types/utilities"

class GeotimezoneMap {
	private fallback: TimezoneData | undefined

	constructor(private geotimezone: GeotimezoneJson, fallback?: Timezone) {
		if (fallback) this.fallback = this.get(fallback)
	}

	has(timezone: LiteralUnion<Timezone>) {
		return !!this.geotimezone[timezone as Timezone]
	}

	/**
	 * Returns the corresponding TimezoneData for the given Timezone, if the the
	 * timezone does not exist it will return the fallback (set in the class
	 * constructor), if a fallback was not given or does not exist, it will return
	 * undefined.
	 */
	get(timezone: LiteralUnion<Timezone>): TimezoneData | undefined {
		return this.geotimezone[timezone as Timezone] || this.fallback
	}

	/**
	 * `predicate` will be called one for every available timezone, if it returns
	 * `false` it will be filtered out, else it will be added to an object using
	 * its `timezone` as a key.
	 */
	filter(predicate: (data: TimezoneData, timezone: Timezone) => boolean) {
		return Object.entries(this.geotimezone).reduce((prev, entry) => {
			const [timezone, data] = entry as [Timezone, TimezoneData]
			if (predicate(data, timezone)) prev[timezone] = data
			return prev
		}, {} as Partial<GeotimezoneJson>)
	}

	timezones() {
		return Object.keys(this.geotimezone) as Timezone[]
	}

	toJSON() {
		return JSON.stringify(this.geotimezone)
	}
}

export default GeotimezoneMap
