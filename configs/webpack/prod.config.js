const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

require('dotenv').config();

const ROOT = path.resolve(__dirname, '../../');

module.exports = function () {
    return {
        context: path.resolve(ROOT, 'src'),
        entry: './index.tsx',
        mode: 'production',
        devtool: 'hidden-source-map',
        output: {
            filename: 'bundle.js',
            path: path.resolve(ROOT, 'dist/prod'),
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
                        MiniCssExtractPlugin.loader,
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
                    NODE_ENV: 'production',
                    APP_CONTENT: require('../../dist/ssr/ssr').render(),
                },
                minify: {
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: true,
                },
            }),
            new MiniCssExtractPlugin({
                filename: 'style.css',
            }),
        ],
    };
};
