import Toastify from 'toastify-js';
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

	// Perfom sanity checks on provided parameters, else use config.yaml defaults
	if (params.id) {
		const alphaNumeric = /^[a-z0-9]+$/i;
		if (!alphaNumeric.test(params.id)) {
			Toastify({
				escapeMarkup: false,
				text: '<strong>Parameter Error</strong>: <small>Only alphanumeric ids are allowed!</small>',
				duration: 0,
				className: 'toast-info',
			}).showToast();
		}

		if (params.id.length >= 20) {
			Toastify({
				escapeMarkup: false,
				text: '<strong>Parameter Error</strong>: <small>id too long!</small>',
				duration: 0,
				className: 'toast-info',
			}).showToast();
		}
		console.log(params.id);
	} else {
		params.id = config.globals.defaultSubjectId;
	}
	if (params.culture) {
		if (!Object.keys(config.procedure).includes(params.culture)) {
			Toastify({
				escapeMarkup: false,
				text: `🌏 <strong>Culture not found.</strong> <small>Your given URL paramter was not found within procedure objects in config.yaml. You either need to define the procedure, or check your URL parameter for typos.<br><br><b>Possible values: ${Object.keys(
					config.procedure
				).join(', ')}</b></small>`,
				duration: 0,
				className: 'toast-error',
			}).showToast();
		}
	} else {
		params.culture = config.globals.defaultCulture;
	}
	if (params.agegroup) {
		if (params.agegroup !== 'adult' && params.agegroup !== 'child') {
			Toastify({
				escapeMarkup: false,
				text: '<strong>Parameter Error</strong>: <small><code>agegroup</code> parameter can either be <code>adult</code> or <code>child</code></small>',
				duration: 0,
				className: 'toast-info',
			}).showToast();
		}
	} else {
		params.agegroup = config.globals.defaultAgeGroup;
	}
	if (params.input) {
		if (params.input !== 'text' && params.input !== 'audio' && params.input !== 'userchoice') {
			Toastify({
				escapeMarkup: false,
				text: '<strong>Parameter Error</strong>: <small><code>input</code> parameter can only be: <code>text</code>, <code>audio</code> or <code>userchoice</code></small>',
				duration: 0,
				className: 'toast-info',
			}).showToast();
		}
	} else {
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

export const downloadData = () => {
	// download data as JSON from global data object
	const blob = new Blob([JSON.stringify(data, null, 2)]);
	const day = new Date().toISOString().slice(0, 10);
	const time = new Date().toISOString().slice(11, 19);

	const hiddenElement = document.createElement('a');
	hiddenElement.href = window.URL.createObjectURL(blob);
	hiddenElement.download = `matt-${data.id}-${day}-${time}.json`;
	hiddenElement.click();
};
