const webpack = require('webpack')
const prefixer = require('postcss-prefixer')

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
		},
	css: {
		loaderOptions: {
			sass: {
				// эти настройки будут переданы в scss-loader
			},
			postcss: {
				plugins: () => [
					prefixer({ prefix: 'wkn-', ignore: [/\.multiselect/, /\.vue-street-view-pano/, /\.vue-map/, /\.mx-/, /\.vf__/, /\.row/, /\.col/, /\.pretty/, /\.pretty/, /state/, /\.p-/]}),
				]
			}
		}
	}
}
