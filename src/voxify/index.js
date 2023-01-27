import path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// original svg file from Illustrator
const svgPath = path.resolve(__dirname, '../assets/experiment.svg');

// load svg file
const svg = await fs.readFile(svgPath, 'utf8');

let voxSvg = svg
	.replace(/png/g, 'svg') // replace png with svg
	.replace(/xlink:href="/g, 'xlink:href="assets/') // prepend path
	.replace('-->', '-->\n<!-- voxified -->'); // add postprocess flag

fs.writeFile(path.resolve(__dirname, '../assets/experimento.svg'), voxSvg);

// todo use jsdom to parse within nodejs like in JS https://github.com/jsdom/jsdom
