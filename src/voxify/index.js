import path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';
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
	.replace('<svg', '<svg voxified="true"'); // add postprocess flag

// const dom = new JSDOM(voxSvg, { contentType: 'text/xml' }).window.document.getElementById(
// 	'svg'
// ).outerHTML;

// let doc = new JSDOM(voxSvg, { contentType: 'text/xml' }).window.document;

// // get all rect nodes that start with id "text-"
// const rectNodes = Array.from(doc.querySelectorAll('[id^="text-"]'));
// rectNodes.forEach((rect) => {
// 	const fo = doc.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
// 	// copy all attributes from rect to new foreignObject
// 	[...rect.attributes].map(({ name, value }) => fo.setAttribute(name, value));

// 	// remove attributes that are not needed for foreignObject
// 	fo.removeAttribute('fill');
// 	fo.removeAttribute('opacity');
// 	fo.removeAttribute('stroke');
// 	fo.removeAttribute('stroke-width');
// 	fo.removeAttribute('stroke-miterlimit');

// 	// replace rect with foreignObject
// 	rect.replaceWith(fo);
// });

// doc = doc.getElementById('svg').outerHTML;

fs.writeFile(path.resolve(__dirname, '../assets/experiment-voxified.svg'), voxSvg);

console.log('------------------------------------------------------------');
console.log('🦊 Voxified SVG file saved to assets/experiment-voxified.svg');
console.log('------------------------------------------------------------\n');
