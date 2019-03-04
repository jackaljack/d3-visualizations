const fs = require('fs');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PacktrackerPlugin = require('@packtracker/webpack-plugin');
const paths = require('./paths');

module.exports = mode => {
  const PUBLIC_URL = mode === 'production' ? paths.publicUrl : '';

  const rules = [
    // rule for .js/.jsx files
    {
      test: /\.(jsx?)$/,
      include: [path.join(__dirname, 'js', 'src')],
      exclude: [path.join(__dirname, 'node_modules')],
      use: {
        loader: 'babel-loader',
      },
    },
    // rule for standard (global) CSS files
    {
      test: /\.css$/,
      include: [path.join(__dirname, 'src', 'css')],
      use: [ExtractCssChunks.loader, 'css-loader'],
    },
    // rule for CSS modules
    {
      test: /\.module\.css$/,
      include: [path.join(__dirname, 'src', 'js')],
      loaders: [
        ExtractCssChunks.loader,
        {
          loader: 'css-loader',
          options: {
            localIdentName: '[path]__[name]__[local]--[hash:base64:5]',
            modules: true,
          },
        },
      ],
    },
    // rule for .woff2 font files
    {
      test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: 'url-loader',
    },
    // rule for .ttf/.eot/.svg files
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: {
        loader: 'file-loader',
        options: {
          name: './fonts/[name].[ext]',
        },
      },
    },
    // rule for images (add svg? How to distinguish a svg font from a svg image?)
    {
      test: /\.(gif|jpe?g|png)$/i,
      include: path.join(__dirname, 'src', 'images'),
      loaders: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65,
            },
            // optipng.enabled: false will disable optipng
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: '65-90',
              speed: 4,
            },
            gifsicle: {
              interlaced: false,
            },
            // the webp option will enable WEBP
            webp: {
              quality: 75,
            },
          },
        },
      ],
    },
  ];

  const pages = fs
    .readdirSync(path.resolve(__dirname, 'src', 'templates'))
    .filter(fileName => fileName.endsWith('.html'));

  const plugins = [
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsFilename: 'stats.json',
    }),
    new CleanWebpackPlugin(['build'], {
      root: __dirname,
      exclude: ['favicon.ico', 'Transparent.gif'],
      verbose: true,
    }),
    new FaviconsWebpackPlugin({
      inject: true,
      logo: path.join(__dirname, 'src', 'images', 'logo.png'),
      title: 'd3-visualizations',
    }),
    new PacktrackerPlugin({
      fail_build: true,
      project_token: '00c60136-3fba-4ebc-8675-8c5fcb870228',
      upload: true,
    }),
    new ExtractCssChunks({
      chunkFilename: '[id].css',
      cssModules: true,
      filename: '[name].css',
      orderWarning: true,
      reloadAll: true,
    }),
    ...pages.map(filename => {
      const name = filename.split('.')[0];
      const htmlPlugin = new HtmlWebpackPlugin({
        chunks: [name],
        filename,
        hash: false,
        template: path.join(__dirname, 'src', 'templates', filename),
        templateParameters: {
          PUBLIC_URL,
        },
      });
      return htmlPlugin;
    }),
  ];

  const config = {
    devtool: 'source-map',
    entry: {
      about: path.join(__dirname, 'src', 'js', 'about.ts'),
      barchart: path.join(__dirname, 'src', 'js', 'barchart', 'index.js'),
      challenge: path.join(__dirname, 'src', 'js', 'challenge', 'index.js'),
      dolphins: path.join(__dirname, 'src', 'js', 'dolphins', 'index.js'),
      flags: path.join(__dirname, 'src', 'js', 'flags', 'index.js'),
      geomap: path.join(__dirname, 'src', 'js', 'geomap', 'index.js'),
      heatmap: path.join(__dirname, 'src', 'js', 'heatmap', 'index.js'),
      index: path.join(__dirname, 'src', 'js', 'index.js'),
      horizon: path.join(__dirname, 'src', 'js', 'horizon', 'index.js'),
      linechart: path.join(__dirname, 'src', 'js', 'linechart', 'index.js'),
      scatterplot: path.join(__dirname, 'src', 'js', 'scatterplot', 'index.js'),
      'solar-correlation': path.join(
        __dirname,
        'src',
        'js',
        'solar-correlation',
        'index.js'
      ),
    },
    module: {
      rules,
    },
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, 'build'),
      sourceMapFilename: '[file].map',
    },
    plugins,
    target: 'web',
  };
  return config;
};
