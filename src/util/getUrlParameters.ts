import Toastify from 'toastify-js';
import config from '../config.yaml';

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
		if (
			params.input !== 'text' &&
			params.input !== 'audio' &&
			params.input !== 'userchoice-audio' &&
			params.input !== 'userchoice-text'
		) {
			Toastify({
				escapeMarkup: false,
				text: '<strong>Parameter Error</strong>: <small><code>input</code> parameter can only be: <code>text</code>, <code>audio</code>, <code>userchoice-audio</code> or <code>userchoice-text</code></small>',
				duration: 0,
				className: 'toast-info',
			}).showToast();
		}
	} else {
		params.input = config.globals.defaultInput;
	}

	if (params.datatransfer) {
		if (
			params.datatransfer !== 'server' &&
			params.datatransfer !== 'local' &&
			params.datatransfer !== 'both'
		) {
			Toastify({
				escapeMarkup: false,
				text: '<strong>Parameter Error</strong>: <small><code>datatransfer</code> parameter can only be: <code>server</code>, <code>local</code>, or <code>both</code></small>',
				duration: 0,
				className: 'toast-info',
			}).showToast();
		}
	} else {
		params.input = config.globals.defaultDataTransfer;
	}

	// if not in devmode, remove all params from URL
	console.log(config.devmode);
	if (!config.devmode) {
		// remove all params from URL
		window.history.pushState({}, document.title, window.location.pathname);
	}

	return params;
};
