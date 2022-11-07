import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
gsap.registerPlugin(Draggable);
import './css/app.css';
import './css/style.css';
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
swapSlides(['slide-introduction'], []);

document.getElementById('si-next')!.addEventListener('click', () => {
	swapSlides(['slide-moral-circle'], ['slide-introduction']);
});

// get child
const mcChild = document.getElementById('mc-child')! as SvgInHtml;

gsap.set(mcChild, { transformOrigin: '50% 50%' });

Draggable.create(mcChild);

// for development only:
const global = globalThis as any;
global.showSingleSlide = showSingleSlide;
global.swapSlides = swapSlides;
global.hideAllSlides = hideAllSlides;
global.getChildrenFromParent = getChildrenFromParent;
global.svgChilds = svgChilds;
