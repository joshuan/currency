const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.jsx',
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        hot: true,
        open: true,

    },
    // watch: true,
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        generator: {
            asset: {
                publicPath: '/assets/',
                outputPath: 'assets',
            },
        },
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
            /** CSS */
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            // /** SCSS/SAAS */
            // {
            //     test: /\.s[ac]ss$/i,
            //     use: [
            //         // Creates `style` nodes from JS strings
            //         "style-loader",
            //         // Translates CSS into CommonJS
            //         "css-loader",
            //         // Compiles Sass to CSS
            //         "sass-loader",
            //     ],
            //     // npm i style-loader css-loader sass sass-loader -D
            // },
            // /** Картинки */
            // {
            //     test: /\.(png|svg|jpg|jpeg|gif)$/i,
            //     type: 'asset/resource',
            // },
            // /** Шрифты */
            // {
            //     test: /\.(woff|woff2|eot|ttf|otf)$/i,
            //     type: 'asset/resource',
            // },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
    ],
};
