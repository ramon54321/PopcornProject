module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "../Server/static/bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.js/,
				include: /src/,
				loader: "babel-loader"
			}
		]
	}
};
