import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
gsap.registerPlugin(Draggable);
import './css/app.css';
import './css/style.css';
import config from './config.yaml';
import expSvg from './assets/experiment.svg';
import {
	showSingleSlide,
	swapSlides,
	getChildrenFromParent,
	hideAllSlides,
} from './util/slideVisibility';

// type definitions
type SvgInHtml = HTMLElement & SVGElement & SVGSVGElement; // see https://stackoverflow.com/a/63165963/2258480

const wrapper = document.getElementById('svg-container')! as HTMLDivElement;
// load initial SVG file
wrapper.innerHTML = expSvg;

// get main svg element
const svg = document.querySelector('svg')! as SvgInHtml;

// parse SVG DOM to all children from #svg group
const svgChilds: {
	[key: string]: SVGImageElement | SVGGElement | Element;
} = {};
document.querySelectorAll('svg #svg [id]').forEach((e) => {
	svgChilds[e.id] = e;
});

hideAllSlides('svg');
swapSlides(['s-introduction'], []);

document.getElementById('si-next')!.addEventListener('click', () => {
	swapSlides(['s-moral-circle'], ['s-introduction']);
});

// get child
const smcChild = document.getElementById('smc-child')! as SvgInHtml;

gsap.set(smcChild, { transformOrigin: '50% 50%' });
// gsap.set(smcChild, { scale: 2 });

Draggable.create(smcChild);

if (config.devMode.enabled && config.devMode.exposeGlobalVariables) {
const global = globalThis as any;
global.showSingleSlide = showSingleSlide;
global.swapSlides = swapSlides;
global.hideAllSlides = hideAllSlides;
global.getChildrenFromParent = getChildrenFromParent;
global.svgChilds = svgChilds;
	global.config = config;
}
