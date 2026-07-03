import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // 🔹 Configuração para arquivos de front-end (React)
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    ignores: ["node_modules", "dist", "build"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      prettier: prettierPlugin,
      import: importPlugin,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "import/order": [
        "warn",
        { alphabetize: { order: "asc", caseInsensitive: true } },
      ],
      "prettier/prettier": "warn",
      "@typescript-eslint/no-unused-vars": ["warn"],
    },
    settings: {
      react: { version: "detect" },
    },
  },

  // 🔹 Configuração para arquivos Node.js (como webpack.config.js, babel.config.js)
  {
    files: ["*.config.js", "*.config.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
    rules: {
      "no-undef": "off", // Desliga o erro de "module is not defined"
      "@typescript-eslint/no-require-imports": "off", // Permite require()
    },
  }
);