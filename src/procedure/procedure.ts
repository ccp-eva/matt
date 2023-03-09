import _ from 'lodash';
import Toastify from 'toastify-js';
import config from '../config.yaml';

export const procedure = async () => {
	const currentCulture = data.culture;
	let currentProcedure = config.procedure[currentCulture] as string[];

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

	// check if nested arrays exist at the second level, if so shuffle them, and flat them into the currentProcedure array
	const isNested = currentProcedure.some((slide) => Array.isArray(slide));

	if (isNested) {
		// create a copy of the currentProcedure array
		const currentProcedureFlat = [...currentProcedure];

		// get true/false indexes of nested arrays
		const boolArray = currentProcedure.map((arr) => Array.isArray(arr));

		// get all index positions from the boolArray that are true
		const indices = boolArray.flatMap((bool, index) => (bool ? [index] : []));

		// shuffle the nested arrays and insert them into currentProcedureFlat
		for (const index of indices) {
			const shuffledSubArray = _.shuffle(currentProcedure[index]);
			currentProcedureFlat.splice(index, 1, ...shuffledSubArray);
		}

		// overwrite currentProcedure with the shuffled and flattened array
		currentProcedure = currentProcedureFlat;
	}

	currentProcedure = currentProcedure.map((e: string) => _.camelCase(e));
	console.log(currentProcedure);

	// use dynamic imports to load the slides
	for (const [index, slide] of currentProcedure.entries()) {
		data.previousSlide = currentProcedure[index - 1];
		data.currentSlide = slide;
		data.nextSlide = currentProcedure[index + 1];
		console.log(data.previousSlide);
		console.log(data.currentSlide);
		console.log(data.nextSlide);
		await (await import(`./${slide}`)).default();
	}
	// await (await import(`./${currentProcedure[0]}`)).default();
	// await (await import(`./${currentProcedure[1]}`)).default();
	console.log('Procedure loop done');
};
