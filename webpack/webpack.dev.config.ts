import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import 'webpack-dev-server';
import { IS_DEV, STATIC_DIR } from './env';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

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
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, 'src/src-sw.js'),
        to: path.resolve(__dirname, 'dist/src-sw.js')
      }
    ]
  })],
  devtool: 'inline-source-map',
  performance: {
    hints: false
  }
};

export default config;
