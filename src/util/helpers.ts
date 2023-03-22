import config from '../config.yaml';
import { SvgInHtml } from '../types';

// promised based timeout
export const sleep = (ms = 2000) => new Promise<number>((r) => setTimeout(r, ms));

export const getUrlParameters = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const params: { [key: string]: string } = {};
	for (const [key, value] of urlParams) {
		params[key] = value;
	}

	// Use defaults if no parameters are set, as in config.yaml
	if (!params.id) {
		params.id = config.globals.defaultSubjectId;
	}
	if (!params.culture) {
		params.culture = config.globals.defaultCulture;
	}
	if (!params.agegroup) {
		params.agegroup = config.globals.defaultAgeGroup;
	}
	if (!params.input) {
		params.input = config.globals.defaultInput;
	}
	return params;
};

export const moveToCenterAnchor = (svg: SvgInHtml, x: number, y: number) => {
	// Get the bounding box of the svg
	const bbox = svg.getBBox();

	// Calculate the center coordinates
	const cx = bbox.x + bbox.width / 2;
	const cy = bbox.y + bbox.height / 2;

	// Translate the SVG to the new position
	svg.setAttribute('transform', `translate(${x - cx}, ${y - cy})`);
};
