/**
 * Created by mohwa on 2018. 2. 14..
 */

const path = require('path');

const {Config, environment} = require('webpack-config');

const envConfig = environment.get('config');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const rootPath = path.join(__dirname, '..');

const srcPath = path.join(rootPath, 'src');
const buildPath = path.join(rootPath, 'dist');

const entry = path.join(srcPath, 'index');

const config = {
    entry: {
        "app": entry
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        }]
    },
    devServer: {
        host: 'localhost',
        port: '8089',
        open: true,
        proxy: {
            "/suggest/search": {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    },
    plugins: [
        new WriteFilePlugin(),
        new HtmlWebpackPlugin({
            hash: true,
            inject: 'head',
            template: path.join(srcPath, 'index.html')
        }),
        new ExtractTextPlugin('[name].css')
    ]
};

module.exports = new Config().extend(path.join(__dirname, 'webpack.base.config.js')).merge(config);