/**
 * Created by dpitic on 17/03/17.
 * Webpack configuration.
 */
const webpack = require('webpack');

module.exports = {
    // Entry point of the application
    entry: {
        'polyfills': './public/polyfills',
        'vendor': './public/vendor',        // 3rd party modules
        'bootstrap': './public/bootstrap'
    },
    // Use Webpack to create map files for transpiled application files
    devtool: 'source-map',
    // Kind of module extensions to resolve
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    // Configure how Webpack saves the output files
    output: {
        path: 'public/build',   // bundled files in this folder
        filename: '[name].js',
    },
    // List of modules Webpack will use
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader']
            }
        ]
    },
    plugins: [
        // Bundle every module once
        new webpack.optimize.CommonsChunkPlugin({
            name: ['bootstrap', 'vendor', 'polyfills']
        })
    ]
};