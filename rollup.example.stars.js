import babel from 'rollup-plugin-babel';

export default {
  entry: 'example/stars/index.js',
  plugins: [
    babel(),
  ],
  format: 'iife',
  dest: 'example/stars/bundle.js',
};
