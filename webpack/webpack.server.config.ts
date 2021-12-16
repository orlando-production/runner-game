import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import 'webpack-dev-server';
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import { DIST_DIR, IS_DEV, SRC_DIR } from './env';

const WorkboxPlugin = require('workbox-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const config: Configuration = {
  mode: IS_DEV ? 'development' : 'production',
  target: 'node',
  node: { __dirname: false },
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    path: DIST_DIR,
    publicPath: '/static/',
    clean: true
  },
  entry: './src/server.ts',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: {
              exportOnlyLocals: true
            }
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'null-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new Dotenv(),
    new WorkboxPlugin.InjectManifest({
      swSrc: path.join(SRC_DIR, 'src-sw.js'),
      swDest: 'sw.js'
    }),
    new HtmlWebpackPlugin({
      template: path.join(SRC_DIR, 'index.html')
    }),
    new HotModuleReplacementPlugin()
  ],
  externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })],
  devtool: false
};

export default config;
