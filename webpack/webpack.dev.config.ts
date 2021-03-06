import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import 'webpack-dev-server';
import { IS_DEV, STATIC_DIR } from './env';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const config: Configuration = {
  mode: IS_DEV ? 'development' : 'production',
  output: {
    path: STATIC_DIR,
    filename: '[name].js',
    publicPath: '/'
  },
  entry: './src/client.tsx',
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
        use: [MiniCssExtractPlugin.loader, 'css-loader']
        // use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [new MiniCssExtractPlugin(), new HotModuleReplacementPlugin(),
  new WorkboxPlugin.InjectManifest({
    swSrc: './src/src-sw.js',
    swDest: 'src-sw.js'
  })],
  devtool: process.env.NODE_ENV==='development' && 'inline-source-map',
  performance: {
    hints: false
  }
};

export default config;
