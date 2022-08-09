import { existsSync, mkdirSync, writeFileSync } from "fs"
import { getExtension } from "../utilities"
import { getStringUnionTypeString } from "./content"

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
