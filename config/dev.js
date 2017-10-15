const Path = require( "path" );
const RootPath = require( "app-root-path" );
const NodeExternals = require( "webpack-node-externals" );

const Root = ( ...args ) => {
	return RootPath.resolve( Path.join( ...args ) );
};

module.exports = {
    node: {
        console: true,
        fs: "empty",
        net: "empty",
        tls: "empty"
    },
    entry: Root( "index.ts" ),
    output: {
		path: Root( "build" ),
        filename: "index.js"
    },
    resolve: {
        extensions: [ ".js", ".ts", ".tsx" ]
		modules: [
			Root( "node_modules" ),
			Root( "config" ),
			Root( "src" )
		]
    },
    target: "node",
    externals: [ NodeExternals() ],
    module: {
        loaders: [
            {
                test: /\.ts(x?)$/,
                loader: [ "babel-loader", "awesome-typescript-loader" ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
    
    ]
};
