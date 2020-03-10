import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default [
	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify
	// `file` and `format` for each target)
  {
    input: 'src/index.ts',
    external: ['axios', 'isomorphic-ws', 'qs', 'ws'],
    output: [
      { file: pkg.main, format: 'cjs', indent: false },
      { file: pkg.module, format: 'es', indent: false },
    ],
    plugins: [
      typescript({ useTsconfigDeclarationDir: true }),
    ],
  },

  // browser-friendly UMD build
  {
    input: 'src/index.ts',
    output: {
      name: 'Fugle',
      file: pkg.unpkg,
      format: 'umd',
    },
    plugins: [
      resolve({ mainFields: ['jsnext', 'preferBuiltins', 'browser'] }),
      commonjs({ browser: true }),
      typescript({ tsconfigOverride: { compilerOptions: { declaration: false } } }),
      json(),
    ]
  },

  // browser-friendly UMD build for production
  {
    input: 'src/index.ts',
    output: {
      name: 'Fugle',
      file: 'dist/fugle.min.js',
      format: 'umd',
    },
    plugins: [
      resolve({ mainFields: ['jsnext', 'preferBuiltins', 'browser'] }),
      commonjs({ browser: true }),
      typescript({ tsconfigOverride: { compilerOptions: { declaration: false } } }),
      json(),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
      }),
    ],
  },
];
