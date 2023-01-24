import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCount++;

	swapSlides('s-pig', 's-cow');

	const startTime = new Date().getTime();

	await playPromise(`./cultures/${data.culture}/audio/s-food2_1.mp3`);

	play(`./cultures/${data.culture}/audio/s-food2_1.mp3`, 'link-s-pig-headphones');

	const response = await getResponse(['link-s-pig-yes', 'link-s-pig-no']);
	console.log(response.id);
	data.procedure.pig = {
		duration: new Date().getTime() - startTime,
		response: response.id,
	};
};
