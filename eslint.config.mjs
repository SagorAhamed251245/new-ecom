import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        process: "readonly",
      },
    },
    ignores: ["**/node_modules/", ".dist/"],
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-console": "warn",
      "no-unused-expressions": "error",
      "prefer-const": "error",
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];