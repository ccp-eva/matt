import { SvgInHtml } from '../types';
import svgPath from '../assets/experiment.svg';
import config from '../config.yaml';
import {
	showSingleSlide,
	swapSlides,
	hideFirstChildSlides,
	hideAllChildSlides,
	getChildrenFromParent,
} from './slideVisibility';

export const init = () => {
	const wrapper = document.getElementById('wrapper')! as HTMLDivElement;
	// load initial SVG file
	wrapper.innerHTML = svgPath;
	// get main svg element
	const svg = document.querySelector('svg')! as SvgInHtml;

	// parse SVG DOM for all child nodes from #svg group
	const svgChilds: {
		[key: string]: SVGImageElement | SVGGElement | Element;
	} = {};
	document.querySelectorAll('svg #svg [id]').forEach((e) => {
		svgChilds[e.id] = e;
	});

	// apply initial SVG settings and style
	svg.style.backgroundColor = config.svgBg;
	document.body.style.backgroundColor = config.htmlBg;

	if (config.devMode.enabled && config.devMode.exposeGlobalVariables) {
		const global = globalThis as any;
		global.showSingleSlide = showSingleSlide;
		global.swapSlides = swapSlides;
		global.hideFirstChildSlides = hideFirstChildSlides;
		global.hideAllChildSlides = hideAllChildSlides;
		global.getChildrenFromParent = getChildrenFromParent;
		global.svgChilds = svgChilds;
		global.config = config;
	}
};
