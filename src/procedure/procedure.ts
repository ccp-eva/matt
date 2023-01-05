import _ from 'lodash';
import Toastify from 'toastify-js';
import config from '../config.yaml';
import { getResponse } from '../util/getResponse';

export const procedure = async () => {
	const currentCulture = data.urlParameters.culture;

	if (!config.procedure[currentCulture]) {
		Toastify({
			escapeMarkup: false,
			text: `🌏 <strong>Culture not found.</strong> <small>Your given URL paramter was not found within procedure objects in config.yaml. You either need to define the procedure, or check your URL parameter for typos.</small>`,
			duration: 20000,
			gravity: 'top', // `top` or `bottom`
			position: 'right', // `left`, `center` or `right`
			stopOnFocus: true, // Prevents dismissing of toast on hover
			className: 'toast-error',
		}).showToast();
	}

	const currentProcedure = config.procedure[currentCulture].map((e: string) =>
		_.camelCase(e)
	);

	console.log(currentProcedure);

	console.log('before 1');

	// use dynamic imports to load the slides
	await import(`./${currentProcedure[0]}`).then((module) => {
		module.default();
	});

	await getResponse('link-si-next', true);

	console.log('after 1');
	console.log('before 2');
	await import(`./${currentProcedure[1]}`).then((module) => {
		module.default();
	});

	console.log('after 2');

	// for (const slide of currentProcedure) {
	// 	console.log(slide);
	// }
};
