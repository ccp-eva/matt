import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCount++;

	swapSlides('s-goldfish', 's-rabbit');

	const startTime = new Date().getTime();

	await playPromise(`./cultures/${data.culture}/audio/s-comp4_1.mp3`);

	play(`./cultures/${data.culture}/audio/s-comp4_1.mp3`, 'link-s-goldfish-headphones');

	const response = await getResponse(['link-s-goldfish-yes', 'link-s-goldfish-no']);
	console.log(response.id);
	data.procedure.goldfish = {
		duration: new Date().getTime() - startTime,
		response: response.id,
	};
};
