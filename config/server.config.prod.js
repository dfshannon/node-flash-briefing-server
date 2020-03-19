const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const projectRootPath = path.resolve(__dirname, '../');
const outputDir = path.resolve(projectRootPath, './dist');

module.exports = {
    devtool: 'sourcemap',
    name: 'server',
    target: 'node',
    node: {
        __dirname: false,
        __filename: false
    },
    externals: [nodeExternals()],
    entry: [
        './server/server.js'
    ],
    output: {
        path: outputDir,
        filename: 'server.js'
    },
    module: {
        rules: [
            {
                test: /\.js*$/,
                exclude: [/node_modules/, /.+\.config.js/],
                loader: 'babel-loader',
                query: {
                    presets: [
                        ['@babel/env', {
                            targets: {
                                node: 'current'
                            },
                            modules: false
                        }]
                    ]
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
};
