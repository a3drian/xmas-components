import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import postcssLit from 'rollup-plugin-postcss-lit';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'index.js',
        format: 'esm',
        inlineDynamicImports: true,
      },
      {
        file: 'dist/index.js',
        format: 'esm',
        sourcemap: true,
        inlineDynamicImports: true,
      },
    ],
    plugins: [
      postcss({
        inject: false,
        extensions: ['.scss', '.css'],
        extract: false,
        minimize: true,
      }),
      postcssLit(),
      typescript(),
      nodeResolve(),
    ],
  },
];
