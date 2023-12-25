<div class="text-xs-center" align="center" style="margin: 20px">
  <img src="https://github.com/asyncbanana/rollup-plugin-mjml-inline/banner.png" alt="banner displaying rollup and mjml logos with the text mjml-inline">
</div>

`rollup-plugin-mjml-inline` is a fork of [rollup-plugin-mjml](https://github.com/daankauwenberg/rollup-plugin-mjml) that directly inlines the output HTML rather than separating it into a file. It also includes TypeScript types and guarantees Vite support.

## Install

```bash
npm install rollup-plugin-mjml-inline --save-dev
```

## Usage

Add `mjml()` to your `rollup.config.js` file.

```js
// rollup.config.js
import mjml from "rollup-plugin-mjml-inline";

export default {
  //...
  plugins: [mjml()],
};
```

After configuring this plugin, imported `.mjml` files will automatically be compiled to HTML and returned as a string default export.

```js
import template from "./template.mjml";
console.log(typeof template); // returns "string"
```

## Options

Options can be added as parameters to the plugin, for example:

```js
// rollup.config.js
export default {
  //...
  plugins: [
    mjml({
      outputDir: "dist/mail",
      mjmlOptions: {
        validationLevel: "strict",
      },
    }),
  ],
};
```

### `exclude`

Type: `String` | `Array[...String]`<br>
Default: `null`

A [minimatch pattern](https://github.com/isaacs/minimatch) or array of patterns that specify the files in the build the plugin should _ignore_. By default no files are ignored.

### `include`

Type: `String` | `Array[...String]`<br>
Default: `null`

A [minimatch pattern](https://github.com/isaacs/minimatch) or array patterns that specify the files in the build the plugin should operate on. By default all files are targeted.

### MJML Options

MJML options can be added to the `mjmlOptions` in the configuration object. More information can be found in the [MJML Documentation](https://mjml.io/documentation/#inside-node-js) or the config TypeScript type.

### TypeScript

This module includes TypeScript types for the configuration by default. However, if you want imports of `.mjml` files to be typed, you must add the following to an ambient declaration file (if you add a file ending in .d.ts to the project, TypeScript should find it).

```ts
declare module "*.mjml" {
  const template: string;
  export default template;
}
```
