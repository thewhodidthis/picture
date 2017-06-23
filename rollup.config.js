import babel from 'rollup-plugin-babel';

export default {
  entry: 'index.es',
  plugins: [
    babel(),
  ],
  targets: [
    {
      format: 'iife',
      moduleName: 'picture',
      dest: 'dist/picture.js'
    },
    {
      format: 'cjs',
      dest: 'index.js'
    }
  ]
};
