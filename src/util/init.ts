import { SvgInHtml } from '../types';
import svgPath from '../assets/experiment.svg';
import config from '../config.yaml';
import { rectToForeignObject } from './rectToForeignObject';
import {
	showSingleSlide,
	swapSlides,
	hideFirstChildSlides,
	hideAllChildSlides,
	getChildrenFromParent,
	removeDisplayNone,
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
	document.querySelectorAll('svg [id]').forEach((e) => {
		svgChilds[e.id] = e;
	});

	// check if display="none" elements exist in DOM)
	if (document.querySelectorAll('[display="none"]').length > 0) {
		console.error(
			'Found elements with \'display="none"\' attribute. Make sure all objects are visible when exporting the SVG.',
			'Use removeDisplayNone(); to bypass this temporarily.'
		);
	}

	// transform all rect nodes to foreignObject nodes
	rectToForeignObject();

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
		global.removeDisplayNone = removeDisplayNone;
		global.svgChilds = svgChilds;
		global.config = config;
	}
};
