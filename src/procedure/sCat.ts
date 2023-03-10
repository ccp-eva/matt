import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCounter++;

	swapSlides('s-cat', 's-chicken');

	const startTime = new Date().getTime();

	await playPromise(`./cultures/${data.culture}/audio/s-cat.mp3`);

	play(`./cultures/${data.culture}/audio/s-cat.mp3`, 'link-s-cat-headphones');

	const response = await getResponse(['link-s-cat-yes', 'link-s-cat-no']);
	console.log(response.id);
	data.procedure.sCat = {
		duration: new Date().getTime() - startTime,
		response: response.id,
	};

	await sleep(500);
};
