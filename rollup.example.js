import babel from 'rollup-plugin-babel';

export default {
  entry: 'example/index.js',
  plugins: [
    babel(),
  ],
  format: 'iife',
  dest: 'example/bundle.js',
};
