const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/', // Ensure assets are served from the root
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/client/views/index.html',
            filename: './index.html',
        }),
        new CleanWebpackPlugin({
            dry: false, // Actually remove files (set to true for testing)
            verbose: true, // Log files being removed
            cleanStaleWebpackAssets: true, // Clean unused assets
            protectWebpackAssets: false, // Allow cleaning of all assets
        }),
    ],
    devServer: {
        port: 8081, // Client runs on port 8081
        open: true, // Automatically open the browser
        hot: true, // Enable hot module replacement
        static: {
            directory: path.join(__dirname, 'dist'), // Serve files from dist
        },
        allowedHosts: 'all', // Allow all hosts
        client: {
            overlay: {
                errors: true,
                warnings: false,
            }, // Show errors in the browser overlay
        },
    },
};