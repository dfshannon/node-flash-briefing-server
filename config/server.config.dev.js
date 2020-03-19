const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

const projectRootPath = path.resolve(__dirname, '../');
const outputDir = path.resolve(projectRootPath, './dist');

module.exports = {
    devtool: 'sourcemap',
    name: 'server',
    watch: true,
    target: 'node',
    node: {
        __dirname: false,
        __filename: false
    },
    externals: [nodeExternals({
        whitelist: ['webpack/hot/poll?1000']
    })],
    entry: [
        'webpack/hot/poll?1000',
        './server/index'
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
        new StartServerPlugin('server.js'),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new Dotenv()
    ]
};
