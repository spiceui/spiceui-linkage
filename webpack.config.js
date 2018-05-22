let webpack = require('webpack')
	, path = require('path')
	, CleanPlugin = require('clean-webpack-plugin')
	, ExtractPlugin = require('extract-text-webpack-plugin');

let config = {}
	, dirPath = __dirname
	, PRO = process.env.NODE_ENV === 'production';

// 基本配置
config.entry = {
	'spiceui-linkage': './src/linkage.js'
}

config.output = {
	path: dirPath + '/dist'
	, publicPath: '/dist/'
	, filename: '[name].js'
	, chunkFilename: '[name].js'
	, libraryTarget: 'umd'
}

// 插件配置
config.plugins = [
	new ExtractPlugin( {
		filename: '[name].css'
		, allChunks: true
	} )
];

// 压缩css
let miniCSS = false;

if( PRO ){
	miniCSS = true;

	config.entry = {
		'spiceui-linkage.min': './src/linkage.js'
	}

	config.plugins = config.plugins.concat([
						new webpack.optimize.UglifyJsPlugin({
							compress: {
								warnings: false
							}
							, sourceMap: true
						})
						, new webpack.DefinePlugin({
							'process.env': {
								NODE_ENV: JSON.stringify('production')
							}
						})
					])
}else{
	config.plugins = config.plugins.concat([
					new CleanPlugin(['./dist'])
				])
}

// module配置
config.module = {}
config.module.loaders = []

// es6 格式转换
config.module.loaders = config.module.loaders.concat([
							{
								test: /\.js$/i
								, include: path.resolve(dirPath, 'src')
								, exclude: /node_modules/
								, loader: 'babel-loader?cacheDirectory'
								, query: {
									compact: false
									, presets: ['es2015', 'stage-0']
								}
							}
						])

// scss
config.module.loaders = config.module.loaders.concat([
		{
			test: /\.(scss|css)$/
			, use: ExtractPlugin.extract({
				use:[
					{
						loader: 'css-loader'
						, options:{
							modules: false
							, importLoaders: 1
							, localIdentName: '[local]' // _[hash:base64:5]
							, sourceMap: true
							, minimize: miniCSS
						}
					}
					, 'postcss-loader'
					, {
						loader: 'sass-loader'
						, options:{
							sourceMap: true
							, minimize: miniCSS
						}
					}
				]
				, fallback: 'style-loader'
			})
		}
	]);

module.exports = config;