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
	if (!isBrowser()) {
		throw new Error(
			"`getBrowserTimezone` must exclusively be called in the browser."
		)
	}
	return Intl.DateTimeFormat().resolvedOptions().timeZone
}
