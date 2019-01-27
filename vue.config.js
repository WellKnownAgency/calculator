const webpack = require('webpack')

module.exports = {
	configureWebpack: {
		plugins: [
			new webpack.optimize.LimitChunkCountPlugin({
				maxChunks: 1
			})
		]
	},
	devServer: {
		watchOptions: {
			ignored: /node_modules/,
			aggregateTimeout: 300,
			poll: 1000,
		},
	},
	chainWebpack:
		config => {
			config.optimization.delete('splitChunks')
		}
}
