import _ from 'lodash';
import config from '../config.yaml';
import { stop } from '../util/audio';

export const procedure = async () => {
	let currentProcedure = config.procedure[data.culture] as string[];

	// check if nested arrays exist at the second level, if so shuffle them, and flat them into the currentProcedure array
	const isNested = currentProcedure.some((slide) => Array.isArray(slide));

	data.animalSlideCounter = 0;
	data.reasoningSlideCounter = 0;

	// todo use animalOrder and reasoningOrder
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
