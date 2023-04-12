import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import eslint from "@rollup/plugin-eslint";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";

export default defineConfig({
  input: "src/index.ts", // 打包入口
  // 打包出口
  output: [
    // iife
    {
      file: "dist/index.js",
      format: "iife",
      name: "YStorage",
      plugins:[terser({
        compress: false
      })]
    },
    {
      file: `./dist/index.esm.js`,
      format: "es",
      plugins:[terser({
        compress: false
      })]
    },
  ],
  plugins: [
    typescript(),
    babel({
      babelHelpers: "bundled",
      extensions: [".ts"],
      exclude: "node_modules/**",
    }),
    eslint({
      fix: true,
      include: "src",
      exclude: ["node_modules/**", "dist/**"],
      throwOnError: true,
      throwOnWarning: true,
    })
  ],
});
