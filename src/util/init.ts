import _ from 'lodash';
import { SvgInHtml } from '../types';
import svgPath from '../assets/experiment-voxified.svg';
import config from '../config.yaml';
import { rectToForeignObject } from './rectToForeignObject';
import { recycleObjects } from './recycleObjects';
import { copyAttributes } from './copyAttributes';
import { downloadData, uploadData, uploadAudio } from './helpers';
import { getUrlParameters } from './getUrlParameters';
import { widowedKeyChecker } from './widowedKeyChecker';
import {
	showSingleSlide,
	swapSlides,
	hideFirstChildSlides,
	hideAllChildSlides,
	getChildrenFromParent,
	removeDisplayNone,
} from './slideVisibility';
import { translations } from '../translations';
import { setMousePointer, setScaleOnHover } from './styleDefaults';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export const init = () => {
	const urlParameters = getUrlParameters();

	const wrapper = document.getElementById('wrapper')! as HTMLDivElement;
	// load initial SVG file
	wrapper.innerHTML = svgPath;
	// get main svg element
	const svg = document.querySelector('svg')! as SvgInHtml;

	// check if svg is voxified
	if (!svg.hasAttribute('voxified')) {
		Toastify({
			escapeMarkup: false,
			text:
				'⚠️ <strong><code>voxified</code> attribute not found!</strong><br>' +
				'<small>You shoud run <code>npm run voxify</code></small>',
			duration: 0,
			// destination: 'https://github.com/apvarun/toastify-js',
			// newWindow: true,
			// close: true,
			gravity: 'top', // `top` or `bottom`
			position: 'right', // `left`, `center` or `right`
			stopOnFocus: true, // Prevents dismissing of toast on hover
			className: 'toast-error',
			// style: {
			// 	background:
			// 		'linear-gradient(to bottom, hsl(335deg 86% 46%) 0%, hsl(347deg 90% 42%) 50%, hsl(347deg 90% 42%) 50%)',
			// },
			// onClick: function () {}, // Callback after click
		}).showToast();
	}

	// parse SVG DOM for all child nodes from #svg group
	const svgChilds: {
		[key: string]: SVGImageElement | SVGGElement | Element;
	} = {};
	document.querySelectorAll('svg [id]').forEach((e) => {
		svgChilds[e.id] = e;
	});

	// check if display="none" elements exist in DOM)
	if (document.querySelectorAll('[display="none"]').length > 0) {
		console.warn(
			'Found elements with \'display="none"\' attribute. Make sure all objects are visible when exporting the SVG.',
			'Use removeDisplayNone(); to bypass this temporarily. Details:'
		);
		console.warn(document.querySelectorAll('[display="none"]'));
		removeDisplayNone();
	}

	// transform all rect nodes to foreignObject nodes
	rectToForeignObject();

	// transform all rect nodes to foreignObject nodes
	recycleObjects();

	// initialzie global data object (see custom.d.ts)
	const global = globalThis as any;
	global.data = {
		id: urlParameters.id,
		culture: urlParameters.culture,
		agegroup: urlParameters.agegroup,
		input: urlParameters.input,
		datatransfer: urlParameters.datatransfer,
		initialTimestamp: new Date().toISOString(),
		slideCounter: 0,
		procedure: {},
	};

	// check if all translation keys have a matching foreignObject and vice versa
	const textKeys = widowedKeyChecker();

	const translation = _.zipObject(
		Object.keys(translations),
		Object.values(translations).map((e) => e[data.culture])
	);

	// iterate over all text keys and add text into foreign objects
	textKeys.forEach((e) => {
		const foNodes = document.querySelectorAll(`[id^="text-${e}"]`);
		foNodes.forEach((foNode) => {
			foNode.innerHTML = translation[e as keyof typeof translation];
		});
	});

	// hide all group slides
	hideFirstChildSlides();

	// apply initial SVG settings and style
	svg.style.backgroundColor = config.svgBg;
	document.body.style.backgroundColor = config.htmlBg;

	// set cursor pointer for all elements defined in config
	setMousePointer();
	setScaleOnHover();

	if (config.devmode) {
		Toastify({
			escapeMarkup: false,
			text: `⚙️ <strong>DEVMODE ON</strong>`,
			duration: 5000,
			// destination: 'https://github.com/apvarun/toastify-js',
			// newWindow: true,
			// close: true,
			gravity: 'top', // `top` or `bottom`
			position: 'right', // `left`, `center` or `right`
			stopOnFocus: true, // Prevents dismissing of toast on hover
			className: 'toast-error',
			// style: {
			// 	background:
			// 		'linear-gradient(to bottom, hsl(335deg 86% 46%) 0%, hsl(347deg 90% 42%) 50%, hsl(347deg 90% 42%) 50%)',
			// },
			// onClick: function () {}, // Callback after click
		}).showToast();
	}

	if (config.devmode) {
		global.translations = translations;
		global.showSingleSlide = showSingleSlide;
		global.swapSlides = swapSlides;
		global.hideFirstChildSlides = hideFirstChildSlides;
		global.hideAllChildSlides = hideAllChildSlides;
		global.getChildrenFromParent = getChildrenFromParent;
		global.removeDisplayNone = removeDisplayNone;
		global.svgChilds = svgChilds;
		global.recycleObjects = recycleObjects;
		global.copyAttributes = copyAttributes;
	}
	// always expose downloadData function
	global.downloadData = downloadData;
	global.uploadData = uploadData;
	global.uploadAudio = uploadAudio;
	global.config = config;
};
