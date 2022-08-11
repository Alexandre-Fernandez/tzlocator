import type { Timezones, Timezone, TimezoneData } from "../types/output"
import type { LiteralUnion } from "../types/utilities"

class Tzlocator {
	private fallbackTimezoneData: TimezoneData | undefined

	constructor(private timezonesMap: Timezones, fallback?: Timezone) {
		if (fallback) this.fallbackTimezoneData = this.get(fallback)
	}

	has(timezone: LiteralUnion<Timezone>) {
		return !!this.timezonesMap[timezone as Timezone]
	}

	/**
	 * Returns the corresponding TimezoneData for the given Timezone, if the the
	 * timezone does not exist it will return the fallback (set in the class
	 * constructor), if a fallback was not given or does not exist, it will return
	 * undefined.
	 */
	get(timezone: LiteralUnion<Timezone>): TimezoneData | undefined {
		return (
			this.timezonesMap[timezone as Timezone] || this.fallbackTimezoneData
		)
	}

	/**
	 * `predicate` will be called one for every available timezone, if it returns
	 * `false` it will be filtered out, else it will be added to an object using
	 * its `timezone` as a key.
	 */
	filter(predicate: (data: TimezoneData, timezone: Timezone) => boolean) {
		return Object.entries(this.timezonesMap).reduce((prev, entry) => {
			const [timezone, data] = entry as [Timezone, TimezoneData]
			if (predicate(data, timezone)) prev[timezone] = data
			return prev
		}, {} as Partial<Timezones>)
	}

	fallback() {
		return this.fallbackTimezoneData
	}

	timezones() {
		return Object.keys(this.timezonesMap) as Timezone[]
	}

	currencies() {
		return Object.values(this.timezonesMap).map(t => t.currency)
	}

	countries() {
		return Object.values(this.timezonesMap).map(t => t.country)
	}

	toJSON() {
		return JSON.stringify(this.timezonesMap)
	}
}

export default Tzlocator
