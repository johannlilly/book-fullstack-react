const path = require('path');
const resolve = path.resolve,
  join = path.join;

const glob = require('glob');

const webpack = require('webpack');
const cfg = require('dotenv').config();

const rootDir = resolve(__dirname);
const srcDir = join(rootDir, 'src');
const componentsDir = join(srcDir, 'components');
const modulesDir = join(rootDir, 'node_modules');
const buildDir = join(rootDir, 'docs');
const dataDir = join(rootDir, 'fixtures');

const ignore = ['Counter1', 'CounterWrapper'];

module.exports = {
  require: [path.resolve(__dirname, 'lib/setup.js')],
  // rootDir: srcDir,
  components: function() {
    return glob.sync(`${srcDir}/components/**/*.js`).filter(module => {
      const isSpec = /\.spec\.js$/.test(module);
      const isUtil =
        /\.util\/(.*)\.js$/.test(module) || /util\/(.*)\.js$/.test(module);
      const isStep = /\/steps\/(.*)\.js$/.test(module);
      const isData = /data\.js$/.test(module);
      const isIgnored =
        ignore.indexOf(path.basename(module, path.extname(module))) >= 0;
      const keep = !isSpec && !isUtil && !isData && !isStep && !isIgnored;
      return keep;
    });
  },
  skipComponentsWithoutExample: true,
  styleguideDir: buildDir,
  title: 'Fullstack.io React component cookbook',
  webpackConfig: require('./webpack.config.js'),
  ignore: [
    '**/__tests__/**',
    '**/*.test.js',
    '**/*.test.jsx',
    '**/*.spec.js',
    '**/*.spec.jsx',
    '**/data*',
    '**/*util*',
    '**/*steps?*'
  ]
};
