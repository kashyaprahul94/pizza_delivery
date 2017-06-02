const path = require( 'path' );
const nodeExternals = require( 'webpack-node-externals' );

module.exports = {
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    entry: './index.ts',
    output: {
        path: path.resolve( __dirname, '../dist' ),
        filename: 'index.js'
    },
    resolve: {
        extensions: [ '.js', '.ts', '.tsx' ]
    },
    devtool: 'source-map',
    target: 'node',
    externals: [ nodeExternals() ],
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: [ 'babel-loader', 'awesome-typescript-loader' ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [

    ]
};