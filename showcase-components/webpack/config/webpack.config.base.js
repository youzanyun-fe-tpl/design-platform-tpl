const VueLoader = require('vue-loader');
const { styleLoaders } = require('./generate-loaders');
const constants = require('./constants');
const { DIST_FOLDER } = constants;

const isPord = process.env.NODE_ENV === 'production';
const baseConfig = {
  output: {
    path: DIST_FOLDER,
    jsonpFunction: 'webpackJsonpFunction4'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [require.resolve('@babel/preset-env')],
            plugins:  [
              require.resolve('@babel/plugin-proposal-object-rest-spread'),
              require.resolve('@babel/plugin-syntax-dynamic-import'),
              require.resolve('@babel/plugin-transform-runtime'),
              [require.resolve('babel-plugin-import'), {
                "libraryName": "vant",
                "libraryDirectory": "es",
                "style": true
              }] 
            ]
          }
        }
      },
      ...styleLoaders({
        sourceMap: !isPord
      }),
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      },
      {
        test: /\.(ttf|svg|eot|woff2?)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoader.VueLoaderPlugin()
  ]
};

module.exports = baseConfig;
