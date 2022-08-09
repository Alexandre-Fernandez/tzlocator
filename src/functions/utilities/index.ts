import type { Timezone } from "../../types/input"

export function getExtension(path: string) {
	const index = path.lastIndexOf(".")
	if (index < 0) return undefined
	return path.slice(index + 1)
}

export function isBrowser() {
	let isBrowser = false
	try {
		isBrowser = !!window
	} catch (err) {
		isBrowser = false
	}
	return isBrowser
}

export function getBrowserTimezone() {
	const error = new Error(
		"`getBrowserTimezone` must be called in the browser."
	)
	if (!isBrowser()) throw error
	return Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone
}
