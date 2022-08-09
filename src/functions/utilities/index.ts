export function getExtension(path: string) {
	const index = path.lastIndexOf(".")
	if (index < 0) return undefined
	return path.slice(index + 1)
}
