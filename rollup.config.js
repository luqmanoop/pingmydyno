import babel from 'rollup-plugin-babel';
// import { eslint } from 'rollup-plugin-eslint';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';

const sourcemap = true;

export default {
  input: 'lib/index.ts',
  external: ['is-reachable'],
  plugins: [
    typescript(),
    babel({
      exclude: 'node_modules/**',
    }),
    terser(),
  ],
  output: [
    {
      file: pkg.module,
      format: 'es',
      sourcemap,
    },
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap,
    },
  ],
};
