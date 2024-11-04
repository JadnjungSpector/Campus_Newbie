const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development', // Change to 'production' for production builds
    entry: './src/index.js', // Your entry point
    output: {
        path: path.resolve(__dirname, 'dist'), // Output directory
        filename: 'bundle.js', // Output bundle file name
        publicPath: '/', // Public URL of the output directory when referenced in a browser
    },
    resolve: {
        fallback: {
            fs: false, // Add this line
            dns: false,
            querystring: require.resolve('querystring-es3'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            net: false,
            timers: require.resolve('timers-browserify'), // Add this line
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // Include JS and JSX files
                exclude: /node_modules/, // Exclude node_modules
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'], // Use presets for React
                    },
                },
            },
            {
                test: /\.css$/, // Include CSS files
                use: ['style-loader', 'css-loader'], // Loaders for CSS
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'), // Serve content from the dist directory
        },
        compress: true, // Enable gzip compression
        port: 3000, // Port for the dev server
        historyApiFallback: true, // Enable HTML5 History API
    },
};
