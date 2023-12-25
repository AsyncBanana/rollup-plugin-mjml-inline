import { createFilter, type FilterPattern } from "@rollup/pluginutils";
import type { Plugin } from "rollup";
import mjml2html from "mjml";
import type { MJMLParsingOptions, MJMLParseResults } from "mjml-core";

interface Config {
	mjmlOptions?: MJMLParsingOptions;
	include?: FilterPattern;
	exclude?: FilterPattern;
}
export default function mjml(opts: Config = {}): Plugin {
	const filter =
		opts.include || opts.exclude
			? createFilter(opts.include, opts.exclude)
			: (id) => id.endsWith(".mjml");

	return {
		name: "mjml",

		async transform(code, id) {
			if (!filter(id)) return;

			let htmlOutput: MJMLParseResults;
			const mjmlErrorMessage = (error) =>
				`Line ${error.line} of ${id} (${error.tagName}) - ${error.message}`;
			try {
				htmlOutput = mjml2html(code, opts.mjmlOptions);
			} catch (e) {
				e.errors.map(
					(error) => (error.formattedMessage = mjmlErrorMessage(error)),
				);
				e.message = e.errors[0].formattedMessage;
				return this.error(e);
			}
			for (const error of htmlOutput.errors) {
				this.warn(mjmlErrorMessage(error));
			}

			return {
				code: `export default \`${htmlOutput.html}\``,
			};
		},
	};
}
