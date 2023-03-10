import _ from 'lodash';
import Toastify from 'toastify-js';
import config from '../config.yaml';
import { stop } from '../util/audio';

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

	data.totalAnimalSlides = 9;
	data.animalSlideCounter = 0;

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
	data.slideOrder = currentProcedure;
	console.log(currentProcedure);

	data.totalSlides = currentProcedure.length;

	// ================================================
	// PROCEDURE LOOP
	// ================================================
	for (const [index, slide] of currentProcedure.entries()) {
		// save slides in global data object
		data.previousSlide = currentProcedure[index - 1];
		data.currentSlide = slide;
		data.nextSlide = currentProcedure[index + 1];
		data.slideCounter++;

		// init procedure response
		data.procedure[slide] = {
			duration: 0,
			response: '',
		};
		// start time tracking
		const startTime = new Date().getTime();

		// iterate through the slides
		await (await import(`./${slide}`)).default();

		// stop audio playback if it is still playing anything
		stop();

		// save duration of each slide
		data.procedure[slide].duration = new Date().getTime() - startTime;
	}

	console.log('Procedure loop done');
};
