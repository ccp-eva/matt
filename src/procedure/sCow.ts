import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCount++;

	swapSlides('s-cow', 's-transition');

	const startTime = new Date().getTime();

	await playPromise(`./cultures/${data.culture}/audio/s-food1_1.mp3`);

	play(`./cultures/${data.culture}/audio/s-food1_1.mp3`, 'link-s-cow-headphones');

	const response = await getResponse(['link-s-cow-yes', 'link-s-cow-no']);
	console.log(response.id);
	data.procedure.cow = {
		duration: new Date().getTime() - startTime,
		response: response.id,
	};
};
