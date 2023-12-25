import test from "ava";
import { rollup } from "rollup";

import mjml from "rollup-plugin-mjml-inline";

const getCode = async (bundle, outputOptions) => {
	const { output } = await bundle.generate(outputOptions || { format: "esm" });
	return output;
};

const defaultConf = {
	input: "./test/fixtures/entry.js",
	output: {
		format: "esm",
		dir: "output",
	},
	plugins: [mjml()],
};

test("functions without custom config", async (t) => {
	t.plan(1);
	const bundle = await rollup(defaultConf);
	const output = await getCode(bundle, defaultConf.output);
	t.snapshot(output[0].code);
});

test("functions with custom config", async (t) => {
	t.plan(1);
	const bundle = await rollup({
		...defaultConf,
		plugins: [
			mjml({
				mjmlOptions: {
					fonts: [],
				},
			}),
		],
	});
	const output = await getCode(bundle, defaultConf.output);
	t.snapshot(output[0].code);
});
