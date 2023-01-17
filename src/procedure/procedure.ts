import _ from 'lodash';
import Toastify from 'toastify-js';
import config from '../config.yaml';

export const procedure = async () => {
	const currentCulture = data.culture;

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

	// use dynamic imports to load the slides
	// for (const slide of currentProcedure) {
	// await (await import(`./${slide}`)).default();
	// }
	await (await import(`./${currentProcedure[0]}`)).default();
	await (await import(`./${currentProcedure[1]}`)).default();
};
