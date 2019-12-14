const path = require('path');
const resolve = path.resolve,
  join = path.join;

const webpack = require('webpack');
const env = process.env.NODE_ENV || 'development';

const cfg = require('dotenv').config();

const rootDir = resolve(__dirname);
const srcDir = join(rootDir, 'src');
const modulesDir = join(rootDir, 'node_modules');
const buildDir = join(rootDir, 'docs');
const dataDir = join(rootDir, 'fixtures');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: srcDir,
        loader: 'babel-loader',
        query: {
          presets: [['env', {targets: {node: 'current'}}], 'react'],
          plugins: [
            'transform-class-properties',
            'transform-object-rest-spread'
          ],
          babelrc: false
        }
      },
      // [name]___[local]___[hash:base64:5]
      {
        test: /\.css$/,
        include: srcDir,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
            }
          },
          {loader: 'postcss-loader'}
        ]
      },
      {
        test: /\.css$/,
        include: join(modulesDir, 'jquery-ui'),
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}]
      },
      // {
      //   test: /\.(jpe?g|png|gif)$/i,
      //   include: [srcDir, modulesDir],
      //   use: {
      //     loader: 'file-loader'
      //   }
      // },
      // {
      //   test: /\.json$/,
      //   include: dataDir,
      //   use: {
      //     loader: 'json-loader'
      //   }
      // },
      {
        test: /\.css$/,
        include: join(modulesDir, 'font-awesome', 'css'),
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}]
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        include: join(modulesDir, 'font-awesome', 'fonts'),
        use: {
          loader: 'url-loader'
        }
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        include: join(modulesDir, 'font-awesome', 'fonts'),
        use: {
          loader: 'file-loader'
        }
      }
      // {
      //   test: /jquery[\\\/]src[\\\/]selector\.js$/,
      //   include: [srcDir, modulesDir],
      //   use: {
      //     loader: 'amd-define-factory-patcher-loader'
      //   }
      // }
    ]
  },

  resolve: {
    modules: ['node_modules'],
    alias: {
      jquery: join(modulesDir, 'jquery/src/jquery'),
      'jquery-ui': join(modulesDir, 'jquery-ui'),
      jqueryui: join(modulesDir, 'jquery-ui'),
      React: join(modulesDir, 'react'),
      react: join(modulesDir, 'react'),
      util: join(srcDir, 'components', 'util'),
      fixtures: dataDir
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      __WEATHER_API_KEY__: JSON.stringify(cfg.parsed.WEATHER_API_KEY),
      __NYT_API_KEY__: JSON.stringify(cfg.parsed.NYT_API_KEY),
      __GOOGLE_API_KEY__: JSON.stringify(cfg.parsed.GOOGLE_API_KEY)
    })
  ]
};
