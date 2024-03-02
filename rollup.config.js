import serve from 'rollup-plugin-serve';
import postcss from 'rollup-plugin-postcss';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import url from '@rollup/plugin-url';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import nodePolyfills from 'rollup-plugin-polyfill-node';

import dotenv from 'dotenv';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'production';
console.log('Building integration ', NODE_ENV);

export default {
  input: 'src/integration/index.js',
  output: {
    file: 'dist/public/princess-diana-v1.js',
    format: 'iife',
    name: 'PrincessDiana',
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      preventAssignment: true,
    }),
    babel({
      babelHelpers: 'bundled',
    }),
    nodeResolve({
      moduleDirectories: ['node_modules'],
      browser: true,
    }),
    postcss({ extract: false, modules: true }),
    json(),
    url(),
    commonjs(),
    nodePolyfills({ browser: true }),
    serve({
      contentBase: ['src/integration/sample', 'dist/public'],
      port: 3010,
    }),
  ],
};
