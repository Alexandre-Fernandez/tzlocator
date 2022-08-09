export function getStringUnionTypeString(name: string, values: string[]) {
	if (values.length === 0) return undefined
	let cur = `export type ${name}=`
	if (values.length === 1) return `${cur}"${values[0]}"`
	let prev = {} as Record<string, boolean>
	values.forEach(val => {
		if (prev[val]) return
		cur += `|"${val}"`
		prev[val] = true
	})
	return cur
}
