import { resolve } from "path"

const root = resolve(__dirname, "../../")

const paths = Object.freeze({
	output: {
		types: `${root}/src/types/base/index.ts`,
		json: `${root}/src/static/tzlocator.json`,
	},
})

export default paths
