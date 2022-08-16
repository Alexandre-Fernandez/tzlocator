import { existsSync, mkdirSync, writeFileSync } from "fs"
import { getExtension } from "../utilities"

export function getArrayItemStringProperties<K extends string>(
	array: unknown[],
	getters: { saveAs: K; fn: (cur: any) => unknown }[],
	removeDuplicates = true
) {
	return array.reduce<Record<K, string[]>>((prev, cur) => {
		getters.forEach(getter => {
			const result = getter.fn(cur)
			if (typeof result === "string") {
				if (!Array.isArray(prev[getter.saveAs])) {
					prev[getter.saveAs] = []
				}
				if (removeDuplicates) {
					if (!prev[getter.saveAs].includes(result)) {
						prev[getter.saveAs].push(result)
					}
				} else prev[getter.saveAs].push(result)
			}
		})
		return prev
	}, {} as Record<K, string[]>)
}

export function getStringUnionTypeString(name: string, values: string[]) {
	if (values.length === 0) return undefined
	let cur = `export type ${name}=`
	if (values.length === 1) return `${cur}"${values[0]}"`
	const prev = {} as Record<string, boolean>
	values.forEach(val => {
		if (prev[val]) return
		cur += `|"${val}"`
		prev[val] = true
	})
	return cur
}

export function generateUnionTypesFile(
	path: string,
	types: { name: string; values: string[] }[]
) {
	if (getExtension(path) !== "ts") {
		throw new Error("`path`'s file must be a .ts file.")
	}
	try {
		let content = ""
		types.forEach(({ name, values }) => {
			content += `${getStringUnionTypeString(name, values)}\n`
		})

		const dir = path.split("/").slice(0, -1).join("/")
		if (!existsSync(dir)) mkdirSync(dir)

		writeFileSync(path, content)
	} catch (err) {
		console.error(err) // eslint-disable-line no-console
	}
}
