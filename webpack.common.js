const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const rules = [
  // rule for .js/.jsx files
  {
    test: /\.(js|jsx)$/,
    include: [path.join(__dirname, 'js', 'src')],
    exclude: [path.join(__dirname, 'node_modules')],
    use: {
      loader: 'babel-loader',
    },
  },
  // rule for .css files
  {
    test: /\.css$/,
    include: path.join(__dirname, 'src', 'css'),
    use: [ExtractCssChunks.loader, 'css-loader'],
  },
  // rule for .woff2 font files (font-awesome)
  {
    test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    // Limiting the size of the woff fonts breaks font-awesome ONLY for extract text plugin
    use: 'url-loader',
  },
  // rule for .ttf/.eot/.svg files (font-awesome and fonts)
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
        query: {
          progressive: true,
          optimizationLevel: 7,
          interlaced: false,
          pngquant: {
            quality: '65-90',
            speed: 4,
          },
        },
      },
    ],
  },
];

// const optimization = {
//   splitChunks: {
//     cacheGroups: {
//       js: {
//         test: /\.js$/,
//         name: "commons",
//         chunks: "all",
//         minChunks: 7,
//       },
//       css: {
//         test: /\.css$/,
//         name: "commons",
//         chunks: "all",
//         minChunks: 2,
//       },
//     },
//   },
// };

const plugins = [
  new CleanWebpackPlugin(['build'], {
    root: __dirname,
    exclude: ['favicon.ico', 'Transparent.gif'],
    verbose: true,
  }),
  new ExtractCssChunks({
    chunkFilename: '[id].css',
    cssModules: true,
    filename: '[name].css',
    orderWarning: true,
    reloadAll: true,
  }),
  new HtmlWebpackPlugin({
    chunks: ['about'],
    filename: 'about.html',
    hash: true,
    template: path.join(__dirname, 'src', 'templates', 'about.html'),
  }),
  new HtmlWebpackPlugin({
    chunks: ['barchart'],
    filename: 'barchart.html',
    hash: true,
    template: path.join(__dirname, 'src', 'templates', 'barchart.html'),
  }),
  new HtmlWebpackPlugin({
    chunks: ['challenge'],
    filename: 'challenge.html',
    hash: true,
    template: path.join(__dirname, 'src', 'templates', 'challenge.html'),
  }),
  new HtmlWebpackPlugin({
    chunks: ['dolphins'],
    filename: 'dolphins.html',
    hash: true,
    template: path.join(__dirname, 'src', 'templates', 'dolphins.html'),
  }),
  new HtmlWebpackPlugin({
    chunks: ['flags'],
    filename: 'flags.html',
    hash: true,
    template: path.join(__dirname, 'src', 'templates', 'flags.html'),
  }),
  new HtmlWebpackPlugin({
    chunks: ['geomap'],
    filename: 'geomap.html',
    hash: true,
    template: path.join(__dirname, 'src', 'templates', 'geomap.html'),
  }),
  new HtmlWebpackPlugin({
    chunks: ['heatmap'],
    filename: 'heatmap.html',
    hash: true,
    template: path.join(__dirname, 'src', 'templates', 'heatmap.html'),
  }),
  new HtmlWebpackPlugin({
    chunks: ['horizon-chart'],
    filename: 'horizon-chart.html',
    hash: true,
    template: path.join(__dirname, 'src', 'templates', 'horizon-chart.html'),
  }),
  new HtmlWebpackPlugin({
    chunks: ['home'],
    filename: 'index.html',
    hash: true,
    template: path.join(__dirname, 'src', 'templates', 'index.html'),
  }),
  new HtmlWebpackPlugin({
    chunks: ['linechart'],
    filename: 'linechart.html',
    hash: true,
    template: path.join(__dirname, 'src', 'templates', 'linechart.html'),
  }),
  new HtmlWebpackPlugin({
    chunks: ['scatterplot'],
    filename: 'scatterplot.html',
    hash: true,
    template: path.join(__dirname, 'src', 'templates', 'scatterplot.html'),
  }),
  new HtmlWebpackPlugin({
    chunks: ['solar-correlation'],
    filename: 'solar-correlation.html',
    hash: true,
    template: path.join(
      __dirname,
      'src',
      'templates',
      'solar-correlation.html'
    ),
  }),
];

const config = {
  devtool: 'source-map',
  entry: {
    // "font-awesome": "./font-awesome.config.js",
    about: path.join(__dirname, 'src', 'js', 'about.ts'),
    barchart: path.join(__dirname, 'src', 'js', 'barchart.js'),
    challenge: path.join(__dirname, 'src', 'js', 'challenge.js'),
    dolphins: path.join(__dirname, 'src', 'js', 'dolphins.js'),
    flags: path.join(__dirname, 'src', 'js', 'flags.js'),
    geomap: path.join(__dirname, 'src', 'js', 'geomap.js'),
    heatmap: path.join(__dirname, 'src', 'js', 'heatmap.js'),
    home: path.join(__dirname, 'src', 'js', 'index.js'),
    'horizon-chart': path.join(__dirname, 'src', 'js', 'horizon-chart.js'),
    linechart: path.join(__dirname, 'src', 'js', 'linechart.js'),
    scatterplot: path.join(__dirname, 'src', 'js', 'scatterplot.js'),
    'solar-correlation': path.join(
      __dirname,
      'src',
      'js',
      'solar-correlation.js'
    ),
  },
  module: {
    rules,
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[file].map',
  },
  plugins,
  target: 'web',
  // optimization,
};

module.exports = config;