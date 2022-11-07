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
				test: /\.css$/i,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},
			{
				test: /\.(png|gif|jpg|jpeg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.svg$/i,
				type: 'asset/source',
			},
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
	},
	plugins: [
		new CopyPlugin({
			patterns: [{ from: 'public/', to: './' }],
		}),
		new HtmlWebpackPlugin({
			title: 'Webpack 5 Boilerplate TypeScript',
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
		open: true, // open browser window automatically
		hot: true, // enable hot reload
		compress: true, // enable gzip compression
		historyApiFallback: true, // enable HTML5 history API
		devMiddleware: { writeToDisk: true },
	},
	experiments: {
		topLevelAwait: true,
	},
};
