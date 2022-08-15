import timezones from "../../json/timezones.json"
import Locator from "./Locator"
import type { CountryCode, Timezone } from "../types/base"
import type { LiteralUnion } from "../types/utilities"

type LocatorFilterPredicate = (locator: Locator) => boolean

type TzlocatorConfig = Partial<{
	fallback: Timezone
	include: LocatorFilterPredicate[]
	exclude: LocatorFilterPredicate[]
}>

class Tzlocator {
	private fallback: Readonly<Locator> | undefined
	private includers = [] as Readonly<LocatorFilterPredicate[]>
	private excluders = [] as Readonly<LocatorFilterPredicate[]>
	private validLocatorsCache = {} as Record<CountryCode, true>

	constructor(config?: TzlocatorConfig) {
		if (!config) return
		if (config.include) this.includers = config.include
		if (config.exclude) this.excluders = config.exclude
		this.fallback = config.fallback ? this.get(config.fallback) : undefined
	}

	get(timezone: LiteralUnion<Timezone>) {
		if (!this.has(timezone)) {
			if (this.fallback) return this.fallback
			throw new Error(`${timezone} is not a valid timezone.`)
		}

		const locator = new Locator(timezones[timezone] as CountryCode)
		if (this.isValid(locator)) return locator
		else if (this.fallback) return this.fallback
		else return undefined
	}

	has(timezone: LiteralUnion<Timezone>): timezone is Timezone {
		if (timezones[timezone as Timezone]) return true
		return false
	}

	private isValid(locator: Locator, useCache = true) {
		if (this.validLocatorsCache[locator.code]) return true
		if (this.isIncluded(locator) && !this.isExcluded(locator)) {
			if (useCache) this.validLocatorsCache[locator.code] = true
			return true
		}
		return false
	}

	private isIncluded(locator: Locator) {
		return this.includers.every(includer => includer(locator))
	}

	private isExcluded(locator: Locator) {
		return this.excluders.some(excluder => excluder(locator))
	}
}

// class Tzlocator {
// 	private fallbackTimezoneData: TimezoneData | undefined

// 	constructor(private timezonesMap: Timezones, fallback?: Timezone) {
// 		if (fallback) this.fallbackTimezoneData = this.get(fallback)
// 	}

// 	has(timezone: LiteralUnion<Timezone>) {
// 		return !!this.timezonesMap[timezone as Timezone]
// 	}

// 	/**
// 	 * Returns the corresponding TimezoneData for the given Timezone, if the the
// 	 * timezone does not exist it will return the fallback (set in the class
// 	 * constructor), if a fallback was not given or does not exist, it will return
// 	 * undefined.
// 	 */
// 	get(timezone: LiteralUnion<Timezone>): TimezoneData | undefined {
// 		return (
// 			this.timezonesMap[timezone as Timezone] || this.fallbackTimezoneData
// 		)
// 	}

// 	/**
// 	 * `predicate` will be called one for every available timezone, if it returns
// 	 * `false` it will be filtered out, else it will be added to an object using
// 	 * its `timezone` as a key.
// 	 */
// 	filter(predicate: (data: TimezoneData, timezone: Timezone) => boolean) {
// 		return Object.entries(this.timezonesMap).reduce((prev, entry) => {
// 			const [timezone, data] = entry as [Timezone, TimezoneData]
// 			if (predicate(data, timezone)) prev[timezone] = data
// 			return prev
// 		}, {} as Partial<Timezones>)
// 	}

// 	fallback() {
// 		return this.fallbackTimezoneData
// 	}

// 	timezones() {
// 		return Object.keys(this.timezonesMap) as Timezone[]
// 	}

// 	currencies() {
// 		return Object.values(this.timezonesMap).map(t => t.currency)
// 	}

// 	countries() {
// 		return Object.values(this.timezonesMap).map(t => t.country)
// 	}

// 	toJSON() {
// 		return JSON.stringify(this.timezonesMap)
// 	}
// }

export default Tzlocator
