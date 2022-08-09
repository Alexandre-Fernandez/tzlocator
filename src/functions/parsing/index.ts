export function getArrayItemProperties<K extends string>(
	array: unknown[],
	getters: { saveAs: K; fn: (cur: any) => unknown }[]
) {
	return array.reduce<Record<K, string[]>>((prev, cur) => {
		getters.forEach(getter => {
			const result = getter.fn(cur)
			if (typeof result === "string") {
				if (!Array.isArray(prev[getter.saveAs]))
					prev[getter.saveAs] = []
				prev[getter.saveAs].push(result)
			}
		})
		return prev
	}, {} as Record<K, string[]>)
}
