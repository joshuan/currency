const path = require('path');
const { DefinePlugin } = require('webpack');
const nodeExternals = require('webpack-node-externals');

require('dotenv').config();

const ROOT = path.resolve(__dirname, '../../');

module.exports = function () {
    return {
        context: path.resolve(ROOT, 'src'),
        entry: './ssr.tsx',
        mode: 'development',
        devtool: false,
        target: 'node',
        output: {
            filename: 'ssr.js',
            path: path.resolve(ROOT, 'dist/ssr'),
            clean: true,
            library: {
                type: 'commonjs',
            },
        },
        externals: [
            nodeExternals()
        ],
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
                /** Others */
                {
                    test: /\.(css|png|svg|jpg|jpeg|gif)$/i,
                    use: 'null-loader',
                },
            ],
        },
		plugins: [
			new DefinePlugin({
				'process.env.SSR': JSON.stringify(true),
			}),
		],
    };
};
