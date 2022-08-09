import { resolve } from "path"

const root = resolve(__dirname, "../")

const paths = Object.freeze({
	output: {
		types: `${root}/src/types/input/index.ts`,
		json: `${root}/src/static/geotimezone.json`,
	},
})

export default paths
