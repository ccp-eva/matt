import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCount++;

	swapSlides('s-cat', 's-chicken');

	const startTime = new Date().getTime();

	await playPromise(`./cultures/${data.culture}/audio/s-comp1_1.mp3`);

	play(`./cultures/${data.culture}/audio/s-comp1_1.mp3`, 'link-s-cat-headphones');

	const response = await getResponse(['link-s-cat-yes', 'link-s-cat-no']);
	console.log(response.id);
	data.procedure.cat = {
		duration: new Date().getTime() - startTime,
		response: response.id,
	};
};
