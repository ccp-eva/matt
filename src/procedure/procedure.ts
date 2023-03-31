import _ from 'lodash';
import config from '../config.yaml';
import { stop } from '../util/audio';

export const procedure = async () => {
	let currentProcedure = _.cloneDeep(config.procedure[data.culture]);

	const nestedProcKeyValueStore = currentProcedure.reduce((acc, cv, i) => {
		if (_.isPlainObject(cv)) {
			acc[Object.keys(cv)[0]] = i;
		}
		return acc;
	}, {});

	// check if nested objects exist
	let isNested = currentProcedure.some((e) => _.isPlainObject(e));

	if (isNested) {
		while (isNested) {
			// get index of first nested occurrence (ni)
			const ni = currentProcedure.findIndex((e) => _.isPlainObject(e));

			// get the first nested object key
			const nkey = Object.keys(currentProcedure[ni])[0];

			// check if nested object is nested again
			const isNestedAgain: boolean = currentProcedure[ni][nkey].some((e: string) =>
				_.isPlainObject(e)
			);

			// if nested object is nested again, get nested key(s)
			if (isNestedAgain) {
				// shuffle nested keys in procedure
				currentProcedure[ni][nkey] = _.shuffle(currentProcedure[ni][nkey]);

				// get new nested key order
				let nnkeys = currentProcedure[ni][nkey].map((e: string[]) => Object.keys(e)[0]) as string[];

				// save shuffled order in data object
				data[nkey] = nnkeys;

				// shuffle inside our double nested array
				nnkeys.forEach((nnkey, i) => {
					let nnArray = currentProcedure[ni][nkey][i][nnkey] as string[];
					nnArray = _.shuffle(nnArray);

					// save shuffled order in data object
					data[nnkey] = nnArray;

					// save shuffled order in procedure
					currentProcedure[ni][nkey][i][nnkey] = nnArray;
				});

				// flatten nested array
				let subArrays: string[] = [];
				currentProcedure[ni][nkey].forEach((e: string) => {
					subArrays.push(...Object.values(e));
				});
				subArrays = _.flattenDeep(subArrays);
				// overwrite procedure with flattened array
				currentProcedure.splice(ni, 1, ...subArrays);
			}
			// if nested object is not nested again, shuffle nested keys in procedure
			else {
				currentProcedure[ni][nkey] = _.shuffle(currentProcedure[ni][nkey]);
				data[nkey] = currentProcedure[ni][nkey];
				const subArr = Object.values(currentProcedure[ni][nkey]) as string[];
				currentProcedure.splice(ni, 1, ...subArr);
			}

			// check if procedure still contains nested objects
			isNested = currentProcedure.some((e) => _.isPlainObject(e));
		}
	}

	data.animalSlideCounter = 0;
	data.reasoningSlideCounter = 0;
	data.dilemmaMotivationOnePlayed = false;

	currentProcedure = currentProcedure.map((e: string) => _.camelCase(e));
	data.slideOrder = currentProcedure;
	console.table(currentProcedure);

	data.totalSlides = currentProcedure.length;

	// DILEMMA SLIDE LOGIC
	console.log(data.dilemmaOrder);
	console.log(config.procedure[data.culture][nestedProcKeyValueStore.dilemmaOrder].dilemmaOrder);

	// ================================================
	// PROCEDURE LOOP
	// ================================================
	for (const [index, slide] of currentProcedure.entries()) {
		// save slides in global data object
		data.previousSlide = currentProcedure[index - 1];
		data.currentSlide = slide;
		data.nextSlide = currentProcedure[index + 1];
		data.slideCounter++;

		// init default procedure response
		data.procedure[slide] = {
			duration: 0,
			response: '',
		};

		// track dilemma slides

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
