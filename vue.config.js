const webpack = require('webpack')
const prefixer = require('postcss-prefixer')
const fs = require('fs')
const path = require('path')

module.exports = {
	configureWebpack: {
		plugins: [
			new webpack.optimize.LimitChunkCountPlugin({
				maxChunks: 1
			})
		]
	},
	devServer: {
		http2: true,
		https: {
			key: fs.readFileSync(path.resolve(__dirname + '/docker/ssl', 'ssl-cert-snakeoil.key')),
			cert: fs.readFileSync(path.resolve(__dirname + '/docker/ssl', 'ssl-cert-snakeoil.pem')),
			//ca: fs.readFileSync('/path/to/ca.pem'),
		},
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
