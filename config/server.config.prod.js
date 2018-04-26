var webpack = require('webpack');
var path = require('path');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

var projectRootPath = path.resolve(__dirname, '../');
var outputDir = path.resolve(projectRootPath, './dist');

module.exports = {
    devtool: 'sourcemap',
    name: 'server',
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
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
                        ["env", {
                            "targets": {
                                "node": "current"
                            },
                            "modules": false
                        }]
                    ]
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        })
    ]
};
