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

	get(timezone: LiteralUnion<Timezone>, useFallback = true) {
		if (!this.has(timezone)) {
			if (useFallback && this.fallback) return this.fallback
			throw new Error(`${timezone} is not a valid timezone.`)
		}

		const locator = new Locator(timezones[timezone] as CountryCode)
		if (this.isValid(locator)) return locator
		else if (useFallback && this.fallback) return this.fallback
		else return undefined
	}

	has(timezone: LiteralUnion<Timezone>): timezone is Timezone {
		if (timezones[timezone as Timezone]) return true
		return false
	}

	timezones() {
		return Object.keys(timezones).filter(timezone =>
			this.get(timezone, false)
		) as Timezone[]
	}

	currencies() {}

	languages() {}

	locators() {
		return Object.keys(timezones).reduce((prev, timezone) => {
			const locator = this.get(timezone, false)
			if (locator) prev.push(locator)
			return prev
		}, [] as Locator[])
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
