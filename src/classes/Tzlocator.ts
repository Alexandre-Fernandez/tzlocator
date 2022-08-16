import timezones from "../../json/timezones.json"
import Locator from "./Locator"
import type { CountryCode, Timezone } from "../types/base"
import type { LiteralUnion } from "../types/utilities"
import type Language from "./Language"
import type Currency from "./Currency"

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

	/**
	 * Returns a boolean indicating if the `timezone` has an assigned
	 * CountryCode.
	 */
	static exists(timezone: LiteralUnion<Timezone>): timezone is Timezone {
		if (timezones[timezone as Timezone]) return true
		return false
	}

	constructor(config?: TzlocatorConfig) {
		if (!config) return
		if (config.include) this.includers = config.include
		if (config.exclude) this.excluders = config.exclude
		this.fallback = config.fallback ? this.get(config.fallback) : undefined
	}

	/**
	 * Returns the Locator corresponding to the `timezone`.
	 * If `useFallback` is true and the `timezone` cannot be found in the
	 * included Locator pool it will return the set config fallback.
	 * Else if there's no set fallback or if `useFallback` is false it will
	 * return undefined.
	 */
	get(timezone: LiteralUnion<Timezone>, useFallback = true) {
		if (!Tzlocator.exists(timezone)) {
			if (useFallback && this.fallback) return this.fallback
			throw new Error(`${timezone} is not a valid timezone.`)
		}

		const locator = new Locator(timezones[timezone] as CountryCode)
		if (this.isValid(locator)) return locator
		if (useFallback && this.fallback) return this.fallback
		return undefined
	}

	/**
	 * Returns a boolean indicating if the `timezone` has a valid assigned
	 * Locator.
	 */
	has(timezone: LiteralUnion<Timezone>) {
		if (this.get(timezone, false)) return true
		return false
	}

	/**
	 * Returns an array of all the valid timezones for the current instance.
	 */
	timezones() {
		return Object.keys(timezones).filter(timezone =>
			this.get(timezone, false)
		) as Timezone[]
	}

	/**
	 * Returns an array of all the valid currencies for the current instance.
	 */
	currencies() {
		return this.locators().reduce((prev, locator) => {
			if (!prev.find(cur => cur.code === locator.currency.code)) {
				prev.push(locator.currency)
			}
			return prev
		}, [] as Currency[])
	}

	/**
	 * Returns an array of all the valid languages for the current instance.
	 */
	languages() {
		return this.locators().reduce((prev, locator) => {
			const languages = locator.getLanguages()
			if (languages.length > 0) {
				locator.getLanguages().forEach(language => {
					if (!prev.includes(language)) prev.push(language)
				})
			}
			return prev
		}, [] as Language[])
	}

	/**
	 * Returns an array of all the valid locators for the current instance.
	 */
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

export default Tzlocator
