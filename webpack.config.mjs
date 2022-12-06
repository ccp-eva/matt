// node packages
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// webpack plugins
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import RemarkHTML from 'remark-html';

const mode = process.env.NODE_ENV || 'development'; // default to development

export default {
	mode: mode,
	entry: './src/app.ts',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					},
					{
						loader: 'postcss-loader',
					},
				],
			},
			{ test: /\.(png|gif|jpg|jpeg|ogg|mp3|wav)$/i, type: 'asset/resource' },
			{
				test: /\.svg$/i,
				type: 'asset/source',
				use: [
					{
						loader: 'svgo-loader',
					},
				],
			},
			{ test: /\.ya?ml$/, use: 'yaml-loader' },
			{
				test: /\.md$/,
				use: [
					{
						loader: 'html-loader',
					},
					{
						loader: 'remark-loader',
						options: {
							remarkOptions: {
								plugins: [RemarkHTML],
							},
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true, // todo: https://github.com/webpack/webpack-dev-middleware/issues/861 clean the dist folder before building
	},
	plugins: [
		new CopyPlugin({
			patterns: [{ from: 'public/', to: './' }],
		}),
		new HtmlWebpackPlugin({
			title: 'Moral Attitudes Study',
			filename: 'index.html', // default: index.html
			template: './src/index.html',
		}),
	],

	devtool: mode === 'development' ? 'inline-source-map' : false,
	devServer: {
		static: {
			directory: path.join(__dirname, './'), // that should point where you index.html is
		},
		// port: 3000,
		open: { app: { name: 'firefox' } },
		hot: true, // enable hot reload
		compress: true, // enable gzip compression
		historyApiFallback: true, // enable HTML5 history API
		devMiddleware: { writeToDisk: true },
	},
	experiments: {
		topLevelAwait: true,
	},
};
