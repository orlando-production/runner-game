import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import 'webpack-dev-server';
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import { DIST_DIR, SRC_DIR } from './env';

const WorkboxPlugin = require('workbox-webpack-plugin');

const config: Configuration = {
  mode: 'production',
  target: 'node',
  node: { __dirname: false },
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    path: DIST_DIR,
    publicPath: '/static/',
    clean: true
  },
  entry: path.join(SRC_DIR, 'server'),
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
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader'
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
    new WorkboxPlugin.InjectManifest({
      swSrc: path.join(SRC_DIR, 'src-sw.js'),
      swDest: 'sw.js'
    }),
    new HtmlWebpackPlugin({
      template: path.join(DIST_DIR, 'index.html')
    }),
    new HotModuleReplacementPlugin()
  ],
  externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })],
  devtool: false
};

export default config;
