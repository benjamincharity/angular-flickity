/* global process, require, __dirname */
const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const env = process.env.WEBPACK_ENV;
const path = require('path');
const libraryName = 'angular-flickity';


const config = {
    entry: {
        'angular-flickity': './src/index.js',
        'angular-flickity.min': './src/index.js',
    },
    devtool: 'inline-source-map',
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    externals: {
        'flickity': 'flickity',
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                include: [
                    path.resolve('src'),
                ],
            },
        ],
        loaders: [
            {
                test: /\.js$/,
                loaders: [
                    'ng-annotate',
                    'babel?presets[]=es2015',
                ],
                include: [
                    path.resolve('src'),
                ],
            },
        ],
    },
    resolve: {
        root: path.resolve('./src'),
        extensions: ['', '.js'],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true,
            sourceMap: false,
        }),
    ],
};

module.exports = config;

