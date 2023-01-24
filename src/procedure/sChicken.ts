import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCount++;

	swapSlides('s-chicken', 's-sheep');

	const startTime = new Date().getTime();

	await playPromise(`./cultures/${data.culture}/audio/s-food4_3.mp3`);

	play(`./cultures/${data.culture}/audio/s-food4_3.mp3`, 'link-s-chicken-headphones');

	const response = await getResponse(['link-s-chicken-yes', 'link-s-chicken-no']);
	console.log(response.id);
	data.procedure.chicken = {
		duration: new Date().getTime() - startTime,
		response: response.id,
	};
};
