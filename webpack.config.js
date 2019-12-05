const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/index.ts",
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 8000,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/",
        filename: "bundle.js"
    },
    module: {
        rules: [
            { test: /\.ts$/, use: 'ts-loader' }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.json']
    },
    node: {
        fs: 'empty',
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'node_modules/canvaskit-wasm/bin/canvaskit.wasm' }
        ])
    ]
};
