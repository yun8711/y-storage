import {defineConfig} from "rollup";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  input:"src/index.ts",  // 打包入口
  // 打包出口
  output: [
    // iife
    {
      file: 'dist/index.js',
      format: 'iife',
      name: 'YStorage',
    },
    // {
    //   file: './dist/index.min.js',
    //   format: 'iife',
    //   name: 'YStorage',
    //   plugins:[terser()]
    // },
    // esm
    {
      // dir:'dist',
      file: `./dist/index.esm.js`,
      format:"es",
      plugins:[]
    },
    // esm.min.js
    // {
    //   file: `./dist/index.esm.min.js`,
    //   format:"es",
    //   plugins:[
    //     terser()
    //   ]
    // },
  ],
  plugins: [
    commonjs(),
    typescript(),
  ],
})