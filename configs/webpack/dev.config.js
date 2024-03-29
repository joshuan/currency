const path = require('path');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");

require('dotenv').config();

const ROOT = path.resolve(__dirname, '../../');

module.exports = function () {
    return {
        context: path.resolve(ROOT, 'src'),
        entry: './app.tsx',
        mode: 'development',
        devtool: 'eval',
        devServer: {
            hot: true,
            open: true,
            proxy: {
                '/data.json': {
                    target: 'http://currency.joshuan.ru.website.yandexcloud.net',
                    changeOrigin: true,
                },
            }
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(ROOT, 'dist'),
            clean: true,
        },
        resolve: {
            extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
        },
        module: {
            rules: [
                // /** Babel **/
                {
                    test: /\.m?jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                        },
                    },
                },
                // /** Typescript **/
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: 'ts-loader',
                },
                /** CSS */
                {
                    test: /\.css$/i,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                esModule: false,
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                    generator: {
                        publicPath: '/assets/',
                        outputPath: 'assets',
                    },
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                hash: true,
                template: 'index.html',
                templateParameters: {
                    ROLLBACK_TOKEN: process.env.ROLLBACK_TOKEN,
                    NODE_ENV: 'development',
                    APP_CONTENT: 'Loading...',
                },
                minify: {
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: true,
                },
            }),
			new DefinePlugin({
				'process.env.SSR': JSON.stringify(false),
			}),
        ],
    };
};
