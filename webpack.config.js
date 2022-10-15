const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function (_, { mode }) {
    const isProduction = mode === 'production';

    return {
        context: path.resolve(__dirname, 'src'),
        entry: './index.tsx',
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'source-map' : 'eval',
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
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
            path: path.resolve(__dirname, 'dist'),
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
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
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
                template: 'index.html',
            }),
            new MiniCssExtractPlugin({
                filename: 'style.css',
            }),
        ],
    };
};
